import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Question} from '../models/question.model';
import {ActivatedRoute} from '@angular/router';
import {MatPaginator, MatSort, MatTab, MatTableDataSource} from '@angular/material';
import {CoreService} from '../core.service';
import {SharedService} from '../../shared/shared.service';
import {ModalsService} from '../../modals.service';
import {Mode} from '../enums/mode.enum';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})

export class QuestionsComponent implements OnInit, AfterViewInit {
  mode: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('dirSort') dirSort: MatSort;
  @ViewChild('invSort') invSort: MatSort;
  @ViewChild('arcDirSort') arcDirSort: MatSort;
  @ViewChild('arcInvSort') arcInvSort: MatSort;
  public Mode = Mode;

  // data sources
  dataSource = new MatTableDataSource<Question>();
  directDataSource = new MatTableDataSource<Question>();
  invitedDataSource = new MatTableDataSource<Question>();

  directColumns = ['content', 'asked_on', 'deadline', 'Invited', 'Details'];
  invitedColumns = ['content', 'Asked By', 'asked_on', /*'Deadline',*/ 'Details'];
  archivedDirectColumns = ['content', 'asked_on', 'answered_on', 'Details'];
  archivedInvitedColumns = ['content', 'Asked By', 'asked_on', 'answered_on', 'Details'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) archivedPaginator: MatPaginator;
  @ViewChild('arcDirTab') arcDirTab: MatTab;
  @ViewChild('arcInvTab') arcInvTab: MatTab;

  constructor(private route: ActivatedRoute,
              public coreService: CoreService,
              public sharedService: SharedService,
              public modalsService: ModalsService) {
    switch (this.route.snapshot.params['mode']) {
      case 'direct':
        this.mode = 'direct';
        break;
      case 'invited':
        this.mode = 'invited';
        break;
      case 'archived':
        this.mode = 'arc_direct';
        break;
      default:
        console.log('error');
    }
    this.initDataSource();
  }

  initDataSource() {
    if (this.mode === 'direct') {
      (<Promise<Question[]>>this.coreService.getQuestions(this.mode))
        .then((result: Question[]) => {
          this.dataSource.data = result.filter(value => value.answer === null);
          console.log(this.dataSource.data);
        }).catch(error => console.log(error));
    } else if (this.mode === 'invited') {
      (<Promise<Question[]>>this.coreService.getQuestions(this.mode))
        .then((result: Question[]) => {
          this.dataSource.data = result.filter(value => value.collaborations[0].rec_answer === null);
          console.log(this.dataSource.data);
        }).catch(error => console.log(error));
    } else {
      (<Promise<Question[]>>this.coreService.getQuestions(Mode.ARC_DIRECT))
        .then((result: Question[]) => {
          this.directDataSource.data = result.filter(value => value.answer !== null);
        }).catch(error => console.log(error));
      (<Promise<Question[]>>this.coreService.getQuestions(Mode.ARC_INVITED))
        .then((result: Question[]) => {
          this.invitedDataSource.data = result.filter(value => value.collaborations[0].rec_answer !== null);
        }).catch(error => console.log(error));
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.mode === 'arc_direct' || this.mode === 'arc_invited') {
      this.onTabChange();
      this.directDataSource.sort = this.arcDirSort;
      this.invitedDataSource.sort = this.arcInvSort;
    } else {
      if (this.mode === 'invited') {
        this.dataSource.sort = this.invSort;
      } else {
        this.dataSource.sort = this.dirSort;
      }
      this.dataSource.paginator = this.paginator;
    }
  }

  onTabChange() {
    if (this.arcDirTab.isActive) {
      this.directDataSource.paginator = this.archivedPaginator;
    } else {
      this.invitedDataSource.paginator = this.archivedPaginator;
    }
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  doArcDirFilter(filterValue: string) {
    this.directDataSource.filter = filterValue.trim().toLowerCase();
  }

  doArcInvFilter(filterValue: string) {
    this.invitedDataSource.filter = filterValue.trim().toLowerCase();
  }

}
