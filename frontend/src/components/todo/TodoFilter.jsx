import React from "react";
import Select from "../common/Select";

export default function TodoFilter({ filters, onFilterChange }) {
  const priorities = [
    { value: "high", label: "Yüksek" },
    { value: "medium", label: "Orta" },
    { value: "low", label: "Düşük" },
  ];

  const statuses = [
    { value: "pending", label: "Yapılacak" },
    { value: "in_progress", label: "Devam Ediyor" },
    { value: "completed", label: "Tamamlandı" },
    { value: "cancelled", label: "İptal Edildi" },
  ];

  const sortOptions = [
    { value: "created_at-desc", label: "En Yeni Oluşturulan" },
    { value: "created_at-asc", label: "En Eski Oluşturulan" },
    { value: "due_date-asc", label: "Yaklaşan Bitiş Tarihi" },
    { value: "due_date-desc", label: "Uzak Bitiş Tarihi" },
    { value: "priority-desc", label: "Yüksek Öncelik" },
    { value: "priority-asc", label: "Düşük Öncelik" },
  ];

  const handleSortChange = (e) => {
    const [sort, order] = e.target.value.split("-");
    onFilterChange({
      ...filters,
      sort: sort || "created_at",
      order: order || "desc",
    });
  };

  return (
    <div className="flex gap-4 flex-wrap md:w-max">
      {/* Durum Filtresi */}
      <Select
        value={filters.status}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
        options={statuses}
        placeholder="Durum Seçin"
      />

      {/* Öncelik Filtresi */}
      <Select
        value={filters.priority}
        onChange={(e) =>
          onFilterChange({ ...filters, priority: e.target.value })
        }
        options={priorities}
        placeholder="Öncelik Seçin"
      />

      {/* Sıralama Filtresi */}
      <Select
        value={`${filters.sort || "created_at"}-${filters.order || "desc"}`}
        onChange={handleSortChange}
        options={sortOptions}
        placeholder="Sıralama Seçin"
      />
    </div>
  );
}
