import {Question} from './models/question.model';
import {CollaboratedAnswer} from './models/collaborated-answer.model';
import {SharedService} from '../shared/shared.service';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {ProfileService} from '../profile/profile.service';

@Injectable()
export class CoreService {
  public currentQues: Question;

  constructor(private sharedService: SharedService,
              private http: HttpClient,
              private authService: AuthService,
              private profileService: ProfileService) {
    // this.depts = this.sharedService.getDeptList();
  }

  getQuestions(mode: string) {
    switch (mode) {
      // return questions from table wherever asked_to is logged in user's dept_id
      case 'direct':
        return this.fetchDirect();
      // return question content + ques_id data from invite table which don't have answers
      case 'invited':
        return this.fetchInvited();
      // return questions from table wherever asked_to is logged in user's dept_id and is_answered true
      case 'arc_direct':
        return this.fetchDirect();
      // return question content + ques_id data from invite table which have answers
      case 'arc_invited':
        return this.fetchInvited();
      default:
        return null;
    }
  }

  /*fetching from backend*/
  fetchDirect(): Promise<Question[]> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.api_url +
        'auth/directans/' + this.profileService.userProfile.dept,
        {
          headers: new HttpHeaders()
            .set('Authorization', 'JWT ' + this.authService.getAuthToken()
              .toString())
        })
        .subscribe((result: any) => {
          console.log(result);
          resolve(result);
        }, error => reject(error));
    });
  }

  fetchInvited() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.api_url +
        'auth/inviteans/' + this.profileService.userProfile.dept,
        {
          headers: new HttpHeaders()
            .set('Authorization', 'JWT ' + this.authService.getAuthToken()
              .toString())
        })
        .subscribe((result: any[]) => {
          console.log(result);
          const ques: Question[] = [];
          result.forEach((value: any) => {
            const obj = new Question();
            obj.content = value.content;
            obj.answered_on = value.answered_on;
            obj.asked_on = value.asked_on;
            obj.asked_to = value.asked_to;
            obj.deadline = value.deadline;
            obj.answer = value.answer;
            obj.ques_id = value.ques_id;
            obj.collaborations = [];
            const collab = new CollaboratedAnswer();
            collab.rec_answer = value.rec_answer;
            collab.asked_on = value.recasked_on;
            collab.ques_id = value.ques_id;
            collab.invited_dept = this.profileService.userProfile.dept;
            obj.collaborations.push(collab);
            ques.push(obj);
          });
          console.log(ques);
          resolve(ques);
        }, error => reject(error));
    });
  }

  /*fetching end*/

  /*saving data to backend*/
  sendQuestion(ques: Question) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api_url + 'auth/create/',
        ques,
        {
          headers: new HttpHeaders()
            .set('Authorization', 'JWT ' + this.authService.getAuthToken()
              .toString())
        }).subscribe((result: any) => {
        console.log(result);
        resolve('success');
      }, error => reject(error));
    });
  }

  sendDirectReply(ques: Question) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api_url + 'auth/dreply/',
        ques,
        {
          headers: new HttpHeaders()
            .set('Authorization', 'JWT ' + this.authService.getAuthToken()
              .toString())
        }).subscribe((result: any) => {
        console.log(result);
        resolve('success');
      }, error => reject(error));
    });
  }

  sendInvite(invites: CollaboratedAnswer[]) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api_url + 'auth/invite/',
        {'student': [...invites]},
        {
          headers: new HttpHeaders()
            .set('Authorization', 'JWT ' + this.authService.getAuthToken()
              .toString())
        }).subscribe((result: any) => {
        console.log(result);
        resolve('success');
      }, error => reject(error));
    });
  }

  sendCollaboration(collab: CollaboratedAnswer) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api_url + 'auth/ireply/',
        collab,
        {
          headers: new HttpHeaders()
            .set('Authorization', 'JWT ' + this.authService.getAuthToken()
              .toString())
        }).subscribe((result: any) => {
        console.log(result);
        resolve('success');
      }, error => reject(error));
    });
  }

  /*saving end*/
}
