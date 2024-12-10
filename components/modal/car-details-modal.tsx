'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Car } from '@/services/cars-service';
import { 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Gauge, 
  Info, 
  Shield, 
  Car as CarIcon,
  Palette,
  Fuel,
  Zap,
  Settings,
  DoorOpen,
  FileText,
  ListChecks,
  AlertCircle
} from 'lucide-react';
import Image from 'next/image';

interface CarDetailsModalProps {
  car: Car;
  isOpen: boolean;
  onClose: () => void;
}

export default function CarDetailsModal({ car, isOpen, onClose }: CarDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{car.nome}</DialogTitle>
        </DialogHeader>

        {/* Preço e Informações Básicas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-3xl font-bold text-primary mb-4">{car.preco}</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{car.ano}</span>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="h-5 w-5" />
                <span>{car.quilometragem}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{car.placa}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                <span>{car.contato}</span>
              </div>
            </div>
          </div>

          {/* Especificações Técnicas */}
          <div>
            <h4 className="font-semibold mb-2">Especificações Técnicas</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CarIcon className="h-5 w-5" />
                <span>Motor: {car.motor}</span>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                <span>Câmbio: {car.cambio}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                <span>Transmissão: {car.sistema_de_transmissao}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detalhes do Interior e Comodidades */}
        {car.interior_comodidades && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Interior e Comodidades</h4>
            <p>{car.interior_comodidades}</p>
          </div>
        )}

        {/* Segurança */}
        {car.seguranca && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Segurança</h4>
            <p>{car.seguranca}</p>
          </div>
        )}

        {/* Eletrônica */}
        {car.eletronica && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Eletrônica</h4>
            <p>{car.eletronica}</p>
          </div>
        )}

        {/* Informações Adicionais */}
        {car.informacoes_adicionais && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Informações Adicionais</h4>
            <p>{car.informacoes_adicionais}</p>
          </div>
        )}

        {/* Vendedor */}
        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold">Vendedor</h4>
              <p>{car.vendedor}</p>
            </div>
            <Button onClick={() => window.location.href = `tel:${car.contato}`}>
              Ligar para vendedor
            </Button>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}
