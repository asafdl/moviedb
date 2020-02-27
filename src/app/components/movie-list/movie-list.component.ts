import { Component, OnInit } from '@angular/core';
import { MovieService } from './../../services/movie.service';
import { Movies, Movie } from './../../models/movie.model';
import { OmdbResponse } from './../../models/omdb-response.model';
import { Store, select } from '@ngrx/store';
import { AppState } from './../../redux/app.state'
import { Observable } from 'rxjs';
import { updateList } from './../../redux/movies.action';
import { AppError } from './../../error-types/app-error';
import { NotFoundError } from './../../error-types/not-found-error';
import { POPUP_ACTION } from './../popup/popup-action';
import { trigger, state, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  animations: [trigger('fade',[
    transition('void => *', [
      style({opacity: 0}),
      animate(300, style({opacity: 1}))
    ]),
    transition('* => void', [
      style({opacity: 1}),
      animate(300, style({opacity: 0}))
    ])
  ]),
  trigger('fadePopup',[
    transition('void => *', [
      style({opacity: 0}),
      animate(200, style({opacity: 1}))
    ]),
    transition('* => void', [
      style({opacity: 1}),
      animate(200, style({opacity: 0}))
    ])
  ])]
})
export class MovieListComponent implements OnInit {
  
  public movies$: Observable<Movies>;
  public selectedMovie: Movie;
  public showPopup: boolean = false;
  public popupAction: string = "";
  private genre = 'ALL';

  constructor(private movieService: MovieService, private store: Store<AppState>) { }

  ngOnInit() {
    this.movieService.getInitialMovieList().subscribe((res: OmdbResponse) => {
      this.store.dispatch(new updateList(res.Search));
    },
    (error: AppError) => {
      if (error instanceof NotFoundError)
        console.log('not found error');
      else
        console.log(error);
    });

    this.movies$ = this.store.pipe(select('movies'));
  }

  openDeletePopup(event) {
    this.selectedMovie = event;
    this.popupAction = POPUP_ACTION.DELETE_MOVIE;
    this.showPopup = true;
  }

  openAddPopup() {
    this.popupAction = POPUP_ACTION.ADD_MOVIE;
    this.showPopup = true;
  }

  openUpdatePopup(event) {
    this.selectedMovie = event;
    this.popupAction = POPUP_ACTION.UPDATE_MOVIE;
    this.showPopup = true;
  }

  closePopUp() {
    this.showPopup = false;
  }

  changeGenre(event) {
    this.genre = event;
  }

  checkGenre(movie : Movie) {
    return ((movie) && movie.Genre && movie.Genre.toUpperCase().indexOf(this.genre.toUpperCase()) !== -1) || this.genre === 'ALL';
  }
}
