import { Movies } from './../models/movie.model';

export interface AppState {
  movies: {
    movies: Movies
  }
}
