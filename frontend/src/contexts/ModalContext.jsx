import { createContext, useContext, useState } from "react";
import Modal from "../components/common/Modal";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modals, setModals] = useState([
    [
      {
        isOpen: false,
        title: "",
        content: null,
        header: true,
        onConfirm: null,
        onCancel: null,
        fullScreen: false,
        overlayClassName: "bg-black bg-opacity-50", // Varsayılan arka plan stili
        containerClassName: "", // Varsayılan modal stili
      },
    ],
  ]);
  const [modalConfig, setModalConfig] = useState();

  const openModal = (config) => {
    // setModalConfig({ ...config, isOpen: true });
    setModals((prev) => [...prev, { ...config, isOpen: true }]);
  };

  const closeModal = () => {
    setModals((prev) => prev.slice(0, -1));
    // setModalConfig({
    //   isOpen: false,
    //   title: "",
    //   content: null,
    //   onConfirm: null,
    //   onCancel: null,
    //   overlayClassName: "bg-black bg-opacity-50",
    //   containerClassName: "",
    // });
  };

  const showConfirmation = ({ title, message, onConfirm }) => {
    openModal({
      title,
      header: false,
      content: (
        <div className="w-full h-full flex justify-center items-center">
          <div className="p-6 bg-white rounded-lg max-w-lg">
            <p className="mb-4">{message}</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                onClick={() => {
                  closeModal();
                }}
              >
                İptal
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => {
                  onConfirm();
                  closeModal();
                }}
              >
                Onayla
              </button>
            </div>
          </div>
        </div>
      ),
    });
  };

  const closeAllModals = () => {
    setModals([]); // Tüm modalları kapat
  };

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, showConfirmation, closeAllModals }}
    >
      {children}
      {modals.map((modal, index) => (
        <Modal
          key={index}
          isOpen={modal.isOpen}
          onClose={closeModal}
          header={modal.header}
          title={modal.title}
          fullScreen={modal.fullScreen}
          overlayClassName={modal.overlayClassName}
          containerClassName={modal.containerClassName}
        >
          {modal.content}
        </Modal>
      ))}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
