import { ViewColumnsIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import Button from "../common/Button";

export default function ChangeViewButtons({ setView, view }) {
  return (
    <div className="z-50 fixed bottom-5 right-5 hidden md:flex gap-4 border-2 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded-md ">
      <Button
        variant={view === "kanban" ? "primary" : "secondary"}
        size="sm"
        onClick={() => setView("kanban")}
        icon={<ViewColumnsIcon className="w-5 h-5" />}
      >
        Kanban
      </Button>

      <Button
        variant={view === "list" ? "primary" : "secondary"}
        size="sm"
        onClick={() => setView("list")}
        icon={<ListBulletIcon className="w-5 h-5" />}
      >
        Liste
      </Button>
    </div>
  );
}
