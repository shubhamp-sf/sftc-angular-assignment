import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewUserDialog } from '../user-table/new-user-dialog';
import { UserElement, UserService } from '../user.service';

@Component({
  selector: 'app-bulk-action',
  templateUrl: './bulk-action.component.html',
  styleUrls: ['./bulk-action.component.css'],
})
export class BulkActionComponent implements OnInit {
  constructor(public userService: UserService, public dialog: MatDialog) {}
  ngOnInit(): void {}
  openNewUserDialog() {
    let dialogRef = this.dialog.open(NewUserDialog);
    dialogRef
      .afterClosed()
      .subscribe((user: UserElement | undefined | false) => {
        if (!user) {
          return;
        }
        this.userService.add(user);
      });
  }
}
