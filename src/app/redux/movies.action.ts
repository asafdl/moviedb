import { Action } from '@ngrx/store';
import { Movie, Movies } from './../models/movie.model';

export namespace MOVIE_ACTION {
  export const ADD_MOVIE = 'ADD_MOVIE'
  export const UPDATE_MOVIE = 'UPDATE_MOVIE'
  export const DELETE_MOVIE = 'DELETE_MOVIE'
  export const UPDATE_LIST = 'UPDATE_LIST'
}

export class addMovie implements Action {
  readonly type = MOVIE_ACTION.ADD_MOVIE

  constructor(public payload: Movie) {}
}

export class updateMovie implements Action {
  readonly type = MOVIE_ACTION.UPDATE_MOVIE 

  constructor(public payload: Movie) {}
}

export class deleteMovie implements Action {
  readonly type = MOVIE_ACTION.DELETE_MOVIE

  constructor(public payload: Movie) {}
}

export class updateList implements Action {
  readonly type = MOVIE_ACTION.UPDATE_LIST

  constructor(public payload: Movie[]) {}
}

export type MovieAction = addMovie | updateMovie | deleteMovie | updateList;
