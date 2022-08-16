import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export enum Role {
  SuperAdmin = 1,
  Admin,
  Subscriber,
}

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

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit {
  roles = [Role.SuperAdmin, Role.Admin, Role.Subscriber];
  displayedColumns: string[] = [
    'firstName',
    // 'middleName',
    'lastName',
    'email',
    'address',
    'phone',
    'dob',
    'role',
    'action',
  ];
  editMode: { [key: UserId]: FormGroup } = {};
  constructor(
    public userService: UserService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  activateEditMode(user: UserElement) {
    // this.editMode[user.id] = cloneDeep(user);
    this.editMode[user.id] = this.fb.group({
      firstName: [user.firstName, Validators.required],
      middleName: [user.middleName],
      lastName: [user.lastName, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      address: [user.address, [Validators.required]],
      phone: [
        user.phone,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern('[0-9]*'),
        ],
      ],
      dob: [user.dob, Validators.required],
      role: [user.role, Validators.required],
    });

    console.log(this.editMode[user.id]);
  }
  deactiveEditMode(userId: UserId) {
    delete this.editMode[userId];
  }
  saveChanges(userId: UserId) {
    if (!this.editMode[userId].valid) {
      this._snackBar.open('Invalid input!');
      return;
    }
    this.userService.patch(userId, this.editMode[userId].value);
    this.deactiveEditMode(userId);
  }
  deleteUser(userId: UserId) {
    this.userService.delete(userId);
  }
  shouldHide(user: UserElement) {
    let q = this.userService.searchQuery.toLowerCase();
    if (!q) {
      return false;
    }
    let searchString = [
      user.firstName,
      user.middleName,
      user.lastName,
      user.email,
      user.address,
      user.phone,
    ]
      .join(' ')
      .toLowerCase();

    if (!searchString.includes(q)) {
      return true;
    }
    return false;
  }
}
