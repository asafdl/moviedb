import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { Movie } from './../../models/movie.model';
import { MovieService } from './../../services/movie.service';
import { Store, select } from '@ngrx/store';
import { AppState } from './../../redux/app.state';
import { updateMovie } from './../../redux/movies.action';
import { AppError } from './../../error-types/app-error';
import { NotFoundError } from './../../error-types/not-found-error';


@Component({
  selector: 'movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input('movie') movie: Movie;
  @Output() openDeletePopupEvent = new EventEmitter<Movie>();
  @Output() openUpdatePopupEvent = new EventEmitter<Movie>();

  constructor(private movieService: MovieService, private store: Store<AppState>) {
  }

  ngOnInit() {
    if (this.movie && this.movie.imdbID)
    this.movieService.getMovieById(this.movie.imdbID).subscribe((res) => {
      this.store.dispatch(new updateMovie(res as Movie));
    },
    (error: AppError) => {
      if (error instanceof NotFoundError)
        console.log('not found error');
      else
        console.log(error);
    });
  }

  setPosterStyle(posterUrl) {
    if (!posterUrl) posterUrl = 'assets/img/poster.jpg';
    let styles = {
      'background-image': ' linear-gradient(to right bottom, #db580070, #f7941d78), url("'+ posterUrl +'")'
    };
    return styles;
  }

  setHeadingStyle(title) {
    let styles = {};
  
    if ((title as String).length > 25)
      styles['font-size'] = "1.7rem";

    return styles;
  }

  openDeletePopup(movie: Movie) {
    this.openDeletePopupEvent.emit(movie);
  }

  openUpdatePopup(movie: Movie) {
    this.openUpdatePopupEvent.emit(movie);
  }
}
