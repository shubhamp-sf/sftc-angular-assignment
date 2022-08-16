import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserElement } from './user-table/user-table.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: UserElement[] = [];
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<UserElement[]>('assets/users.json');
  }

  updateUsers(users: UserElement[]) {
    this.users = users;
  }
}
