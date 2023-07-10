import { ChevronLeft, ChevronRight } from 'lucide-react';

export function CalendarHeader() {
  return (
    <div className="header flex justify-between border-b p-2">
      <span className="text-lg font-bold">2020 July</span>
      <div className="buttons">
        <button className="p-1">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="p-1">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
