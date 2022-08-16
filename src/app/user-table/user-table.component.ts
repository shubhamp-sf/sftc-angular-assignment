import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit {
  roles = RolesArray;
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
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}
  activateEditMode(user: UserElement) {
    this.editMode[user.id] = this.fb.group(UserFormControls(user));
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
  deleteUser(user: UserElement) {
    let dialogRef = this.dialog.open(DeleteUserDialog, {
      data: { email: user.email },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean | undefined) => {
      if (confirmed === true) {
        this.userService.delete(user.id);
      }
    });
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

// Delete User Dialog
@Component({
  selector: 'delete-user-dialog',
  templateUrl: 'delete-user-dialog.html',
})
export class DeleteUserDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { email: string }) {}
}
