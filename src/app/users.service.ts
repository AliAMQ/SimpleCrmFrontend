// users mean "customers"
import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions, RequestMethod} from '@angular/http';
import {environment} from '../environments/environment';


@Injectable()
export class UsersService {

  private headers: Headers;
  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Alireza ' + localStorage.getItem('token'));
  }

  getUsers() {
    return this.http.get(environment.backendUrl + 'customers/getall', {headers: this.headers})
  }

  addUser(name: string) {
    const body = {name};
    return this.http.post(environment.backendUrl + 'customers/add', body, {headers: this.headers})
  }

  editUser(id: number, name: string) {
    const body = {id, name};
    return this.http.post(environment.backendUrl + 'customers/add', body, {headers: this.headers})
  }

  deleteUser(id: number) {
    return this.http.delete(environment.backendUrl + 'users/delete?id=' + id, {headers: this.headers});
  }
}
