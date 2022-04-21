import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  DefaultSimpleModalOptionConfig,
  defaultSimpleModalOptions,
  SimpleModalModule,
} from "ngx-simple-modal";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { HomeComponent } from "./components/home/home.component";
import { FooterComponent } from "./components/footer/footer.component";
import { OddMovieComponent } from "./components/odd-movie/odd-movie.component";
import { SeriesMovieComponent } from "./components/series-movie/series-movie.component";
import { HotMovieComponent } from "./components/hot-movie/hot-movie.component";
import { NewMovieComponent } from "./components/new-movie/new-movie.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { SearchComponent } from "./components/search/search.component";
import { DetailComponent } from "./components/detail/detail.component";
import { FavoriteMovieComponent } from "./components/favorite-movie/favorite-movie.component";
import { LoginComponent } from "./components/login/login.component";
import { ConfirmComponent } from "./components/confirm/confirm.component";

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
    NotFoundComponent,
    SearchComponent,
    DetailComponent,
    FavoriteMovieComponent,
    LoginComponent,
    ConfirmComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    SimpleModalModule.forRoot(
      { container: "modal-container" },
      {
        ...defaultSimpleModalOptions,
        ...{
          closeOnEscape: true,
          closeOnClickOutside: true,
          wrapperDefaultClasses: "modal fade-anim",
          wrapperClass: "in",
          animationDuration: 400,
          autoFocus: true,
        },
      }
    ),
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
      progressAnimation: "increasing",
      preventDuplicates: true,
    }),
  ],

  entryComponents: [ConfirmComponent],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: DefaultSimpleModalOptionConfig,
      useValue: {
        ...defaultSimpleModalOptions,
        ...{ closeOnEscape: true, closeOnClickOutside: true },
      },
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
