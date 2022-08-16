import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// material components
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

// cutom components
import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';
import { BulkActionComponent } from './bulk-action/bulk-action.component';
import {
  DeleteUserDialog,
  UserTableComponent,
} from './user-table/user-table.component';
import { RoleStringPipe } from './role-string.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewUserDialog } from './user-table/new-user-dialog';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    HeaderComponent,
    BulkActionComponent,
    UserTableComponent,
    DeleteUserDialog,
    NewUserDialog,
    RoleStringPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
