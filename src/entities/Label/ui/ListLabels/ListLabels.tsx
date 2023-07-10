import { useLabelsStore } from '@entities/Label/model/store/labelStore';

export function ListLabels() {
  const { labels } = useLabelsStore();

  return <div className="flex flex-col p-2 space-x-2"></div>;
}
