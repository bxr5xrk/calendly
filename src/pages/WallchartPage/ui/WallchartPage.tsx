import { CreteLabel } from '@entities/Label/ui/CreateLabel/CreteLabel';
import { ListLabels } from '@entities/Label/ui/ListLabels/ListLabels';
import { ExportTasks } from '@features/ExportTasks';
import { ImportTasks } from '@features/ImportTasks';
import { Calendar } from '../../../widgets/Calendar';

export default function WallchartPage() {
  return (
    <div className="relative flex gap-10">
      <div className="pt-5">
        <CreteLabel />
        <ListLabels />
      </div>

      <Calendar />

      <div className="fixed bottom-4 left-6 flex gap-2 items-center">
        <div>
          <ImportTasks />
        </div>

        <div>
          <ExportTasks />
        </div>
      </div>
    </div>
  );
}
