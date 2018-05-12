import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class ErrorHandlerService {
  constructor(private snackbar: MatSnackBar) {
  }

  showError(error, action) {
    let message;
    if (error.error && error.status !== 0) {
      message = error.error[Object.keys(error.error)[0]];
    } else {
      message = 'Something went wrong';
    }
    this.snackbar.open('ERROR: ' + message, action, {
      duration: 3000
    });
  }

  showMessage(message, action) {
    this.snackbar.open(message, action, {
      duration: 3000
    });
  }
}
