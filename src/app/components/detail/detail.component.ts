import { ToastrService } from "ngx-toastr";
import { DataService } from "./../../services/data.service";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  DomSanitizer,
  SafeUrl,
  SafeResourceUrl,
} from "@angular/platform-browser";
import { NgxSpinnerService } from "ngx-spinner";
import { ConfirmComponent } from "../confirm/confirm.component";
import { SimpleModalService } from "ngx-simple-modal";
import { url } from "inspector";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"],
})
export class DetailComponent implements OnInit {
  urlTrailerTest: any = [];

  urlTrailer: any;
  genuineTrailerURL: SafeResourceUrl;

  detailMovie: any;
  actorMovive: any = [];
  commentMovie: any = [];
  addButton: any;
  trailerMovie: any = [];

  spinnerType: string;
  spinnerName: string;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    public domSanitizer: DomSanitizer,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private simpleModalService: SimpleModalService
  ) {
    this.urlTrailer = "https://www.youtube.com/embed/";
    this.spinnerName = "sp1";
    // this.spinnerType = "ball-clip-rotate-multiple";
    // this.spinnerType = "ball-fussion";
    // this.spinnerType = "ball-spin-clockwise";
    this.spinnerType = "square-jelly-box";
    // this.spinnerType = "timer";
  }

  ngOnInit() {
    this.spinner.show(this.spinnerName, {
      color: "tomato",
      // bdColor: "",
    });

    setTimeout(() => {
      this.spinner.hide(this.spinnerName);
    }, 1000);

    this.activatedRoute.params.subscribe((p) => {
      this.dataService
        .getDetailMovieData(p.id)
        .subscribe((movieDetail: any) => {
          this.detailMovie = { ...movieDetail, favorite: false };
        });
    });

    this.activatedRoute.params.subscribe((p) => {
      this.dataService.getActorMovieData(p.id).subscribe((actor: any) => {
        this.actorMovive = actor.cast.filter((cast, i) => {
          return i < 23;
        });
      });
    });

    this.activatedRoute.params.subscribe((p) => {
      this.dataService.getCommentMoiveData(p.id).subscribe((comment: any) => {
        this.commentMovie = comment.results;
        this.commentMovie.forEach((co) => {
          co.liked = false;
        });
        console.log(this.commentMovie);
        this.commentMovie.forEach((c) => {
          if (c.author_details.avatar_path.indexOf("http") === 0) {
            return;
          } else if (c.author_details.avatar_path.indexOf("http") !== 0) {
            c.author_details.avatar_path = "/6ZpVUJzqXMzH35VprEtnX0sNI3.jpg";
          } else if (c.author_details.avatar_path.indexOf("http") === null) {
            c.author_details.avatar_path = "/6ZpVUJzqXMzH35VprEtnX0sNI3.jpg";
          }
        });
      });
    });

    this.activatedRoute.params.subscribe((p) => {
      this.dataService.getTrailerMovieData(p.id).subscribe((trailer: any) => {
        this.trailerMovie = trailer.results.filter((movie, i) => {
          if (i < 2) {
            this.urlTrailerTest.push(
              `https://www.youtube.com/embed/${movie.key}`
            );
            // this.urlTrailerTest.forEach((item) => {
            //   this.genuineTrailerURL =
            //     this.domSanitizer.bypassSecurityTrustResourceUrl(item);
            //   console.log(this.genuineTrailerURL);
            // });
          }

          return i < 2;
        });
      });
    });
  }

  addFavorieMovie() {
    this.dataService.addFavoriteMovieService(this.detailMovie);
    this.detailMovie.favorite = true;
  }

  showSuccessMessages() {
    this.toastr.success(
      `Đã thêm ${this.detailMovie.original_title} vào danh sách yêu thích`,
      "Success !"
    );
  }

  showWarningMessages() {
    this.toastr.warning(
      `Đã xóa ${this.detailMovie.original_title} khỏi danh sách yêu thích`,
      "Warning"
    );
  }

  removeFavoriteMovie() {
    this.dataService.removeFavoriteService(this.detailMovie);
    this.detailMovie.favorite = false;
  }

  showConfirmRemoveFavoriteMovie() {
    this.simpleModalService
      .addModal(ConfirmComponent, {
        title: "Xóa",
        message: `bạn muốn xóa ${this.detailMovie.original_title} khỏi danh sách phim yêu thích ?`,
      })
      .subscribe((isConfirmed) => {
        //We get modal result
        if (isConfirmed) {
          this.removeFavoriteMovie();
          this.showWarningMessages();
        } else {
          return;
        }
      });

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  showTrailer = false;
  onTrailer(trailer) {
    this.urlTrailer = `https://www.youtube.com/embed/${trailer.key}`;
    this.genuineTrailerURL = this.domSanitizer.bypassSecurityTrustResourceUrl(
      this.urlTrailer
    );
    this.showTrailer = true;
  }

  offTrailer() {
    this.showTrailer = false;
  }

  myComment: any = {
    author: "garethmb",
    author_details: {
      avatar_path: "/qUj91VJ1OUXULPhstqHVjsLx9bN.jpg",
      name: "Huy",
      rating: null,
      username: "HuyTq58",
    },
    content: "",
    created_at: new Date(),
    id: "61ba0b24d1444300413e2cbe",
    updated_at: new Date(),
    url: "huy",
  };
  createComment(comment) {
    if (comment.value !== "") {
      this.commentMovie.unshift({
        ...this.myComment,
        liked: false,
      });
    }
    this.myComment.content = "";
  }

  createCommentByEnter(e) {
    if (e === 13 && this.myComment.content !== "") {
      this.commentMovie.unshift({ ...this.myComment, liked: false });
      this.myComment.content = "";
    }
  }

  likeComment(comment) {
    comment.liked = true;
    comment.author_details.rating++;
  }

  unlikeComment(comment) {
    comment.author_details.rating--;
    comment.liked = false;
  }

  removeComment(i) {
    this.commentMovie.splice(i, 1);
  }

  showEdit = false;
  str;
  editComment(comment) {
    this.showEdit = true;
    this.myComment.content = comment.content;
    this.str = comment.content;
  }

  saveEdit() {
    this.commentMovie.forEach((c) => {
      if (c.content === this.str) {
        c.content = this.myComment.content;
      }
    });
    this.myComment.content = "";
    this.showEdit = false;
  }

  cancelEdit() {
    this.showEdit = false;
  }

  spinnerShow() {
    this.spinner.show();
  }
}
