import { ClarityTaskDto } from './clarity-task-dto';

export function toDayKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export class ClarityTask {
  id!: string;
  bezeichnung!: string;
  gruppe!: string;
  effort = new Map<string, number>;

  static empty(): ClarityTask {
    const task = new ClarityTask();
    task.id = '';
    task.bezeichnung = '';
    task.gruppe = '';
    task.effort = new Map<string, number>();
    return task;
  }

  static fromDto(dto: ClarityTaskDto) {
    const task  = new ClarityTask();
    task.id = dto.id;
    task.bezeichnung = dto.bezeichnung;
    task.gruppe = dto.gruppe;
    task.effort = new Map(dto.effort);
    return task;
  }

  toDto(): ClarityTaskDto {
    return {
      id: this.id,
      bezeichnung: this.bezeichnung,
      gruppe: this.gruppe,
      effort: [...this.effort.entries()],
    };
  }

  withAddedEffort(date: Date, elapsedTime: number): ClarityTask {
    const key = toDayKey(date);
    const updatedEffort = new Map(this.effort);
    updatedEffort.set(key, (updatedEffort.get(key) ?? 0) + elapsedTime);

    const task = new ClarityTask();
    task.id = this.id;
    task.bezeichnung = this.bezeichnung;
    task.gruppe = this.gruppe;
    task.effort = updatedEffort;
    return task;
  }
}
