import { useLabelsStore } from '@entities/Label/model/store/labelStore';
import { Label } from '@entities/Label/model/types/label';
import { Button } from '@shared/ui/Button';
import { XIcon } from 'lucide-react';
import { LabelRounded } from '../LabelItem/LabelRounded';

export function ListLabels() {
  const { labels, setLabels, filterIds, setFilterIds } = useLabelsStore();

  const onRemove = (id: string) => {
    setLabels(labels.filter((i) => i.id !== id));
  };

  const setChecked = (label: Label) => {
    const isExists = filterIds.includes(label.id);

    if (isExists) {
      setFilterIds(filterIds.filter((i) => i !== label.id));
    } else {
      setFilterIds([...filterIds, label.id]);
    }
  };

  return (
    <div className="flex flex-col p-2 gap-2 w-fit">
      {labels.map((i) => (
        <div key={i.id} className="flex items-center gap-x-10 justify-between">
          <LabelRounded
            onClick={() => setChecked(i)}
            style={{
              backgroundColor: filterIds.includes(i.id)
                ? i.color
                : `${i.color}10`,
              border: `1px solid ${i.color}`,
              color: filterIds.includes(i.id) ? 'white' : i.color,
            }}
          >
            {i.title}
          </LabelRounded>

          {/* remove button */}
          <Button
            className="p-1 rounded-full bg-red-100 text-red-500"
            theme="clear"
            size="clear"
            onClick={() => onRemove(i.id)}
          >
            <XIcon className="w-3 h-3 stroke-current" />
          </Button>
        </div>
      ))}
    </div>
  );
}
