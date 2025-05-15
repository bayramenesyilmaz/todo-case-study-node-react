import { useDispatch, useSelector } from "react-redux";
import { setTodoView, setListView } from "../store/slices/viewSettingsSlice";
import { useWindowWidth } from "../utils/formatters";

export const useViewSettings = () => {
  const dispatch = useDispatch();
  const width = useWindowWidth();
  const { todoView, listView } = useSelector((state) => state.viewSettings);
  const isMobile = width < 768;

  const updateTodoView = (view) => {
    if (!isMobile) {
      dispatch(setTodoView(view));
    }
  };

  const updateListView = (view) => {
    if (!isMobile) {
      dispatch(setListView(view));
    }
  };

  // Mobil cihazlarda her zaman liste görünümü
  const getCurrentTodoView = () => (isMobile ? "list" : todoView);
  const getCurrentListView = () => (isMobile ? "list" : listView);

  return {
    todoView: getCurrentTodoView(),
    listView: getCurrentListView(),
    updateTodoView,
    updateListView,
    isMobile,
  };
};
