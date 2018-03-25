import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  mode: 'forgot' | 'change';
  otpCompleted:boolean=false;
  currentPasswordFormGroup: FormGroup;
  resetPasswordFormGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<ResetPasswordComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.mode = this.data.mode;
  }

  ngOnInit() {
    this.currentPasswordFormGroup = new FormGroup({
      cur_password: new FormControl(null, [Validators.required, Validators.minLength(8)])
      // TODO: Add async validator for current password
    });
    this.resetPasswordFormGroup = new FormGroup({
      new_password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      cnf_password: new FormControl(null, [Validators.required, Validators.minLength(8), this.confirmPasswordValidator.bind(this)])
    });
  }

  confirmPasswordValidator(control: FormControl): { [s: string]: boolean } {
    if (this.resetPasswordFormGroup && control.value !== this.resetPasswordFormGroup.get('new_password').value) {
      return {'differentPasswords': true};
    } else {
      return null;
    }
  }

}
