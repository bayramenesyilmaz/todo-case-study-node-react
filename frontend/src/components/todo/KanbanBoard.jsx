import { useTodoActions } from "../../hooks/todos/useTodoActions";
import { KanbanColumn } from "./KanbanColumn";

export default function KanbanBoard({ todos }) {
  const { handleStatusChange, isLoading } = useTodoActions();

  const handleStatusUpdate = async (id, currentStatus, status) => {
    try {
      isLoading(id);
      await handleStatusChange(id, currentStatus, status);
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const columns = [
    { status: "pending", title: "Bekleyen" },
    { status: "in_progress", title: "Devam Eden" },
    { status: "completed", title: "Tamamlanan" },
    { status: "cancelled", title: "İptal" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[calc(100vh-200px)]">
      {columns.map((column) => (
        <KanbanColumn
          key={column.status}
          title={column.title}
          status={column.status}
          todos={todos.filter((todo) => todo.status === column.status)}
          onDrop={handleStatusUpdate}
        />
      ))}
    </div>
  );
}
