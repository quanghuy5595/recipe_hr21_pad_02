import { Router, ActivatedRoute } from "@angular/router";
import { DataService } from "./../../services/data.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  p: any = 1;
  keywords: any = "";
  listMovieSearch: any = [];

  ngOnInit() {
    // let q = this.activatedRoute.snapshot.queryParams;

    this.activatedRoute.queryParams.subscribe((q) => {
      console.log(q.keywords);
      if (q.keywords === undefined || q.keywords === "") {
        this.listMovieSearch = [];
        return;
      } else {
        this.listMovieSearch = [];
        for (let page = 1; page < 50; page++) {
          this.dataService
            .getSearchMovie(q.keywords, page)
            .subscribe((movie: any) => {
              this.listMovieSearch = this.listMovieSearch.concat(movie.results);
              console.log(this.listMovieSearch);
            });
        }
      }
    });
  }

  inputKeywords() {
    this.router.navigate([], {
      queryParams: { keywords: this.keywords },
    });
  }

  showDetail(movie) {
    this.router.navigate(["detail/", movie.id]);
  }
}
