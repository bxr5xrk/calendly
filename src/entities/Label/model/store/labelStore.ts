import { create } from 'zustand';
import { Label } from '../types/label';

interface LabelsState {
  filterIds: string[];
  setFilterIds: (i: string[]) => void;
  labels: Label[];
  setLabels: (i: Label[]) => void;
  onAppend: (label: Label) => void;
}

export const useLabelsStore = create<LabelsState>()((set) => ({
  labels: [],
  filterIds: [],
  setLabels: (data) => set(() => ({ labels: data })),
  onAppend: (label) => set((state) => ({ labels: [...state.labels, label] })),
  setFilterIds: (data) => set(() => ({ filterIds: data })),
}));
