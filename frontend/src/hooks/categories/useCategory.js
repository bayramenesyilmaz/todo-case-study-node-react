import { useState, useEffect } from "react";
import { categoryService } from "../../services/categoryService";
import { useSelector } from "react-redux";

export function useCategory(id) {
  const categoryFromStore = useSelector((state) =>
    state.categories.items.find((cat) => cat.id === id)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(categoryFromStore);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const response = await categoryService.getCategoryById(id);
        setCategory(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (categoryFromStore && !shouldRefresh) {
      setCategory(categoryFromStore);
    } else {
      if (id) {
        fetchCategory();
      }
    }
  }, [id, categoryFromStore, shouldRefresh]);

  const setRender = () => setShouldRefresh(!shouldRefresh);

  return {
    category,
    loading,
    error,
    setRender,
  };
}
