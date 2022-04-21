import { DataService } from "./../../services/data.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-hot-movie",
  templateUrl: "./hot-movie.component.html",
  styleUrls: ["./hot-movie.component.scss"],
})
export class HotMovieComponent implements OnInit {
  listHotMovie: any = [];
  constructor(private dataService: DataService) {}

  ngOnInit() {}
}
