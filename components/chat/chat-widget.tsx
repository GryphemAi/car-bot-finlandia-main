'use client';

import carsJson from '@/constants/cars.json';
import {
  ArrowDownUp,
  EllipsisVertical,
  Filter,
  MessageCircle,
  Send
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { useBreakpoint } from '@/hooks/useBreakPoints';
import { ForwardMessageModal } from './forward-message-modal';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { CarType } from '@/constants/data';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '../ui/checkbox';
import FilterModal from '../modal/filters-modal/filters-modal';

const PAGE_SIZE = 2;

const getCars = (offset: number = 0): { results: CarType[] } => {
  const cars = carsJson.slice(offset, offset + PAGE_SIZE).map((car, index) => ({
    seller: car.vendedor || 'Ei määritelty',
    contact: car?.contato ? car?.contato.replace(/\D/g, '') : 'Ei ilmoitettu',
    plate: car.placa || 'Ei rekisterikilpeä',
    name: car.nome || `Auto ilman nimeä ${index + offset}`,
    year: car.ano,
    kilometers: car.quilometragem,
    description: car.informacoes_adicionais || 'Kuvaus ei saatavilla',
    price: String(
      parseFloat(
        car.preco.replace('€', '').replace(' ', '').replace(',', '.')
      ) || 0
    ),
    publishedAt: new Date(),
    images: [
      {
        id: String(index),
        url: car.imagem || ''
      }
    ],
    specs: car.especificacoes.split(','),
    interior: car.interior_comodidades.split(','),
    eletronics: car.eletronica.split(','),
    securities: car.seguranca.split(','),
    others: car.outros.split(',')
  }));

  return { results: cars };
};

export default function ChatWidget() {
  const initialCars = getCars(0);

  const breakpoint = useBreakpoint('md');
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);
  const [chatMode, setChatMode] = useState<boolean>(true);
  const [message] = useState('');

  /* Viestien välittämiseksi tarvittavat yhteystiedot (forward message modal) */
  const [contacts, setContacts] = useState<CarType[]>(initialCars.results);

  /* Valitut yhteystiedot viestin välittämiseksi */
  const [selectedContacts, setSelectedContacts] = useState<CarType[]>([]);

  const [selectedUser, setSelectedUser] = useState<{
    id: number;
    name: string;
    message: string;
  } | null>(null);

  const loadMore = () => {
    const carsData = getCars(contacts.length);
    setContacts((prevCars) => [...prevCars, ...carsData.results]);
  };

  const handleSendForwardedMessage = async () => {
    if (!message.length || selectedContacts.length === 0) {
      return toast.error(
        'Kirjoita viesti ja valitse vähintään yksi yhteystieto.',
        {
          position: 'top-right'
        }
      );
    }

    setIsModalOpen(false);
  };

  const toggleContactSelection = (contact: CarType) => {
    setSelectedContacts((prev) =>
      prev.some((prevContact) => prevContact.contact === contact.contact)
        ? prev.filter((prevContact) => prevContact.contact !== contact.contact)
        : [...prev, contact]
    );
  };

  const users = [
    { id: 1, name: 'João Silva', message: 'Olá, pessoal! Tudo bem por aí?' },
    {
      id: 2,
      name: 'Maria Oliveira',
      message: 'Alguém tem dicas para aprender React?'
    },
    {
      id: 3,
      name: 'Pedro Santos',
      message: 'Acabei de assistir a uma palestra incrível sobre JavaScript!'
    },
    {
      id: 4,
      name: 'Ana Costa',
      message: 'Qual é o melhor editor de código para iniciantes?'
    },
    {
      id: 5,
      name: 'Carlos Lima',
      message: 'Adoro trabalhar com Tailwind CSS, muito produtivo!'
    },
    {
      id: 6,
      name: 'Fernanda Souza',
      message: 'Alguma novidade sobre a última atualização do Node.js?'
    },
    {
      id: 7,
      name: 'Lucas Pereira',
      message: 'Estou testando Next.js pela primeira vez e estou adorando!'
    },
    {
      id: 8,
      name: 'Juliana Mendes',
      message: 'Quero aprender mais sobre integração de APIs. Alguma sugestão?'
    },
    {
      id: 9,
      name: 'Rafael Almeida',
      message: 'Alguém já usou GraphQL? Estou pensando em começar.'
    },
    {
      id: 10,
      name: 'Beatriz Ferreira',
      message: 'Quem aqui está participando do Hacktoberfest?'
    },
    {
      id: 11,
      name: 'Victor Carvalho',
      message: 'Docker é incrível para organizar projetos! Recomendo.'
    },
    {
      id: 12,
      name: 'Luiza Martins',
      message: 'Estou precisando de ajuda com TypeScript. Algum material bom?'
    },
    {
      id: 13,
      name: 'Gustavo Ribeiro',
      message: 'Vue.js ou React? Ainda estou em dúvida!'
    },
    {
      id: 14,
      name: 'Mariana Rocha',
      message: 'Acabei de finalizar meu primeiro projeto com Astro!'
    },
    {
      id: 15,
      name: 'Thiago Nunes',
      message: 'Quais são as melhores práticas para usar Git em equipe?'
    }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-10 w-10 rounded-full bg-blue-600 p-2.5 text-white shadow-lg hover:bg-blue-500 focus:outline-none"
        >
          <MessageCircle size={24} />
        </Button>
      )}

      {isOpen && (
        <div className="mt-3 flex h-[600px] overflow-hidden rounded-lg bg-white shadow-xl md:w-[600px]">
          {/* Lista de usuários */}
          {(breakpoint.isAboveMd || (breakpoint.isBelowMd && !chatMode)) && (
            <div className="overflow-y-auto border-r bg-gray-100 p-4 md:w-1/3">
              <h2 className="mb-3 text-lg font-semibold text-gray-700">
                Keskustelut
              </h2>
              <div className="space-y-3">
                {breakpoint.isBelowMd && (
                  <Button
                    variant="secondary"
                    className="w-full gap-2 font-semibold"
                    onClick={() => setChatMode(!chatMode)}
                  >
                    <ArrowDownUp className="h-4 w-4" />{' '}
                    {chatMode ? 'Keskustelut' : 'Chat'}
                  </Button>
                )}
                {users.map((user) => (
                  <Button
                    className="w-full bg-slate-200 duration-300 hover:bg-slate-300"
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                  >
                    <h3 className="text-xs">{user.name}</h3>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Chat do usuário selecionado */}
          {(breakpoint.isAboveMd || (breakpoint.isBelowMd && chatMode)) && (
            <div className="flex flex-col md:w-2/3">
              {selectedUser ? (
                <>
                  <div className="flex items-center justify-between bg-blue-600 px-4 py-3 text-white">
                    <div>
                      <span className="block font-semibold">
                        Chat with {selectedUser.name}
                      </span>
                    </div>
                    <Button
                      onClick={() => setIsOpen(!isOpen)}
                      className="h-8 w-8 items-center justify-center text-2xl text-white focus:outline-none"
                    >
                      &times;
                    </Button>
                  </div>

                  <div className="flex-1 space-y-2 overflow-y-auto p-4">
                    <div className="text-right">
                      <div className="relative flex items-center justify-between rounded-lg bg-blue-600 p-3 text-sm text-white">
                        <Dialog>
                          <DialogTrigger>
                            <EllipsisVertical className="size-4" />
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Encaminhar mensagem</DialogTitle>
                            </DialogHeader>
                            <div className="w-full space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="inline-flex rounded-md bg-sky-500/20 px-2 py-1 text-sm font-bold text-sky-700">
                                  Cotação: 0,00
                                </div>
                                <FilterModal
                                  isOpen={filtersModalOpen}
                                  onClose={() => setFiltersModalOpen(false)}
                                />
                                <Button
                                  className="gap-2"
                                  size="filter"
                                  onClick={() => setFiltersModalOpen(true)}
                                >
                                  <Filter className="h-3 w-3 text-sm" />
                                  Suodattimet
                                </Button>
                              </div>
                              <div className="flex h-[225px] flex-col items-center justify-between divide-y overflow-y-auto rounded-lg border px-3 py-1">
                                {users.map((user) => (
                                  <>
                                    <div className="flex w-full items-center justify-between py-2">
                                      <div className="flex w-full items-center gap-3">
                                        <Avatar>
                                          <AvatarImage src="https://github.com/shadcn.png" />
                                          <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <h1 className="text-sm font-medium">
                                          {user.name}
                                        </h1>
                                      </div>
                                      <Checkbox />
                                    </div>
                                  </>
                                ))}
                              </div>
                              <div className="flex items-center justify-center pt-2">
                                <Button className="bg-blue-600 text-white hover:bg-blue-500">
                                  Encaminhar Mensagem
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <div>{selectedUser.message}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="relative">
                      <label htmlFor="Search" className="sr-only">
                        {' '}
                        Search{' '}
                      </label>

                      <Input
                        type="text"
                        id="Search"
                        placeholder="Search"
                        className="w-full rounded-md border-gray-200 py-2.5 pe-10 pl-3 shadow-sm sm:text-sm"
                      />

                      <span className="absolute inset-y-0 end-0 grid w-9 place-content-center">
                        <Button
                          type="button"
                          className="h-7 w-7 p-2 text-white hover:text-gray-200"
                        >
                          <Send />
                        </Button>
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-1 items-center justify-center">
                  <span className="text-gray-500">
                    Selecione um usuário para iniciar o chat
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Modal välittämään viesti */}
      <ForwardMessageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        contacts={contacts}
        selectedContacts={selectedContacts}
        toggleContactSelection={toggleContactSelection}
        onConfirm={handleSendForwardedMessage}
        onNext={loadMore}
      />
    </div>
  );
}
