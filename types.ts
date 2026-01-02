export interface Product {
  name: string;
  price?: string;
  description?: string;
  link: string;
  availabilityHint?: string;
}

export interface SearchResult {
  products: Product[];
  summary: string;
}

export interface SearchParams {
  query: string;
  location: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}