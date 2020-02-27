import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { GENRE_TYPE } from './genre-type';

@Component({
  selector: 'filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {

  currentGenre: string;
  activeClass = 'filter__genre--active';
  @Output() changeGenreEvent = new EventEmitter<string>();

  constructor() {
    this.currentGenre = GENRE_TYPE.ALL;
  }

  ngOnInit() {
  }

  changeGenre(genre) {
    this.currentGenre = genre;
    this.changeGenreEvent.emit(genre);
  }

}