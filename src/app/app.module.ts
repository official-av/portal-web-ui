import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {AppRoutingModule} from './app-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from './shared/shared.module';
import {AuthModule} from './auth/auth.module';
import {ModalsService} from './modals.service';
import {LoginComponent} from './auth/login/login.component';
import {ProfileModule} from './profile/profile.module';
import {ResetPasswordComponent} from './auth/reset-password/reset-password.component';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {InviteComponent} from './core/invite/invite.component';
import {NgProgressInterceptor, NgProgressModule} from 'ngx-progressbar';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {CoreModule} from './core/core.module';
import {WildcardRoutingModule} from './shared/wildcard.routing';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    NgProgressModule,
    ToastModule.forRoot(),

    // custom modules
    SharedModule,
    AuthModule,
    ProfileModule,
    CoreModule,
    AppRoutingModule,
    WildcardRoutingModule
  ],
  providers: [
    ModalsService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, ResetPasswordComponent, InviteComponent]
})
export class AppModule {
}
