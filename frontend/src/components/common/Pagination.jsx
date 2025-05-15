import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) {
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-md shadow-lg border-2 dark:border-gray-700">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        icon={<ChevronLeftIcon />}
        className="!p-1"
      />

      <div className="flex items-center gap-2 px-1 text-sm font-medium">
        <span className="text-indigo-600 dark:text-indigo-400">
          {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, totalItems)}
        </span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-600 dark:text-gray-300">{totalItems}</span>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage * itemsPerPage >= totalItems}
        icon={<ChevronRightIcon />}
        className="!p-1"
      />
    </div>
  );
}
