import { createContext, useContext, useState } from "react";
import Modal from "../components/common/Modal";
import SearchModal from "../components/common/SearchModal";
import ConfirmModal from "../components/common/ConfirmModal";
import { MODAL_TYPES } from "../constants/modalTypes";
import { useSelector } from "react-redux";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [modals, setModals] = useState([]);

  const openModal = (config) => {
    setModals((prev) => [...prev, { ...config, isOpen: true }]);
  };

  const closeModal = () => {
    setModals((prev) => prev.slice(0, -1));
  };

  const showConfirmation = ({ title, message, onConfirm }) => {
    openModal({
      type: MODAL_TYPES.CONFIRM,
      title,
      message,
      onConfirm,
    });
  };

  const showSearch = () => {
    openModal({
      type: MODAL_TYPES.SEARCH,
      fullScreen: true,
    });
  };

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, showConfirmation, showSearch }}
    >
      {children}
      <div className={darkMode ? "dark" : ""}>
        {modals.map((modal, index) => {
          switch (modal.type) {
            case MODAL_TYPES.SEARCH:
              return (
                <SearchModal
                  key={index}
                  isOpen={modal.isOpen}
                  onClose={closeModal}
                />
              );
            case MODAL_TYPES.CONFIRM:
              return (
                <ConfirmModal
                  key={index}
                  isOpen={modal.isOpen}
                  onClose={closeModal}
                  title={modal.title}
                  message={modal.message}
                  onConfirm={modal.onConfirm}
                />
              );
            default:
              return (
                <Modal
                  key={index}
                  isOpen={modal.isOpen}
                  onClose={closeModal}
                  title={modal.title}
                  fullScreen={modal.fullScreen}
                  overlayClassName={modal.overlayClassName}
                  containerClassName={modal.containerClassName}
                >
                  {modal.content}
                </Modal>
              );
          }
        })}
      </div>
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    console.error("useModal must be used within a ModalProvider");
  }
  return context;
};
