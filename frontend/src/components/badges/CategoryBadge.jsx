export default function CategoryBadge({ category }) {
  return (
    <span
      className="px-2 py-0.5 rounded-md text-xs font-medium"
      style={{
        backgroundColor: `${category.color}20`,
        color: category.color,
        border: `1px solid ${category.color}40`,
      }}
    >
      {category.name}
    </span>
  );
}