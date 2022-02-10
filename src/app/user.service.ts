import { Injectable } from '@angular/core';
import { USER } from './user-interface';
import { users } from './mock-users';
import { Observable,of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private messageService:MessageService,private http:HttpClient) { }

  //SIMPLY LOCALE FILE
  // getUsers():Observable<USER[]>{
  //   const usersData=of(users);
  //   this.messageService.add('usersData Fetched!');
  //   return usersData;
  // }

  //HTTP MODULES FOR APIs
  url="http://localhost:3000/users";
  httpOptions={headers:new HttpHeaders({'Content-Type': 'application/json'})};
  getUsers():Observable<USER[]>{
    return this.http.get<USER[]>(this.url)
  }
  addUser(user:USER):Observable<USER>{
    return this.http.post<USER>(this.url , user , this.httpOptions)
  }
  deleteUser(id:number){
    return this.http.delete<USER>(this.url+'/'+id,this.httpOptions);
  }
  editUser(user:USER){
    return this.http.put<USER>(this.url+'/'+user.id , user , this.httpOptions);
  }
}
