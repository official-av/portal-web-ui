import {Component, OnInit} from '@angular/core';
import {Dept} from '../models/dept.model';
import {CoreService} from '../core.service';
import {Question} from '../models/question.model';
import {NgForm} from '@angular/forms';
import {SharedService} from '../../shared/shared.service';
import {ToastsManager} from 'ng2-toastr';
import {ErrorHandlerService} from '../../shared/error-handler.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  depts: Dept[];
  dept: string;
  filteredDepts: Dept[];
  question: Question;

  constructor(private coreService: CoreService, private sharedService: SharedService,
              private toastr: ToastsManager, private errorHandlerService: ErrorHandlerService) {
    this.question = new Question();
  }

  ngOnInit() {
    this.sharedService.getDeptList().subscribe((value: Dept[]) => {
      this.depts = value;
    });
  }

  filter(val: any) {
    this.filteredDepts = this.depts.filter(dept => dept.name.toLowerCase().includes(val.toLowerCase()));
  }

  onSubmit(f: NgForm) {
    this.question.asked_to = this.sharedService.getDeptId(this.dept);
    console.log(this.question);
    this.coreService.sendQuestion(this.question).then(() => {
      f.reset();
      this.toastr.success('Question Created Successfully', 'Success');
    }).catch(error => this.errorHandlerService.showError(error, 'Dismiss'));
  }

}
