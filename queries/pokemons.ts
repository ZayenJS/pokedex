import { GenericObject } from '../@types';
import { PokemonTypeColor } from '../@types/PokemonTypeColor';
import { gqlClient, GRAPHQL_API_URL } from '../constants';
import { Pokemon } from '../models/Pokemon';
import { PokemonType } from '../models/Type';

export const getAllPokemons = async (
  limit: number,
  offset?: number,
  where: GenericObject<any> = {},
) => {
  const jsonWhere = Object.keys(where).length
    ? `where: ${JSON.stringify(where).replace(/"/g, '')}`
    : '';

  const query = `query AllPokemons($limit: Int, $offset: Int) {
          pokemon_v2_pokemon(limit: $limit, offset: $offset${
            jsonWhere ? ',' : ''
          }${jsonWhere}, order_by: { id: asc }) {
            id
            pokemon_v2_pokemonspecy {
              pokemon_v2_pokemonspeciesnames(where: { language_id: { _eq: 5 } }) {
                name
              }
              generation_id
            }
            pokemon_v2_pokemonsprites {
              sprites
            }
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
                id
                pokemon_v2_typenames(where: { language_id: { _in: [ 5, 9 ] } }) {
                  name
                }
              }
            }
          }
          pokemon_v2_pokemon_aggregate${jsonWhere ? '(' + jsonWhere + ')' : ''} {
            aggregate {
              count(columns: name)
            }
          }
        }`;

  const variables = {
    limit,
    offset: offset ?? 0,
  };

  const result: { count: number; pokemons: Pokemon[] } = {
    count: 0,
    pokemons: [],
  };

  try {
    const apiData = await gqlClient.request(query, variables);

    if (apiData.pokemon_v2_pokemon) {
      result.pokemons = apiData.pokemon_v2_pokemon.map((data: any) => {
        const { id } = data;
        const { name } = data.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesnames[0];
        // sprites: JSON.parse(data.pokemon_v2_pokemonsprites.sprites[0]), // does not work -> api is full of null values ??
        const sprites = {
          /**
           * The graphql endpoint seems buggy,
           * so i had to use the pokemon.sprites.front_default link
           * returned by the REST API
           */
          front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
        };
        const types: PokemonType[] = data.pokemon_v2_pokemontypes.map((type: any) => ({
          id: type.pokemon_v2_type.id,
          fr: type.pokemon_v2_type.pokemon_v2_typenames[0].name,
          en: type.pokemon_v2_type.pokemon_v2_typenames[1].name,
          color:
            PokemonTypeColor[
              type.pokemon_v2_type.pokemon_v2_typenames[1].name as keyof typeof PokemonTypeColor
            ],
        }));

        return { id, name, types, sprites } as Pokemon;
      });
    }

    if (apiData.pokemon_v2_pokemon_aggregate) {
      result.count = apiData.pokemon_v2_pokemon_aggregate.aggregate.count;
    }
  } catch (err) {
    console.error(err);
  }

  return result;
};

export const getPokemonById = async (id: number | number[] | null) => {
  if (!id) return null;

  const query = `query PokemonById($id: [Int!]) {
          pokemon_v2_pokemon(where: { id: { _in: $id } }) {
            id
            pokemon_v2_pokemonspecy {
              pokemon_v2_pokemonspeciesflavortexts(where: { language_id: { _eq: 5 } }) {
                flavor_text
              }
              pokemon_v2_pokemonspeciesnames(where: { language_id: { _eq: 5 } }) {
                name
              }
              pokemon_v2_generation {
                pokemon_v2_generationnames(where: {language_id: {_eq: 5}}) {
                  name
                }
              }
              is_legendary
              is_mythical
              is_baby
            }
            pokemon_v2_pokemonsprites {
              sprites
            }
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
                id
                pokemon_v2_typenames(where: { language_id: { _in: [ 5, 9 ] } }) {
                  name
                }
              }
            }
          }
        }`;

  const variables = {
    id: Array.isArray(id) ? id : [id],
  };

  let result: Pokemon[] | null = null;

  const apiData = await gqlClient.request(query, variables);

  if (apiData.pokemon_v2_pokemon) {
    result = apiData.pokemon_v2_pokemon.map((data: any) => {
      const { id } = data;
      const name = data.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesnames?.[0]?.name;
      const generation =
        data.pokemon_v2_pokemonspecy.pokemon_v2_generation.pokemon_v2_generationnames?.[0]?.name;
      const flavor_texts = data.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesflavortexts;
      // sprites: JSON.parse(data.pokemon_v2_pokemonsprites.sprites[0]), // does not work -> api is full of null values ??
      const sprites = {
        /**
         * The graphql endpoint seems buggy,
         * so i had to use the pokemon.sprites.front_default link
         * returned by the REST API
         */
        front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
      };
      const types: PokemonType[] = data.pokemon_v2_pokemontypes.map((type: any) => ({
        id: type.pokemon_v2_type.id,
        fr: type.pokemon_v2_type.pokemon_v2_typenames[0].name,
        en: type.pokemon_v2_type.pokemon_v2_typenames[1].name,
        color:
          PokemonTypeColor[
            type.pokemon_v2_type.pokemon_v2_typenames[1].name as keyof typeof PokemonTypeColor
          ],
      }));

      const isLegendary = data.pokemon_v2_pokemonspecy.is_legendary;
      const isMythical = data.pokemon_v2_pokemonspecy.is_mythical;
      const isBaby = data.pokemon_v2_pokemonspecy.is_baby;

      return {
        id,
        name,
        generation,
        types,
        sprites,
        descriptions: flavor_texts.map((t: { flavor_text: string }) => t.flavor_text),
        isLegendary,
        isBaby,
        isMythical,
      } as Pokemon;
    });
  }

  return result;
};

export const searchPokemon = async (search: string) => {
  const idQuery = `query SearchPokemon($search: String) {
          pokemon_v2_pokemonspeciesname(where: {_and: {language_id: {_eq: 5}, name: {_iregex: $search}}}) {
            pokemon_species_id
          }
        }`;

  const variables = {
    search,
  };

  let ids: number[] = [];

  try {
    const apiData = await gqlClient.request(idQuery, variables);

    if (apiData.pokemon_v2_pokemonspeciesname) {
      ids = apiData.pokemon_v2_pokemonspeciesname.map((data: any) => data.pokemon_species_id);
    }
  } catch (err) {
    console.error(err);
  }

  if (!ids.length) return [] as Pokemon[];

  const result = await getPokemonById(ids);

  return result ?? [];
};

export const getPokemonsByType = async (type: string) => {};

export const getPokemonsByGeneration = async (
  generationId: number,
  limit: number,
  offset?: number,
) => {
  const response = await fetch(GRAPHQL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: `query AllPokemonsByGeneration($generation_id: Int, $limit: Int, $offset: Int) {
        pokemon_v2_pokemon {
          id
          pokemon_v2_pokemonspecy {
            pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 5}, pokemon_v2_pokemonspecy: {generation_id: {_eq: $generation_id}}}) {
              name
            }
          }
          pokemon_v2_pokemonsprites {
            sprites
          }
        }
      }`,
      variables: {
        generation_id: generationId,
        limit,
        offset: offset ?? 0,
      },
    }),
  });

  const json = await response.json();

  return json;
};
