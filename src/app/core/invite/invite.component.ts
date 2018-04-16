import {Component, Inject, OnInit} from '@angular/core';
import {Dept} from '../models/dept.model';
import {CoreService} from '../core.service';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatAutocompleteSelectedEvent, MatChipEvent, MatDialogRef} from '@angular/material';
import {CollaboratedAnswer} from '../models/collaborated-answer.model';
import {SharedService} from '../../shared/shared.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {
  depts: Observable<Dept[]>;
  quesId: string;
  selectedDepts: Dept[];
  // filteredDepts: Observable<any[]>;
  inviteForm: FormGroup;
  invites: CollaboratedAnswer[];

  constructor(private coreService: CoreService,
              public dialogRef: MatDialogRef<InviteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private sharedService: SharedService) {
    this.quesId = this.data.ques_id;
    this.selectedDepts = [];
    this.depts = this.sharedService.getDeptList();
  }

  ngOnInit() {
    this.inviteForm = new FormGroup({
      dept: new FormControl(null)
    });
    /*this.filteredDepts = this.inviteForm.controls['dept'].valueChanges
      .pipe(startWith(''), map(val => this.filter(val)));*/
  }

  /* filter(val: string): string[] {
     return this.depts.filter(dept => dept.indexOf(val) === 0);
   }*/

  onDeptSelect(data: MatAutocompleteSelectedEvent) {
    this.selectedDepts.push(data.option.value);
    this.inviteForm.reset();
  }

  removeChip(data: MatChipEvent) {
    const obj = this.selectedDepts.find(dept => dept.id === data.chip.value.id);
    const index = this.selectedDepts.indexOf(obj);
    this.selectedDepts.splice(index, 1);
  }

  sendInvites() {
    this.selectedDepts.forEach(dept => {
      this.invites.push({ques_id: this.quesId, invited_dept: dept.id, asked_on: new Date()});
    });
    this.coreService.sendInvite(this.invites);
  }
}
