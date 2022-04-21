import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url = "https://jsonplaceholder.typicode.com/users";

  user = null;

  constructor(private http: HttpClient) {}

  login(user) {
    return new Promise((resolve, reject) => {
      return this.http
        .post(this.url, { name: "john doe" })
        .subscribe((res: any) => {
          if (
            user.email === "quanghuy95@mail.com" &&
            user.password === "abc12345"
          ) {
            this.user = res = {
              email: "quanghuy95@mail.com",
              username: "quang huy",
              bio: null,
              image: "https://api.realworld.io/images/smiley-cyrus.jpeg",
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InF1YW5naHV5OTVAbWFpbC5jb20iLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjIsImlzQWRtaW4iOmZhbHNlfQ._YuakD8Qp-SU49I62dFX7Zm9heBLXvKFdlVX9bt6HXU",
            };

            localStorage.setItem("user", JSON.stringify(res));

            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  isLoggedIn() {
    if (this.user) return this.user;

    let saved = localStorage.getItem("user");

    if (saved) {
      this.user = JSON.parse(saved);
    }

    return this.user;
  }

  logout() {
    localStorage.removeItem("user");
    this.user = null;
  }
}
