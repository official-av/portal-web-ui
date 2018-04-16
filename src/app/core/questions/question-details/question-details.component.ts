import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../models/question.model';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit {
  @Input() ques: Question;

  constructor() {
  }

  ngOnInit() {
  }

}
