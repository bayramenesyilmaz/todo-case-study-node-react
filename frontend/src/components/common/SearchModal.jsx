import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "../../hooks/useSearch";
import SearchBar from "./SearchBar";
import TodoList from "../todo/TodoList";
import Loading from "./Loading";
import Error from "./Error";

export default function SearchModal({ isOpen, onClose }) {
  const { todos, loading, error, setSearchQuery } = useSearch();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="h-full flex flex-col p-4 ">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 ">
              <h2 className="text-2xl font-bold text-white">Görev Ara</h2>
              <button
                onClick={onClose}
                className="p-2 text-white hover:bg-white/10 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search Input */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-2 mb-4 shadow-lg">
              <SearchBar
                onSearch={setSearchQuery}
                placeholder="Görev ara..."
              />
            </div>

            {/* Results */}
            <motion.div
              className="flex-1 bg-white dark:bg-gray-800 rounded-lg p-4 overflow-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {loading && <Loading />}
              {error && <Error message={error} />}
              {!loading && !error && todos?.length === 0 && (
                <div className="text-center text-gray-500">
                  Arama sonucu bulunamadı
                </div>
              )}
              {!loading && !error && todos?.length > 0 && (
                <TodoList todos={todos} />
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}