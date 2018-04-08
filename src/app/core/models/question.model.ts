export class Question {
  ques_id: string;
  content: string;
  timestamp?: string;
  deadline: Date;
  asked_to: string; // dept_id
  is_collaborative: boolean;
  answered: boolean;
  answer: string;
  answered_on?: Date;
}
