import { createSlice } from "@reduxjs/toolkit";

const getInitialViewSettings = () => {
  const savedSettings = localStorage.getItem("viewSettings");
  if (savedSettings) {
    return JSON.parse(savedSettings);
  }
  return {
    todoView: "kanban", // kanban veya list
    listView: "list", // grid veya list
  };
};

const viewSettingsSlice = createSlice({
  name: "viewSettings",
  initialState: getInitialViewSettings(),
  reducers: {
    setTodoView: (state, action) => {
      state.todoView = action.payload;
      localStorage.setItem("viewSettings", JSON.stringify(state));
    },
    setListView: (state, action) => {
      state.listView = action.payload;
      localStorage.setItem("viewSettings", JSON.stringify(state));
    },
  },
});

export const { setTodoView, setListView } = viewSettingsSlice.actions;
export default viewSettingsSlice.reducer;