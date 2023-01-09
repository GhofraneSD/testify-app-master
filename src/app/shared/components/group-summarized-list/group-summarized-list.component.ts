import { Component, Input } from '@angular/core';
import { Group } from '@app/shared/interfaces/group.interface';
import { GroupService } from '@app/shared/services/group.service';

@Component({
  selector: 'app-group-summarized-list',
  templateUrl: './group-summarized-list.component.html',
  styleUrls: ['./group-summarized-list.component.scss'],
})
export class GroupSummarizedListComponent {
  @Input() groups: Group[] = [];
  constructor(private groupService: GroupService) {}

  removeRequest(group: Group) {
    this.groupService.deletOne(group._id).subscribe(res => {
      console.log(res);
      let index = this.groups.indexOf(group);
      this.groups.splice(index, 1);
    });
  }
}
