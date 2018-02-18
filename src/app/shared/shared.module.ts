import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {MaterialModule} from '../material.module';
import {FooterComponent} from './footer/footer.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [MaterialModule, FlexLayoutModule],
  exports: [HeaderComponent, FooterComponent],
  declarations: [HeaderComponent, FooterComponent]
})
export class SharedModule {
}
