import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {RegisterUser} from './registerUser.interface';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {ToastsManager} from 'ng2-toastr';

@Injectable()
export class AuthService {
  private auth_token: string;
  logoutSub = new Subject();

  constructor(private http: HttpClient, private router: Router, private toastr: ToastsManager) {
    if (this.isAuthenticated()) {
      this.auth_token = localStorage.getItem('authToken');
      this.verifyToken().then().catch(error => {
        this.logout();
        this.toastr.error('Your session has expired, Login Again!', 'Error');
      });
    } else {
      this.auth_token = null;
    }
  }

  register(user: RegisterUser) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api_url + 'auth/register/', user)
        .subscribe(result => this.toastr.success('Registration Successful', 'Success'),
          error => reject(error));
    });
  }

  login(uname: string, pwd: string) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api_url + 'auth/login/', {
        'username': uname,
        'password': pwd
      }).subscribe((result: any) => {
        localStorage.setItem('authToken', result.token);
        this.auth_token = result.token;
        console.log(result.token);
        resolve('success');
        this.toastr.success('Login Successful', 'Success');
      }, error => reject(error));
    });
    // TODO: redirect to dashboard after login/profile (if inactive)
  }

  logout() {
    this.auth_token = null;
    localStorage.clear();
    this.logoutSub.next();
    this.toastr.success('Logged Out Successfully', 'Success');
    this.router.navigate(['']);
  }

  isAuthenticated() {
    return localStorage.getItem('authToken') !== null;
  }

  verifyToken() {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api_url + 'auth/ver/', {
        'token': this.auth_token
      }).subscribe((result: any) => {
        console.log(result);
        resolve(result);
      }, error => reject(error));
    });
  }

// TODO: get phonenum back from check username
  checkUsername(uname: string) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api_url + 'auth/username/', {
        'username': uname
      }).subscribe((result: any) => {
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

  // TODO: api/changePwd fix token issue
  changePassword(uname: string, pwd: string, cnf_pwd: string) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api_url + 'auth/update/', {
        'username': uname,
        'password': pwd,
        'confirm_password': cnf_pwd
      }, {headers: new HttpHeaders().set('Authorization', 'JWT ' + this.auth_token.toString())}).subscribe((result: any) => {
        console.log(result);
        resolve(result);
        this.toastr.success('Password Changed Successfully', 'Success');
      }, error => reject(error));
    });
  }

  getAuthToken() {
    return localStorage.getItem('authToken');
  }

}
