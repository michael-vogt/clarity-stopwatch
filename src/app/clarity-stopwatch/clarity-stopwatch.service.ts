import { inject, Injectable, Service } from '@angular/core';
import { ClarityTasksService } from '../clarity-tasks/clarity-tasks-service';
import { BehaviorSubject, interval, map, Observable, Subscription } from 'rxjs';

export enum StopwatchState {
  Stopped = 'stopped',
  Running = 'running',
  Paused = 'paused',
}

interface Stopwatch {
  elapsedTime: number;
  startTime: number;
  timer?: Subscription;
  subject: BehaviorSubject<number>;
  state: BehaviorSubject<StopwatchState>;
}

@Service()
export class ClarityStopwatchService {

  private readonly taskService = inject(ClarityTasksService);

  private stopwatches = new Map<string, Stopwatch>();

  public get(taskId: string): Stopwatch | undefined {
    return this.stopwatches.get(taskId);
  }

  private getOrCreate(taskId: string): Stopwatch {
    let stopwatch = this.stopwatches.get(taskId);

    if (!stopwatch) {
      stopwatch = {
        elapsedTime: 0,
        startTime: 0,
        subject: new BehaviorSubject<number>(0),
        state: new BehaviorSubject<StopwatchState>(StopwatchState.Stopped)
      };

      this.stopwatches.set(taskId, stopwatch);
    }
    return stopwatch;
  }

  start(taskId: string): void {
    const stopwatch = this.getOrCreate(taskId);

    if (stopwatch.timer) {
      return;
    }

    stopwatch.startTime = Date.now() - stopwatch.elapsedTime;
    stopwatch.state.next(StopwatchState.Running);

    stopwatch.timer = interval(1000).subscribe(() => {
      stopwatch.elapsedTime = Date.now() - stopwatch.startTime;
      stopwatch.subject.next(stopwatch.elapsedTime);
    });
  }

  pause(taskId: string): void {
    const stopwatch = this.stopwatches.get(taskId);
    if (!stopwatch) {
      return;
    }

    this.stopTimer(stopwatch);
    stopwatch.state.next(StopwatchState.Paused);
  }

  pauseIfRunning(taskId: string): void {
    const stopwatch = this.stopwatches.get(taskId);
    if (!stopwatch) {
      return;
    }

    if (stopwatch.state.value == StopwatchState.Running) {
      this.pause(taskId);
    }
  }

  stop(taskId: string): void {
    const stopwatch = this.getOrCreate(taskId);
    this.stopTimer(stopwatch);
    stopwatch.elapsedTime = 0;
    stopwatch.subject.next(0);
    stopwatch.state.next(StopwatchState.Stopped);
  }

  getTime(taskId: string): Observable<number> {
    return this.getOrCreate(taskId).subject.asObservable();
  }

  getFormattedTime(taskId: string): Observable<string> {
    return this.getTime(taskId).pipe(
      map(ms => this.format(ms))
    );
  }

  getState(taskId: string): Observable<StopwatchState> {
    return this.getOrCreate(taskId).state.asObservable();
  }

  private stopTimer(stopwatch: Stopwatch): void {
    stopwatch.timer?.unsubscribe();
    stopwatch.timer = undefined;
  }

  private format(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [
      hours,
      minutes,
      seconds
    ]
      .map(v => v.toString().padStart(2, '0'))
      .join(':');
  }



}
