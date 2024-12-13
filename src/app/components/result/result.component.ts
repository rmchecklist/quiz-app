import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Question } from '../quiz/quiz.model';
import { QuizService } from '../../services/quiz.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-result',
  imports: [RouterLink, MatTableModule, MatCardModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent {
  private route = inject(ActivatedRoute);
  private quizService = inject(QuizService);

  columnConfig: any[] = [
    {
      display: 'State',
      column: 'state',
    },
    {
      display: 'Capital',
      column: 'capital',
    },
    {
      display: 'Selected',
      column: 'selected',
    },
    {
      display: 'Status',
      column: 'isCorrect',
    },
  ];

  displayedColumns = this.columnConfig.map((col) => col.column);

  dataSource: any = [];

  correctAnswers = 0;
  totalQuestions = 0;
  scorePercentage = 0;
  questions!: Question[];

  constructor() {
    effect(() => {
      this.questions = this.quizService.getData();
      this.dataSource = this.questions;
      this.totalQuestions = this.questions?.length;
      this.correctAnswers = this.questions.filter(
        (q) => q.capital === q.selected
      ).length;
      this.scorePercentage = Math.round(
        (this.correctAnswers / this.questions.length) * 100
      );
    });
  }
}
