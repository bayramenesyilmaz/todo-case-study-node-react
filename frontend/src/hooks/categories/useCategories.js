import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setCategories,
  setLoading,
  setError,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../store/slices/categorySlice";
import { categoryService } from "../../services/categoryService";
import { toast } from "react-toastify";
import { useModal } from "../../contexts/ModalContext";

export function useCategories() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.categories);
  const { closeModal } = useModal();

  const fetchCategories = async () => {
    try {
      dispatch(setLoading(true));
      const response = await categoryService.getAllCategories();
      dispatch(setCategories(response.data.categories));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      throw error;
    }
  };

  const createCategory = async (data) => {
    try {
      dispatch(setLoading(true));
      const response = await categoryService.createCategory(data);
      dispatch(addCategory(response.data));
      dispatch(setLoading(false));
      toast.success("Kategori başarıyla oluşturuldu!");
      closeModal();
      return response.data;
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      toast.error("Bir hata oluştu: " + error.message);
      throw error;
    }
  };

  const updateCategoryById = async (id, data) => {
    try {
      dispatch(setLoading(true));
      const response = await categoryService.updateCategory(id, data);
      dispatch(updateCategory(response.data));
      dispatch(setLoading(false));
      toast.success("Kategori başarıyla düzenlendi!");
      closeModal();
      return response.data;
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      toast.error("Bir hata oluştu: " + error.message);
      throw error;
    }
  };

  const deleteCategoryById = async (id) => {
    try {
      dispatch(setLoading(true));
      await categoryService.deleteCategory(id);
      dispatch(deleteCategory(id));
      dispatch(setLoading(false));
      toast.success("Kategori başarıyla silindi!");
      closeModal();
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      toast.error("Bir hata oluştu: " + error.message);
      throw error;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories: items,
    loading,
    error,
    createCategory,
    updateCategoryById,
    deleteCategoryById,
  };
}
