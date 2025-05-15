import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  fullScreen = false,
  overlayClassName = "bg-black/50 backdrop-blur-sm",
  containerClassName = "",
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <motion.div
            className={`absolute inset-0 ${overlayClassName}`}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Container */}
          <motion.div
            className={`
              relative 
              bg-white dark:bg-gray-800 
              ${fullScreen ? "w-full h-full" : "w-full max-w-2xl max-h-[90vh]"}
              rounded-lg shadow-xl 
              flex flex-col 
              overflow-hidden
              ${containerClassName}
            `}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 
                          rounded-full hover:bg-gray-100 dark:hover:bg-gray-700
                          transition-colors duration-200"
              >
                <span className="sr-only">Kapat</span>
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 py-4 overflow-auto bg-white dark:bg-gray-800 text-black dark:text-white ">
              <div className="relative">{children}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
