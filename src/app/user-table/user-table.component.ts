import { Component, Inject, OnInit } from '@angular/core';
import {
  RolesArray,
  UserElement,
  UserFormControls,
  UserId,
  UserService,
} from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormGroup, FormBuilder } from '@angular/forms';

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
