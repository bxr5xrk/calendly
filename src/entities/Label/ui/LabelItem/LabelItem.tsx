interface LabelItemProps {
  color: string;
  title: string;
}

export function LabelItem({ color, title }: LabelItemProps) {
  return <span title={title} className="h-1 w-10 rounded-md" style={{ color }}></span>;
}
