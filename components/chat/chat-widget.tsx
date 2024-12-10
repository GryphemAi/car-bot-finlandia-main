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
          className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 p-3 text-white shadow-lg hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <MessageCircle size={24} />
        </Button>
      )}

      {isOpen && (
        <div className="mt-3 flex h-[600px] overflow-hidden rounded-lg bg-white shadow-2xl ring-1 ring-black/5 md:w-[600px]">
          {/* Lista de usuários */}
          {(breakpoint.isAboveMd || (breakpoint.isBelowMd && !chatMode)) && (
            <div className="overflow-y-auto border-r bg-gray-50/80 p-4 backdrop-blur-sm md:w-1/3">
              <h2 className="mb-3 text-lg font-semibold text-gray-800">
                Keskustelut
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  {breakpoint.isBelowMd && (
                    <Button
                      variant="secondary"
                      className="gap-2 font-semibold"
                      onClick={() => setChatMode(!chatMode)}
                    >
                      <ArrowDownUp className="h-4 w-4" />{' '}
                      {chatMode ? 'Keskustelut' : 'Chat'}
                    </Button>
                  )}
                  <FilterModal
                    isOpen={filtersModalOpen}
                    onClose={() => setFiltersModalOpen(false)}
                  />
                  <Button
                    className="gap-2 bg-gray-100 hover:bg-gray-200"
                    size="filter"
                    onClick={() => setFiltersModalOpen(true)}
                  >
                    <Filter className="h-3 w-3 text-sm" />
                    Suodattimet
                  </Button>
                </div>
                {users.map((user) => (
                  <Button
                    className="w-full bg-white/80 text-left shadow-sm transition-all duration-200 hover:bg-blue-50 hover:shadow-md data-[state=selected]:bg-blue-100"
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    data-state={selectedUser?.id === user.id ? 'selected' : 'default'}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://avatar.vercel.sh/${user.name}`} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <h3 className="text-sm font-medium">{user.name}</h3>
                        <p className="text-xs text-gray-500 line-clamp-1">{user.message}</p>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Chat do usuário selecionado */}
          {(breakpoint.isAboveMd || (breakpoint.isBelowMd && chatMode)) && (
            <div className="flex flex-col md:w-2/3">
              {selectedUser ? (
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-white">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border-2 border-white/20">
                        <AvatarImage src={`https://avatar.vercel.sh/${selectedUser.name}`} />
                        <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="block font-medium">
                        {selectedUser.name}
                      </span>
                    </div>
                    <Button
                      onClick={() => setIsOpen(!isOpen)}
                      variant="ghost"
                      className="h-8 w-8 rounded-full p-0 text-white hover:bg-white/20"
                    >
                      &times;
                    </Button>
                  </div>

                  <div className="flex-1 space-y-2 overflow-y-auto bg-gray-50/50 p-4">
                    <div className="text-right">
                      <div className="relative inline-flex items-center justify-between rounded-lg bg-blue-600 p-3 text-sm text-white shadow-md">
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
                              </div>
                              <div className="flex h-[225px] flex-col items-center justify-between divide-y overflow-y-auto rounded-lg border bg-white px-3 py-1 shadow-inner">
                                {users.map((user) => (
                                  <div key={user.id} className="flex w-full items-center justify-between py-2">
                                    <div className="flex w-full items-center gap-3">
                                      <Avatar>
                                        <AvatarImage src={`https://avatar.vercel.sh/${user.name}`} />
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <h1 className="text-sm font-medium">
                                        {user.name}
                                      </h1>
                                    </div>
                                    <Checkbox />
                                  </div>
                                ))}
                              </div>
                              <div className="flex items-center justify-center pt-2">
                                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600">
                                  Encaminhar Mensagem
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <div className="ml-6">{selectedUser.message}</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t bg-white p-4">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Digite sua mensagem..."
                        className="w-full rounded-full border-gray-200 pr-12 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />

                      <Button
                        type="button"
                        className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 p-2 text-white hover:from-blue-500 hover:to-blue-600"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-1 items-center justify-center bg-gray-50/50">
                  <div className="text-center">
                    <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
                    <span className="mt-2 block text-gray-500">
                      Selecione um usuário para iniciar o chat
                    </span>
                  </div>
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
