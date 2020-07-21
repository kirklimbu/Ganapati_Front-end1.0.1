import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'ganapati-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  token: any;
  currentTime: any;
  isNavbarCollapsed = true;
  isAuthenticated = true;
  title = 'Om Ganapati Jewellery';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.fetchCurrentTime();
    // this.fetchToken();
  }

  fetchCurrentTime() {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  fetchToken() {
    this.token = localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('activeLink');
    // this.userDetailService.setUser(null);
    this.router.navigate(['/login']);
  }
}
