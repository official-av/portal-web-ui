import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatStepper} from '@angular/material';
import {AuthService} from '../auth.service';
import {ProfileService} from '../../profile/profile.service';
import {SharedService} from '../../shared/shared.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  mode: 'forgot' | 'change';
  checkUserCompleted = false;
  otpCompleted = false;
  pwdCheckCompleted = false;
  checkUsernameFormGroup: FormGroup;
  currentPasswordFormGroup: FormGroup;
  resetPasswordFormGroup: FormGroup;
  @ViewChild('stepper') stepper: MatStepper;

  // TODO: Fix step complete issue (bug click two times on otp submit)

  constructor(public dialogRef: MatDialogRef<ResetPasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private authService: AuthService,
              private profileService: ProfileService,
              private sharedService: SharedService,
              private errorHandlerService: ErrorHandlerService) {
    this.mode = this.data.mode;
  }

  ngOnInit() {
    this.checkUsernameFormGroup = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9]+'), Validators.minLength(8)])
    });

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

  checkUser() {
    const username = this.checkUsernameFormGroup.get('username').value;
    this.authService.checkUsername(username)
      .then((res: any) => {
        if (res.user === 'exists') {
          this.profileService.getProfileDetails(username)
            .then(() => {
              this.sharedService.otpSub.next();
            }).catch(error => this.errorHandlerService.showError(error, 'Dismiss'));
          this.checkUserCompleted = true;
          this.stepper.next();
        } else {
          this.errorHandlerService.showMessage('User does not exist', 'Dismiss');
        }
      }).catch(error => this.errorHandlerService.showError(error, 'Dismiss'));
  }

  checkPass() {
    this.authService.checkPassword(
      this.profileService.userProfile.username,
      this.currentPasswordFormGroup.get('cur_password').value)
      .then((res: any) => {
        if (res.response === 'match') {
          this.pwdCheckCompleted = true;
          this.sharedService.otpSub.next();
          this.stepper.next();
        } else {
          this.errorHandlerService.showMessage('Invalid Password', 'Dismiss');
        }
      }).catch(error => this.errorHandlerService.showError(error, 'Dismiss'));
  }

  changePass() {
    this.authService.changePassword(
      this.profileService.userProfile.username,
      this.resetPasswordFormGroup.get('new_password').value,
      this.resetPasswordFormGroup.get('cnf_password').value)
      .then((res: any) => {
        if (res.success === 'Yes') {
          console.log('success');
          this.dialogRef.close();
        } else {
          this.errorHandlerService.showMessage('Operation failed. Try Again!', 'Dismiss');
        }
      }).catch(error => this.errorHandlerService.showError(error, 'Dismiss'));
  }

}
