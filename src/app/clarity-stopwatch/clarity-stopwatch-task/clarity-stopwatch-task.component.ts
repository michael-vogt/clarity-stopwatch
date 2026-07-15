import { Component, computed, input, signal } from '@angular/core';
import { ClarityTask } from '../../clarity-tasks/clarity-tasks-list/clarity-tasks-list-item/clarity-task';
import { interval, Subscription } from 'rxjs';

export type ClarityTaskState = 'unselected' | 'selected';
export type ClarityTaskStopwatchState = 'running' | 'paused' | 'stopped';

@Component({
  selector: 'app-clarity-stopwatch-task',
  imports: [],
  templateUrl: './clarity-stopwatch-task.component.html',
  styleUrl: './clarity-stopwatch-task.component.scss',
})
export class ClarityStopwatchTaskComponent {

  readonly task = input.required<ClarityTask>();
  protected taskState = signal<ClarityTaskState>('unselected');
  protected taskStopwatchState = signal<ClarityTaskStopwatchState>('stopped');

  readonly classesTaskState = computed(() => {
    return {
      'clarity-task': true,
      'selected': this.taskState() === 'selected'
    };
  });

  readonly classesTaskStopwatchState = computed(() => {
    return {
      'clarity-task-stopwatch': true,
      'running': this.taskStopwatchState() === 'running',
      'paused': this.taskStopwatchState() === 'paused',
      'stopped': this.taskStopwatchState() === 'stopped'
    }
  });

  protected elapsedTime = signal<number>(0);
  readonly stopwatchTime = computed(() => {
    return this.formatTime(this.elapsedTime());
  });

  private timerSub?: Subscription;
  private startTime = 0;

  start(): void {
    if (this.timerSub) {
      return;
    }

    this.startTime = Date.now() - this.elapsedTime();
    this.timerSub = interval(100).subscribe(() => {
      this.elapsedTime.set(Date.now() - this.startTime);
      console.log(this.elapsedTime());
    });
    this.taskStopwatchState.set('running');
    this.taskState.set('selected');
  }

  pause(): void {
    this.timerSub?.unsubscribe();
    this.timerSub = undefined;
    this.taskStopwatchState.set('paused');
    this.taskState.set('selected');
  }

  stop(): void {
    this.pause();
    this.elapsedTime.set(0);
    this.taskStopwatchState.set('stopped');
    this.taskState.set('selected');
  }

  private formatTime(elapsedTime: number): string {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(value: number): string {
    return value.toString().padStart(2, '0');
  }

  changeTaskState():void {
    if (this.taskState() === 'unselected') {
      this.taskState.set('selected');
    } else {
      this.taskState.set('unselected');
    }
  }

  setTaskStopwatchState(taskStopwatchState: ClarityTaskStopwatchState): void {
    if (this.taskStopwatchState() !== taskStopwatchState) {
      this.taskStopwatchState.set(taskStopwatchState);
    }

    if (taskStopwatchState === 'running') {
      this.taskState.set('selected');
    }
  }


}
