import {NgModule} from '@angular/core';
import {MaterialModule} from '../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionsComponent } from './questions/questions.component';

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    CommonModule
  ],
  exports: [],
  declarations: [DashboardComponent, QuestionsComponent]
})
export class CoreModule {

}
