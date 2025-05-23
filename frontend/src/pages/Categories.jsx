import { useModal } from "../contexts/ModalContext";
import CategoryForm from "../components/category/CategoryForm";
import Button from "../components/common/Button";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import CategoryList from "../components/category/CategoryList";
import { MODAL_TYPES } from "../constants/modalTypes";
import Title from "../components/common/Title";
import { useCategories } from "../hooks/categories/useCategories";
import NullData from "../components/common/NullData";

export default function Categories() {
  const {
    categories,
    loading,
    error,
    createCategory,
    updateCategoryById,
    deleteCategoryById,
  } = useCategories();
  const { openModal } = useModal();

  const handleCreateCategory = () => {
    openModal({
      type: MODAL_TYPES.GENERAL,
      title: "Yeni Kategori",
      content: (
        <CategoryForm
          onSubmit={async (data) => {
            await createCategory(data);
          }}
        />
      ),
    });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Title text="Kategoriler" />
        <Button variant="outline" onClick={handleCreateCategory}>
          Yeni Kategori
        </Button>
      </div>
      {categories.lengt === 0 ? (
        <NullData text="Sistemde kayıtlı kategori yok" />
      ) : (
        <CategoryList
          categories={categories}
          updateCategoryById={updateCategoryById}
          deleteCategoryById={deleteCategoryById}
        />
      )}
    </div>
  );
}
