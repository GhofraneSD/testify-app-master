import { Component, Input } from '@angular/core';
import { User } from '@app/shared/interfaces';
import { UserService } from '@app/shared/services/user.service';
import { Exam } from '@app/shared/interfaces/exam.interface';
import { ExamService } from '@app/shared/services/exam.service';
import { ActivatedRoute } from '@angular/router';
import { MatNavList } from '@angular/material/list';
import { MatMenu } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-exam-summarized-list',
  templateUrl: './exam-summarized-list.component.html',
  styleUrls: ['./exam-summarized-list.component.scss'],
})
export class ExamSummarizedListComponent {
  @Input() exams: Exam[] = [];

  constructor(
    private examService: ExamService,
    private router: ActivatedRoute
  ) {}

  deleteExam(exam: any) {
    this.examService.deletOne(exam._id).subscribe(res => {
      console.log(res);
      this.exams.splice(this.exams.indexOf(exam), 1);
    });
  }
}
