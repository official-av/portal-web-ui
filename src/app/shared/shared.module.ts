import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {MaterialModule} from '../material.module';

@NgModule({
  imports: [MaterialModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent]
})
export class SharedModule {
}
