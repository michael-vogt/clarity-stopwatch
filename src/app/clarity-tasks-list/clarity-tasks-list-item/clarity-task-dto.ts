export type TimeSpentDto = [date: string, value: number];

export interface ClarityTaskDto {
  id: string;
  bezeichnung: string;
  time_spent: TimeSpentDto[];
}
