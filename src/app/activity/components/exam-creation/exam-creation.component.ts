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
import { DialogQuestionCreationComponent } from './dialog-question-creation/dialog-question-creation.component';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDatepickerToggle } from '@angular/material/datepicker';
import { GroupService } from '@app/shared/services/group.service';
import { Group } from '@app/shared/interfaces/group.interface';

@Component({
  selector: 'app-exam-creation',
  templateUrl: './exam-creation.component.html',
  styleUrls: ['./exam-creation.component.scss'],
})
export class ExamCreationComponent {
  @ViewChild('stepperExam') stepper!: MatStepper;

  options: string[] = [];

  groups!: Group[];
  thumbnail: any;
  exam!: Exam;
  questionPayload: Question = {
    text: '',
    choices: [{ choiceLabel: '', isTrue: false }],
  };
  questions: Question[] = [];
  //choicesPayload:any[] = [{"choiceLabel": "", "isTrue": false}];

  constructor(
    private examService: ExamService,
    private questionService: QuestionService,
    private groupService: GroupService,
    public dialog: MatDialog
  ) {
    this.groupService
      .getGroupsByModerator(localStorage.getItem('userId'))
      .subscribe(res => {
        this.groups = res;
        this.groups.forEach(gr => {
          this.options.push(gr.name);
        });
      });
  }

  examForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    expirationAfter: new FormControl(),
    group: new FormControl(),
    duration: new FormControl('', [Validators.required]),
  });

  public get name(): AbstractControl {
    return this.examForm.get('name')!;
  }

  public get description(): AbstractControl {
    return this.examForm.get('description')!;
  }

  public get duration(): AbstractControl {
    return this.examForm.get('duration')!;
  }

  public get expirationAfter(): AbstractControl {
    return this.examForm.get('expirationAfter')!;
  }

  public get group(): AbstractControl {
    return this.examForm.get('group')!;
  }

  saveExam(): void {
    if (this.examForm.invalid) {
      console.log('error sending form for exam');
      return;
    }

    let exam = this.examForm.getRawValue();
    exam.expirationAfter = this.createExpirationAfter(
      this.expirationAfter.value
    );

    let group = this.groups.find(gr => gr.name === this.group.value);
    exam.group = group?._id;
    console.log(exam);
    this.examService.save(exam).subscribe((res: Exam) => {
      console.log('exam created successfully !');
      this.exam = res;
      this.saveThumbnail();
      this.move(1);
    });
  }

  addQuestion() {
    this.questionPayload.choices.pop();
    console.log(this.questionPayload);
    this.questionService
      .saveQuestion(this.exam._id, this.questionPayload)
      .subscribe(res => {
        this.questions.push(res);
        this.questionPayload = {
          text: '',
          choices: [{ choiceLabel: '', isTrue: false }],
        };
        console.log(this.questions);
      });
  }

  createExpirationAfter(hours: number, date = new Date()) {
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    return date;
  }

  move(step: number) {
    this.stepper.selectedIndex = step;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogQuestionCreationComponent, {
      width: '1000px',
      data: this.questionPayload,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.questionPayload = result;
      this.addQuestion();
    });
  }

  fileChoosen(event: any) {
    if (event?.target) {
      this.thumbnail = <File>event.target.files[0];
    }
  }

  saveThumbnail() {
    let fd = new FormData();
    if (this.thumbnail) {
      fd.append('thumbnail', this.thumbnail, this.thumbnail.name);
      this.examService.saveThumbnail(fd, this.exam._id || '').subscribe(res => {
        if (res['success']) {
          console.log();
        }
      });
    }
  }
}
