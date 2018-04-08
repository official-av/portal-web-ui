import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Question} from '../models/question.model';
import {ActivatedRoute} from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {CoreService} from '../core.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})

export class QuestionsComponent implements OnInit, AfterViewInit {
  mode: 'direct' | 'invited' | 'archived';

  // data sources
  dataSource = new MatTableDataSource<Question>();
  directDataSource = new MatTableDataSource<Question>();
  invitedDataSource = new MatTableDataSource<Question>();

  directColumns = ['Content', 'Asked on', 'Deadline', 'Invited', 'Reply'];
  invitedColumns = ['Content', 'Asked By', 'Asked on', /*'Deadline',*/ 'Reply'];
  archivedDirectColumns = ['Content', 'Asked on', 'Answered on', 'Details'];
  archivedInvitedColumns = ['Content', 'Asked By', 'Asked on', 'Answered on', 'Details'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) directPaginator: MatPaginator;
  @ViewChild(MatPaginator) invitedPaginator: MatPaginator;

  constructor(private route: ActivatedRoute, private coreService: CoreService) {
    this.mode = this.route.snapshot.params['mode'];
    this.initDataSource();
  }

  initDataSource() {
    switch (this.mode) {
      case 'direct':
        this.dataSource.data = this.coreService.getDirectQuestions();
        break;
      case 'invited':
        this.dataSource.data = this.coreService.getInivtedArchivedQuestions();
        break;
      case 'archived':
        this.invitedDataSource.data = this.coreService.getInivtedArchivedQuestions();
        this.directDataSource.data = this.coreService.getDirectArchivedQuetions();
        break;
      default:
        console.log('error');
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.mode !== 'archived') {
      this.dataSource.paginator = this.paginator;
    } else {
      this.directDataSource.paginator = this.directPaginator;
      this.invitedDataSource.paginator = this.invitedPaginator;
    }
  }

}
