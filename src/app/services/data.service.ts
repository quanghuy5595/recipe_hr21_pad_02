import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { userInfo } from "os";

@Injectable({
  providedIn: "root",
})
export class DataService {
  baseURL = "https://api.themoviedb.org/3/movie";

  baseTvURL = "https://api.themoviedb.org/3/tv/";
  genreURL = "https://api.themoviedb.org/3/genre/movie";
  searchURL = "https://api.themoviedb.org/3/search/movie";
  listFavoriteMovieService: any = [];

  constructor(private http: HttpClient, private router: ActivatedRoute) {}

  addKeyURL(url) {
    return (url += "api_key=e9e9d8da18ae29fc430845952232787c");
  }

  getHomedata(typeMovie) {
    let typeURL = `${this.baseURL}/${typeMovie}?page=1&`;
    this.http.get(`${this.addKeyURL(typeURL)}`);
    return this.http.get(`${this.addKeyURL(typeURL)}`);
  }

  getGenreMovie() {
    let genreURL = `${this.genreURL}/list?`;
    return this.http.get(this.addKeyURL(genreURL));
  }
  // _______________________oddMovie___________________________________________

  getHotMovieData(page) {
    let hotMovieURL = `${this.baseURL}/popular?page=${page}&`;
    return this.http.get(this.addKeyURL(hotMovieURL));
  }

  //________________________Detail__________________________________________
  getDetailMovieData(id) {
    let detailURL = `${this.baseURL}/${id}?`;
    return this.http.get(this.addKeyURL(detailURL));
  }

  getActorMovieData(id) {
    let actorURL = `${this.baseURL}/${id}/casts?`;
    return this.http.get(this.addKeyURL(actorURL));
  }

  getTrailerMovieData(id) {
    let trailerURL = `${this.baseURL}/${id}/videos?`;
    return this.http.get(this.addKeyURL(trailerURL));
  }

  getCommentMoiveData(id) {
    let commentURL = `${this.baseURL}/${id}/reviews?`;
    return this.http.get(this.addKeyURL(commentURL));
  }

  addFavoriteMovieService(movieDetail) {
    this.listFavoriteMovieService.push({ ...movieDetail, favorite: true });
  }

  removeFavoriteService(movieDetail) {
    console.log(movieDetail);
    this.listFavoriteMovieService = this.listFavoriteMovieService.filter(
      (movie) => {
        return movie.id !== movieDetail.id;
      },
      console.log(this.listFavoriteMovieService)
    );
  }

  detailMovieService: any = [];
  getDetailMovieData2(id) {
    this.getDetailMovieData(id).subscribe((movieDetail: any) => {
      console.log(movieDetail);
      this.detailMovieService.push(movieDetail);
    });
  }

  // _________________________SeriesMovie_______________________________
  getNowPlayingMovieData(page) {
    let hotMovieURL = `${this.baseURL}/top_rated?page=${page}&`;
    return this.http.get(this.addKeyURL(hotMovieURL));
  }

  //____________________________Search______________________________________

  getSearchMovie(queryParams, page) {
    let searchURL = `${this.searchURL}?query=${queryParams}&page=${page}&`;
    return this.http.get(this.addKeyURL(searchURL));
  }
}
