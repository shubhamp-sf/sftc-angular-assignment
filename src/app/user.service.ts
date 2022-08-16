import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  _users: UserElement[] = [];
  searchQuery: string = '';
  userUpdate = new EventEmitter();
  dirty = false;
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<UserElement[]>('assets/users.json');
  }
  set users(newData: UserElement[]) {
    this.dirty = true;
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

export enum Role {
  SuperAdmin = 1,
  Admin,
  Subscriber,
}
export const RolesArray = [Role.SuperAdmin, Role.Admin, Role.Subscriber];
export const UserFormControls = (defaults: Partial<UserElement> = {}) => ({
  firstName: [defaults.firstName || '', Validators.required],
  middleName: [defaults.middleName || ''],
  lastName: [defaults.lastName || '', Validators.required],
  email: [defaults.email || '', [Validators.required, Validators.email]],
  address: [defaults.address || '', [Validators.required]],
  phone: [
    defaults.phone || '',
    [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
      Validators.pattern('[0-9]*'),
    ],
  ],
  dob: [defaults.dob || '', Validators.required],
  role: [defaults.role || Role.Subscriber, Validators.required],
});
export type UserId = number;
export interface UserElement {
  id: UserId;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  address: string;
  phone: number;
  dob: string;
  role: Role;
}
