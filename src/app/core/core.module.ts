import {NgModule} from '@angular/core';
import {MaterialModule} from '../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {QuestionsComponent} from './questions/questions.component';
import {ViewQuestionComponent} from './questions/view-question/view-question.component';
import {RouterModule} from '@angular/router';
import {CoreService} from './core.service';

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    CommonModule,
    RouterModule
  ],
  exports: [],
  declarations: [DashboardComponent, QuestionsComponent, ViewQuestionComponent],
  providers: [CoreService]
})
export class CoreModule {

}
