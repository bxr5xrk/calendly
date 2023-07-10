import { TaskSearch } from '@features/TaskSearch';
import { Button } from '@shared/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Action } from '../Calendar/Calendar';

interface CalendarHeaderProps {
  month: string;
  onChange: (action: Action) => void;
}

export function CalendarHeader({ month, onChange }: CalendarHeaderProps) {
  return (
    <div className="w-full py-2">
      <div className="grid grid-cols-2 items-center p-2 w-full">
        <TaskSearch />

        <div className="w-full flex justify-center">
          <div className="flex justify-between items-center p-2 w-fit">
            <Button onClick={() => onChange('previous')} theme="ghost">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <span className="text-lg font-bold w-40 text-center">{month}</span>
            <div className="buttons">
              <Button onClick={() => onChange('next')} theme="ghost">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
