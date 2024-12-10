'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Car as CarIcon, ShoppingCart, CheckCircle, Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Sidebar from '@/components/layout/sidebar';
import { getCars, Car } from '@/services/cars-service';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function VeiculosPage() {
  const [vehicles, setVehicles] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const cars = await getCars();
        setVehicles(Array.isArray(cars) ? cars : []);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        setVehicles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const formatDate = (date: string) => {
    return format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Veículos</h1>
            <p className="text-gray-600">Gerencie seus veículos</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline">
              <CarIcon className="mr-2 h-4 w-4" />
              Adicionar Veículo
            </Button>
            <Button>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Comprar Créditos
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <CarIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total de Veículos</p>
                <p className="text-2xl font-semibold">{vehicles?.length || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Ativos</p>
                <p className="text-2xl font-semibold">{vehicles?.length || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Última Atualização</p>
                <p className="text-2xl font-semibold">Hoje</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : !vehicles || vehicles.length === 0 ? (
            <div className="text-center py-12">
              <CarIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum veículo encontrado</h3>
              <p className="mt-1 text-sm text-gray-500">Comece adicionando um novo veículo.</p>
            </div>
          ) : (
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Modelo</TableHead>
                    <TableHead>Ano</TableHead>
                    <TableHead>Quilometragem</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Data de Atualização</TableHead>
                    <TableHead>Vendedor</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicles.map((vehicle) => (
                    <TableRow key={vehicle.ID}>
                      <TableCell className="font-medium">{vehicle.nome}</TableCell>
                      <TableCell>{vehicle.ano}</TableCell>
                      <TableCell>{vehicle.quilometragem}</TableCell>
                      <TableCell>{formatPrice(vehicle.preco)}</TableCell>
                      <TableCell>{formatDate(vehicle.data)}</TableCell>
                      <TableCell>{vehicle.vendedor}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Ver Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
