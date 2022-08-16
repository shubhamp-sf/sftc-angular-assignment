import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

export enum Role {
  SuperAdmin = 1,
  Admin,
  Subscriber,
}

export interface UserElement {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  address: string;
  phone: number;
  dob: Date;
  role: Role;
}

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit {
  displayedColumns: string[] = [
    'firstName',
    'middleName',
    'lastName',
    'email',
    'address',
    'phone',
    'dob',
    'role',
  ];
  constructor(public userService: UserService) {}

  ngOnInit(): void {}
}
