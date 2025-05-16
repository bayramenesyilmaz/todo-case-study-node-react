import KanbanBoard from "../components/todo/KanbanBoard";
import TodoList from "../components/todo/TodoList";
import TodoFilter from "../components/todo/TodoFilter";
import { useTodos } from "../hooks/todos/useTodos";
import { motion } from "framer-motion";
import Pagination from "../components/common/Pagination";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import TodoSearchButton from "../components/todo/TodoSearchButton";
import ChangeViewButtons from "../components/todo/ChangeViewButtons";
import MobileFilterButton from "../components/todo/MobileFilterButton";
import AddTodoButton from "../components/todo/AddTodoButton";
import Title from "../components/common/Title";
import NullData from "../components/common/NullData";
import { useViewSettings } from "../hooks/useViewSettings";

export default function TodoListPage() {
  const { todoView, updateTodoView, isMobile } = useViewSettings();

  const {
    todos,
    pagination,
    loading,
    error,
    filters,
    updateFilters,
    updatePage,
  } = useTodos();

  const handlePageChange = (page) => {
    updatePage(page);
  };

  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <Title text="Yapılacaklar" />
          <div className="w-full md:w-auto flex-1 justify-end flex items-stretch flex-wrap gap-2 md:gap-4">
            {/* Arama Butonu */}
            <TodoSearchButton />
            {!isMobile ? (
              <TodoFilter
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            ) : (
              <MobileFilterButton
                handleFilterChange={handleFilterChange}
                filters={filters}
              />
            )}

            <AddTodoButton />
          </div>
        </div>
        {todos.length === 0 ? (
          <NullData text="Sistemde kayıtlı not yok" />
        ) : todoView === "kanban" ? (
          <KanbanBoard todos={todos} />
        ) : (
          <TodoList todos={todos} />
        )}

        <ChangeViewButtons setView={updateTodoView} view={todoView} />

        <Pagination
          currentPage={pagination.current_page}
          totalItems={pagination.total}
          itemsPerPage={pagination.per_page}
          onPageChange={handlePageChange}
        />
      </motion.div>
    </>
  );
}
