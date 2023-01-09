import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '@app/shared/services/question.service';
import { Question } from '@app/shared/interfaces/question.interface';
import { FormArray, FormGroup } from '@angular/forms';
import { Choice } from '@app/shared/interfaces/choice.interface';
import { MatStepper } from '@angular/material/stepper';
import { number, string } from 'joi';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExamService } from '@app/shared/services/exam.service';
import { Exam } from '@app/shared/interfaces/exam.interface';
import { Answer } from '@app/shared/interfaces/answer.interface';

@Component({
  selector: 'app-question-stepper',
  templateUrl: './question-stepper.component.html',
  styleUrls: ['./question-stepper.component.scss'],
})
export class QuestionStepperComponent {
  questions: Question[] = [];
  chosenChoices: string[] = [];
  answer!: Answer;
  @ViewChild('stepperQ') stepper!: MatStepper;
  options: string[] = [];
  timeLeft: number = 0;
  exam!: Exam;
  display: any;
  numberCorrectAnswers = 0;
  numberAnswer: number = 0;

  constructor(
    private questionService: QuestionService,
    private examService: ExamService,
    private route: ActivatedRoute
  ) {
    questionService
      .getExamQuestions(this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        this.questions = res;
        this.getAnswer();
        for (let i = 1; i <= this.questions.length; i++) {
          this.options.push(i.toString());
        }
      });
    examService
      .getOne(this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        this.exam = res;
        this.timeLeft = this.exam.duration;
        this.timer(this.timeLeft);
      });
  }

  choseChoices(choice: string) {
    let index = this.chosenChoices.indexOf(choice);
    if (index > -1) this.chosenChoices.splice(index, 1);
    else this.chosenChoices.push(choice);
    console.log(this.chosenChoices);
  }

  answerQuestion(questionId: string) {
    this.questionService
      .saveAnswer(this.exam._id, questionId, {
        chosenChoices: this.chosenChoices,
      })
      .subscribe(res => {
        this.answer = res;
        if (this.answer.isCorrect) {
          this.numberCorrectAnswers++;
        }
        this.numberAnswer++;
      });
  }

  move(index: any) {
    this.stepper.selectedIndex = parseInt(index) - 1;
    this.getAnswer();
  }

  step(step: any) {
    this.move(this.stepper.selectedIndex + parseInt(step) + 1);
  }

  getAnswer() {
    let questionId = this.questions[this.stepper.selectedIndex]._id;
    this.questionService
      .retieveMyAnswerOnQuestion(this.exam._id, questionId)
      .subscribe(res => {
        this.answer = res;
        console.log(this.answer);
      });
  }

  timer(minute: number) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log('finished');
        clearInterval(timer);
      }
    }, 1000);
  }
}
