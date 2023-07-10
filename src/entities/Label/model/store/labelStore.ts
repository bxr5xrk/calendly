import { create } from 'zustand';
import { Label } from '../types/label';

interface LabelsState {
  labels: Label[];
  setLabels: (i: Label[]) => void;
  onAppend: (label: Label) => void;
}

export const useLabelsStore = create<LabelsState>()((set) => ({
  labels: [],
  setLabels: (data) => set(() => ({ labels: data })),
  onAppend: (label) => set((state) => ({ labels: [...state.labels, label] })),
}));
