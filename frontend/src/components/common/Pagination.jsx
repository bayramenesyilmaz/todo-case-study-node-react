import Button from "./Button";

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) {
  return (
    <div className="z-50 fixed bottom-0 left-0 right-0 flex justify-center items-center p-1 shadow-lg">
      <div className="flex items-center space-x-2 bg-gray-400 p-2 rounded-lg shadow-lg">
        <Button
          children="Önceki"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant={currentPage === 1 ? "secondary" : "primary"}
        />
        <span className="text-lg">
          {currentPage} / {Math.ceil(totalItems / itemsPerPage)}
        </span>
        <Button
          children="Sonraki"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= totalItems}
          variant={
            currentPage * itemsPerPage >= totalItems ? "secondary" : "primary"
          }
        />
      </div>
    </div>
  );
}
