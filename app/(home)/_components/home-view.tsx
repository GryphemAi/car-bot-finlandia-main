'use client';

import carsJson from '@/constants/cars.json';
import { Metadata } from 'next';
import CarCard from './car-card';
import ChatWidget from '@/components/chat/chat-widget';
import { CarType } from '@/constants/data';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import FilterModal from '@/components/modal/filters-modal/filters-modal';
import { Button } from '@/components/ui/button';
import {
  CarIcon,
  CircleDollarSignIcon,
  Filter,
  MessageSquareShareIcon
} from 'lucide-react';
import StatsCard from '@/components/stats-card';

export const metadata: Metadata = {
  title: 'Homepage view',
  description: 'Selling cars homepage view.'
};

const PAGE_SIZE = 8;

const getCars = (offset: number = 0): { results: CarType[] } => {
  const cars = carsJson.slice(offset, offset + PAGE_SIZE).map((car, index) => ({
    seller: car.vendedor || 'Ei määritelty',
    contact: car?.contato ? car?.contato.replace(/\D/g, '') : 'Ei ilmoitettu',
    plate: car.placa || 'Ei rekisterikilpiä',
    name: car.nome || `Nimetön auto ${index + offset}`,
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

const CarList = ({ cars }: { cars: CarType[] }) => (
  <>
    {cars.map((car, index) => (
      <CarCard
        key={index}
        seller={car.seller}
        contact={car.contact}
        name={car.name}
        plate={car.plate}
        description={car.description}
        price={car.price}
        publishedAt={car.publishedAt}
        year={car.year}
        kilometers={car.kilometers}
        images={car.images}
        specs={car.specs}
        interior={car.interior}
        eletronics={car.eletronics}
        securities={car.securities}
        others={car.others}
      />
    ))}
  </>
);

export default function HomeView() {
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);
  const initialCars = getCars(0);
  const [cars, setCars] = useState<CarType[]>(initialCars.results);

  const loadMore = () => {
    const carsData = getCars(cars.length);
    setCars((prevCars) => [...prevCars, ...carsData.results]);
  };

  return (
    <div
      id="scrollable-container"
      className="h-[calc(100dvh-52px)] overflow-y-auto bg-gray-100"
    >
      <div className="mx-6 my-2 flex h-full flex-col gap-2">
        <div className="relative flex flex-col">
          <div className="absolute">
            <FilterModal
              isOpen={filtersModalOpen}
              onClose={() => setFiltersModalOpen(false)}
            />
            <Button className="gap-2" onClick={() => setFiltersModalOpen(true)}>
              <Filter className="h-4 w-4" />
              Suodattimet
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 overflow-x-auto">
            <StatsCard
              Icon={CircleDollarSignIcon}
              title="Velkaa"
              amount={50}
              className="bg-blue-400 bg-opacity-50 text-blue-600"
            />
            <StatsCard
              Icon={CarIcon}
              title="Autot järjestelmässä"
              amount={carsJson.length}
              className="bg-red-400 bg-opacity-50 text-red-600"
            />
            <StatsCard
              Icon={MessageSquareShareIcon}
              title="Manuaaliset viestit"
              amount={24400}
              className="bg-yellow-400 bg-opacity-50 text-yellow-600"
            />
            <StatsCard
              Icon={MessageSquareShareIcon}
              title="Automaattiset viestit"
              amount={24400}
              className="bg-green-400 bg-opacity-50 text-green-600"
            />
          </div>
        </div>

        <div>
          <div className="w-full">
            <InfiniteScroll
              className="grid h-full w-full grid-cols-1 place-items-center gap-6 gap-y-24 md:grid-cols-4"
              dataLength={cars.length}
              next={loadMore}
              hasMore={cars.length < carsJson.length}
              scrollThreshold={0.9}
              loader={
                <div className="flex items-center">
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Ladataan
                </div>
              }
              scrollableTarget="scrollable-container"
            >
              <CarList cars={cars} />
            </InfiniteScroll>
          </div>
        </div>
        <ChatWidget />
      </div>
    </div>
  );
}
