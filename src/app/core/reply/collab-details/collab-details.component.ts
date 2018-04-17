import {Component, Input, OnInit} from '@angular/core';
import {CollaboratedAnswer} from '../../models/collaborated-answer.model';
import {CoreService} from '../../core.service';

@Component({
  selector: 'app-collab-details',
  templateUrl: './collab-details.component.html',
  styleUrls: ['./collab-details.component.scss']
})
export class CollabDetailsComponent implements OnInit {
  @Input() collab: CollaboratedAnswer;
  constructor(public coreService: CoreService) {
  }

  ngOnInit() {
  }

}
