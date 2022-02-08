import { Component } from '@angular/core';
import { users } from './mock-users';
import { USER } from './user-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-manager';
  users:USER[]=users;
  selectedUser?:USER;
  select(user:USER){
    this.selectedUser=user;
  }
}
