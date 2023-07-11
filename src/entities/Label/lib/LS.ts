import { Label } from '../model/types/label';

const LS_KEY = 'task-labels';

export const saveLabelsToLS = (labels: Label[]) =>
  localStorage.setItem(LS_KEY, JSON.stringify(labels));

export const getLabelsFromLS = (): Label[] | null =>
  JSON.parse(localStorage.getItem(LS_KEY) || 'null') as Label[] | null;
