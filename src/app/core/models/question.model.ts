import {CollaboratedAnswer} from './collaborated-answer.model';

export class Question {
  ques_id: string;
  content: string;
  asked_on?: Date;
  deadline: Date;
  asked_to: string; // dept_id
  is_collaborative: boolean;
  answered?: boolean;
  answer?: string;
  answered_on?: Date;
  collaborations?: CollaboratedAnswer[];
}
