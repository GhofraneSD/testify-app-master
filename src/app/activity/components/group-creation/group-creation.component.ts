import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { User } from '@app/shared/interfaces';
import { Group } from '@app/shared/interfaces/group.interface';
import { GroupService } from '@app/shared/services/group.service';
import { UserService } from '@app/shared/services/user.service';

@Component({
  selector: 'app-group-creation',
  templateUrl: './group-creation.component.html',
  styleUrls: ['./group-creation.component.scss'],
})
export class GroupCreationComponent {
  @ViewChild('stepperGroup') stepper!: MatStepper;
  group!: Group;
  users!: User[];
  members!: User[];

  constructor(
    private groupService: GroupService,
    private userService: UserService
  ) {
    this.userService.getAll().subscribe((res: User[]) => {
      this.users = res;
    });
  }
  groupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  public get name(): AbstractControl {
    return this.groupForm.get('name')!;
  }

  public get description(): AbstractControl {
    return this.groupForm.get('description')!;
  }

  saveGroup(): void {
    if (this.groupForm.invalid) {
      console.log('error sending form for group');
      return;
    }

    let group = this.groupForm.getRawValue();

    this.groupService.save(group).subscribe((res: Group) => {
      console.log('exam created successfully !');
      this.group = res;

      this.stepper.next();
    });
  }

  addUserToGroup(user: User) {
    this.groupService.addUserToGroup(this.group._id, user._id).subscribe(() => {
      this.members.push(user);
      this.users = this.users.slice(this.users.indexOf(user));
    });
  }
}
