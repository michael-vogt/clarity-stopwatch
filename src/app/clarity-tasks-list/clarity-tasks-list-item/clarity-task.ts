import { ClarityTaskDto } from './clarity-task-dto';

export class ClarityTask {
  id!: string;
  bezeichnung!: string;
  time_spent = new Map<Date, number>;

  static fromDto(dto: ClarityTaskDto) {
    const task  = new ClarityTask();
    task .id = dto.id;
    task.bezeichnung = dto.bezeichnung;
    task.time_spent = new Map(
      dto.time_spent.map(([date, value]) => [
        new Date(date),
        value,
      ])
    );

    return task;
  }
}
