import { getStatusStyles } from "../../utils/formatters";

export default function StatusBadge({ status }) {
  const { icon: Icon, label, className } = getStatusStyles(status);
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium ${className}`}>
      <Icon className="w-4 h-4" />
      {label}
    </span>
  );
}