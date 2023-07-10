import { CreteLabel } from '@entities/Label/ui/CreateLabel/CreteLabel';
import { ListLabels } from '@entities/Label/ui/ListLabels/ListLabels';
import { ExportTasks } from '@features/ExportTasks';
import { ImportTasks } from '@features/ImportTasks';
import { TakeScreenshot } from '@features/TakeScreenshot';
import { Calendar } from '../../../widgets/Calendar';

export default function WallchartPage() {
  return (
    <div className="relative grid grid-cols-layout grid-rows-1">
      <div className="pt-5">
        <CreteLabel />
        <ListLabels />
      </div>

      <Calendar />

      <div className="fixed bottom-2 left-2 flex gap-1 items-center">
        <ImportTasks />

        <ExportTasks />

        <TakeScreenshot />
      </div>
    </div>
  );
}
