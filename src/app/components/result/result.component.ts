import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Question } from '../quiz/quiz.model';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-result',
  imports: [RouterLink],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent {
  private route = inject(ActivatedRoute);
  private quizService = inject(QuizService);

  correctAnswers = 0;
  totalQuestions = 0;
  scorePercentage = 0;
  questions!: Question[];

  constructor() {
    effect(() => {
      this.questions = this.quizService.getData();
      this.totalQuestions = this.questions.length;
      this.correctAnswers = this.questions.filter(
        (q) => q.capital === q.selected
      ).length;
      this.scorePercentage = Math.round(
        (this.correctAnswers / this.questions.length) * 100
      );
    });
  }
}
