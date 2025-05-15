import { Link } from "react-router";

export default function Logo() {
  return (
    <div className="flex-shrink-0">
      <Link to="/">
        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
          Todo App
        </div>
      </Link>
    </div>
  );
}
