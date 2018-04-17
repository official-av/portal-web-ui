import {Component, OnInit} from '@angular/core';
import {Question} from '../../models/question.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Mode} from '../../enums/mode.enum';
import {CoreService} from '../../core.service';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.scss']
})

export class ViewQuestionComponent implements OnInit {
  question: Question;
  mode: Mode;

  constructor(private route: ActivatedRoute, private coreService: CoreService, private router: Router) {
    this.mode = this.route.snapshot.params['mode'];
    console.log(this.mode);
    const id = this.route.snapshot.params['ques_id'];
    console.log(id);
    this.coreService.getQuestions(this.mode)
      .then((res: Question[]) => {
        this.coreService.currentQues = res.find(q => q.ques_id === id);
      }).catch(error => console.log(error));
  }

  ngOnInit() {
    this.question = this.coreService.currentQues;
  }

  sendReply() {
    this.router.navigate(['reply', this.mode]);
  }

  sendInvite() {

  }

}
