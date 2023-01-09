import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamDetailComponent } from './components/exam-detail/exam-detail.component';
import { ExamListComponent } from './components/exam-list/exam-list.component';
import { ExamCreationComponent } from './components/exam-creation/exam-creation.component';
import { DialogQuestionCreationComponent } from './components/exam-creation/dialog-question-creation/dialog-question-creation.component';
import { AuthRoutingModule } from '@app/auth/auth-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { ActivityRoutingModule } from './activity-routing.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { QuestionStepperComponent } from './components/question-stepper/question-stepper.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { GroupCreationComponent } from './components/group-creation/group-creation.component';
import { GroupListComponent } from './components/group-list/group-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ActivityRoutingModule,
  ],
  declarations: [ExamDetailComponent, ExamListComponent, ExamCreationComponent, QuestionStepperComponent,DialogQuestionCreationComponent, GroupCreationComponent, GroupListComponent],
  entryComponents:[ExamCreationComponent]
})
export class ActivityModule {}
