import { Component, OnInit } from '@angular/core';
import { ExamService } from '@app/shared/services/exam.service';
import { Exam } from '@app/shared/interfaces/exam.interface';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.scss'],
})
export class ExamListComponent {
  exams: Exam[] = [];
  constructor(private examService: ExamService, private route: ActivatedRoute) {
    examService.getAll().subscribe(res => {
      this.exams = res;
    });
  }
}
