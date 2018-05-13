import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Question} from '../models/question.model';
import {ActivatedRoute} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
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
  public Mode = Mode;

  // data sources
  dataSource = new MatTableDataSource<Question>();
  directDataSource = new MatTableDataSource<Question>();
  invitedDataSource = new MatTableDataSource<Question>();

  directColumns = ['Content', 'Asked on', 'Deadline', 'Invited', 'Details'];
  invitedColumns = ['Content', 'Asked By', 'Asked on', /*'Deadline',*/ 'Details'];
  archivedDirectColumns = ['Content', 'Asked on', 'Answered on', 'Details'];
  archivedInvitedColumns = ['Content', 'Asked By', 'Asked on', 'Answered on', 'Details'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) directPaginator: MatPaginator;
  @ViewChild(MatPaginator) invitedPaginator: MatPaginator;

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
    this.dataSource.sort = this.sort;
    if (this.mode === 'arc_direct' || this.mode === 'arc_invited') {
      this.dataSource.paginator = this.paginator;
    } else {
      this.directDataSource.paginator = this.directPaginator;
      this.invitedDataSource.paginator = this.invitedPaginator;
    }
  }

}
