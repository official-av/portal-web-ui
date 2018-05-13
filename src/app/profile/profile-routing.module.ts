import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileviewComponent} from './profileview/profileview.component';
import {AuthGuard} from '../auth/auth.guard';

const routes: Routes = [{
  path: 'profile',
  component: ProfileviewComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {

}
