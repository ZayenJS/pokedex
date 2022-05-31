import { GraphQLClient } from 'graphql-request';

export enum PokemonTypeColor {
  Steel = '#B8B8D0',
  Fighting = '#C03028',
  Dragon = '#7038F8',
  Water = '#6890F0',
  Electric = '#F8D030',
  Fire = '#F08030',
  Ice = '#98D8D8',
  Bug = '#A8B820',
  Normal = '#A8A878',
  Grass = '#78C850',
  Poison = '#A040A0',
  Psychic = '#F85888',
  Rock = '#B8A038',
  Ground = '#DDBB55',
  Ghost = '#705898',
  Dark = '#705848',
  Flying = '#A890F0',
  Fairy = '#EE99AC',
  Shadow = '#705898',
  '???' = '#B8B8D0',
}

export enum QueryTypes {
  POKEMON_TYPES = 'POKEMON_TYPES',
  ALL_POKEMON = 'ALL_POKEMON',
  ALL_GENERATIONS = 'ALL_GENERATIONS',
}

export const GRAPHQL_API_URL = 'https://beta.pokeapi.co/graphql/v1beta';

export const gqlClient = new GraphQLClient(GRAPHQL_API_URL);
