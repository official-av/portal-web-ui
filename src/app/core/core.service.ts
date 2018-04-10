import {Question} from './models/question.model';
import {CollaboratedAnswer} from './models/collaborated-answer.model';
import {Dept} from './models/dept.model';

export class CoreService {
  private fetchedQuestions: Question[];
  private depts = [
    {name: 'Defence', id: '123'},
    {name: 'DST', id: '124'}
  ];
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
        {asked_to: '124', asked_on: new Date(), rec_answer: 'my answer'},
        {asked_to: '124', asked_on: new Date(), rec_answer: 'qwerty'},
        {asked_to: '124', asked_on: new Date(), rec_answer: 'yodo'},
        {asked_to: '124', asked_on: new Date(), rec_answer: 'huli'}
      ],
      answered: true,
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
        {asked_to: '123', asked_on: new Date(), rec_answer: 'my answer'},
        {asked_to: '123', asked_on: new Date(), rec_answer: 'qwerty'},
        {asked_to: '123', asked_on: new Date(), rec_answer: 'yodo'},
        {asked_to: '123', asked_on: new Date(), rec_answer: 'huli'}
      ],
      answered: true,
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
        {asked_to: '456', asked_on: new Date(), rec_answer: 'my answer'},
        {asked_to: '457', asked_on: new Date(), rec_answer: 'qwerty'},
        {asked_to: '458', asked_on: new Date(), rec_answer: 'yodo'},
        {asked_to: '459', asked_on: new Date(), rec_answer: 'huli'}
      ],
      answered: true,
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
        {asked_to: '456', asked_on: new Date(), rec_answer: 'my answer'},
        {asked_to: '457', asked_on: new Date(), rec_answer: 'qwerty'},
        {asked_to: '458', asked_on: new Date(), rec_answer: 'yodo'},
        {asked_to: '459', asked_on: new Date(), rec_answer: 'huli'}
      ],
      answered: true,
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
        {asked_to: '457', asked_on: new Date()}
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
        {asked_to: '456', asked_on: new Date()}
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
        {asked_to: '457', asked_on: new Date(), rec_answer: 'my answer'}
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
        {asked_to: '456', asked_on: new Date(), rec_answer: 'my answer'}
      ]
    }
  ];

  constructor() {
  }

  // returns dept id and names
  getDeptDetails() {
    return [...this.depts] as Dept[];
  }

  getDeptName(id: string) {
    return this.depts.find(dept => dept.id === id).name;
  }

  // return questions from table wherever asked_to is logged in user's dept_id
  getDirectQuestions() {
    return this.directQues;
  }

  // return question content + ques_id data from invite table which don't have answers
  getInvitedQuestions() {
    return this.invitedQues;
  }

  // return questions from table wherever asked_to is logged in user's dept_id and is_answered true
  getDirectArchivedQuetions() {
    return this.arcDirectQues;
  }

  // return question content + ques_id data from invite table which have answers
  getInivtedArchivedQuestions() {
    return this.arcInvitedQues;
  }

  sendQuestion(ques: Question) {
  }

  sendCollaboration(id: string, collab: CollaboratedAnswer) {

  }
}
