import { useApiRequest } from "./useApiRequest";

export const useCatImagesByBreedIds = (breedIds: string[], apiKey: string) => {
    const urls = breedIds.map(
        (id) => `https://api.thecatapi.com/v1/images/search?breed_ids=${id}&limit=1`
    );
    
    return useApiRequest<any[]>(urls);
};
