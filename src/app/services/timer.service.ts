import { Injectable } from '@angular/core';
import { interval, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  startTimer(seconds: number) {
    return interval(1000).pipe(
      take(seconds),
      map((elapsed) => seconds - elapsed - 1)
    );
  }
  constructor() { }
}
