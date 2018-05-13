import {NgModule} from '@angular/core';
import {MaterialModule} from '../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {QuestionsComponent} from './questions/questions.component';
import {ViewQuestionComponent} from './questions/view-question/view-question.component';
import {RouterModule} from '@angular/router';
import {CoreService} from './core.service';
import {ReplyComponent} from './reply/reply.component';
import {CreateComponent} from './create/create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuestionDetailsComponent} from './questions/question-details/question-details.component';
import {CollabDetailsComponent} from './reply/collab-details/collab-details.component';
import {CoreRoutingModule} from './core-routing.module';
import {SharedModule} from '../shared/shared.module';
import {InviteComponent} from './invite/invite.component';

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CoreRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    DashboardComponent,
    QuestionsComponent,
    ViewQuestionComponent,
    ReplyComponent,
    CreateComponent,
    QuestionDetailsComponent,
    CollabDetailsComponent,
    InviteComponent],
  providers: [CoreService]
})
export class CoreModule {

}
