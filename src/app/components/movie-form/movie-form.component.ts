import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormValidation } from './movie.validators';
import { Store, select } from '@ngrx/store';
import { AppState } from './../../redux/app.state';
import { addMovie, updateMovie } from './../../redux/movies.action';
import { Movie } from './../../models/movie.model';

@Component({
  selector: 'movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {

  @Input('movie') movie: Movie;
  @Output() closePopupEvent = new EventEmitter<Movie>();
  public form: FormGroup;
  public isSubmitPressed = false;

  constructor(private store: Store<AppState>) {
    this.form = new FormGroup({
      'Title': new FormControl('',[Validators.required,
                                   Validators.maxLength(60)]),
      'Year': new FormControl('' , [Validators.required,
                                   Validators.maxLength(5),
                                   FormValidation.cannotContainLetters]),
      'Runtime': new FormControl('' ,[Validators.required,
                                     Validators.maxLength(15),
                                     FormValidation.validRuntime]),
      'Genre': new FormControl('' ,[Validators.required,
                                   Validators.maxLength(50),
                                   FormValidation.onlyLetters]),
      'Director': new FormControl('' ,[Validators.required,
                                      Validators.maxLength(60),
                                      FormValidation.onlyLetters]),
    })
  }

  ngOnInit() {
    if (this.movie) {
      this.setInitialMovieValues(this.movie);
    }
    this.Title.setAsyncValidators(this.cannotContainSpaceWrapper(this.movie).bind(this));
  }
  
  cannotContainSpaceWrapper (movie: Movie) {
    return function cannotContainSpace(control: AbstractControl) : Promise<ValidationErrors | null> {
      return new Promise((resolve, reject) => {
        this.store.pipe(select('movies')).subscribe(res => {
          let result = res.movies.filter(movie => {
            let myMovie = movie['Title'].toUpperCase;
            return (control.value as String).toUpperCase() === movie['Title'].toUpperCase()
          })
          let isSameCurrentTitle = movie ? (control.value as String) === movie.Title : false;
          if (result.length && !isSameCurrentTitle)
            resolve ({shouldBeUnique: true});
          else return resolve(null);
        })
      })
    }
  }

  submit() {
    this.isSubmitPressed = true;
    if (!this.form.invalid) {
      let currentMovie : Movie = this.form.value;
      currentMovie.imdbID = this.generateId();

      if (this.movie)
        this.store.dispatch(new updateMovie(currentMovie));
      else
        this.store.dispatch(new addMovie(currentMovie));

      this.closePopupEvent.emit();
    }
  }

  setInitialMovieValues(movie: Movie) {
    this.Title.setValue(movie.Title);
    this.Year.setValue(movie.Year);
    this.Runtime.setValue(movie.Runtime);
    this.Genre.setValue(movie.Genre);
    this.Director.setValue(movie.Director);
  }

  generateId() {
    if (this.movie)
      return this.movie.imdbID;
    else 
      return Math.random().toString(36).substr(2, 16);
  }

  get Title() {
    return this.form.get('Title');
  }

  get Year() {
    return this.form.get('Year');
  }

  get Runtime() {
    return this.form.get('Runtime');
  }

  get Genre() {
    return this.form.get('Genre');
  }

  get Director() {
    return this.form.get('Director');
  }

}
