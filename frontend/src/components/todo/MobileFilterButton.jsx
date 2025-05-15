import { FunnelIcon } from "@heroicons/react/24/outline";

import TodoFilter from "./TodoFilter";
import { useModal } from "../../contexts/ModalContext";
import { MODAL_TYPES } from "../../constants/modalTypes";
import Button from "../common/Button";

export default function MobileFilterButton({ handleFilterChange, filters }) {
  const { openModal } = useModal();

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() =>
        openModal({
          type: MODAL_TYPES.GENERAL,
          title: "Filtreleme",
          content: (
            <TodoFilter filters={filters} onFilterChange={handleFilterChange} />
          ),
        })
      }
      icon={<FunnelIcon />}
    >
      Filtrele
    </Button>
  );
}
