import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  readonly open = model.required<boolean>();

  readonly title = input<string>('Bestätigung');
  readonly message = input.required<string>();
  readonly confirmLabel = input<string>('Übernehmen');
  readonly discardLabel = input<string>('Verwerfen');
  readonly cancelLabel = input<string>('Abbrechen');

  readonly confirmed = output<void>();
  readonly discarded = output<void>();
  readonly cancelled = output<void>();

  onConfirm(): void {
    this.open.set(false);
    this.confirmed.emit();
  }

  onDiscard(): void {
    this.open.set(false);
    this.discarded.emit();
  }

  onCancel(): void {
    this.open.set(false);
    this.cancelled.emit();
  }
}
