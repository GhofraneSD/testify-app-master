import { Component, Input } from '@angular/core';
import { OrganizerRequest } from '@app/shared/interfaces/organizerRequest.interface';
import { UserService } from '@app/shared/services/user.service';

@Component({
  selector: 'app-request-summarized-list',
  templateUrl: './request-summarized-list.component.html',
  styleUrls: ['./request-summarized-list.component.scss'],
})
export class RequestSummarizedListComponent {
  @Input() requests: OrganizerRequest[] = [];

  constructor(private userService: UserService) {}

  acceptRequest(id: any) {
    this.userService.acceptOrganizerRequest(id).subscribe(res => {
      console.log(res);
      this.getRequests();
    });
  }

  rejectRequest(id: any) {
    this.userService.rejectOrganizerRequest(id).subscribe(res => {
      console.log(res);
      this.getRequests();
    });
  }

  getRequests() {
    this.userService.getAllOrganizerRequest().subscribe(res => {
      this.requests = res;
      console.log(res);
    });
  }
}
