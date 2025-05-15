import { getPriorityStyles } from "../../utils/formatters";

export default function PriorityBadge({ priority }) {
  const { label, className } = getPriorityStyles(priority);
  
  return (
    <span className={`px-3 py-1 rounded-md text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}