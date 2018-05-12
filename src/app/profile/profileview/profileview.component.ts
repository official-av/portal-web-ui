import {Component, OnInit} from '@angular/core';
import {User} from '../user.model';
import {SharedService} from '../../shared/shared.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalsService} from '../../modals.service';
import {ProfileService} from '../profile.service';

@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.scss']
})
export class ProfileviewComponent implements OnInit {

  profileForm: FormGroup;

  temp_user: User;

  constructor(public sharedService: SharedService, public modalsService: ModalsService, private profileService: ProfileService) {
    this.temp_user = this.profileService.userProfile;
  }

  ngOnInit() {
    this.profileForm = new FormGroup({
      'username': new FormControl({
        value: this.temp_user.username,
        disabled: true
      }, [Validators.required, Validators.pattern('[a-zA-Z0-9]+'), Validators.minLength(8)]),
      'email': new FormControl({
        value: this.temp_user.email,
        disabled: true
      }, [Validators.required, Validators.email]),
      'contact': new FormControl({
        value: this.temp_user.phonenum,
        disabled: true
      }, [Validators.required, Validators.pattern('[0-9]{10}')])
    });
  }

}
