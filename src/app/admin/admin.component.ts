import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@app/shared/interfaces';
import { Exam } from '@app/shared/interfaces/exam.interface';
import { Group } from '@app/shared/interfaces/group.interface';
import { OrganizerRequest } from '@app/shared/interfaces/organizerRequest.interface';
import { ExamService } from '@app/shared/services/exam.service';
import { GroupService } from '@app/shared/services/group.service';
import { UserService } from '@app/shared/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  users: User[] = [];
  exams: Exam[] = [];
  groups: Group[] = [];
  requests: OrganizerRequest[] = [];

  constructor(
    private examService: ExamService,
    private userService: UserService,
    private groupService: GroupService,

    private router: ActivatedRoute
  ) {
    examService.getAll().subscribe(res => {
      console.log(res);
      this.exams = res;
    });

    userService.getAll().subscribe(res => {
      console.log(res);
      this.users = res;
    });

    groupService.getAll().subscribe(res => {
      console.log(res);
      this.groups = res;
    });

    userService.getAllOrganizerRequest().subscribe(res => {
      this.requests = res;
    });
  }
}
