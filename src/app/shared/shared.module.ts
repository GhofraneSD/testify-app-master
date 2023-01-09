import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import {
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatStepper } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ExamSummarizedListComponent } from './components/exam-summarized-list/exam-summarized-list.component';
import { UserSummarizedListComponent } from './components/user-summarized-list/user-summarized-list.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { GroupSummarizedListComponent } from './components/group-summarized-list/group-summarized-list.component';
import { RequestSummarizedListComponent } from './components/request-summarized-list/request-summarized-list.component';

@NgModule({
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatMenuModule,
    MatTabsModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTreeModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatStepperModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    UserSummarizedListComponent,
    ExamSummarizedListComponent,
    GroupSummarizedListComponent,
    RequestSummarizedListComponent,
    AngularEditorModule,
    MaterialFileInputModule,
    MatBadgeModule,
    MatDatepickerModule,
  ],
  declarations: [
    ExamSummarizedListComponent,
    UserSummarizedListComponent,
    GroupSummarizedListComponent,
    RequestSummarizedListComponent,
  ],
})
export class SharedModule {}
