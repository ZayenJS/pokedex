import { GRAPHQL_API_URL, PokemonTypeColor } from '../constants';

export const getAllTypes = async () => {
  const response = await fetch(GRAPHQL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query PokemonTypes {
            pokemon_v2_typename(where: {language_id: {_in: [5, 9]}}) {
              type_id
              name
              language_id
            }
          }`,
    }),
  });

  const parsedResponse = await response.json();

  return Object.entries(
    parsedResponse.data.pokemon_v2_typename.reduce(
      (
        acc: {
          [key: number]: Partial<{
            fr: string;
            en: string;
            color: PokemonTypeColor;
          }>;
        },
        type: { type_id: number; name: string; language_id: number },
      ) => {
        const { type_id, name, language_id } = type;

        const lang = language_id === 5 ? 'fr' : 'en';

        if (!acc[type_id]) {
          acc[type_id] = {};
        }

        acc[type_id][lang] = name;
        if (lang === 'en')
          acc[type_id].color = PokemonTypeColor[name as keyof typeof PokemonTypeColor];

        return acc;
      },
      {},
    ) as { [key: number]: { fr: string; en: string; color: PokemonTypeColor } },
  );
};
