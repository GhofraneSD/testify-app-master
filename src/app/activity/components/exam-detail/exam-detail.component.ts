import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from '@app/shared/services/exam.service';
import { Exam } from '@app/shared/interfaces/exam.interface';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.css'],
})
export class ExamDetailComponent {
  exam: Exam={"name":"","duration":0,"description":""};
  constructor(private examService: ExamService, private route: ActivatedRoute) {
    examService
      .getOne(this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        this.exam = res;
      });
  }
}
