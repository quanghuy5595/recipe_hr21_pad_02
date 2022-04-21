import { ToastrService } from "ngx-toastr";
import { AuthService } from "./services/auth.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let loggedIn = this.authService.isLoggedIn();

    if (loggedIn) {
      return true;
    }

    this.toastr.error("Đăng nhập trước khi truy cập", "Warning");
    this.router.navigate(["/login"]);
    return false;
  }
}
