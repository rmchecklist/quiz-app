import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { TimerService } from '../../services/timer.service';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Question } from './quiz.model';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz',
  imports: [MatCardModule, AsyncPipe, MatButtonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private timerService = inject(TimerService);
  private httpClient = inject(HttpClient);
  private quizService = inject(QuizService);

  quizName = '';
  question = '';
  options: string[] = [];
  timer: any;

  allQuestions!: Question[];
  prefix!: string;
  shuffledQuestions!: Question[];
  currentQuestion: any;
  currentOptions: any;
  currentQuestionIndex = 0;
  answers: (string | null)[] = [];

  ngOnInit() {
    const quizId = this.route.snapshot.paramMap.get('id');
    const numberOfQuestions =
      this.route.snapshot.queryParamMap.get('questions') || 0;
    const totalTime = this.route.snapshot.queryParamMap.get('time');

    this.loadQuizData(quizId, +numberOfQuestions, totalTime);
  }

  loadQuizData(
    quizId: string | null,
    numberOfQuestions: number,
    totalTime: string | null
  ) {
    if (quizId) {
      this.httpClient
        .get(`/assets/quiz/${quizId}-states-capitals.json`)
        .subscribe((data: any) => {
          this.allQuestions = data.questions;
          this.prefix = data.prefix;
          this.shuffledQuestions = this.shuffleArray(this.allQuestions).slice(
            0,
            numberOfQuestions
          );
          this.displayQuestion();
          this.quizName = data.quizName;
          this.timer = this.timerService.startTimer(+(totalTime || 0) * 60);
        });
    }
  }

  displayQuestion() {
    this.currentQuestion =
      this.shuffledQuestions[this.currentQuestionIndex].state;
    const correctOption = this.currentQuestion.capital;
    const incorrectOptions = this.allQuestions
      .filter((question) => question.state !== this.currentQuestion.state)
      .map((ques) => ques.capital)
      .slice(0, 4);
    this.currentOptions = this.shuffleArray([
      ...incorrectOptions,
      correctOption,
    ]);
  }
  shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

  selectOption(option: string) {
    this.shuffledQuestions[this.currentQuestionIndex].selected = option;
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex < this.shuffledQuestions.length) {
      this.displayQuestion();
    } else {
      this.quizService.setData(this.shuffledQuestions);
      this.router.navigate(['/result']);
    }
  }
}
