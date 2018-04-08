import {Question} from './models/question.model';
import {CollaboratedAnswer} from './models/collaborated-answer.model';
import {Dept} from './models/dept.model';

export class CoreService {
  private fetchedQuestions: Question[];
  private fetchedCollaborations: CollaboratedAnswer[];
  private depts = [
    {name: 'Defence', id: '123'},
    {name: 'DST', id: '124'}
  ];
  private temp: Question[] = [
    {
      ques_id: '1',
      content: 'sample question',
      asked_on: new Date(),
      asked_to: 'defence',
      deadline: new Date(),
      is_collaborative: false,
      answered_on: new Date()
    }
  ];

  constructor() {
  }

  // returns dept id and names
  getDeptDetails() {
    return [...this.depts] as Dept[];
  }

  // return questions from table wherever asked_to is logged in user's dept_id
  getDirectQuestions() {
    return this.temp;
  }

  // return question content + ques_id data from invite table which don't have answers
  getInvitedQuestions() {
    return this.temp;
  }

  // return questions from table wherever asked_to is logged in user's dept_id and is_answered true
  getDirectArchivedQuetions() {
    return this.temp;
  }

  // return question content + ques_id data from invite table which have answers
  getInivtedArchivedQuestions() {
    return this.temp;
  }

  sendQuestion(ques: Question) {
  }
}
