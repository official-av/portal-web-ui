import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  private contact: number;
  enteredValue: string;
  otpControl: FormControl;
  @Output() otpVerified = new EventEmitter<boolean>();


  constructor(private authService: AuthService) {
    this.contact = this.authService.getUserDetails().contact;
  }

  ngOnInit() {
    this.otpControl = new FormControl(null, [Validators.required]);
    // TODO: Add ASync Validator
  }

  sendOtp() {
    // TODO: Add backend call to send otp and get sent-otp
  }

  onSubmit() {
    this.otpVerified.emit(true);
  }

}
