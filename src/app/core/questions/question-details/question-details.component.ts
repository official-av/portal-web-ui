import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Question} from '../../models/question.model';
import {CoreService} from '../../core.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit, OnChanges {
  @Input() ques: Question;

  constructor(private coreService: CoreService) {
    /*this.coreService.currentQues.subscribe((val: Question) => {
      console.log('subs triggered');
      this.ques = val;
      console.log(this.ques);
    });*/
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    /*const change = changes['ques'];
    console.log(JSON.stringify(change.previousValue));
    this.ques = change.currentValue;
    console.log(this.ques);*/
  }

}
