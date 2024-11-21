import carsJson from '@/constants/cars.json';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Modal } from '../ui/modal';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { formatCurrency, formatPhoneNumber } from '@/lib/utils';
import SearchInput from '../search-input';
import { CarType } from '@/constants/data';

interface ForwardMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onNext: (offset: number) => void;
  toggleContactSelection: (contact: CarType) => void;
  selectedContacts: CarType[];
  contacts: CarType[];
  onSearchChange?: (value: string) => void;
}

export function ForwardMessageModal({
  isOpen,
  onClose,
  onConfirm,
  onNext,
  onSearchChange,
  toggleContactSelection,
  contacts,
  selectedContacts
}: ForwardMessageModalProps) {
  const taxPerContact = 5;

  const ContactItem = ({ contact }: { contact: CarType }) => (
    <div
      key={contact.contact}
      className="flex items-center justify-between border-b py-2 last:border-b-0"
    >
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage
            src={
              contact.images[0]?.url.startsWith('https')
                ? contact.images[0]?.url
                : ''
            }
            alt="Avatar"
          />
          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            {formatPhoneNumber(contact.contact)}
          </p>
          <p className="text-sm text-muted-foreground">
            {contact?.name || 'Ei tuotetta'}
          </p>
        </div>
      </div>
      <Checkbox
        checked={selectedContacts.some(
          (selectedContact) => selectedContact.contact === contact.contact
        )}
        onCheckedChange={() => toggleContactSelection(contact)}
      />
    </div>
  );

  return (
    <Modal title="Välitä viesti" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center p-4">
        <div className="mb-4 flex w-full flex-col gap-2">
          <div className="flex">
            <p className="rounded-md bg-blue-100 px-3 py-1 font-semibold text-blue-700 shadow-sm">
              Lainaus:{' '}
              {formatCurrency(selectedContacts.length * taxPerContact || 0)}
            </p>
          </div>
          {onSearchChange && <SearchInput onSearchChange={onSearchChange} />}
        </div>
        <div
          id="scrollableArea"
          className="flex max-h-72 w-full flex-col overflow-y-auto rounded-lg border-2 p-4 shadow-lg"
        >
          <p className="mb-2 font-semibold">
            Valitse yhteystiedot viestin välittämiseksi
          </p>
          <InfiniteScroll
            dataLength={contacts.length}
            next={() => onNext(contacts.length)}
            hasMore={contacts.length < carsJson.length}
            loader={
              <div className="flex items-center">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Ladataan
              </div>
            }
            scrollableTarget="scrollableArea"
          >
            {contacts.map((contact) => (
              <ContactItem key={contact.contact} contact={contact} />
            ))}
          </InfiniteScroll>
        </div>
        <Button onClick={onConfirm} className="mt-4 bg-blue-600 text-white">
          Välitä viesti
        </Button>
      </div>
    </Modal>
  );
}
