import { Movie } from './movie.model';

export interface OmdbResponse {
  Search: Movie[] ;
  Response: string;
  totalResults: string;
}
