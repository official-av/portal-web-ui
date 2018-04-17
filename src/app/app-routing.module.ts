import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from './shared/static/about/about.component';
import {HelpComponent} from './shared/static/help/help.component';
import {ContactComponent} from './shared/static/contact/contact.component';
import {SignupComponent} from './auth/signup/signup.component';
import {ProfileviewComponent} from './profile/profileview/profileview.component';
import {DashboardComponent} from './core/dashboard/dashboard.component';
import {QuestionsComponent} from './core/questions/questions.component';
import {CreateComponent} from './core/create/create.component';
import {ReplyComponent} from './core/reply/reply.component';
import {ViewQuestionComponent} from './core/questions/view-question/view-question.component';

const routes: Routes = [
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: 'register',
    component: SignupComponent
  },
  {
    path: 'profile',
    component: ProfileviewComponent
  },
  {
    path: 'home',
    component: DashboardComponent
  },
  {
    path: 'questions/:mode',
    component: QuestionsComponent
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'reply/:mode',
    component: ReplyComponent
  },
  {
    path: 'view/:mode/:ques_id',
    component: ViewQuestionComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
