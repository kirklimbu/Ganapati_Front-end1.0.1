// import { UserDetialService } from 'src/app/shared/services/user-detial.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ganapati-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input()
  heading = 'title';

  @Input()
  enableActiveLink = false;

  activeLink: any;



constructor(
  // private userDetailService: UserDetialService

) {

}

ngOnInit(): void {
  // this.activeLink = this.userDetailService.getSelectedLink();

}

}
