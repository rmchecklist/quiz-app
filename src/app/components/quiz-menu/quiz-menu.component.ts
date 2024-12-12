import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-quiz-menu',
  imports: [MatCardModule],
  templateUrl: './quiz-menu.component.html',
  styleUrls: ['./quiz-menu.component.scss'],
})
export class QuizMenuComponent {
  private router = inject(Router);
  quizzes = [
    { id: 'us-states', name: 'US States and Capitals' },
    { id: 'countries', name: 'Countries and Capitals' },
  ];

  navigateToQuiz(id: string) {
    this.router.navigate([`/quiz/${id}`]);
  }
}
