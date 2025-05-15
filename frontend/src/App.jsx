import { Routes, Route } from "react-router";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import TodoListPage from "./pages/TodoListPage";
import TodoDetailPage from "./pages/TodoDetailPage";
import Categories from "./pages/Categories";
import ByCategoryTodos from "./pages/ByCategoryTodos";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/todos" element={<TodoListPage />} />
        <Route path="/todos/:id" element={<TodoDetailPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:catId/todos" element={<ByCategoryTodos />} />
      </Routes>
    </Layout>
  );
}

export default App;
