import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ProfileService} from '../profile/profile.service';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators/map';
import {Dept} from '../core/models/dept.model';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SharedService {
  depts: Dept[];
  otpSub = new Subject<void>();

  constructor(private http: HttpClient, private profileService: ProfileService) {
    this.getDeptList().subscribe((res: Dept[]) => this.depts = res);
  }

  fetchOtp() {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api_url + 'auth/otp/', {
        phonenum: '+91' + this.profileService.userProfile.phonenum.toString()
      }).subscribe(result => {
        console.log(result);
        resolve(result);
      }, error => reject(error));
    });
  }

  getDeptList(): Observable<Dept[]> {
    return this.http.get(environment.api_url + 'auth/deptlist/')
      .pipe(map((result: Dept[]) => {
        return result;
      }));
  }

  getDeptId(name: string) {
    if (this.depts) {
      return this.depts.find(dept => dept.name === name).id;
    } else {
      this.getDeptList().subscribe((result: Dept[]) => {
        return result.find(dept => dept.name === name).id;
      });
    }
  }

  getDeptName(id: string) {
    if (this.depts) {
      return this.depts.find(dept => dept.id === id).name;
    } else {
      this.getDeptList().subscribe((result: Dept[]) => {
        return result.find(dept => dept.id === id).name;
      });
    }
  }

  sendMail(username: string, message: string) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api_url + 'auth/sendmail/', {
        username: username,
        message: message
      }).subscribe(result => {
        console.log(result);
        resolve(result);
      }, error => reject(error));
    });
  }

  sendText(phonenum: number, message: string) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api_url + 'auth/sendmail/', {
        phonenum: '+91' + phonenum.toString(),
        message: message
      }).subscribe(result => {
        console.log(result);
        resolve(result);
      }, error => reject(error));
    });
  }
}
