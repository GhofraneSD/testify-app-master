import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exam } from '@app/shared/interfaces/exam.interface';
import { number } from 'joi';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  constructor(private http: HttpClient) {}

  save(exam: Exam): Observable<Exam> {
    return this.http.post<Exam>('/api/exam', exam).pipe(
      tap((exam: Exam) => {
        console.log(exam);
        return exam;
      })
    );
  }

  getAll(): Observable<Exam[]> {
    return this.http.get<Exam[]>('/api/exam').pipe(
      tap((exams: Exam[]) => {
        console.log(exams);
        return exams;
      })
    );
  }

  getByOrganizer(id: any): Observable<Exam[]> {
    return this.http.get<Exam[]>('/api/exam/organizedBy/' + id.toString()).pipe(
      tap((exams: Exam[]) => {
        console.log(exams);
        return exams;
      })
    );
  }

  getOne(id: any): Observable<Exam> {
    return this.http.get<Exam>('/api/exam/' + id.toString()).pipe(
      tap((exam: Exam) => {
        console.log(exam);
        return exam;
      })
    );
  }

  passExam(id: any): Observable<Exam> {
    return this.http
      .patch<Exam>('/api/exam/' + id.toString() + '/pass', {})
      .pipe(
        tap(() => {
          console.log('passing exam started');
        })
      );
  }

  deletOne(id: any): Observable<Exam> {
    return this.http.delete<Exam>('/api/exam/' + id.toString()).pipe(
      tap(() => {
        console.log('exam deleted');
      })
    );
  }

  saveThumbnail(image: any, examId: string) {
    return this.http.post(`/api/exam/${examId}/thumbnail`, image);
  }
}
