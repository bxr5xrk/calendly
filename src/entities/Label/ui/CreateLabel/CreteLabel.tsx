import { initialColor } from '@entities/Label/config/colors';
import { useLabelsStore } from '@entities/Label/model/store/labelStore';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import SelectColorDropdown from './SelectColorDropdown';

export function CreteLabel() {
  const { onAppend } = useLabelsStore();
  const labelNameRef = useRef<HTMLInputElement>(null);

  const [color, setColor] = useState(initialColor);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (labelNameRef.current) {
      const title = labelNameRef.current.value.trim();

      onAppend({
        title,
        color,
      });
    }
  };

  return (
    <form onSubmit={onSubmit} className="relative flex space-x-2 items-center">
      <Input
        ref={labelNameRef}
        minLength={2}
        required
        placeholder="Label name..."
        className="pr-10"
      />

      <SelectColorDropdown selected={color} setSelected={setColor} />

      <Button theme="ghost" type="submit">
        <ChevronRight className="w-5 h-5" />
      </Button>
    </form>
  );
}
