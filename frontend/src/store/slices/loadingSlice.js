import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    todoActions: {}, // { todoId: true/false }
  },
  reducers: {
    setTodoLoading: (state, action) => {
      const { todoId, isLoading } = action.payload;
      state.todoActions[todoId] = isLoading;
    },
  },
});

export const { setTodoLoading } = loadingSlice.actions;
export default loadingSlice.reducer;