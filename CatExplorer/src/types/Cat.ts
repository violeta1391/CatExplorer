export interface Cat {
  id: string;
  name: string;
  origin: string;
  description?: string;
  temperament?: string;
  life_span?: string;
  image?: {
    url: string;
  };
}
