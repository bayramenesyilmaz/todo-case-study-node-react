import { motion, AnimatePresence } from "framer-motion";

export default function Modal({
  isOpen,
  onClose,
  title,
  header,
  children,
  fullScreen = false, // Tam ekran seçeneği
  overlayClassName = "bg-black opacity-50", // Arka plan rengi ve opaklık
  containerClassName = "", // Ekstra stiller için
}) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          {/* Arka Plan */}
          <div
            className={`absolute inset-0 ${overlayClassName} `}
            onClick={onClose}
          ></div>

          {/* Modal İçeriği */}
          <motion.div
            className={`relative ${
              fullScreen
                ? "w-screen h-screen p-2 md:max-w-5xl"
                : "w-[95%] md:w-[90%] h-[70vh] "
            } overflow-hidden flex flex-col items-center justify-center ${containerClassName}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Başlık ve Kapatma Butonu */}
            {header && (
              <div className=" w-full flex items-center mb-2 p-2">
                {title && (
                  <h3 className="flex-1 text-center font-semibold text-3xl text-white dark:text-gray-200 pl-4">
                    {title}
                  </h3>
                )}
                <button
                  onClick={onClose}
                  className=" text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full p-2"
                >
                  <span className="sr-only">Kapat</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}

            {/* İçerik */}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
