import { ToastrService } from "ngx-toastr";
import { AuthService } from "./../../services/auth.service";
import { DataService } from "./../../services/data.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ConfirmComponent } from "../confirm/confirm.component";
import { SimpleModalService } from "ngx-simple-modal";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
})
export class NavBarComponent implements OnInit {
  constructor(
    private router: Router,
    private dataService: DataService,
    public authService: AuthService,
    private toastr: ToastrService,
    private simpleModalService: SimpleModalService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);

    this.toastr.warning("Đã đăng xuất", "Đăng xuất");
  }

  getUserName() {
    let user = this.authService.user;
    let username = user.username;

    return username;
  }

  showConfirm() {
    this.simpleModalService
      .addModal(ConfirmComponent, {
        title: "Đăng xuất",
        message:
          "Một vài tính năng sẽ bị vô hiệu hóa khi bạn đăng xuất, bạn có chắc chắn cần đăng xuất bây giờ không?",
      })
      .subscribe((isConfirmed) => {
        //We get modal result
        if (isConfirmed) {
          this.logout();
        } else {
          return;
        }
      });

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
}
