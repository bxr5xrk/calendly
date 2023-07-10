interface PublicEventProps {
  name: string;
}

export function PublicEventItem({ name }: PublicEventProps) {
  return (
    <div className="text-gray-600 border-purple-200 bg-purple-100 border rounded p-1 text-sm mb-1">
      <div className="w-full h-full">
        <span className="">{name}</span>
      </div>
    </div>
  );
}
