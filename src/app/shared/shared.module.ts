import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {MaterialModule} from '../material.module';
import {FooterComponent} from './footer/footer.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AboutComponent} from './static/about/about.component';
import {ContactComponent} from './static/contact/contact.component';
import {HelpComponent} from './static/help/help.component';
import {AppRoutingModule} from '../app-routing.module';
import {SidenavComponent} from './sidenav/sidenav.component';
import {CommonModule} from '@angular/common';
import {SharedService} from './shared.service';
import {OtpComponent} from './otp/otp.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ErrorHandlerService} from './error-handler.service';
import {WelcomeComponent} from './welcome/welcome.component';
import {TypedComponent} from './welcome/typed/typed.component';

@NgModule({
  imports: [MaterialModule, FlexLayoutModule, AppRoutingModule, CommonModule, ReactiveFormsModule
  ],
  exports: [HeaderComponent, FooterComponent, AboutComponent, ContactComponent, HelpComponent, SidenavComponent, OtpComponent],
  declarations: [HeaderComponent, FooterComponent, AboutComponent, ContactComponent, HelpComponent, SidenavComponent, OtpComponent,WelcomeComponent,TypedComponent],
  providers: [SharedService, ErrorHandlerService]
})
export class SharedModule {
}
