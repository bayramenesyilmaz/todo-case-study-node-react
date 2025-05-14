import { useCategories } from "../../hooks/useCategories";
import Select from "../common/Select";

export default function CategorySelector({ value, onChange, error }) {
  const { categories } = useCategories();

  return (
    <Select
      label="Kategoriler"
      value={value}
      onChange={onChange}
      options={categories.map((category) => ({
        value: category.id,
        label: category.name,
        color: category.color,
      }))}
      error={error}
      multiple
    />
  );
}