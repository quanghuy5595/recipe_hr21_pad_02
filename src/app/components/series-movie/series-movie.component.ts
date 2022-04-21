import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-series-movie",
  templateUrl: "./series-movie.component.html",
  styleUrls: ["./series-movie.component.scss"],
})
export class SeriesMovieComponent implements OnInit {
  listNowPlayingMovie: any = [];
  genreNowPlayingMovie: any;
  p: any = 1;
  keywords;

  spinnerType: string;
  spinnerName: string;
  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.spinnerName = "sp1";
    // this.spinnerType = "ball-clip-rotate-multiple";
    // this.spinnerType = "ball-fussion";
    this.spinnerType = "ball-spin-clockwise";
    // this.spinnerType = "square-jelly-box";
    // this.spinnerType = "timer";
  }

  ngOnInit() {
    this.spinner.show(this.spinnerName, {
      // color: "tomato",
      // bdColor: "",
    });

    setTimeout(() => {
      this.spinner.hide(this.spinnerName);
    }, 1000);

    for (let i = 1; i < 50; i++) {
      this.dataService.getNowPlayingMovieData(i).subscribe((res: any) => {
        this.listNowPlayingMovie = this.listNowPlayingMovie.concat(res.results);
      });
    }

    this.dataService.getGenreMovie().subscribe((res) => {
      this.genreNowPlayingMovie = { ...res };
      this.genreNowPlayingMovie = this.genreNowPlayingMovie.genres;
    });
  }

  // inputPage(oderPage, genreOtion) {
  //   this.dataService.getNowPlayingMovieData(oderPage).subscribe((res) => {
  //     this.listNowPlayingMovie = res;
  //   });

  //   this.dataService.getNowPlayingMovieData(oderPage).subscribe((res: any) => {
  //     this.genreNowPlayingMovie.forEach((item) => {
  //       if (item.name === genreOtion.value) {
  //         this.listNowPlayingMovie.results = res.results.filter((movie) => {
  //           return movie.genre_ids.indexOf(item.id) !== -1;
  //         });
  //       }
  //     });
  //   });
  // }

  // selectpage(page, oderPage) {
  //   oderPage.value = page.innerHTML;
  //   let orderPage = page.innerHTML;
  //   this.inputPage(orderPage, "");
  // }

  filterByGenre(genreOtion) {
    if (genreOtion.value === "- All -") {
      console.log("hahaah");
      this.listNowPlayingMovie = [];
      for (let i = 1; i < 50; i++) {
        this.dataService.getNowPlayingMovieData(i).subscribe((res: any) => {
          this.listNowPlayingMovie = this.listNowPlayingMovie.concat(
            res.results
          );
          console.log(this.listNowPlayingMovie);
        });
      }
    } else {
      this.listNowPlayingMovie = [];
      this.genreNowPlayingMovie.forEach((item) => {
        if (item.name === genreOtion.value) {
          for (let i = 1; i < 50; i++) {
            this.dataService.getNowPlayingMovieData(i).subscribe((res: any) => {
              this.listNowPlayingMovie = this.listNowPlayingMovie
                .concat(res.results)
                .filter((movie) => {
                  return movie.genre_ids.indexOf(item.id) !== -1;
                });
            });
          }
        }
      });
    }
  }

  filterByYear(yearOption) {
    console.log(yearOption.value);

    if (yearOption.value === "- All -") {
      this.listNowPlayingMovie = [];
      for (let i = 1; i < 50; i++) {
        this.dataService.getNowPlayingMovieData(i).subscribe((res: any) => {
          this.listNowPlayingMovie = this.listNowPlayingMovie.concat(
            res.results
          );
          console.log(this.listNowPlayingMovie);
        });
      }
    } else {
      this.listNowPlayingMovie = [];
      for (let i = 1; i < 50; i++) {
        this.dataService.getNowPlayingMovieData(i).subscribe((res: any) => {
          this.listNowPlayingMovie = this.listNowPlayingMovie.concat(
            res.results
          );
          this.listNowPlayingMovie = this.listNowPlayingMovie.filter(
            (movie) => {
              console.log(movie.release_date);
              return movie.release_date.search(yearOption.value) === 0;
            }
          );
        });
      }
    }
  }

  showDetail(hotMovie) {
    this.router.navigate(["detail/", hotMovie.id]);
  }
}
