import { Injectable } from '@angular/core';
import { USER } from './user-interface';
import { users } from './mock-users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }
  getUsers():USER[]{
    return users;
  }
}
