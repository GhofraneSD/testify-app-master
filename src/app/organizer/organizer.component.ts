import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exam } from '@app/shared/interfaces/exam.interface';
import { Group } from '@app/shared/interfaces/group.interface';
import { ExamService } from '@app/shared/services/exam.service';
import { GroupService } from '@app/shared/services/group.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css'],
})
export class OrganizerComponent {
  exams: Exam[] = [];
  groups: Group[] = [];
  userId = localStorage.getItem('userId');
  
  constructor(
    private examService: ExamService,
    private groupService: GroupService,
    private router: ActivatedRoute
  ) {
    examService.getByOrganizer(this.userId).subscribe(res => {
      console.log(res);
      this.exams = res;
    });

    groupService.getGroupsByModerator(this.userId).subscribe(res => {
      console.log(res);
      this.groups = res;
    });
  }
}
