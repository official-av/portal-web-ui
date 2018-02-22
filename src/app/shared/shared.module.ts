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
import {ModalsService} from '../modals.service';

@NgModule({
  imports: [MaterialModule, FlexLayoutModule, AppRoutingModule],
  exports: [HeaderComponent, FooterComponent, AboutComponent, ContactComponent, HelpComponent, SidenavComponent],
  declarations: [HeaderComponent, FooterComponent, AboutComponent, ContactComponent, HelpComponent, SidenavComponent]
})
export class SharedModule {
}
