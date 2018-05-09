import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from './user.model';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class ProfileService {
  userProfile: User;

  constructor(private http: HttpClient, private authService: AuthService) {
    if (this.authService.isAuthenticated()) {
      this.userProfile = JSON.parse(localStorage.getItem('user'));
    } else {
      this.userProfile = new User();
    }
    this.authService.logoutSub.subscribe(() => this.userProfile = new User());
  }

  getProfileDetails(uname: string) {
    // TODO: api/profile
    return new Promise((resolve, reject) => {
      this.http.get<any>
      (environment.api_url + 'auth/viewprofile/' + uname,
        {
          headers: new HttpHeaders().set('Authorization', 'JWT ' + this.authService.getAuthToken())
        })
        .subscribe(result => {
          const obj: User = Object.assign(this.userProfile, result);
          localStorage.setItem('user', JSON.stringify(obj));
          resolve(obj);
        }, error => console.log(error));
    });
  }

  verifyMail() {
    // TODO: api/verifyMail
  }

  verifyMobile() {
    // TODO: api/verifyMobile
  }
}
