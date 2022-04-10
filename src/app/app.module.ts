import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { HomeComponent } from "./components/home/home.component";
import { FooterComponent } from "./components/footer/footer.component";
import { OddMovieComponent } from "./components/odd-movie/odd-movie.component";
import { SeriesMovieComponent } from './components/series-movie/series-movie.component';
import { HotMovieComponent } from './components/hot-movie/hot-movie.component';
import { NewMovieComponent } from './components/new-movie/new-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    FooterComponent,
    OddMovieComponent,
    SeriesMovieComponent,
    HotMovieComponent,
    NewMovieComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
