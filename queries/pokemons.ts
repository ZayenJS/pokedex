import { gqlClient, GRAPHQL_API_URL } from '../constants';
import { Pokemon } from '../models/Pokemon';

export const getAllPokemons = async (limit: number, offset?: number) => {
  const query = `query AllPokemons($limit: Int, $offset: Int) {
          pokemon_v2_pokemon(limit: $limit, offset: $offset) {
            id
            pokemon_v2_pokemonspecy {
              pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 5}, pokemon_v2_pokemonspecy: {}}) {
                name
              }
            }
            pokemon_v2_pokemonsprites {
              sprites
            }
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
                pokemon_v2_typenames(where: {language_id: {_in: [5, 9]}}) {
                  name
                }
              }
            }
          }
        }`;

  const variables = {
    limit,
    offset: offset ?? 0,
  };

  let result: Pokemon[] = [];

  try {
    const apiData = await gqlClient.request(query, variables);

    if (apiData.pokemon_v2_pokemon) {
      result = apiData.pokemon_v2_pokemon.map((data: any) => {
        const { id } = data;
        const { name } = data.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesnames[0];
        // sprites: JSON.parse(data.pokemon_v2_pokemonsprites.sprites[0]), // does not work -> api is full of null values ??
        const sprites = {
          //     /**
          //      * The graphql endpoint seems buggy,
          //      * so i had to use the pokemon.sprites.front_default link
          //      * returned by the REST API
          //      */
          front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
        };
        const types = data.pokemon_v2_pokemontypes.map((type: any) => ({
          fr: type.pokemon_v2_type.pokemon_v2_typenames[0].name,
          en: type.pokemon_v2_type.pokemon_v2_typenames[1].name,
        }));

        return { id, name, types, sprites };
      }) as Pokemon[];
    }
  } catch (err) {
    console.error(err);
  }

  return result;
};

export const getPokemonsByType = async (type: string) => {};

export const getPokemonsByGeneration = async (
  generation: string,
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
      query: `query AllPokemonsByGeneration($limit: Int, $offset: Int) {
        pokemon_v2_pokemon {
          id
          pokemon_v2_pokemonspecy {
            pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 5}, pokemon_v2_pokemonspecy: {generation_id: {_eq: 1}}}) {
              name
            }
          }
          pokemon_v2_pokemonsprites {
            sprites
          }
        }
      }`,
      variables: {
        generation,
        limit,
        offset: offset ?? 0,
      },
    }),
  });

  const json = await response.json();

  console.log(json);

  return json;
};
