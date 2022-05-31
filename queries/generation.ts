import { gqlClient } from '../constants';

export const getAllGenerations = async () => {
  const query = `query AllGenerations {
        pokemon_v2_generationname(where: {language_id: {_eq: 5}}) {
          id
          name
          generation_id
        }
      }`;

  const data = await gqlClient.request(query);

  return data.pokemon_v2_generationname;
};
