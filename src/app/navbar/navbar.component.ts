import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn: boolean;
  isMasterAdmin: boolean;

  constructor(private loginService: LoginService, private router: Router) {
    if (localStorage.getItem('PortalAdminHasLoggedIn') === '') {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }
    if (localStorage.getItem('role') === 'ROLE_MASTERADMIN') {
      this.isMasterAdmin = true ;
    }
  }

  logout() {
    localStorage.setItem('PortalAdminHasLoggedIn', '');
    location.reload();
    this.router.navigate(['/login']);
  }

  getDisplay() {
    if (!this.loggedIn) {
      return 'none';
    } else {
      return '';
    }
  }
  ngOnInit() {
  }

}
