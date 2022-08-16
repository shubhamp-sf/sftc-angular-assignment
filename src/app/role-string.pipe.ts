import { Pipe, PipeTransform } from '@angular/core';
import { Role } from './user-table/user-table.component';

@Pipe({
  name: 'roleString',
})
export class RoleStringPipe implements PipeTransform {
  transform(value: Role): unknown {
    let labels = [];
    labels[Role.SuperAdmin] = 'Super Admin';
    labels[Role.Admin] = 'Admin';
    labels[Role.Subscriber] = 'Subscriber';

    return labels[value];
  }
}
