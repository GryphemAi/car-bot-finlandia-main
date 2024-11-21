'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle
} from '@/components/ui/card';
import { formatPhoneNumber } from '@/lib/utils';
import { format } from 'date-fns';
import { fi } from 'date-fns/locale';
import Image from 'next/image';
import { CarModal } from './car-modal';
import { useState } from 'react';
import { CarType } from '@/constants/data';

export default function CarCard(car: CarType) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CarModal car={car} isOpen={open} onClose={() => setOpen(false)} />
      <Card className="w-full  overflow-hidden rounded-lg shadow-lg">
        <Image
          src={car.images[0]?.url.startsWith('https') ? car.images[0]?.url : ''}
          alt="Card Image"
          className="h-48 w-full object-cover"
          width="300"
          height="200"
          style={{ objectFit: 'cover' }}
        />
        <CardContent className="space-y-4 p-6">
          <div>
            <CardTitle className="text-2xl font-bold">{car.name}</CardTitle>
            <CardDescription className="text-gray-500">
              <span className="block">Rekisterikilpi: {car.plate}</span>
              <span className="block">
                Yhteystiedot: {formatPhoneNumber(car.contact)}
              </span>
              Ilmoittaja: {car.seller}
              <span className="mt-2 block">
                {format(car.publishedAt, 'dd.MM.yyyy HH:mm', { locale: fi })}
              </span>
            </CardDescription>
            <CardDescription className="mt-2 text-lg font-bold text-blue-600">
              {Number(car.price).toLocaleString('fi-FI', {
                style: 'currency',
                currency: 'EUR'
              })}
            </CardDescription>
          </div>
          <div className="flex items-center justify-between">
            <Button onClick={() => setOpen(true)}>Lisätiedot</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
