import { Router, ActivatedRoute } from "@angular/router";
import { DataService } from "./../../services/data.service";
import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-odd-movie",
  templateUrl: "./odd-movie.component.html",
  styleUrls: ["./odd-movie.component.scss"],
})
export class OddMovieComponent implements OnInit {
  listHotMovie: any = [];
  genreHotMovie: any;
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
      this.dataService.getHotMovieData(i).subscribe((res: any) => {
        this.listHotMovie = this.listHotMovie.concat(res.results);
      });
    }

    this.dataService.getGenreMovie().subscribe((res) => {
      this.genreHotMovie = { ...res };
      this.genreHotMovie = this.genreHotMovie.genres;
    });
  }

  filterByGenre(genreOtion) {
    if (genreOtion.value === "- All -") {
      console.log("hahaah");
      this.listHotMovie = [];
      for (let i = 1; i < 50; i++) {
        this.dataService.getHotMovieData(i).subscribe((res: any) => {
          this.listHotMovie = this.listHotMovie.concat(res.results);
          console.log(this.listHotMovie);
        });
      }
    } else {
      this.listHotMovie = [];
      this.genreHotMovie.forEach((item) => {
        if (item.name === genreOtion.value) {
          for (let i = 1; i < 50; i++) {
            this.dataService.getHotMovieData(i).subscribe((res: any) => {
              this.listHotMovie = this.listHotMovie
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
      this.listHotMovie = [];
      for (let i = 1; i < 50; i++) {
        this.dataService.getHotMovieData(i).subscribe((res: any) => {
          this.listHotMovie = this.listHotMovie.concat(res.results);
          console.log(this.listHotMovie);
        });
      }
    } else {
      this.listHotMovie = [];
      for (let i = 1; i < 50; i++) {
        this.dataService.getHotMovieData(i).subscribe((res: any) => {
          this.listHotMovie = this.listHotMovie.concat(res.results);
          this.listHotMovie = this.listHotMovie.filter((movie) => {
            console.log(movie.release_date);
            return movie.release_date.search(yearOption.value) === 0;
          });
        });
      }
    }
  }

  showDetail(hotMovie) {
    this.router.navigate(["detail/", hotMovie.id]);
    this.dataService.getDetailMovieData2(hotMovie.id);
  }

  testData() {
    console.log(this.p);
  }

  showSpinner() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
}
