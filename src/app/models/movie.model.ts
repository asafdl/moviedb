export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Poster: string;
}

export interface Movies {
  Movies: Movie[];
}
