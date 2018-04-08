import {Component, OnInit} from '@angular/core';
import {Dept} from '../models/dept.model';
import {CoreService} from '../core.service';
import {Question} from '../models/question.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  depts: Dept[];
  question: Question;

  constructor(private coreService: CoreService) {
    this.depts = this.coreService.getDeptDetails();
    this.question = new Question();
  }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    console.log(this.question);
    this.coreService.sendQuestion(this.question);
  }

}
