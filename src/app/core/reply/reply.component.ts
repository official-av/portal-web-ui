import {Component, OnInit} from '@angular/core';
import {Question} from '../models/question.model';
import {ActivatedRoute} from '@angular/router';
import {CoreService} from '../core.service';
import {NgForm} from '@angular/forms';
import {Mode} from '../enums/mode.enum';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
  mode: Mode;
  question: Question;
  reply = '';
  public Mode = Mode;

  constructor(private route: ActivatedRoute, private coreService: CoreService) {
    this.mode = this.route.snapshot.params['mode'];
    this.question = this.coreService.currentQues;
    console.log(this.question);
  }

  ngOnInit() {
  }

  sendReply(form: NgForm) {
    if (this.mode === Mode.DIRECT) {
      console.log(this.question);
      this.question.answer = this.reply;
      this.coreService.sendQuestion(this.question);
    } else {
      this.question.collaborations[0].rec_answer = this.reply;
      this.coreService.sendCollaboration(this.question.ques_id, this.question.collaborations[0]);
    }
  }

}
