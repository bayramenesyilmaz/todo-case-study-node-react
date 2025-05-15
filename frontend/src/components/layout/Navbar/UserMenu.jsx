import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { UserIcon, ArrowRightOnRectangleIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { useAuth } from "../../../hooks/auth/useAuth";

export default function UserMenu({ isMobile }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const { logout } = useAuth();

  // Dropdown dışına tıklanınca kapanması için
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuAnimation = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  };

  if (isMobile) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 w-full p-3 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            {user?.name?.charAt(0) || "U"}
          </div>
          <span className="font-medium">{user?.name || "Kullanıcı"}</span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuAnimation}
              className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <UserIcon className="w-5 h-5" />
                Profilim
              </Link>
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
              >
                <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
                Çıkış Yap
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
      >
        <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white">
          {user?.name?.charAt(0) || "U"}
        </div>
        <span className="font-medium text-sm">{user?.name || "Kullanıcı"}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuAnimation}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <UserIcon className="w-5 h-5" />
              Profilim
            </Link>
            <button
              onClick={logout}
              className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
            >
              <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
              Çıkış Yap
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}