import {MatDialog} from '@angular/material';
import {LoginComponent} from './auth/login/login.component';
import {Injectable} from '@angular/core';

@Injectable()
export class ModalsService {
  constructor(public dialog: MatDialog) {
  }

  openLoginModal() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
