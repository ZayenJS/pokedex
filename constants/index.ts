import { GraphQLClient } from 'graphql-request';

export const GRAPHQL_API_URL = 'https://beta.pokeapi.co/graphql/v1beta';

export const gqlClient = new GraphQLClient(GRAPHQL_API_URL);

export const ITEMS_PER_PAGE = 50;
