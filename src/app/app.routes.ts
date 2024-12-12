import { Routes } from '@angular/router';
import { QuizMenuComponent } from './components/quiz-menu/quiz-menu.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { QuizSetupComponent } from './components/quiz-setup/quiz-setup.component';
import { ResultComponent } from './components/result/result.component';

export const routes: Routes = [
  { path: '', component: QuizMenuComponent },
  { path: 'quiz/setup/:id', component: QuizSetupComponent },
  { path: 'quiz/:id', component: QuizComponent },
  { path: 'result', component: ResultComponent },
  { path: 'admin', component: AdminPanelComponent },
];
