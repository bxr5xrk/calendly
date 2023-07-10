import { getLabelsFromLS } from './../../lib/LS';
import { saveLabelsToLS } from '@entities/Label/lib/LS';
import { create } from 'zustand';
import { Label } from '../types/label';

const labelsFromLS = getLabelsFromLS();

interface LabelsState {
  filterIds: string[];
  setFilterIds: (i: string[]) => void;
  labels: Label[];
  setLabels: (i: Label[]) => void;
  onAppend: (label: Label) => void;
}

export const useLabelsStore = create<LabelsState>()((set) => ({
  labels: labelsFromLS || [],
  filterIds: [],
  setLabels: (data) =>
    set(() => {
      saveLabelsToLS(data);
      return { labels: data };
    }),
  onAppend: (label) =>
    set((state) => {
      saveLabelsToLS([...state.labels, label]);
      return { labels: [...state.labels, label] };
    }),
  setFilterIds: (data) => set(() => ({ filterIds: data })),
}));
