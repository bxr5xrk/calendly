import { useSearchStore } from '@features/TaskSearch/model/store/searchStore';
import { useThrottle } from '@shared/lib/hooks/useThrottle';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { XIcon } from 'lucide-react';
import { useRef } from 'react';

export function TaskSearch() {
  const { setQuery } = useSearchStore();

  const searchRef = useRef<HTMLInputElement>(null);

  const xRef = useRef<HTMLButtonElement>(null);

  const onChange = useThrottle(() => {
    if (searchRef.current) {
      if (searchRef.current.value.trim().length && xRef.current) {
        xRef.current.classList.remove('hidden');
      } else {
        xRef.current?.classList.add('hidden');
      }

      setQuery(searchRef.current.value);
    }
  }, 500);

  const onClear = () => {
    setQuery('');
    if (searchRef.current) {
      xRef.current?.classList.add('hidden');
      searchRef.current.value = '';
    }
  };

  return (
    <div className="relative">
      <Input
        onChange={onChange}
        ref={searchRef}
        placeholder="Enter search query..."
      />

      <Button
        ref={xRef}
        onClick={onClear}
        className="hidden absolute -right-2 top-0.5"
      >
        <XIcon className="w-5 h-5" />
      </Button>
    </div>
  );
}
