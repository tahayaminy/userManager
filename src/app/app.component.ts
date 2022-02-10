import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageService } from './message.service';
import { USER } from './user-interface';
import { UserService } from './user.service';

interface UPDATE{
  status:boolean;
  data?:USER;
}

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

  update:UPDATE={status:false};
  
  users:USER[]=[];
  selectedUser?:USER;  
  getUsers():void{
    this.userService.getUsers().subscribe(usersData=>this.users=usersData);
    this.displayConsole();
  }
  genId(): number {
    return this.users.length > 0 ? Math.max(...this.users.map(user => user.id)) + 1 : 1;
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
  @ViewChild('userName') userName!:ElementRef;
  @ViewChild('userAge') userAge!:ElementRef;
  addUser(){
    if(this.userName.nativeElement.value && this.userAge.nativeElement.value){
      this.userService.addUser({id:this.genId(),name:this.userName.nativeElement.value,age:this.userAge.nativeElement.value}).subscribe(user => {
        this.users.push(user);
        this.userName.nativeElement.value='';
        this.userAge.nativeElement.value='';
      });
    }
  }
  deleteUser(id:number){
    this.userService.deleteUser(id).subscribe(()=>{this.getUsers();});
    this.selectedUser=undefined;
  }
  transferUser(user:USER){
    this.update.status=true;
    this.update.data=user;
    console.log(this.update);
    this.userName.nativeElement.value=user.name;
    this.userAge.nativeElement.value=user.age;
  }  
  editUser(){
    this.selectedUser=undefined;
    this.update.data!.name=this.userName.nativeElement.value;
    this.update.data!.age=this.userAge.nativeElement.value;    
    this.userService.editUser(this.update.data!).subscribe(()=>{
      this.update.status=false;
      this.userName.nativeElement.value='';
      this.userAge.nativeElement.value='';
    });
  }
}
