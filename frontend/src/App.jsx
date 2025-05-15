import { Routes, Route, Navigate } from "react-router";
import Layout from "./components/layout/Layout";
import AuthPage from "./pages/auth/AuthPage";
import Dashboard from "./pages/Dashboard";
import TodoListPage from "./pages/TodoListPage";
import TodoDetailPage from "./pages/TodoDetailPage";
import Categories from "./pages/Categories";
import ByCategoryTodos from "./pages/ByCategoryTodos";
import { useSelector } from "react-redux";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </>
        ) : (
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/todos" element={<TodoListPage />} />
            <Route path="/todos/:id" element={<TodoDetailPage />} />
            <Route path="/categories" element={<Categories />} />
            <Route
              path="/categories/:catId/todos"
              element={<ByCategoryTodos />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
    </div>
  );
}

export default App;