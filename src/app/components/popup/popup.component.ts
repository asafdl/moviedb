import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Movie } from './../../models/movie.model';
import { Store, select } from '@ngrx/store';
import { AppState } from './../../redux/app.state';
import { deleteMovie } from './../../redux/movies.action';


@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {

  @Input('movie') movie: Movie;
  @Input('popupAction') popupAction: string;
  @Output() closePopupEvent = new EventEmitter<Movie>();


  constructor(private store: Store<AppState>) {}

  closePopup() {
    this.closePopupEvent.emit();
  }

  deleteMovie() {
    this.store.dispatch(new deleteMovie(this.movie));
    this.closePopupEvent.emit();
  }

}
