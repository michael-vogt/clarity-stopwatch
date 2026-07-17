import { ClarityTaskDto, EffortDto } from './clarity-task-dto';
import { ClarityTasksService } from '../../clarity-tasks-service';
import { inject } from '@angular/core';

export function toDayKey(date: Date): string {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

export class ClarityTask {
  id!: string;
  bezeichnung!: string;
  effort = new Map<string, number>;

  static empty(): ClarityTask {
    const task = new ClarityTask();
    task.id = '';
    task.bezeichnung = '';
    task.effort = new Map<string, number>();
    return task;
  }

  static fromDto(dto: ClarityTaskDto) {
    const task  = new ClarityTask();
    task .id = dto.id;
    task.bezeichnung = dto.bezeichnung;
    task.effort = new Map(dto.effort);
    return task;
  }

  toDto(): ClarityTaskDto {
    return {
      id: this.id,
      bezeichnung: this.bezeichnung,
      effort: [...this.effort.entries()],
    };
  }
}
