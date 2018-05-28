import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {environment} from '../environments/environment';

@Injectable()
export class LoginService {

  private headers: Headers;
  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Alireza ' + localStorage.getItem('token'));
  }

  sendCredential(username: string, password: string) {
    const body = {username, password };
    const theHeaders = new Headers(
      {
        'Content-Type': 'application/json'
      });
    return this.http.post(environment.backendUrl + 'authenticate/user', body, {headers: theHeaders});
  }

}
