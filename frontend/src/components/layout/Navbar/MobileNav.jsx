import { motion } from "framer-motion";
import { Link } from "react-router";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";

export default function MobileNav({ navigation, location, isOpen, setIsOpen }) {
  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {isOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`${
                  location.pathname === item.href
                    ? "bg-indigo-50 text-indigo-700 dark:bg-gray-700 dark:text-white"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                } block px-3 py-2 rounded-md text-base font-medium`}
              >
                <span className="flex items-center gap-2">
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </span>
              </Link>
            ))}
            <div className="px-3 py-2">
              <UserMenu isMobile />
            </div>
            <div className="px-3 py-2">
              <ThemeToggle isMobile />
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
