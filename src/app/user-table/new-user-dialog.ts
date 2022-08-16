import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolesArray, UserFormControls } from './user-table.component';

@Component({
  selector: 'new-user-dialog',
  templateUrl: 'new-user-dialog.html',
  styles: [
    '.new-user-form{ display: grid }',
    '.grid-inputs{ display: grid; gap: 1rem; grid-template-columns: repeat(3,auto) } ',
  ],
})
export class NewUserDialog {
  roles = RolesArray;

  userForm = this.fb.group(
    UserFormControls({
      firstName: 'Shubham',
      middleName: 'P',
      lastName: 'Dev',
      address: 'Vikas Nagar',
      phone: 8319505750,
      dob: '2001-09-19',
      email: 'hi@shubhamp.dev',
      role: 1,
    })
  );

  constructor(
    public dialogRef: MatDialogRef<NewUserDialog>,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  saveUser() {
    if (!this.userForm.valid) {
      this._snackBar.open('One or more inputs are invalid.');
      return;
    }
    this.dialogRef.close(this.userForm.value);
  }
}
