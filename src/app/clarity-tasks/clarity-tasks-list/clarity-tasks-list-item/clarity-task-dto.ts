export type EffortDto = [date: string, value: number];

export interface ClarityTaskDto {
  id: string;
  bezeichnung: string;
  effort: EffortDto[];
}
