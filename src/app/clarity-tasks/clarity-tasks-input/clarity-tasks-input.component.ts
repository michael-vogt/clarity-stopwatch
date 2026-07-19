import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClarityTask } from '../clarity-tasks-list/clarity-tasks-list-item/clarity-task';
import { ClarityTasksService } from '../clarity-tasks-service';

@Component({
  selector: 'app-clarity-tasks-input',
  templateUrl: './clarity-tasks-input.component.html',
  styleUrl: './clarity-tasks-input.component.scss',
  imports: [ReactiveFormsModule],
})
export class ClarityTasksInputComponent {

  private readonly taskService = inject(ClarityTasksService);
  readonly internalTask = signal<ClarityTask>(ClarityTask.empty());

  updateTask(bezeichnung: string, gruppe: string, id: string) {
    this.internalTask.update((oldTask) => {
      const task = new ClarityTask();
      task.bezeichnung = bezeichnung;
      task.gruppe = gruppe;
      task.id = id;
      task.effort = oldTask.effort;
      return task;
    });
  }

  private fb = inject(FormBuilder);
  MAX_BEZEICHNUNG_LENGTH = 100;
  MAX_GRUPPE_LENGTH = 50;
  form = this.fb.nonNullable.group({
    bezeichnung: ['', [Validators.required, Validators.maxLength(this.MAX_BEZEICHNUNG_LENGTH)]],
    gruppe: ['', [Validators.required, Validators.maxLength(this.MAX_GRUPPE_LENGTH)]],
    id: ['', [Validators.required]],
  });

  get bezeichnung() {
    return this.form.controls.bezeichnung;
  }

  get gruppe() {
    return this.form.controls.gruppe;
  }

  get id() {
    return this.form.controls.id;
  }

  hasError(ctrl: FormControl<string>, error: string): boolean {
    return (ctrl.touched && ctrl.hasError(error));
  }

  speichern(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    //console.log(this.internalTask());
    this.taskService.addTask(this.internalTask());
    this.form.reset();
  }
}
