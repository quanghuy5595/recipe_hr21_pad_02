import { element } from "protractor";
import { DataService } from "./../../services/data.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  listHotMovie: any = {};

  listUpCommingMovie: any = {};

  listNowPlayingMovie: any = {};

  genreMovie: any = {};

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataService.getHomedata("popular").subscribe((res) => {
      this.listHotMovie = { ...res };
    });
    this.dataService.getHomedata("upcoming").subscribe((res) => {
      this.listUpCommingMovie = { ...res };
    });
    this.dataService.getHomedata("now_playing").subscribe((res) => {
      this.listNowPlayingMovie = { ...res };
    });
    this.dataService.getGenreMovie().subscribe((res) => {
      this.genreMovie = { ...res };
    });
  }

  showDetail(movie) {
    this.router.navigate(["detail/", movie.id]);
  }

  filterByGenre(genre) {
    if (genre.value === "- All -") {
      this.dataService.getHomedata("popular").subscribe((res) => {
        this.listHotMovie = res;
      });
      this.dataService.getHomedata("upcoming").subscribe((res) => {
        this.listUpCommingMovie = res;
      });
      this.dataService.getHomedata("now_playing").subscribe((res) => {
        this.listNowPlayingMovie = res;
      });
    } else {
      this.dataService.getHomedata("popular").subscribe((res: any) => {
        this.genreMovie.genres.forEach((item) => {
          if (genre.value === item.name) {
            this.listHotMovie.results = res.results.filter((movie) => {
              return movie.genre_ids.indexOf(item.id) !== -1;
            });
          }
        });
      });

      this.dataService.getHomedata("upcoming").subscribe((res: any) => {
        this.genreMovie.genres.forEach((item) => {
          if (genre.value === item.name) {
            this.listUpCommingMovie.results = res.results.filter((movie) => {
              return movie.genre_ids.indexOf(item.id) !== -1;
            });
          }
        });
      });

      this.dataService.getHomedata("now_playing").subscribe((res: any) => {
        this.genreMovie.genres.forEach((item) => {
          if (genre.value === item.name) {
            this.listNowPlayingMovie.results = res.results.filter((movie) => {
              return movie.genre_ids.indexOf(item.id) !== -1;
            });
          }
        });
      });
    }
  }

  filterByLanguage(language) {
    if (language.value === "- All -") {
      this.dataService.getHomedata("popular").subscribe((res) => {
        this.listHotMovie = res;
      });
      this.dataService.getHomedata("upcoming").subscribe((res) => {
        this.listUpCommingMovie = res;
      });
      this.dataService.getHomedata("now_playing").subscribe((res) => {
        this.listNowPlayingMovie = res;
      });
    } else {
      this.dataService.getHomedata("popular").subscribe((res: any) => {
        this.listHotMovie.results = res.results.filter((movie) => {
          return movie.original_language === language.value;
        });
      });
      this.dataService.getHomedata("upcoming").subscribe((res: any) => {
        this.listUpCommingMovie.results = res.results.filter((movie) => {
          return movie.original_language === language.value;
        });
      });
      this.dataService.getHomedata("now_playing").subscribe((res: any) => {
        this.listNowPlayingMovie.results = res.results.filter((movie) => {
          return movie.original_language === language.value;
        });
      });
    }
  }
  // __________________________________________________________________
}
