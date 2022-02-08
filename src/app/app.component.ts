import { Component } from '@angular/core';
import { USER } from './user-interface';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService:UserService){}
  ngOnInit(): void {
    this.getUsers();
  }
  title = 'user-manager';
  users:USER[]=[];
  selectedUser?:USER;
  getUsers():void{
    this.users=this.userService.getUsers();
  }
  select(user:USER){
    this.selectedUser=user;
  }
}
