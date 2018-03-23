import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {AppRoutingModule} from '../app-routing.module';
import {MaterialModule} from '../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './auth.service';

@NgModule({
  imports: [
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  exports: [LoginComponent, SignupComponent],
  declarations: [LoginComponent, SignupComponent],
  providers: [AuthService]
})

export class AuthModule {

}
