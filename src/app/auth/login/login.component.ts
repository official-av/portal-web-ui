import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, private router: Router) {
  }
  // TODO: add service and integrate with backend
  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.loginForm);
    /*
    this.authService.login({email: this.loginForm.value.email, password: this.loginForm.value.password});*/
  }

  onRegister() {
    this.router.navigate(['register']);
    this.dialogRef.close();
  }

}
