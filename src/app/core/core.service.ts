import {Question} from './models/question.model';
import {CollaboratedAnswer} from './models/collaborated-answer.model';
import {Mode} from './enums/mode.enum';
import {SharedService} from '../shared/shared.service';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class CoreService {
  public currentQues: Question = null;
  private fetchedQuestions: Question[];

  private directQues: Question[] = [
    {
      ques_id: '1',
      content: 'sample question',
      asked_on: new Date(),
      asked_to: '123',
      deadline: new Date(),
      is_collaborative: true,
      answered_on: new Date(),
      collaborations: [
        {invited_dept: '124', asked_on: new Date(), rec_answer: 'my answer'},
        {invited_dept: '124', asked_on: new Date(), rec_answer: 'qwerty'},
        {invited_dept: '124', asked_on: new Date(), rec_answer: 'yodo'},
        {invited_dept: '124', asked_on: new Date(), rec_answer: 'huli'}
      ],
      answer: 'sample answer'
    },
    {
      ques_id: '2',
      content: 'sample content',
      asked_on: new Date(),
      asked_to: '124',
      deadline: new Date(),
      is_collaborative: true,
      answered_on: new Date(),
      collaborations: [
        {invited_dept: '123', asked_on: new Date(), rec_answer: 'my answer'},
        {invited_dept: '123', asked_on: new Date(), rec_answer: 'qwerty'},
        {invited_dept: '123', asked_on: new Date(), rec_answer: 'yodo'},
        {invited_dept: '123', asked_on: new Date(), rec_answer: 'huli'}
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
        {invited_dept: '456', asked_on: new Date(), rec_answer: 'my answer'},
        {invited_dept: '457', asked_on: new Date(), rec_answer: 'qwerty'},
        {invited_dept: '458', asked_on: new Date(), rec_answer: 'yodo'},
        {invited_dept: '459', asked_on: new Date(), rec_answer: 'huli'}
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
        {invited_dept: '456', asked_on: new Date(), rec_answer: 'my answer'},
        {invited_dept: '457', asked_on: new Date(), rec_answer: 'qwerty'},
        {invited_dept: '458', asked_on: new Date(), rec_answer: 'yodo'},
        {invited_dept: '459', asked_on: new Date(), rec_answer: 'huli'}
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
        {invited_dept: '457', asked_on: new Date()}
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
        {invited_dept: '456', asked_on: new Date()}
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
        {invited_dept: '457', asked_on: new Date(), rec_answer: 'my answer'}
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
        {invited_dept: '456', asked_on: new Date(), rec_answer: 'my answer'}
      ]
    }
  ];

  constructor(private sharedService: SharedService,
              private http: HttpClient,
              private authService: AuthService) {
    // this.depts = this.sharedService.getDeptList();
  }

  getQuestions(mode: Mode) {
    switch (mode) {
      // return questions from table wherever asked_to is logged in user's dept_id
      case Mode.DIRECT:
        return this.directQues;
      // return question content + ques_id data from invite table which don't have answers
      case Mode.INVITED:
        return this.invitedQues;
      // return questions from table wherever asked_to is logged in user's dept_id and is_answered true
      case Mode.ARC_DIRECT:
        return this.arcDirectQues;
      // return question content + ques_id data from invite table which have answers
      case Mode.ARC_INVITED:
        return this.arcInvitedQues;
      default:
        return null;
    }
  }

  fetchDirect() {
    // TODO: api/getDirect
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
    // TODO: api/sendInvite
    console.log(invites);
  }

  sendCollaboration(id: string, collab: CollaboratedAnswer) {
    // TODO: api/invitedReply
  }

  // TODO: get separate archived content or filter at frontend
}
