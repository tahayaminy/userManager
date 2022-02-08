import { Injectable } from '@angular/core';
import { USER } from './user-interface';
import { users } from './mock-users';
import { Observable,of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private messageService:MessageService) { }
  getUsers():Observable<USER[]>{
    const usersData=of(users);
    this.messageService.add('usersData Fetched!');
    return usersData;
  }
}
