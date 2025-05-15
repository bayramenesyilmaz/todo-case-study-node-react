import { Outlet } from "react-router";
import Navbar from "./Navbar/Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <Outlet />
      </main>
      <footer className="z-10 fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 text-center text-xs text-black dark:text-white py-1">
        Todo App Copyright
      </footer>
    </div>
  );
}