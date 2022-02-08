import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component } from '@angular/core';
import { MessageService } from './message.service';
import { USER } from './user-interface';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService:UserService,public messageService:MessageService){}
  ngOnInit(): void {
    this.getUsers();
  }
  title = 'user-manager';
  users:USER[]=[];
  selectedUser?:USER;  
  getUsers():void{
    this.userService.getUsers().subscribe(usersData=>this.users=usersData);
    this.displayConsole();
  }
  displayConsole():void{
    for(let message of this.messageService.messages){
      console.log('%c'+message,'color:#5bc0de');
    }
  }
  select(user:USER){
    this.selectedUser=user;
    console.clear();
    this.messageService.add(`the user with name '${user.name}'\n& age ${user.age}\n& id ${user.id}\nIS SELECTED!`)
    this.displayConsole();
  }
}
