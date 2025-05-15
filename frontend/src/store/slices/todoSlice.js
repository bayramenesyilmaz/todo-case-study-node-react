import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    pagination: {
      current_page: 1,
      per_page: 10,
      last_page: 1,
      from: 0,
      to: 0,
      total: 0,
    },
    filters: {
      status: "",
      priority: "",
      sort: "created_at",
      order: "desc",
      search: "",
    },
    error: null,
  },
  reducers: {
    setTodos: (state, action) => {
      state.items = action.payload.data;
      state.pagination = action.payload.meta.pagination;
    },

    addTodo: (state, action) => {
      state.items.unshift(action.payload);
    },
    updateTodoInList: (state, action) => {
      const updatedTodo = action.payload;
      state.items = state.items.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
      console.log("updatedTodo : ", updatedTodo);
    },
    updatateTodoStatus: (state, action) => {
      const { id, status, updated_at } = action.payload;
      state.items = state.items.map((todo) =>
        todo.id === id ? { ...todo, status, updated_at } : todo
      );
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setTodos,
  addTodo,
  updateTodoInList,
  updatateTodoStatus,
  removeTodo,
  setFilters,
  setPagination,
  setStats,
  setError,
  resetError,
} = todoSlice.actions;

export default todoSlice.reducer;
