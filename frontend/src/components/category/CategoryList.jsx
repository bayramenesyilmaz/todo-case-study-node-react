import React from "react";
import Button from "../common/Button";
import CategoryForm from "./CategoryForm";
import { useModal } from "../../contexts/ModalContext";

export default function CategoryList({
  categories,
  updateCategoryById,
  deleteCategoryById,
}) {
  const { openModal } = useModal();

  const handleEditCategory = (category) => {
    openModal({
      title: "Kategori Düzenle",
      content: (
        <CategoryForm
          initialData={category}
          onSubmit={async (data) => {
            await updateCategoryById(category.id, data);
            openModal(null);
          }}
        />
      ),
    });
  };

  const handleDeleteCategory = (id) => {
    openModal({
      title: "Kategori Sil",
      content: (
        <div className="space-y-4">
          <p>Bu kategoriyi silmek istediğinizden emin misiniz?</p>
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => openModal(null)}>
              İptal
            </Button>
            <Button
              variant="danger"
              onClick={async () => {
                await deleteCategoryById(id);
                openModal(null);
              }}
            >
              Sil
            </Button>
          </div>
        </div>
      ),
    });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
          style={{ borderLeft: `4px solid ${category.color}` }}
        >
          <span>{category.name}</span>
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              onClick={() => handleEditCategory(category)}
            >
              Düzenle
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDeleteCategory(category.id)}
            >
              Sil
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
