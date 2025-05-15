import Button from "../common/Button";
import CategoryForm from "./CategoryForm";
import { useModal } from "../../contexts/ModalContext";
import { MODAL_TYPES } from "../../constants/modalTypes";
import { Link } from "react-router";

export default function CategoryList({
  categories,
  updateCategoryById,
  deleteCategoryById,
}) {
  const { openModal, showConfirmation } = useModal();

  const handleEditCategory = (category) => {
    openModal({
      type: MODAL_TYPES.GENERAL,
      title: "Kategori Düzenle",
      content: (
        <CategoryForm
          initialData={category}
          onSubmit={async (data) => {
            await updateCategoryById(category.id, data);
          }}
        />
      ),
    });
  };

  const handleDeleteCategory = (id) => {
    showConfirmation({
      title: "Kategori Sil",
      message: "Bu kategoriyi silmek istediğinizden emin misiniz?",
      onConfirm: async () => await deleteCategoryById(id),
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex justify-between items-center"
          style={{ borderLeft: `4px solid ${category.color}` }}
        >
          <Link
            to={`/categories/${category.id}/todos`}
            className="text-black dark:text-white font-semibold line-clamp-3 break-words pr-2 hover:underline"
          >
            {category.name}
          </Link>
          <div className="flex space-x-2">
            <Button
              variant="warning"
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
