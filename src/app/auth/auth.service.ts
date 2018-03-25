import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
    // TODO: redirect after register
  }

  login(uname: string, pwd: string) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api_url + 'auth/login/', {
        'username': uname,
        'password': pwd
      }).subscribe((result: any) => {
        this.auth_token = result.token;
        resolve('success');
      }, error => reject(error));
    });
  }

  isAuthenticated() {
    return this.auth_token !== null;
  }

  logout() {
    this.auth_token = null;
    this.router.navigate(['']);
  }

  openForgot() {

  }

  getUserDetails() {
    return {...this.user};
  }
}
