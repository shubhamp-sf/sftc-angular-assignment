import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserElement, UserId } from './user-table/user-table.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: UserElement[] = [];
  searchQuery: string = '';
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<UserElement[]>('assets/users.json');
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
