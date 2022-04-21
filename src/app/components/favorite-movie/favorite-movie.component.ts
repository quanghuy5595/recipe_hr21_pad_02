import { ToastrService } from "ngx-toastr";
import { DataService } from "./../../services/data.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmComponent } from "../confirm/confirm.component";
import { SimpleModalService } from "ngx-simple-modal";

@Component({
  selector: "app-favorite-movie",
  templateUrl: "./favorite-movie.component.html",
  styleUrls: ["./favorite-movie.component.scss"],
})
export class FavoriteMovieComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private router: Router,
    private toastr: ToastrService,
    private simpleModalService: SimpleModalService
  ) {}

  listFavoriteMovie: any = [];

  ngOnInit() {
    this.listFavoriteMovie = this.dataService.listFavoriteMovieService;
    console.log(this.listFavoriteMovie);
  }

  showDetail(favoriteMovie) {
    this.router.navigate(["detail/", favoriteMovie.id]);
  }

  removeMovie(favoriteMovie) {
    this.dataService.removeFavoriteService(favoriteMovie);
    this.listFavoriteMovie = this.dataService.listFavoriteMovieService;
  }

  showWarningMessages() {
    this.toastr.warning("Đã xóa khỏi danh sách yêu thích", "Warning");
  }

  showRemoveConfirm(favoriteMovie) {
    this.simpleModalService
      .addModal(ConfirmComponent, {
        title: "Đăng xuất",
        message:
          "Một vài tính năng sẽ bị vô hiệu hóa khi bạn đăng xuất, bạn có chắc chắn cần đăng xuất bây giờ không?",
      })
      .subscribe((isConfirmed) => {
        //We get modal result
        if (isConfirmed) {
          this.removeMovie(favoriteMovie);
          this.showWarningMessages();
        } else {
          return;
        }
      });
  }

  testData() {
    console.log(this.listFavoriteMovie);
  }
}
