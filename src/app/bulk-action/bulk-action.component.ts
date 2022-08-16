import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-bulk-action',
  templateUrl: './bulk-action.component.html',
  styleUrls: ['./bulk-action.component.css'],
})
export class BulkActionComponent implements OnInit, OnChanges {
  query: string = '';
  constructor(private userService: UserService) {}
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
  }
  queryChange(query: string) {
    this.userService.searchQuery = query;
  }
}
