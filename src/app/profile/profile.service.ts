import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from './user.model';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class ProfileService {
  userProfile: User;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userProfile = new User();
  }

  getProfileDetails() {
    // TODO: api/profile
    return new Promise((resolve, reject) => {
      this.http.get<any>
      (environment.api_url + 'auth/viewprofile/' + this.authService.getUserDetails().username,
        {
          headers: new HttpHeaders().set('Authorization', 'JWT ' + this.authService.getAuthToken())
        })
        .subscribe(result => resolve(result), error => console.log(error));
    });
  }

  verifyMail() {
    // TODO: api/verifyMail
  }

  verifyMobile() {
    // TODO: api/verifyMobile
  }
}
