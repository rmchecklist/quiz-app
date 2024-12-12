import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Question } from '../components/quiz/quiz.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private dataSignal = signal<any>(null);

  setData(data: any) {
    this.dataSignal.set(data);
  }

  getData() {
    return this.dataSignal();
  }
}
