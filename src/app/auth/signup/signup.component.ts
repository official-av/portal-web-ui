import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {RegisterUser} from '../registerUser.interface';
import {ModalsService} from '../../modals.service';
import {SharedService} from '../../shared/shared.service';
import {Dept} from '../../core/models/dept.model';
import {Observable} from 'rxjs/Observable';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  firstFormGroup: FormGroup;
  // contains firstname,lastname,email and contact
  secondFormGroup: FormGroup;
  // contains username,dept
  depts: Dept[];
  filteredDepts: Observable<Dept[]>;

  constructor(private authService: AuthService,
              private modalsService: ModalsService,
              private sharedService: SharedService,
              private errorHandlerService: ErrorHandlerService) {

  }

  ngOnInit() {
    this.firstFormGroup = new FormGroup({
      'firstname': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(3)]),
      'lastname': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(3)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'contact': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{10}')])
    });

    this.secondFormGroup = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9]+'), Validators.minLength(8)]),
      'dept': new FormControl(null, Validators.required),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)
        /*, this.confirmPasswordValidator2.bind(this)*/]),
      'cnf_password': new FormControl(null, [Validators.required, Validators.minLength(8), this.confirmPasswordValidator.bind(this)]),
    });
    this.sharedService.getDeptList().subscribe((value: Dept[]) => {
      this.depts = value;
      this.filteredDepts = this.secondFormGroup.controls['dept'].valueChanges
        .pipe(startWith(''), map(val => this.filter(val)));
    });
  }

  filter(val: string): Dept[] {
    return this.depts.filter(dept => dept.name.toLowerCase().includes(val.toLowerCase()));
  }

  // TODO: Optimize - create seperate pwd + cnf pwd component?
  confirmPasswordValidator(control: FormControl): { [s: string]: boolean } {
    if (this.secondFormGroup && control.value !== this.secondFormGroup.get('password').value) {
      return {'differentPasswords': true};
    } else {
      return null;
    }
  }

  /*confirmPasswordValidator2(control: FormControl): { [s: string]: boolean } {
    if (this.secondFormGroup
      && (control.value !== this.secondFormGroup.get('cnf_password').value
        && this.secondFormGroup.get('cnf_password').value)) {
      return {'differentPasswords': true};
    } else {
      return null;
    }
  }
*/
  onSubmit() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
    const user: RegisterUser = {
      username: this.secondFormGroup.get('username').value,
      password: this.secondFormGroup.get('password').value,
      confirm_password: this.secondFormGroup.get('cnf_password').value,
      dept: this.sharedService.getDeptId(this.secondFormGroup.get('dept').value),
      first_name: this.firstFormGroup.get('firstname').value,
      last_name: this.firstFormGroup.get('lastname').value,
      email: this.firstFormGroup.get('email').value,
      phonenum: this.firstFormGroup.get('contact').value
    };
    this.authService.register(user)
      .then(result => {
        this.modalsService.openLoginModal();
      })
      .catch(error => this.errorHandlerService.showError(error, 'Dismiss'));
  }

}
