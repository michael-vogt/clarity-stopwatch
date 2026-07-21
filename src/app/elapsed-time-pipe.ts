import { Pipe, PipeTransform } from '@angular/core';
import { Format } from './clarity-tasks/clarity-tasks-list/clarity-tasks-list.component';

/**
 * Pipe to transform elapsed time (ET, measured in milliseconds) to a string representation.
 * Default output format is hh:ii:ss
 * The pipe can ber configured via a parameter record. Recognized parameters are:
 * - shortForZeros (boolean): <code>true</code> to replace ET = 0 with something else; otherwise default format is used
 * - zeroReplacement (string): string expression to replace ET = 0 with (cf. shortForZeros)
 * - format (string): one of decimal, hms, hm
 *   - decimal: elapsed time as floating point representation (2 decimals) in hours, e.g. 1.25 = 1 hour and 15 minutes
 *   - hms **(default)**: normal time display including hours, minutes and seconds
 *   - hm: normal time display, including hours and minutes
 */
@Pipe({
  name: 'elapsedTime',
})
export class ElapsedTimePipe implements PipeTransform {
  transform(value: number, parameters: Record<string, any> = {}): string {
    const totalSeconds = Math.floor(value / 1000);

    const shortForZeros: boolean = parameters['shortForZeros'] ?? false;
    if (totalSeconds === 0 && shortForZeros) {
      return parameters['zeroReplacement'] ?? '';
    }

    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');

    const format: Format = parameters['format'] ?? 'hms';
    if (format === 'decimal') {
      return (totalSeconds / 3600).toFixed(2);
    } else if (format === 'hm') {
      return `${hours}:${minutes}`;
    } else {
      return `${hours}:${minutes}:${seconds}`;
    }
  }
}
