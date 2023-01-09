import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Question} from '@app/shared/interfaces/question.interface';
import {Observable, tap} from 'rxjs';
import {Answer} from '../interfaces/answer.interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {
  }

  getExamQuestions(id: any): Observable<Question[]> {
    return this.http
      .get<Question[]>(`/api/exam/${id.toString()}/question`)
      .pipe(
        tap((questions: Question[]) => {
          console.log(questions);
        })
      );
  }

  saveQuestion(id: any, question: Question): Observable<Question> {
    return this.http
      .post<Question>(`/api/exam/${id.toString()}/question`, question)
      .pipe(
        tap((question: Question) => {
          console.log(question);
        })
      );
  }


  saveAnswer(ExamId: any, questionId: any, answer: Answer): Observable<Answer> {
    return this.http
      .post<Answer>(`/api/exam/${ExamId.toString()}/question/${questionId.toString()}/answer`, answer)
      .pipe(
        tap((answer: Answer) => {
          console.log(answer);
        })
      );
  }

  retieveMyAnswerOnQuestion(ExamId: any, questionId: any): Observable<Answer> {
    return this.http.get<Answer>(`/api/exam/${ExamId.toString()}/question/${questionId.toString()}/myAnswer`).pipe(
      tap((answer: Answer) => {
        console.log(answer);
      })
    )
  }
}
