import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from './shared/static/about/about.component';
import {HelpComponent} from './shared/static/help/help.component';
import {ContactComponent} from './shared/static/contact/contact.component';
import {SignupComponent} from './auth/signup/signup.component';
import {ProfileviewComponent} from './profile/profileview/profileview.component';
import {DashboardComponent} from './core/dashboard/dashboard.component';

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
