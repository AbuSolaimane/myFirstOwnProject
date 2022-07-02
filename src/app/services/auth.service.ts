import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {User} from "../models/user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  kind: string;
  idToken:	string;
  email:	string;
  refreshToken:	string;
  expiresIn:	string;
  localId:	string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  API_KEY: string = "AIzaSyCTNx5w2qrk710iLpDfuEge7zet-DyRhso";
  url: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.API_KEY;
  url2: string = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.API_KEY;
  autoLogoutTimer: any;

  constructor(private httpClient: HttpClient, private router: Router) { }

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.httpClient.post<AuthResponseData>(this.url, {email, password, returnSecureToken: true}).pipe(
      catchError(errorRes => {
        let errorMessage = "An unknown error occurred";
        if(!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
          case "EMAIL_EXISTS":
            errorMessage = "this email already exists";
        }
        return throwError(errorMessage);
      }), tap(dataRes => {
        this.handleAuth(dataRes);
      })
    );
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.httpClient.post<AuthResponseData>(this.url2, {email, password, returnSecureToken: true})
      .pipe(tap(dataRes => {
          this.handleAuth(dataRes);
        }), catchError(errorRes => {
        console.log(errorRes);
        let errorMessage = "Unknown error";
        if(!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
          case "EMAIL_NOT_FOUND":
            errorMessage = "this email doesn't exist";
            break;
          case "INVALID_PASSWORD":
            errorMessage = "the password is incorrect";
            break;
          case "USER_DISABLED":
            errorMessage = "The user account has been disabled by an administrator.";
            break;
        }
        return throwError(errorMessage);
      })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(["/auth"]);
    localStorage.removeItem("user");
    if(this.autoLogoutTimer) {
      clearTimeout(this.autoLogoutTimer);
    }
    this.autoLogoutTimer = null;
  }

  autoLogin() {

    const userString = localStorage.getItem("user");

    if(!userString) {
      return;
    }

    const user: {email: string, id: string, _token:string, _tokenExpireDate: string} = JSON.parse(userString);
    const loadedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpireDate));

    console.log(loadedUser);

    if(loadedUser.token) {

      const expirationDuration = new Date(user._tokenExpireDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
      this.user.next(loadedUser)
    }

  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.autoLogoutTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  handleAuth(dataRes: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + Number(dataRes.expiresIn)*1000);
    const user = new User(dataRes.email,
      dataRes.localId,
      dataRes.idToken,
      expirationDate);
    this.user.next(user);
    this.autoLogout(Number(dataRes.expiresIn)*1000);
    localStorage.setItem("user", JSON.stringify(user));
  }
}
