'use client';
import { useEffect, useState } from 'react';
import { cn, formatPhoneNumber } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { CarType } from '@/constants/data';

interface CarModalProps {
  car: CarType;
  isOpen: boolean;
  onClose: () => void;
}

const InfoCard = ({
  children,
  title,
  className
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) => (
  <Card>
    <CardContent className="my-0 flex flex-col justify-center p-2">
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>
      <div className={cn('mb-4 grid grid-cols-2 gap-4 px-0 py-4', className)}>
        {children}
      </div>
    </CardContent>
  </Card>
);

export const CarModal: React.FC<CarModalProps> = ({ car, isOpen, onClose }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-full min-h-full overflow-y-auto  p-6 md:min-h-[auto] md:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{`Yksityiskohdat - ${car.name} ${car.year}`}</DialogTitle>
        </DialogHeader>
        <div className="w-full items-center justify-center gap-4">
          <div className="mx-auto w-full space-y-4 overflow-hidden rounded-lg bg-white p-6 shadow-lg">
            <div>
              <div>
                <div className="mb-6 rounded-lg border p-4">
                  <h3 className="mb-4 text-lg font-bold text-gray-700">
                    Perustiedot
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Nimi:</span>
                      <span className="text-gray-800">{car.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Myyjä:</span>
                      <span className="text-gray-800">{car.seller}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Yhteystiedot:</span>
                      <span className="text-gray-800">
                        {formatPhoneNumber(car.contact)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Sijainti:</span>
                      <span className="text-gray-800">N/A</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Hinta:</span>
                      <span className="text-gray-800">
                        {Number(car.price).toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Vuosi:</span>
                      <span className="text-gray-800">{car.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Kilometrit:</span>
                      <span className="text-gray-800">{car.kilometers}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
              <div className="col-span-2">
                <InfoCard title="Tekniset tiedot">
                  {car.specs.map((type) => (
                    <div key={type} className="flex gap-2">
                      <Label htmlFor={type}>{type}</Label>
                    </div>
                  ))}
                </InfoCard>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
              <div className="col-span-2">
                <InfoCard title="Sisätilat ja mukavuudet">
                  {car.interior.map((type) => (
                    <div key={type} className="flex gap-2">
                      <Label htmlFor={type}>{type}</Label>
                    </div>
                  ))}
                </InfoCard>
              </div>
            </div>

            <div className="col-span-2">
              <InfoCard title="Elektroniikka">
                {car.eletronics.map((type) => (
                  <div key={type} className="flex gap-2">
                    <Label htmlFor={type}>{type}</Label>
                  </div>
                ))}
              </InfoCard>
            </div>

            <InfoCard title="Turvallisuus">
              {car.securities.map((type) => (
                <div key={type} className="flex gap-2">
                  <Label htmlFor={type}>{type}</Label>
                </div>
              ))}
            </InfoCard>

            <InfoCard title="Muut">
              {car.others.map((type) => (
                <div key={type} className="flex gap-2">
                  <Label htmlFor={type}>{type}</Label>
                </div>
              ))}
            </InfoCard>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
