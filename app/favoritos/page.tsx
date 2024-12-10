'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import CarCard from '@/app/(home)/_components/car-card';
import { Car, getAllCars } from '@/services/cars-service';
import { Heart } from 'lucide-react';
import Sidebar from '@/components/layout/sidebar';
import { useSession } from 'next-auth/react';

export default function FavoritosPage() {
  const [favoritos, setFavoritos] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      window.location.href = '/signin';
    }
  }, [status]);

  useEffect(() => {
    const loadFavoritos = async () => {
      try {
        setLoading(true);
        // Pega os IDs dos favoritos do localStorage
        const favoriteIds = JSON.parse(localStorage.getItem('favoriteCards') || '[]');
        
        // Busca todos os carros
        const allCars = await getAllCars();
        
        // Filtra só os favoritos
        const carrosFavoritos = allCars.filter(car => 
          favoriteIds.includes(car.id) || favoriteIds.includes(car.ID)
        );
        
        setFavoritos(carrosFavoritos);
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavoritos();

    // Atualiza quando houver mudança no localStorage
    window.addEventListener('storage', loadFavoritos);
    return () => window.removeEventListener('storage', loadFavoritos);
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Meus Favoritos</h1>
              <p className="text-gray-500 mt-2">
                Carros que você marcou como favorito
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span className="font-medium">{favoritos.length} carros</span>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : favoritos.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Nenhum favorito ainda
              </h3>
              <p className="text-gray-500 mb-6">
                Você ainda não adicionou nenhum carro aos favoritos
              </p>
              <Button
                onClick={() => window.location.href = '/'}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Explorar Carros
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favoritos.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
