import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ExamService } from '@app/shared/services/exam.service';
import { QuestionService } from '@app/shared/services/question.service';
import { Exam } from '@app/shared/interfaces/exam.interface';
import { Question } from '@app/shared/interfaces/question.interface';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import { Component, Inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'dialog-question-creation',
  templateUrl: 'dialog-question-creation.component.html',
})
export class DialogQuestionCreationComponent {
  questionPayload: Question = {
    text: '',
    choices: [{ choiceLabel: '', isTrue: false }],
  };
  //choicesPayload:any[] = [{"choiceLabel": "", "isTrue": false}];
  i: number = 0;

  editorConfig: AngularEditorConfig = {
    editable: true,
    minHeight: '6',
    customClasses: [{ name: 'rounded', class: 'rounded' }],
  };

  constructor(
    public dialogRef: MatDialogRef<DialogQuestionCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Question
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addChoice(isTrue: boolean) {
    this.i++;
    this.questionPayload.choices.push({ choiceLabel: '', isTrue: isTrue });
    console.log(this.questionPayload.choices);
  }
}
