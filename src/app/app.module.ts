import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';

import {LoginService} from './login.service';
import {UsersService} from './users.service';
import {ReactiveFormsModule} from '@angular/forms';

import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { UsersComponent } from './users/users.component';

import {Ng2SmartTableModule} from 'ng2-smart-table';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpModule,
    Ng2SmartTableModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, LoginService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
