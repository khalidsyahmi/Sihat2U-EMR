import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject, of, Observable } from 'rxjs';

import { User } from './user.model';
import { Router } from '@angular/router';
import { Role } from '../models/role';
import { environment } from '../../environments/environment.prod';


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  role: Role;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);  // why is the subject not working ?

  public currentUser: Observable<User>; //??


  constructor(private http: HttpClient, private router: Router) {
    this.user = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('tempUserData')));//??
    this.currentUser = this.user.asObservable();//??
  }

  public get currentUserValue(): User { //???
    return this.user.value;
}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(       // careful to pick the signup rest api !
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError), tap ( resData => {
          // const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
          // const user = new User(
          //   resData.email, 
          //   resData.localId, 
          //   resData.idToken,
          //   expirationDate
          // );
          // this.user.next(user);
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.role,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string){
    return this.http
    .post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError), tap ( resData => {

          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.role,
            resData.idToken,
            +resData.expiresIn
          );
        })
        );
  }

  loginPersist() {
    const userData:{
      email:string,
      id: string,
      role: Role,
      _token: string,
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('tempUserData'));
    if (!userData){
      return;
    }

    const loadedUser = new User(
      userData.email, 
      userData.id,
      userData.role,
      userData._token, 
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }
  
  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.clear(); // clear temp login data
  }

//experimental role based auth

  private handleAuthentication(
    email: string,
    userId: string,
    role: Role,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    if(email === 'admin@admin.com' ){      // hardcoded role assignment
      role = Role.Admin
    }else{
      role = Role.User
    }
    console.log(role);

    const user = new User(email, userId, role, token, expirationDate);          //use this contant
  
    this.user.next(user);   // pass the instance of the user         

    localStorage.setItem('tempUserData', JSON.stringify(user)); // store temporary log in data. F12. application tan
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }

}
