import { Action } from '@ngrx/store';
import { MOVIE_ACTION, MovieAction } from './movies.action';
import { Movie } from './../models/movie.model';

const initialState = {
  movies: [{"Title": "some movie1"}, {"Title": "some movie2"}]
}

export function moviesReducer(state = initialState, action: MovieAction) {
  switch (action.type) {
    case MOVIE_ACTION.ADD_MOVIE:
      return {
        ...state,
        movies: [...state.movies, action.payload]
       }
    case MOVIE_ACTION.UPDATE_MOVIE:
      return {
        ...state,
        movies: state.movies.map(movie => {
          if((movie as Movie).imdbID === action.payload['imdbID']) {
            (movie as Movie).Title = action.payload['Title'];
            (movie as Movie).Year = action.payload['Year'];
            (movie as Movie).Runtime = action.payload['Runtime'];
            (movie as Movie).Genre = action.payload['Genre'];
            (movie as Movie).Director = action.payload['Director'];
        }
        return movie;
      })
     }
    case MOVIE_ACTION.DELETE_MOVIE:
        return {
          ...state,
          movies: state.movies.filter(movie => movie !== action.payload)
         }
    case MOVIE_ACTION.UPDATE_LIST:
       return {
         ...state,
         movies: action.payload
        }
    default:
      return state;
  }
}