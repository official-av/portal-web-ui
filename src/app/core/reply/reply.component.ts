import {Component, OnInit} from '@angular/core';
import {Question} from '../models/question.model';
import {ActivatedRoute} from '@angular/router';
import {CoreService} from '../core.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
  mode: 'direct' | 'invited';
  question: Question;

  constructor(private route: ActivatedRoute, private coreService: CoreService) {
    this.mode = this.route.snapshot.params['mode'];
    const id = this.route.snapshot.params['ques_id'];
    if (this.mode === 'direct') {
      this.question = this.coreService.getDirectQuestions().find(ques => ques.ques_id === id);
    } else {
      this.question = this.coreService.getInvitedQuestions().find(ques => ques.ques_id === id);
    }
    console.log(this.question);
  }

  ngOnInit() {
  }

  sendReply(form: NgForm) {
    if (this.mode === 'direct') {
      console.log(this.question);
      this.coreService.sendQuestion(this.question);
    } else {
      this.coreService.sendCollaboration(this.question.ques_id, this.question.collaborations[0]);
    }
  }

}
