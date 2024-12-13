import { Injectable, OnDestroy, signal } from '@angular/core';
import { interval, map, Observable, take } from 'rxjs';

@Injectable()
export class TimerService implements OnDestroy {
  private remainingTime = signal<number>(0);
  intervalId: any;
  startTimer(seconds: number): void {
    this.remainingTime.set(seconds);

    const startTime = Date.now();
    this.intervalId = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      const timeLeft = seconds - elapsedTime;

      if (timeLeft >= 0) {
        this.remainingTime.set(timeLeft);
      } else {
        clearInterval(this.intervalId);
      }
    }, 500); // Adjust to 500ms for better precision.
  }

  getRemainingTime(): number {
    return this.remainingTime();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
