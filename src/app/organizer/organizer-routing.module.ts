import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyOrganizerUsersGuard } from './organizer-user-guard';
import { RouterModule, Routes } from '@angular/router';
import { OrganizerComponent } from './organizer.component';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [OnlyOrganizerUsersGuard],
    children: [
      {
        path: '',
        component: OrganizerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizerRoutingModule {}
