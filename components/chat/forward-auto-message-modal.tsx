import { Modal } from '../ui/modal';
import { Button } from '../ui/button';
import FilterModal from '../modal/filters-modal/filters-modal';
import { useState } from 'react';
import { Filter } from 'lucide-react';

interface ForwardAutoMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ForwardAutoMessageModal({
  isOpen,
  onClose,
  onConfirm
}: ForwardAutoMessageModalProps) {
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);

  return (
    <Modal
      title="Välitä viesti automaattisesti"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex flex-col items-center p-4">
        <div className="mb-4 flex w-full flex-col gap-2">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex w-full items-center justify-center gap-2">
              <FilterModal
                isOpen={filtersModalOpen}
                onClose={() => setFiltersModalOpen(false)}
              />
              <Button
                className="gap-2"
                onClick={() => setFiltersModalOpen(true)}
              >
                <Filter className="h-4 w-4" />
                Suodattimet
              </Button>
              <p className="rounded-md bg-blue-100 px-3 py-1 font-semibold text-blue-700 shadow-sm">
                Tila: Käytössä
              </p>
              <p className="rounded-md bg-blue-100 px-3 py-1 font-semibold text-blue-700 shadow-sm">
                Lainaus: 7
              </p>
            </div>
          </div>
        </div>
        <Button onClick={onConfirm} className="mt-4 bg-blue-600 text-white">
          Ota käyttöön
        </Button>
      </div>
    </Modal>
  );
}
