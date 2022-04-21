import { AuthGuard } from "./auth.guard";
import { LoginComponent } from "./components/login/login.component";
import { FavoriteMovieComponent } from "./components/favorite-movie/favorite-movie.component";
import { DetailComponent } from "./components/detail/detail.component";
import { SearchComponent } from "./components/search/search.component";
import { HomeComponent } from "./components/home/home.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { NewMovieComponent } from "./components/new-movie/new-movie.component";
import { HotMovieComponent } from "./components/hot-movie/hot-movie.component";
import { SeriesMovieComponent } from "./components/series-movie/series-movie.component";
import { OddMovieComponent } from "./components/odd-movie/odd-movie.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "odd-movie",
    component: OddMovieComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "series-movie",
    component: SeriesMovieComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "hot-movie",
    component: HotMovieComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "new-movie",
    component: NewMovieComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "favorite",
    component: FavoriteMovieComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "search",
    component: SearchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "detail/:id",
    component: DetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
