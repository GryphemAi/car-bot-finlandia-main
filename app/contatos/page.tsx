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
import { Car } from '@/services/cars-service';
import { MessageSquare, CheckCircle, XCircle, Clock } from 'lucide-react';
import Sidebar from '@/components/layout/sidebar';

interface Contact {
  id: string;
  carId: string;
  car: Car;
  date: string;
  message: string;
  status: 'pending' | 'responded' | 'no_response';
  response?: string;
  responseDate?: string;
}

export default function ContatosPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      window.location.href = '/signin';
    }
  }, [status]);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        setLoading(true);
        // TODO: Implementar lógica para carregar contatos do Firebase
        // Por enquanto, usando dados mockados
        const mockContacts: Contact[] = [];
        setContacts(mockContacts);
      } catch (error) {
        console.error('Erro ao carregar contatos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, []);

  const getStatusIcon = (status: Contact['status']) => {
    switch (status) {
      case 'responded':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'no_response':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: Contact['status']) => {
    switch (status) {
      case 'responded':
        return 'Respondido';
      case 'no_response':
        return 'Sem Resposta';
      default:
        return 'Pendente';
    }
  };

  if (status === 'loading') {
    return <div className="flex justify-center items-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        <h1 className="text-2xl font-bold mb-4">Contatos</h1>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Histórico de Contatos</h1>
              <p className="text-gray-500 mt-2">
                Todas as suas interações com vendedores
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              <span className="font-medium">{contacts.length} contatos</span>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Nenhum contato ainda
              </h3>
              <p className="text-gray-500 mb-6">
                Você ainda não entrou em contato com nenhum vendedor
              </p>
              <Button
                onClick={() => window.location.href = '/'}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Explorar Carros
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Veículo</TableHead>
                    <TableHead>Mensagem</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Resposta</TableHead>
                    <TableHead>Data Resposta</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell>{contact.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img
                            src={contact.car.imagem}
                            alt={contact.car.nome}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div>
                            <div className="font-medium">{contact.car.nome}</div>
                            <div className="text-sm text-gray-500">
                              {contact.car.marca} {contact.car.modelo}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{contact.message}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(contact.status)}
                          <span>{getStatusText(contact.status)}</span>
                        </div>
                      </TableCell>
                      <TableCell>{contact.response || '-'}</TableCell>
                      <TableCell>{contact.responseDate || '-'}</TableCell>
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
