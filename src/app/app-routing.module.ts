import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './shared/welcome/welcome.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  }
  /*{
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
  },*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
