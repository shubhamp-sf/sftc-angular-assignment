import { HttpClient } from '@angular/common/http';
import {
  EventEmitter,
  Injectable,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { UserElement, UserId } from './user-table/user-table.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  _users: UserElement[] = [];
  searchQuery: string = '';
  userUpdate = new EventEmitter();
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<UserElement[]>('assets/users.json');
  }
  set users(newData: UserElement[]) {
    console.log('setter');
    this._users = newData;
  }
  get users() {
    return this._users;
  }

  add(user: UserElement) {
    let newId = 1;
    if (this.users.length > 0) {
      newId = this.users[this.users.length - 1].id + 1;
    }
    this.users = [...this.users, { ...user, id: newId }];
    console.log(this.users);
  }

  updateAll(users: UserElement[]) {
    this.users = users;
    this.searchQuery = '';
  }

  patch(id: UserId, updatedData: Partial<UserElement>) {
    this.users = this.users.map((user) => {
      if (id !== user.id) {
        return user;
      }

      return { ...user, ...updatedData };
    });
  }

  delete(userId: UserId) {
    this.users = this.users.filter((user) => user.id !== userId);
  }

  filter(compareFunction: (user: UserElement) => boolean) {
    this.users = this.users.filter(compareFunction);
  }
}
