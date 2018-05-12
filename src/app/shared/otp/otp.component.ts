import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SharedService} from '../shared.service';
import {ProfileService} from '../../profile/profile.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  public contact: number;
  otp: number;
  otpFormGroup: FormGroup;
  @Output() otpVerified = new EventEmitter<boolean>();


  constructor(private authService: AuthService, private sharedService: SharedService, private profileService: ProfileService) {
    this.contact = this.profileService.userProfile.phonenum;
  }

  ngOnInit() {
    this.otpFormGroup = new FormGroup({
      otp: new FormControl(null, [Validators.required])
    });
    this.sharedService.otpSub.subscribe(() => {
      this.sendOtp();
    });
  }

  sendOtp() {
    console.log('trigger');
    this.sharedService.fetchOtp().then((value: any) => this.otp = value.text).catch(error => console.log(error));
  }

  onSubmit() {
    if (this.otpFormGroup.get('otp').value === this.otp) {
      this.otpVerified.emit(true);
    } else {
      console.log('value mismatch');
    }
  }

}
