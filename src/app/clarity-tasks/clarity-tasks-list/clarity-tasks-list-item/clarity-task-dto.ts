export type EffordDto = [date: string, value: number];

export interface ClarityTaskDto {
  id: string;
  bezeichnung: string;
  efford: EffordDto[];
}
