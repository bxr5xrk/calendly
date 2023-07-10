interface PublicEventProps {
  name: string;
  date: string;
}

export function PublicEventItem({ name, date }: PublicEventProps) {
  return (
    <div className="bg-purple-200 text-white rounded p-1 text-sm mb-1">
      <div className="w-full h-full">
        <span className="">{name}</span>
        <span className="time">{date}</span>
      </div>
    </div>
  );
}
