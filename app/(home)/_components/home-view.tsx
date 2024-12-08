'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import CarCard from './car-card';
import { getCars } from '@/services/cars-service';
import type { Car } from '@/services/cars-service';
import { DocumentData } from 'firebase/firestore';
import { Input } from '@/components/ui/input';
import { FloatingChat } from './floating-chat';
import { BrandBar } from './brand-bar';
import Link from 'next/link';
import { Search, Car as CarIcon, Sparkles, ArrowRight } from 'lucide-react';

function CarList({ cars }: { cars: Car[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}

export default function HomeView() {
  const [cars, setCars] = useState<Car[]>([]);
  const [lastDoc, setLastDoc] = useState<DocumentData | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentCars, setRecentCars] = useState<Car[]>([]);

  const loadCars = async (isInitial = false) => {
    try {
      setError(null);
      setLoading(true);
      
      const result = await getCars(6, isInitial ? null : lastDoc);
      
      if (!result || !result.cars) {
        setError('Erro ao carregar dados dos carros.');
        return;
      }
      
      if (result.cars.length === 0) {
        if (isInitial) {
          setError('Nenhum carro encontrado.');
        }
        setHasMore(false);
        return;
      }

      // Filtrar carros baseado na busca
      const filteredCars = searchQuery
        ? result.cars.filter(car =>
            car.nome.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : result.cars;

      setCars(prevCars => {
        const newCars = isInitial ? filteredCars : [...prevCars, ...filteredCars];
        return newCars;
      });
      
      // Armazenar carros recentes separadamente
      if (isInitial) {
        setRecentCars(result.cars.slice(0, 3));
      }
      
      setLastDoc(result.lastDoc);
      setHasMore(result.cars.length === 6);
      
    } catch (error) {
      console.error('Erro ao carregar carros:', error);
      setError('Erro ao carregar carros. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadCars(true);
  };

  useEffect(() => {
    loadCars(true);
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => loadCars(true)}>Tentar novamente</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-3xl shadow-2xl animate-fade-in">
        <div className="relative">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6 animate-bounce-slow">
                <CarIcon className="w-12 h-12 text-blue-400 mr-3" />
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white animate-text-gradient">
                Encontre os melhores carros para o seu negócio
              </h1>
              <p className="text-xl text-blue-100 mb-8 animate-fade-in-up">
                Localize oportunidades e negocie com eficiência em poucos cliques
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in-up delay-200">
                <div className="relative flex-1 max-w-lg group">
                  <Input
                    placeholder="Buscar por marca, modelo ou nome..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-12 rounded-xl h-12 transition-all duration-300 focus:bg-white/20 focus:border-blue-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-all duration-300 group-hover:text-blue-400" />
                </div>
                <Button
                  onClick={handleSearch}
                  className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl h-12 px-6 flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  <Search className="w-5 h-5" />
                  Buscar
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Cars Section */}
      {recentCars.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Adicionados Recentemente
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Cars Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <BrandBar />
          </div>
          <h2 className="text-3xl font-bold text-center mb-12">
            {searchQuery ? 'Resultados da Busca' : 'Todos os Carros'}
          </h2>
          
          {loading && cars.length === 0 ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {cars.length === 0 && searchQuery ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Nenhum carro encontrado para "{searchQuery}"</p>
                </div>
              ) : (
                <>
                  <CarList cars={cars} />
                  
                  {hasMore && (
                    <div className="mt-12 text-center">
                      <Button
                        onClick={() => loadCars(false)}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl h-12 px-6 flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                      >
                        {loading ? 'Carregando...' : 'Carregar mais'}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>
      <FloatingChat />
    </div>
  );
}
