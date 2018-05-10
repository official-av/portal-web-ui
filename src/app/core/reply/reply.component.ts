import {Component, OnInit} from '@angular/core';
import {Question} from '../models/question.model';
import {ActivatedRoute} from '@angular/router';
import {CoreService} from '../core.service';
import {NgForm} from '@angular/forms';
import {Mode} from '../enums/mode.enum';
import {ProfileService} from '../../profile/profile.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
  mode: Mode;
  question: Question;
  reply = '';

  constructor(private route: ActivatedRoute,
              private coreService: CoreService,
              private profileService: ProfileService
  ) {
    this.mode = this.route.snapshot.params['mode'];
    this.question = this.coreService.currentQues;
    console.log(this.question);
  }

  ngOnInit() {
  }

  sendReply(form: NgForm) {
    if (this.mode === 'direct') {
      console.log(this.question);
      this.question.answer = this.reply;
      this.question.answered_on = new Date();
      this.coreService.sendDirectReply(this.question).then(() => {
        console.log('success');
      }).catch(error => console.log(error));
    } else {
      this.question.collaborations[0].rec_answer = this.reply;
      this.question.collaborations[0].answered_on = new Date();
      this.question.collaborations[0].invited_dept = this.profileService.userProfile.dept;
      this.coreService.sendCollaboration(this.question.collaborations[0])
        .then(() => console.log('success'))
        .catch(error => console.log(error));
    }
  }

}
