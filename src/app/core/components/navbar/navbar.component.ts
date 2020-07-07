import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'ganapati-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentUser: User;

  currentTime: any;

  isNavbarCollapsed = true;
  isAuthenticated = true;

  title = 'Om Ganapati Jewellery'

  
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  fetchUser() {

    console.log('logged user detials ' + JSON.parse(localStorage.getItem('loggedUser')));

    this.currentUser = JSON.parse(localStorage.getItem('loggedUser'));

  }

  logout() {

    localStorage.removeItem('loggedUser');
    localStorage.removeItem('activeLink');
    // this.userDetailService.setUser(null);
    this.router.navigate(['/login']);
  }
}
