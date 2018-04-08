import {Component, OnInit} from '@angular/core';
import {Question} from '../models/question.model';
import {CollaboratedAnswer} from '../models/collaborated-answer.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  mode: 'direct' | 'invited' | 'archived';
  questions: Question[];
  collaborations: CollaboratedAnswer[];

  constructor() {
  }

  ngOnInit() {
  }

}
