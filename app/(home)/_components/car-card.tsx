'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Calendar, 
  Gauge,
  Car as CarIcon,
  Settings,
  Tag,
  Clock,
  Heart,
  Share2,
  ArrowRight
} from 'lucide-react';
import { useState, useEffect } from 'react';
import CarDetailsModal from '@/components/modal/car-details-modal';
import { Car } from '@/services/cars-service';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Carregar estado inicial dos favoritos
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteCards') || '[]');
    setIsFavorite(favorites.includes(car.id));
  }, [car.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteCards') || '[]');
    
    if (isFavorite) {
      // Remover dos favoritos
      const newFavorites = favorites.filter((favId: string) => favId !== car.id);
      localStorage.setItem('favoriteCards', JSON.stringify(newFavorites));
      toast.success('Veículo removido dos favoritos');
    } else {
      // Adicionar aos favoritos
      favorites.push(car.id);
      localStorage.setItem('favoriteCards', JSON.stringify(favorites));
      toast.success('Veículo adicionado aos favoritos');
    }
    
    setIsFavorite(!isFavorite);
  };

  // Formatar preço se necessário
  const formattedPrice = car.preco || '';
  
  // Formatar data removendo o prefixo
  const formattedDate = car.data?.replace('Päivitetty ', '') || '';

  return (
    <Card 
      className="group overflow-hidden rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[200px] overflow-hidden">
        {/* Imagem do carro com zoom suave */}
        <Image
          src={car.imagem || '/placeholder-car.png'}
          alt={car.nome || 'Carro'}
          fill
          className={cn(
            "object-cover transition-transform duration-700 ease-in-out",
            isHovered && "scale-110"
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-car.png';
          }}
          unoptimized={car.imagem?.includes('nettiauto.com')}
        />
        
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 animate-fade-in-up">
          <Badge className="bg-white/90 text-black hover:bg-white/80 transition-colors">
            {car.ano}
          </Badge>
          {car.Inspecionado && (
            <Badge className="bg-blue-500/90 text-white hover:bg-blue-500/80 transition-colors">
              Insp: {car.Inspecionado}
            </Badge>
          )}
        </div>

        {/* Botões de ação */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/90 hover:bg-white transition-colors"
            onClick={toggleFavorite}
          >
            <Heart className={cn("h-4 w-4 transition-colors", isFavorite ? "text-red-500 fill-red-500" : "text-gray-600")} />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/90 hover:bg-white transition-colors"
          >
            <Share2 className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
      </div>

      <CardContent className="p-5">
        {/* Nome e Preço */}
        <div className="mb-4">
          <h3 className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors">{car.nome}</h3>
          <p className="text-2xl font-bold text-primary mt-2">{formattedPrice}</p>
        </div>

        {/* Especificações */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2 group/item">
            <div className="p-1.5 rounded-lg bg-gray-100 group-hover/item:bg-primary/10 group-hover/item:text-primary transition-colors">
              <Gauge className="h-4 w-4" />
            </div>
            <span className="truncate group-hover/item:text-primary transition-colors">{car.quilometragem}</span>
          </div>
          <div className="flex items-center gap-2 group/item">
            <div className="p-1.5 rounded-lg bg-gray-100 group-hover/item:bg-primary/10 group-hover/item:text-primary transition-colors">
              <Settings className="h-4 w-4" />
            </div>
            <span className="truncate group-hover/item:text-primary transition-colors">{car.cambio}</span>
          </div>
          <div className="flex items-center gap-2 group/item">
            <div className="p-1.5 rounded-lg bg-gray-100 group-hover/item:bg-primary/10 group-hover/item:text-primary transition-colors">
              <CarIcon className="h-4 w-4" />
            </div>
            <span className="truncate group-hover/item:text-primary transition-colors">{car.motor}</span>
          </div>
          <div className="flex items-center gap-2 group/item">
            <div className="p-1.5 rounded-lg bg-gray-100 group-hover/item:bg-primary/10 group-hover/item:text-primary transition-colors">
              <Tag className="h-4 w-4" />
            </div>
            <span className="truncate group-hover/item:text-primary transition-colors">{car.placa?.split(' - ')[0]}</span>
          </div>
        </div>

        {/* Data e Botão */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <Button 
            onClick={() => setIsModalOpen(true)} 
            size="sm"
            className="bg-primary/90 hover:bg-primary text-white rounded-xl flex items-center gap-2 transition-all duration-300 hover:gap-3"
          >
            Ver detalhes
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>

      {/* Modal de Detalhes */}
      {isModalOpen && (
        <CarDetailsModal
          car={car}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Card>
  );
}
