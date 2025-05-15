import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useModal } from "../../contexts/ModalContext";
import Button from "../common/Button";

export default function TodoSearchButton() {
  const { showSearch } = useModal();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => showSearch()}
      icon={<MagnifyingGlassIcon />}
    >
      Arama
    </Button>
  );
}
