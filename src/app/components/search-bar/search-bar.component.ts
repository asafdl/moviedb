import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MovieService } from './../../services/movie.service';
import { Store, select } from '@ngrx/store';
import { AppState } from './../../redux/app.state';
import { Movie } from './../../models/movie.model';
import { OmdbResponse } from './../../models/omdb-response.model';
import { updateList } from './../../redux/movies.action';
import { AppError } from './../../error-types/app-error';
import { NotFoundError } from './../../error-types/not-found-error';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  public logoImg: String;
  public searchInput = "";
  @Output() openAddPopupEvent = new EventEmitter<any>();

  constructor(private store: Store<AppState>, private movieService: MovieService) { 
    this.logoImg = 'assets/img/favicon.png';
  }

  ngOnInit() {
  }

  searchMovie() {
    if (this.searchInput) {
      this.movieService.getMovieListBySearch(this.searchInput).subscribe((res: OmdbResponse) => {
        this.store.dispatch(new updateList(res.Search));
      },
      (error: AppError) => {
        if (error instanceof NotFoundError)
          console.log('not found error');
        else
          console.log(error);
      });
  }
  }

  openAddPopup() {
    this.openAddPopupEvent.emit();
  }

}
