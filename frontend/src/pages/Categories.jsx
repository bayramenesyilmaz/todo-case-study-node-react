import { useCategories } from "../hooks/useCategories";
import { useModal } from "../contexts/ModalContext";
import CategoryForm from "../components/category/CategoryForm";
import Button from "../components/common/Button";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import CategoryList from "../components/category/CategoryList";

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
      title: "Yeni Kategori",
      content: (
        <CategoryForm
          onSubmit={async (data) => {
            await createCategory(data);
            openModal(null);
          }}
        />
      ),
    });
  };

  console.log(categories);
  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kategoriler</h1>
        <Button onClick={handleCreateCategory}>Yeni Kategori</Button>
      </div>

      <CategoryList
        categories={categories}
        updateCategoryById={updateCategoryById}
        deleteCategoryById={deleteCategoryById}
      />
    </div>
  );
}
