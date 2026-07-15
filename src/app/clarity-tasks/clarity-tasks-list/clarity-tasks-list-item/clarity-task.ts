import { ClarityTaskDto } from './clarity-task-dto';

export class ClarityTask {
  id!: string;
  bezeichnung!: string;
  efford = new Map<Date, number>;

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
}
