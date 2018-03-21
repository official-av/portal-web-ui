import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
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
  depts = ['dept of science and tech', 'ministry of defence', 'mhrd'];
  filteredDepts: Observable<any[]>;
  // TODO: Add methods for backend
  // TODO: Make UI responsive for mobile
  constructor() {
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
      'dept': new FormControl(null, Validators.required)
    });
    this.filteredDepts = this.secondFormGroup.controls['dept'].valueChanges
      .pipe(startWith(''), map(val => this.filter(val)));
  }

  filter(val: string): string[] {
    return this.depts.filter(dept => dept.indexOf(val) === 0);
  }

  onSubmit() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
  }

}
