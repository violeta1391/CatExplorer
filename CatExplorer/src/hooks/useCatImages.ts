import { useApiRequest } from "./useApiRequest";

const API_KEY = import.meta.env.VITE_CAT_API_KEY;

export const useCatImagesByBreedIds = (breedIds: string[], p0: string) => {
    const urls = breedIds.map(
        (id) => `https://api.thecatapi.com/v1/images/search?breed_ids=${id}&limit=1&api_key=${API_KEY}`
    );
    
    return useApiRequest<any[]>(urls);
};
