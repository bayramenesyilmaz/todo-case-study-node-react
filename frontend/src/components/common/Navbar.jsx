import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { toggleTheme } from "../../store/slices/themeSlice";
import {
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  HomeIcon,
  ClipboardDocumentListIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const navigation = [
    { name: "Dashboard", href: "/", icon: HomeIcon },
    { name: "Yapılacaklar", href: "/todos", icon: ClipboardDocumentListIcon },
    { name: "Kategoriler", href: "/categories", icon: TagIcon },
  ];

  return (
    <nav className="sticky top-0 left-0 right-0 bg-white border-b dark:bg-gray-800 dark:border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              Todo App
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  location.pathname === item.href
                    ? "bg-indigo-50 text-indigo-700 dark:bg-gray-700 dark:text-white"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              {darkMode ? (
                <SunIcon className="w-5 h-5 text-yellow-500" />
              ) : (
                <MoonIcon className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`${
                    location.pathname === item.href
                      ? "bg-indigo-50 text-indigo-700 dark:bg-gray-700 dark:text-white"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  } block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center gap-2`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}

              {/* Mobile Theme Toggle */}
              <button
                onClick={() => dispatch(toggleTheme())}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                {darkMode ? (
                  <>
                    <SunIcon className="w-5 h-5 text-yellow-500" />
                    Açık Tema
                  </>
                ) : (
                  <>
                    <MoonIcon className="w-5 h-5 text-gray-500" />
                    Koyu Tema
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
