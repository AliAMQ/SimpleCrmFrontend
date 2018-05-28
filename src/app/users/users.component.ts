// users mean "customers"

import { Component, OnInit } from '@angular/core';
import {UsersService} from '../users.service';
import {Http} from '@angular/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Object[];

  settings = {
    delete: {
      confirmDelete: true,
      deleteButtonContent: '<i class="glyphicon glyphicon-trash" title="Delete"></i>'
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="glyphicon glyphicon-pencil" title="Edit"></i>',
      saveButtonContent: '<i class="glyphicon glyphicon-ok" title="Update"></i>',
      cancelButtonContent: '<i class="glyphicon glyphicon-remove" title="Cancel"></i>'
    },
    add: {
      confirmCreate: true,
      addButtonContent: '<i  class="glyphicon glyphicon-plus" title="Add New"></i>',
      createButtonContent: '<i class="glyphicon glyphicon-ok" title="Add"></i>',
      cancelButtonContent: '<i class="glyphicon glyphicon-remove" title="Cancel"></i>',
    },
    columns: {
      id: {
        title: 'Customer ID',
        editable: false
      },
      name: {
        title: 'Customer Name'
      }
    }
  };

  constructor(private usersService: UsersService, private http: Http, private router: Router) {}

  ngOnInit() {
    this.usersService.getUsers().subscribe(data => {this.users = JSON.parse(JSON.parse(JSON.stringify(data))._body)},
      err => {
        if (localStorage.getItem('PortalAdminHasLoggedIn') === 'true') {
          localStorage.setItem('PortalAdminHasLoggedIn', '');
          location.reload();
          this.router.navigate(['/login']);
        }
      }
    );
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete "' + event.data.name + '" ?')) {
      this.usersService.deleteUser(event.data.name)
        .subscribe(res => {
            event.confirm.resolve();
          },
          err => {
            event.confirm.reject();
            window.alert(err.toString());
          }
        );
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    /* tslint:disable:max-line-length */
    this.usersService.addUser(event.newData['name'])
      .subscribe(res => {
          event.confirm.resolve(event.newData);
          window.alert('The new customer added!');
        },
        err => {
          event.confirm.reject();
          window.alert('Please provide valid data');
        }
      );
    /* tslint:enable:max-line-length */
  }

  onSaveConfirm(event) {
    /* tslint:disable:max-line-length */
    this.usersService.editUser(event.newData['id'], event.newData['name'])
      .subscribe(res => {
          event.confirm.resolve(event.newData);
          window.alert('Customer updated!');
        },
        err => {
          event.confirm.reject();
          window.alert('Provide valid data!');
        }
      );
    /* tslint:enable:max-line-length */
  }

}
