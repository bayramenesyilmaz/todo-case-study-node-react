import { useSelector } from "react-redux";
import Navbar from "../common/Navbar";

export default function Layout({ children }) {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`h-screen overflow-auto flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200 ${
        darkMode ? "dark" : ""
      }`}
    >
      <Navbar />
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {children}
      </main>
      <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 text-center text-xs text-black dark:text-white">
        Todo App Copyright
      </footer>
    </div>
  );
}
