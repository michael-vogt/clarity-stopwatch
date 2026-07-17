export type EffortDto = [date: string, value: number];

export interface ClarityTaskDto {
  id: string;
  bezeichnung: string;
  gruppe: string;
  effort: EffortDto[];
}
