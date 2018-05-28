import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedIn: boolean;
  loginForm: FormGroup;
  errMsg: string;
  firstname: string;

  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) {

    this.loginForm = this.fb.group({
      'username': ['', [
        Validators.required
      ]],
      'password': ['', [
        Validators.required
      ]]
    });

    /* this.loginForm.valueChanges.subscribe(data => {
     console.log(data);
     });*/

    if (localStorage.getItem('PortalAdminHasLoggedIn') === '' || localStorage.getItem('PortalAdminHasLoggedIn') == null) {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }
  }

  onLogin() {
    this.loginService.sendCredential(this.loginForm.get('username').value, this.loginForm.get('password').value).subscribe(
      res => {
        this.loggedIn = true;
        localStorage.setItem('PortalAdminHasLoggedIn', 'true');
        localStorage.setItem('token', res.json().token);
        localStorage.setItem('firstname', res.json().firstname);
        localStorage.setItem('role', res.json().role);
        location.reload();
      },
      err => {
        this.errMsg = 'Invalid username/password';
      }
    );
  }

  ngOnInit() {
    this.firstname = localStorage.getItem('firstname');
    /* tslint:disable:max-line-length */
    /*this.loginService.getNumberOfAccounts().subscribe(data => {
        this.numberOfAccounts = JSON.parse(JSON.parse(JSON.stringify(data))._body);
      },
      err => {
        if (localStorage.getItem('PortalAdminHasLoggedIn') === 'true') {
          localStorage.setItem('PortalAdminHasLoggedIn', '');
          location.reload();
          this.router.navigate(['/login']);
        }
      }
    );
    this.loginService.getNumberOfVerifiedAccounts().subscribe(data => {
      this.numberOfVerifiedAccounts = JSON.parse(JSON.parse(JSON.stringify(data))._body);
    });
    this.loginService.getNumberOfTrialAccounts().subscribe(data => {
      this.numberOfTrialAccounts = JSON.parse(JSON.parse(JSON.stringify(data))._body);
    });
    this.loginService.getNumberOfNonTrialAccounts().subscribe(data => {
      this.numberOfNonTrialAccounts = JSON.parse(JSON.parse(JSON.stringify(data))._body);
    });*/
    /* tslint:enable:max-line-length */
  }

}
