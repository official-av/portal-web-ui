import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ModalsService} from '../../modals.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter<void>();

  constructor(public modalService: ModalsService,private authService:AuthService) {
  }

  ngOnInit() {
  }

  closeSidenav() {
    this.sidenavClose.emit();
  }

}
