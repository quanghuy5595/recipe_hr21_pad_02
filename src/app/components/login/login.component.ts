import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  spinnerType: string;
  spinnerName: string;

  user = {
    email: "quanghuy95@mail.com",
    password: "abc12345",
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.spinnerName = "sp1";
    // this.spinnerType = "ball-clip-rotate-multiple";
    // this.spinnerType = "ball-fussion";
    // this.spinnerType = "ball-spin-clockwise";
    this.spinnerType = "square-jelly-box";
    // this.spinnerType = "timer";
  }

  ngOnInit() {}

  login() {
    this.spinner.show(this.spinnerName, {
      color: "tomato",
    });

    setTimeout(() => {
      this.spinner.hide(this.spinnerName);
    }, 1000);
    this.authService.login(this.user).then((isLogin) => {
      if (isLogin === true) {
        this.toastr.success("Đăng nhập thành công", "Success");

        this.router.navigate(["/"]);
      } else {
        this.toastr.error("Sai email hoặc mật khẩu ", "Warning");
      }
    });
  }
}
