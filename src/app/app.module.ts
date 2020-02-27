import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from './services/movie.service';
import { StoreModule } from '@ngrx/store';
import { moviesReducer } from './redux/movies.reducer';
import { ClickOutsideModule } from 'ng-click-outside';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PopupComponent } from './components/popup/popup.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { TitlePipe } from './pipes/title-pipe';


@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieCardComponent,
    FilterBarComponent,
    SearchBarComponent,
    PopupComponent,
    MovieFormComponent,
    TitlePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ movies: moviesReducer }),
    ClickOutsideModule,
    BrowserAnimationsModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
