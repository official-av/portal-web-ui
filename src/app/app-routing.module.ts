import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './shared/welcome/welcome.component';
import {AuthGuard} from './auth/auth.guard';
import {NotFoundComponent} from './shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: '**',
    component: NotFoundComponent
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
