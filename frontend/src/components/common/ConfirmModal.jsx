import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

export default function ConfirmModal({
  isOpen,
  onClose,
  title,
  message,
  onConfirm,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-950 rounded-lg p-6 w-full max-w-md shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h3 className="text-lg font-medium mb-2 text-black dark:text-white">
              {title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">{message}</p>

            <div className="flex justify-end space-x-2 ">
              <Button variant="secondary" onClick={onClose}>
                İptal
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  onConfirm();
                }}
              >
                Onayla
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
