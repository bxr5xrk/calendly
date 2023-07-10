import { CreteLabel } from '@entities/Label/ui/CreateLabel/CreteLabel';
import { ListLabels } from '@entities/Label/ui/ListLabels/ListLabels';
import { Calendar } from '../../../widgets/Calendar';

export default function WallchartPage() {
  return (
    <div className="flex gap-10">
      <div>
        <CreteLabel />
        <ListLabels />
      </div>

      {/* import export  */}
      <Calendar />
    </div>
  );
}
