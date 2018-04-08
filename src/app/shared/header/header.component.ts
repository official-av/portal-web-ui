import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ModalsService} from '../../modals.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(public modalService: ModalsService, private authService: AuthService) {
  }

  ngOnInit() {
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }

}
