import {NgModule} from '@angular/core';
import {ProfileviewComponent} from './profileview/profileview.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../material.module';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [ProfileviewComponent]
})
export class ProfileModule {
}
