import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizerRoutingModule } from './organizer-routing.module';
import { OrganizerComponent } from './organizer.component';
import { SharedModule } from '@app/shared/shared.module';
import { OnlyOrganizerUsersGuard } from './organizer-user-guard';

@NgModule({
  declarations: [OrganizerComponent],
  imports: [CommonModule, SharedModule, OrganizerRoutingModule],
  providers:[OnlyOrganizerUsersGuard]
})
export class OrganizerModule {}
