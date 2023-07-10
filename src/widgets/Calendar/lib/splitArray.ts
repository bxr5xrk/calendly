import { Dayjs } from 'dayjs';

export function splitArray(arr: Dayjs[]) {
  const result = [];
  const chunkSize = 7;

  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }

  return result;
}
