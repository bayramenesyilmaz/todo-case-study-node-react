import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import todoReducer from "./slices/todoSlice";
import categoryReducer from "./slices/categorySlice";
import loadingReducer from "./slices/loadingSlice";
import viewSettingsReducer from "./slices/viewSettingsSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    todos: todoReducer,
    categories: categoryReducer,
    loading: loadingReducer,
    viewSettings: viewSettingsReducer,
    auth: authReducer,
  },
});
