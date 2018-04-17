import {Question} from './models/question.model';
import {CollaboratedAnswer} from './models/collaborated-answer.model';
import {Mode} from './enums/mode.enum';
import {SharedService} from '../shared/shared.service';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {ProfileService} from '../profile/profile.service';

@Injectable()
export class CoreService {
  public currentQues: Question = null;
  private fetchedQuestions: Question[];

  private directQues: Question[] = [
    {
      ques_id: '1',
      content: 'sample question',
      asked_on: new Date(),
      asked_to: '1',
      deadline: new Date(),
      is_collaborative: true,
      answered_on: new Date(),
      collaborations: [
        {invited_dept: '2', asked_on: new Date(), rec_answer: 'my answer'},
        {invited_dept: '2', asked_on: new Date(), rec_answer: 'qwerty'},
        {invited_dept: '4', asked_on: new Date(), rec_answer: 'yodo'},
        {invited_dept: '4', asked_on: new Date(), rec_answer: 'huli'}
      ],
      answer: 'sample answer'
    },
    {
      ques_id: '2',
      content: 'sample content',
      asked_on: new Date(),
      asked_to: '4',
      deadline: new Date(),
      is_collaborative: true,
      answered_on: new Date(),
      collaborations: [
        {invited_dept: '3', asked_on: new Date(), rec_answer: 'my answer'},
        {invited_dept: '3', asked_on: new Date(), rec_answer: 'qwerty'},
        {invited_dept: '3', asked_on: new Date(), rec_answer: 'yodo'},
        {invited_dept: '3', asked_on: new Date(), rec_answer: 'huli'}
      ],
      answer: 'sample answer'
    }
  ];
  private arcDirectQues: Question[] = [
    {
      ques_id: '1',
      content: 'sample question',
      asked_on: new Date(),
      asked_to: 'defence',
      deadline: new Date(),
      is_collaborative: true,
      answered_on: new Date(),
      collaborations: [
        {invited_dept: '6', asked_on: new Date(), rec_answer: 'my answer'},
        {invited_dept: '7', asked_on: new Date(), rec_answer: 'qwerty'},
        {invited_dept: '8', asked_on: new Date(), rec_answer: 'yodo'},
        {invited_dept: '9', asked_on: new Date(), rec_answer: 'huli'}
      ],
      answer: 'sample answer'
    },
    {
      ques_id: '2',
      content: 'sample content',
      asked_on: new Date(),
      asked_to: 'dst',
      deadline: new Date(),
      is_collaborative: true,
      answered_on: new Date(),
      collaborations: [
        {invited_dept: '6', asked_on: new Date(), rec_answer: 'my answer'},
        {invited_dept: '7', asked_on: new Date(), rec_answer: 'qwerty'},
        {invited_dept: '8', asked_on: new Date(), rec_answer: 'yodo'},
        {invited_dept: '9', asked_on: new Date(), rec_answer: 'huli'}
      ],
      answer: 'sample answer'
    }
  ];
  private invitedQues: Question[] = [
    {
      ques_id: '1',
      content: 'sample question',
      asked_on: new Date(),
      asked_to: 'defence',
      deadline: new Date(),
      is_collaborative: true,
      answered_on: new Date(),
      collaborations: [
        {invited_dept: '4', asked_on: new Date()}
      ]
    },
    {
      ques_id: '2',
      content: 'sample content',
      asked_on: new Date(),
      asked_to: 'dst',
      deadline: new Date(),
      is_collaborative: true,
      answered_on: new Date(),
      collaborations: [
        {invited_dept: '4', asked_on: new Date()}
      ]
    }
  ];
  private arcInvitedQues: Question[] = [
    {
      ques_id: '1',
      content: 'sample question',
      asked_on: new Date(),
      asked_to: 'defence',
      deadline: new Date(),
      is_collaborative: true,
      answered_on: new Date(),
      collaborations: [
        {invited_dept: '8', asked_on: new Date(), rec_answer: 'my answer'}
      ]
    },
    {
      ques_id: '2',
      content: 'sample content',
      asked_on: new Date(),
      asked_to: 'dst',
      deadline: new Date(),
      is_collaborative: true,
      answered_on: new Date(),
      collaborations: [
        {invited_dept: '6', asked_on: new Date(), rec_answer: 'my answer'}
      ]
    }
  ];

  constructor(private sharedService: SharedService,
              private http: HttpClient,
              private authService: AuthService,
              private profileService: ProfileService) {
    // this.depts = this.sharedService.getDeptList();
  }

  getQuestions(mode: Mode) {
    switch (mode) {
      // return questions from table wherever asked_to is logged in user's dept_id
      case Mode.DIRECT:
        return this.fetchDirect();
      // return question content + ques_id data from invite table which don't have answers
      /*case Mode.INVITED:
        return this.invitedQues;
      // return questions from table wherever asked_to is logged in user's dept_id and is_answered true
      case Mode.ARC_DIRECT:
        return this.arcDirectQues;
      // return question content + ques_id data from invite table which have answers
      case Mode.ARC_INVITED:
        return this.arcInvitedQues;*/
      default:
        return null;
    }
  }

  fetchDirect(): Promise<Question[]> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.api_url + 'auth/directans/' + this.profileService.userProfile.dept,
        {
          headers: new HttpHeaders()
            .set('Authorization', 'JWT ' + this.authService.getAuthToken()
              .toString())
        }).subscribe((result: any) => {
        console.log(result);
        resolve(result);
      }, error => reject(error));
    });
  }

  fetchInvited() {
    // TODO: api/getInvited
  }

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

  sendInvite(invites: CollaboratedAnswer[]) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api_url + 'auth/invite/',
        invites,
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

  sendCollaboration(id: string, collab: CollaboratedAnswer) {
    // TODO: api/invitedReply
  }

  // TODO: get separate archived content or filter at frontend
}
