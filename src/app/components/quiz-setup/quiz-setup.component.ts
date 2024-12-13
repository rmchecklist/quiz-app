import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quiz-setup',
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './quiz-setup.component.html',
  styleUrl: './quiz-setup.component.scss',
})
export class QuizSetupComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  numberOfQuestions: number = 10;
  totalTime: number = 10; // in minutes

  startQuiz() {
    const quizId = this.route.snapshot.paramMap.get('id');
    this.router.navigate([`/quiz/${quizId}`], {
      queryParams: {
        questions: this.numberOfQuestions,
        time: this.totalTime,
      },
    });
  }
}
