import { Routes, RouterModule } from '@angular/router';
import { ExamCreationComponent } from './components/exam-creation/exam-creation.component';
import { ExamDetailComponent } from './components/exam-detail/exam-detail.component';
import { ExamListComponent } from './components/exam-list/exam-list.component';
import { GroupCreationComponent } from './components/group-creation/group-creation.component';
import { QuestionStepperComponent } from './components/question-stepper/question-stepper.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'exam/new',
        component: ExamCreationComponent,
      },
      {
        path: 'exam',
        component: ExamListComponent,
      },
      {
        path: 'exam/:id',
        component: ExamDetailComponent,
      },
      {
        path: 'exam/:id/questions',
        component: QuestionStepperComponent,
      },
      {
        path: 'group/new',
        component: GroupCreationComponent,
      },
    ],
  },
];

export const ActivityRoutingModule = RouterModule.forChild(routes);
