import { Component, Input } from '@angular/core';
import { UserService } from '@app/shared/services/user.service';
import { User } from '@app/shared/interfaces';

@Component({
  selector: 'app-user-summarized-list',
  templateUrl: './user-summarized-list.component.html',
  styleUrls: ['./user-summarized-list.component.scss'],
})
export class UserSummarizedListComponent {
  @Input() users: User[] = [];

  constructor(private userService: UserService) {
  
  }
}
