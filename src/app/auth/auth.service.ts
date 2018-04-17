import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {RegisterUser} from './registerUser.interface';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AuthService {
  private auth_token: string = null;
  logoutSub = new Subject();

  constructor(private http: HttpClient, private router: Router) {
  }

  register(user: RegisterUser) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api_url + 'auth/register/', user)
        .subscribe(result => resolve('success'),
          error => reject(error));
    });
    // TODO: Add error notifications
  }

  login(uname: string, pwd: string) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api_url + 'auth/login/', {
        'username': uname,
        'password': pwd
      }).subscribe((result: any) => {
        this.auth_token = result.token;
        console.log(result.token);
        resolve('success');
      }, error => reject(error));
    });
    // TODO: redirect to dashboard after login/profile (if inactive)
    // TODO: Add error notifications
  }

  logout() {
    this.auth_token = null;
    this.logoutSub.next();
    this.router.navigate(['']);
  }

  isAuthenticated() {
    return this.auth_token !== null;
  }

  checkUsername(uname: string) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api_url + 'auth/username/', {
        'username': uname
      }, {headers: new HttpHeaders().set('Authorization', 'JWT ' + this.auth_token.toString())}).subscribe((result: any) => {
        console.log(result);
        resolve(result);
      }, error => reject(error));
    });
  }

  checkPassword(uname: string, pwd: string) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api_url + 'auth/check/', {
        'username': uname,
        'password': pwd
      }, {headers: new HttpHeaders().set('Authorization', 'JWT ' + this.auth_token.toString())}).subscribe((result: any) => {
        console.log(result);
        resolve(result);
      }, error => reject(error));
    });
  }

  // TODO: api/changePwd
  changePassword(uname: string, pwd: string, cnf_pwd: string) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api_url + 'auth/update/', {
        'username': uname,
        'password': pwd,
        'confirm_password': cnf_pwd
      }, {headers: new HttpHeaders().set('Authorization', 'JWT ' + this.auth_token.toString())}).subscribe((result: any) => {
        console.log(result);
        resolve(result);
      }, error => reject(error));
    });
  }

  getAuthToken() {
    return this.auth_token;
  }

}
