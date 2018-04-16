import {Component, OnInit} from '@angular/core';
import {Dept} from '../models/dept.model';
import {CoreService} from '../core.service';
import {Question} from '../models/question.model';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {SharedService} from '../../shared/shared.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  depts: Observable<Dept[]>;
  question: Question;

  constructor(private coreService: CoreService, private sharedService: SharedService) {
    this.depts = this.sharedService.getDeptList();
    this.question = new Question();
  }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    console.log(this.question);
    this.coreService.sendQuestion(this.question);
  }

}
