import { Component, computed, inject, input, model, signal } from '@angular/core';
import { ClarityTask, toDayKey } from '../../clarity-tasks/clarity-tasks-list/clarity-tasks-list-item/clarity-task';
import { switchMap } from 'rxjs';
import { ClarityStopwatchService, StopwatchState } from '../clarity-stopwatch.service';
import { AsyncPipe } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { ClarityTasksService } from '../../clarity-tasks/clarity-tasks-service';
import { ElapsedTimePipe } from '../../elapsed-time-pipe';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-clarity-stopwatch-task',
  imports: [AsyncPipe, ElapsedTimePipe, ConfirmDialogComponent],
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

  readonly date = input.required<Date>();
  currentEffort = computed(() => {
    console.log(toDayKey(this.date()));
    return this.task().effort.get(toDayKey(this.date())) ?? 0;
  });

  readonly currentlySelectedTaskId = input.required<string | null>();
  readonly selected = model.required<boolean>();

  readonly state$ = toObservable(this.taskId).pipe(
    switchMap((id) => this.stopwatchService.getState(id)),
  );

  protected internalState = signal<StopwatchState>(StopwatchState.Stopped);

  readonly classesTaskState = computed(() => {
    return {
      'clarity-task': true,
      selected: this.selected(),
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

  start(): void {
    this.stopwatchService.start(this.task().id);
  }

  pause(): void {
    this.stopwatchService.pause(this.task().id);
  }

  protected readonly showStopConfirm = signal(false);
  private readonly pendingElapsedTime = signal(0);

  protected readonly stopConfirmMessage = computed(() => {
    const formattedTime = this.stopwatchService.formatDuration(this.pendingElapsedTime());
    return `Soll die gestoppte Zeit von ${formattedTime} für "${this.task().bezeichnung}" übernommen werden?`;
  });

  stop(): void {
    this.pendingElapsedTime.set(this.stopwatchService.get(this.taskId())?.elapsedTime ?? 0);
    this.showStopConfirm.set(true);
    /*const elapsedTime = this.stopwatchService.get(this.taskId())?.elapsedTime ?? 0;
    const formattedTime = this.stopwatchService.formatDuration(elapsedTime);

    const confirmed = confirm(
      `Soll die gestoppte Zeit von ${formattedTime} für "${this.task().bezeichnung}" übernommen werden?`
    );

    if (!confirmed) {
      return;
    }

    this.taskService.addElapsedTime(this.taskId(), elapsedTime, this.date());
    this.stopwatchService.stop(this.task().id);*/
  }

  protected onStopConfirmed(): void {
    this.taskService.addElapsedTime(this.taskId(), this.pendingElapsedTime(), this.date());
    this.stopwatchService.stop(this.task().id);
  }

  protected onStopDiscarded(): void {
    this.stopwatchService.stop(this.task().id);
  }

  protected onStopCancelled(): void {
    // nothing to do, stopwatch keeps running / pausing
  }

  selectTask(): void {
    const taskId = this.currentlySelectedTaskId();
    const oldSelectedTask = taskId ? this.taskService.findTask(taskId) : undefined;

    if (!oldSelectedTask) {
      this.selected.set(true);
    } else {
      if (oldSelectedTask !== this.task()) {
        this.stopwatchService.pauseIfRunning(oldSelectedTask.id);
        this.selected.set(true);
      } else {
        if (this.internalState() === StopwatchState.Running) {
          this.pause();
        } else {
          this.start();
        }
      }
    }
  }

  protected readonly StopwatchState = StopwatchState;
}
