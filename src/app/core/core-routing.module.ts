import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ViewQuestionComponent} from './questions/view-question/view-question.component';
import {QuestionsComponent} from './questions/questions.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreateComponent} from './create/create.component';
import {ReplyComponent} from './reply/reply.component';
import {AuthGuard} from '../auth/auth.guard';

const routes: Routes = [{
  path: 'home',
  component: DashboardComponent,
  canActivate: [AuthGuard]
},
  {
    path: 'questions/:mode',
    component: QuestionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reply/:mode',
    component: ReplyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'view/:mode/:ques_id',
    component: ViewQuestionComponent,
    canActivate: [AuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {

}
