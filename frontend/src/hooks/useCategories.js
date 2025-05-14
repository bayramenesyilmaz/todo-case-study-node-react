import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setCategories,
  setLoading,
  setError,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../store/slices/categorySlice";
import { categoryService } from "../services/categoryService";

export function useCategories() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.categories);

  const fetchCategories = async () => {
    try {
      dispatch(setLoading(true));
      const response = await categoryService.getAllCategories();
      dispatch(setCategories(response.data.categories));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const createCategory = async (data) => {
    try {
      dispatch(setLoading(true));
      const response = await categoryService.createCategory(data);
      dispatch(addCategory(response.data));
      return response.data;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    }
  };

  const updateCategoryById = async (id, data) => {
    try {
      dispatch(setLoading(true));
      const response = await categoryService.updateCategory(id, data);
      dispatch(updateCategory(response.data));
      return response.data;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    }
  };

  const deleteCategoryById = async (id) => {
    try {
      dispatch(setLoading(true));
      await categoryService.deleteCategory(id);
      dispatch(deleteCategory(id));
    } catch (error) {
      dispatch(setError(error.message));
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
