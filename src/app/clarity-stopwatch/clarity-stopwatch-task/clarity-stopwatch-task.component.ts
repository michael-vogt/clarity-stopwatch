import { Component, computed, inject, input, signal } from '@angular/core';
import { ClarityTask } from '../../clarity-tasks/clarity-tasks-list/clarity-tasks-list-item/clarity-task';
import { Subscription, switchMap } from 'rxjs';
import { ClarityStopwatchService, StopwatchState } from '../clarity-stopwatch.service';
import { AsyncPipe } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ClarityTasksService } from '../../clarity-tasks/clarity-tasks-service';

@Component({
  selector: 'app-clarity-stopwatch-task',
  imports: [AsyncPipe],
  templateUrl: './clarity-stopwatch-task.component.html',
  styleUrl: './clarity-stopwatch-task.component.scss',
})
export class ClarityStopwatchTaskComponent {
  private readonly stopwatchService = inject(ClarityStopwatchService);
  private readonly taskService = inject(ClarityTasksService);

  readonly task = input.required<ClarityTask>();
  private readonly taskId = computed(() => this.task().id);
  readonly time$ = toObservable(this.taskId).pipe(
    switchMap((id) => this.stopwatchService.getFormattedTime(id)),
  );

  readonly state$ = toObservable(this.taskId).pipe(
    switchMap((id) => this.stopwatchService.getState(id)),
  );

  protected internalState = signal<StopwatchState>(StopwatchState.Stopped);
  private subscription?: Subscription;

  readonly classesTaskState = computed(() => {
    return {
      'clarity-task': true,
      selected: this.isSelected(),
    };
  });

  readonly classesTaskStopwatchState = computed(() => {
    return {
      'clarity-task-stopwatch': true,
      running: this.internalState() === StopwatchState.Running,
      paused: this.internalState() === StopwatchState.Paused,
      stopped: this.internalState() === StopwatchState.Stopped,
    };
  });

  protected isSelected = computed(() => {
    const selected = this.taskService.selectedTask();
    return selected?.id === this.taskId();
  });

  ngOnInit(): void {
    this.subscription = this.state$.subscribe((state) => {
      this.internalState.set(state);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  start(): void {
    this.stopwatchService.start(this.task().id);
  }

  pause(): void {
    this.stopwatchService.pause(this.task().id);
  }

  stop(): void {
    const newDate = new Date('2026-07-16');
    const elapsedTime = this.stopwatchService.get(this.taskId())?.elapsedTime ?? 0;

    /*const map = this.task().efford;
    const key = [...map.keys()].find(d => d.getTime() === newDate.getTime()) ?? newDate;



    const elapsedTime = this.stopwatchService.get(this.taskId())?.elapsedTime ?? 0;
    const oldElapsedTime = this.taskService.findTask(this.taskId())?.efford.get(key) ?? 0;

    this.task().efford.set(key, oldElapsedTime + elapsedTime);*/
    this.taskService.addElapsedTime(this.taskId(), elapsedTime, newDate);
    console.log(this.task().efford);
    this.stopwatchService.stop(this.task().id);
  }

  selectTask(): void {
    const oldSelectedTask = this.taskService.selectTask(this.task());
    if (oldSelectedTask !== this.task()) {
      this.stopwatchService.pauseIfRunning(oldSelectedTask.id);
    } else {
      if (this.internalState() === StopwatchState.Running) {
        this.pause();
      } else if (this.internalState() === StopwatchState.Paused || this.internalState() === StopwatchState.Stopped) {
        this.start();
      }
    }

  }

  protected readonly StopwatchState = StopwatchState;
}
