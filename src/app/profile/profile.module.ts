import {NgModule} from '@angular/core';
import {ProfileviewComponent} from './profileview/profileview.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../material.module';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileService} from './profile.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [],
  declarations: [ProfileviewComponent],
  providers: [ProfileService]
})
export class ProfileModule {
}
