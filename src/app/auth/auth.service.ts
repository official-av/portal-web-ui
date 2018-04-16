import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {RegisterUser} from './registerUser.interface';
import {Router} from '@angular/router';
import {User} from '../profile/user.model';

@Injectable()
export class AuthService {
  private auth_token: string = null;
  private user: User = {
    username: 'random123',
    dept_id: '1234',
    firstname: 'John',
    lastname: 'Doe',
    email: 'johndoe@test.com',
    contact: 7778889990,
    status: false,
    contact_verified: true,
    email_verified: true
  };

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
        this.user.username = uname;
        console.log(result.token);
        resolve('success');
      }, error => reject(error));
    });
    // TODO: redirect to dashboard after login/profile (if inactive)
    // TODO: Add error notifications
  }

  logout() {
    this.auth_token = null;
    this.user = new User();
    this.router.navigate(['']);
  }

  isAuthenticated() {
    return this.auth_token !== null;
  }

  getUserDetails() {
    return {...this.user};
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

  checkPassword(pwd: string) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api_url + 'auth/check/', {
        'username': this.user.username,
        'password': pwd
      }).subscribe((result: any) => {
        console.log(result);
        resolve(result);
      }, error => reject(error));
    });
  }

  // TODO: api/changePwd
  changePassword(pwd: string, cnf_pwd: string) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api_url + 'auth/changePass/', {
        'password': pwd,
        'cnf_password': cnf_pwd
      }).subscribe((result: any) => {
        console.log(result);
        resolve(result);
      }, error => reject(error));
    });
  }

  getAuthToken() {
    return this.auth_token;
  }

}
