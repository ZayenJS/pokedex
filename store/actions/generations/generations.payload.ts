export interface FetchGenerationsPayload {
  generation?: {
    id: number;
    name: string;
    generation_id: number;
  };
}

export interface FetchPokemonGenerationPayload {
  generationId: number;
  limit: number;
  offset?: number;
}

export interface setActiveGenerationPayload {
  generationId: number | null;
}
