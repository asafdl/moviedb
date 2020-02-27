import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { AppError} from './../error-types/app-error';
import { NotFoundError} from './../error-types/not-found-error';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private randomMovieList = ['matrix']
  private urlSearch = 'https://www.omdbapi.com/?apikey=2c1ff682&s=';
  private urlID = 'https://www.omdbapi.com/?apikey=2c1ff682&i='; 

  constructor(private http: HttpClient) {}

  getMovieListBySearch(key) {
   return this.http.get(this.urlSearch + key).pipe(catchError(this.handleError), map(res => {
     return res;
   }))
 }

  getInitialMovieList() {
    return this.http.get('assets/data.json').pipe(catchError(this.handleError), map(res => {
      return res;
    }))
  }

  getMovieById(imdbID) {
    return this.http.get(this.urlID + imdbID).pipe(catchError(this.handleError), map(res => {
      return res;
    }))
  }



  private handleError(error: Response) {
    if (error.status === 404)
      return throwError(new NotFoundError(error));

   return throwError(new AppError(error));
}
}
