import TodoList from "../todo/TodoList";
import Loading from "../common/Loading";
import Error from "../common/Error";
import SearchBar from "./SearchBar";
import { useSearch } from "../../hooks/useSearch";

export default function SearchModal() {
  const { todos, loading, error, setSearchQuery } = useSearch();

  return (
    <div className="w-full h-[90vh] flex flex-col items-center justify-center">
      {/* Arama Çubuğu */}
      <div className="mb-4 w-full  bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <SearchBar onSearch={setSearchQuery} placeholder="Görev ara..." />
      </div>

      {/* Arama Sonuçları */}
      <div className="w-full flex-1 overflow-auto bg-white p-4 rounded-xl">
        {loading && <Loading />}
        {error && <Error message={error} />}
        {!loading && !error && todos?.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-300">
            Arama sonuçları bulunamadı.
          </div>
        )}
        {!loading && !error && todos?.length > 0 && <TodoList todos={todos} />}
      </div>
    </div>
  );
}
