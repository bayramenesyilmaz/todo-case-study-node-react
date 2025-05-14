import { useEffect, useState } from "react";
import KanbanBoard from "../components/todo/KanbanBoard";
import TodoList from "../components/todo/TodoList";
import TodoFilter from "../components/todo/TodoFilter";
import { useTodos } from "../hooks/useTodos";
import { motion } from "framer-motion";
import Pagination from "../components/common/Pagination";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import Button from "../components/common/Button";
import { useWindowWidth } from "../utils/formatters";
import { useModal } from "../contexts/ModalContext";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SearchModal from "../components/common/SearchModal";

export default function TodoListPage() {
  const [view, setView] = useState("kanban");
  const {
    todos,
    pagination,
    loading,
    error,
    filters,
    updateFilters,
    updatePage,
  } = useTodos();
  const { openModal, closeModal } = useModal();
  const width = useWindowWidth();

  const handlePageChange = (page) => {
    updatePage(page);
  };

  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters);
    closeModal();
  };

  const isMobile = width < 768;

  useEffect(() => {
    if (isMobile) {
      setView("list");
    } else {
      setView("kanban");
    }
  }, [isMobile]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!todos || todos.length === 0) {
    return <div>Sistemde kayıtlı görev yok</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Görevler</h1>
        <div className="flex gap-4">
          {/* Arama Butonu */}
          <button
            onClick={() =>
              openModal({
                title: "Notlar",
                header: true,
                content: <SearchModal />,
                fullScreen: true,
              })
            }
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
            <span>Arama</span>
          </button>
          {!isMobile ? (
            <>
              <TodoFilter
                filters={filters}
                onFilterChange={handleFilterChange}
              />
              <div className="flex gap-4 justify-end">
                <Button
                  children="Kanban"
                  onClick={() => setView("kanban")}
                  variant={view === "kanban" ? "primary" : "secondary"}
                />

                <Button
                  children="Liste"
                  onClick={() => setView("list")}
                  variant={view === "list" ? "primary" : "secondary"}
                />
              </div>
            </>
          ) : (
            <>
              {/* Filtreleme Butonu */}
              <button
                onClick={() =>
                  openModal({
                    title: "Filtreleme",
                    header: true,
                    content: (
                      <div className="w-full  bg-gray-300 rounded-lg p-4 h-max">
                        <TodoFilter
                          filters={filters}
                          onFilterChange={handleFilterChange}
                        />
                      </div>
                    ),
                  })
                }
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                <FunnelIcon className="w-5 h-5 text-gray-600" />
                <span>Filtrele</span>
              </button>
            </>
          )}
        </div>
      </div>

      {view === "kanban" ? (
        <KanbanBoard todos={todos} />
      ) : (
        <TodoList todos={todos} />
      )}

      <Pagination
        currentPage={pagination.current_page}
        totalItems={pagination.total}
        itemsPerPage={pagination.per_page}
        onPageChange={handlePageChange}
      />
    </motion.div>
  );
}
