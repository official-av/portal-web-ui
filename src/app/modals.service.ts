import {MatDialog} from '@angular/material';
import {LoginComponent} from './auth/login/login.component';
import {Injectable} from '@angular/core';
import {ResetPasswordComponent} from './auth/reset-password/reset-password.component';
import {InviteComponent} from './core/invite/invite.component';

@Injectable()
export class ModalsService {
  constructor(public dialog: MatDialog) {
  }

  openLoginModal() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'forgot') {
        this.openPasswordResetModal('forgot');
      }
    });
  }

  openPasswordResetModal(mode: string) {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '500px',
      data: {
        mode: mode
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openInviteModal(ques_id: string) {
    const dialogRef = this.dialog.open(InviteComponent, {
      width: '500px',
      data: {
        ques_id: ques_id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
