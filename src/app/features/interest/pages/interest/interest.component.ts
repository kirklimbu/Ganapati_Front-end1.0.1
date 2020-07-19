import { InterestService } from './../../service/interest.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Interest } from 'src/app/core/models/interest.model';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss'],
})
export class InterestComponent implements OnInit {
  // props
  mortgageId: number;
  interestListTableDataSource: MatTableDataSource<Interest>;
  displayedColumns: string[] = ['sn', 'date', 'amount', 'action'];
  constructor(
    private interestService: InterestService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchParamFromUrl();
    this.fetchTotalInterest();
  }

  fetchParamFromUrl() {
    this.route.queryParamMap.subscribe((params) => {
      this.mortgageId = +params.get('mortgageId');
    });
  }

  fetchTotalInterest() {
    this.interestService.getTotalInterest(this.mortgageId).subscribe((res) => {
      this.interestListTableDataSource = res;
    });
  }
  onEdit() {}
  onDelete(id) {}
}
