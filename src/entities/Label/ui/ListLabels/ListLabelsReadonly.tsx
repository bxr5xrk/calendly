import { Label } from '@entities/Label/model/types/label';
import { LabelItem } from '../LabelItem/LabelItem';

interface ListLabelsProps {
  labels: Label[];
}

export function ListLabels({ labels }: ListLabelsProps) {
  return (
    <div className="flex items-center p-1 space-x-2">
      {labels.map((i, index) => (
        <LabelItem key={index} color={i.color} title={i.title} />
      ))}
    </div>
  );
}
