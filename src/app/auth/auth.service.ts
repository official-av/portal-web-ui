import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthService {
  auth_token: string = null;

  constructor(private http: HttpClient) {
  }

  login(uname: string, pwd: string) {
    this.http.post(environment.api_url + 'auth/login/', {
      'username': uname,
      'password': pwd
    }).subscribe(result => console.log(result));
  }

  isAuthenticated() {
    return this.auth_token === null;
  }
}
