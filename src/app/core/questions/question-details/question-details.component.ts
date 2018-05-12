import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Question} from '../../models/question.model';
import {CoreService} from '../../core.service';
import {CollaboratedAnswer} from '../../models/collaborated-answer.model';
import {ProfileService} from '../../../profile/profile.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit, OnChanges {
  @Input() ques: Question;
  @Input() mode: 'direct' | 'invited' | 'arc_invited' | 'arc_direct';

  constructor(private coreService: CoreService,
              private profileService: ProfileService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.fetchCollab();
  }

  fetchCollab() {
    if (this.ques && this.ques.collaborations) {
      this.ques.collaborations = this.ques.collaborations
        .filter((value: CollaboratedAnswer) =>
          value.invited_dept === this.profileService.userProfile.dept);
    }
  }

}
