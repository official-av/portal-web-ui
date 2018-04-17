import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Question} from '../models/question.model';
import {ActivatedRoute} from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {CoreService} from '../core.service';
import {Mode} from '../enums/mode.enum';
import {SharedService} from '../../shared/shared.service';
import {ModalsService} from '../../modals.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})

export class QuestionsComponent implements OnInit, AfterViewInit {
  mode: Mode;
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
        this.mode = Mode.DIRECT;
        break;
      case 'invited':
        this.mode = Mode.INVITED;
        break;
      case 'archived':
        this.mode = Mode.ARC_DIRECT;
        break;
      default:
        console.log('error');
    }
    this.initDataSource();
  }

  initDataSource() {
    if (this.mode === Mode.DIRECT || this.mode === Mode.INVITED) {
      (<Promise<Question[]>>this.coreService.getQuestions(this.mode))
        .then((result: Question[]) => {
          this.dataSource.data = result;
        }).catch(error => console.log(error));
    }
    /*else {
         this.invitedDataSource.data = this.coreService.getQuestions(Mode.ARC_INVITED);
         this.directDataSource.data = this.coreService.getQuestions(Mode.ARC_DIRECT);
       }*/
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.mode === Mode.ARC_DIRECT || this.mode === Mode.INVITED) {
      this.dataSource.paginator = this.paginator;
    } else {
      this.directDataSource.paginator = this.directPaginator;
      this.invitedDataSource.paginator = this.invitedPaginator;
    }
  }

}
