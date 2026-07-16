import { ClarityTaskDto, EffordDto } from './clarity-task-dto';
import { ClarityTasksService } from '../../clarity-tasks-service';
import { inject } from '@angular/core';

export class ClarityTask {
  id!: string;
  bezeichnung!: string;
  efford = new Map<Date, number>;

  static empty(): ClarityTask {
    const task = new ClarityTask();
    task.id = '';
    task.bezeichnung = '';
    task.efford = new Map<Date, number>();
    return task;
  }

  static fromDto(dto: ClarityTaskDto) {
    const task  = new ClarityTask();
    task .id = dto.id;
    task.bezeichnung = dto.bezeichnung;
    task.efford = new Map(
      dto.efford.map(([date, value]) => [
        new Date(date),
        value,
      ])
    );

    return task;
  }

  toDto(): ClarityTaskDto {
    return {
      id: this.id,
      bezeichnung: this.bezeichnung,
      efford: [...this.efford.entries()].map(([date, value]): EffordDto => [date.toISOString(), value]),
    };
  }
}
