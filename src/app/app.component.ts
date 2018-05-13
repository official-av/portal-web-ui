import {Component, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, public router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }
}
