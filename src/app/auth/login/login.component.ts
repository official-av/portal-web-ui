import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9]+'), Validators.minLength(8)]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value.username,
      this.loginForm.value.password)
      .then(msg => console.log(msg))
      .then(() => {
        this.dialogRef.close();
      })
      .catch(error => console.log(error));
  }

  onRegister() {
    this.router.navigate(['register']);
    this.dialogRef.close();
  }

}
