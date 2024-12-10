'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Sidebar from '@/components/layout/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  User,
  Mail,
  Phone,
  Building2,
  Calendar,
  Image as ImageIcon,
  Save,
  FileText,
  Users,
  Car,
  Bell,
  Settings,
  Briefcase,
  Target,
  BarChart,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface CompanyInfo {
  name: string;
  cnpj: string;
  address: string;
  phone: string;
  email: string;
}

interface UserInfo {
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
}

interface Task {
  id: string;
  title: string;
  status: 'pending' | 'completed';
  dueDate: string;
}

export default function PerfilPage() {
  const [avatar, setAvatar] = useState('/placeholder-avatar.jpg');
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: 'Finlândia Carros',
    cnpj: '12.345.678/0001-90',
    address: 'Rua Principal, 123 - Centro',
    phone: '(11) 99999-9999',
    email: 'contato@finlandiacarros.com'
  });
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: 'João Silva',
    role: 'Administrador',
    email: 'joao@finlandiacarros.com',
    phone: '(11) 98888-8888',
    avatar: '/placeholder-avatar.jpg'
  });
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Revisar estoque de veículos', status: 'completed', dueDate: '2024-03-20' },
    { id: '2', title: 'Atualizar preços', status: 'pending', dueDate: '2024-03-22' },
    { id: '3', title: 'Contatar fornecedores', status: 'pending', dueDate: '2024-03-25' }
  ]);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      window.location.href = '/signin';
    }
  }, [status]);

  if (status === 'loading') {
    return <div className="flex justify-center items-center min-h-screen">Carregando...</div>;
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const stats = [
    { title: 'Veículos Cadastrados', value: '157', icon: Car, color: 'text-blue-500' },
    { title: 'Vendas Realizadas', value: '32', icon: CheckCircle, color: 'text-green-500' },
    { title: 'Tarefas Pendentes', value: '8', icon: Clock, color: 'text-orange-500' },
    { title: 'Equipe', value: '12', icon: Users, color: 'text-purple-500' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50/30">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Perfil Administrativo</h1>
            <Button className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configurações
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <div className={`p-3 bg-gray-100 rounded-xl ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid grid-cols-3 w-[400px]">
              <TabsTrigger value="profile">
                <User className="w-4 h-4 mr-2" />
                Perfil
              </TabsTrigger>
              <TabsTrigger value="company">
                <Building2 className="w-4 h-4 mr-2" />
                Empresa
              </TabsTrigger>
              <TabsTrigger value="tasks">
                <FileText className="w-4 h-4 mr-2" />
                Tarefas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Perfil</CardTitle>
                  <CardDescription>
                    Gerencie suas informações pessoais e preferências
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img
                        src={userInfo.avatar}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <label
                        htmlFor="avatar-upload"
                        className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
                      >
                        <ImageIcon className="h-4 w-4 text-white" />
                      </label>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome Completo</Label>
                          <Input
                            id="name"
                            value={userInfo.name}
                            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Cargo</Label>
                          <Input
                            id="role"
                            value={userInfo.role}
                            onChange={(e) => setUserInfo({ ...userInfo, role: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={userInfo.email}
                            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefone</Label>
                          <Input
                            id="phone"
                            value={userInfo.phone}
                            onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="company">
              <Card>
                <CardHeader>
                  <CardTitle>Informações da Empresa</CardTitle>
                  <CardDescription>
                    Gerencie os dados da sua empresa
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Nome da Empresa</Label>
                      <Input
                        id="company-name"
                        value={companyInfo.name}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input
                        id="cnpj"
                        value={companyInfo.cnpj}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, cnpj: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-email">Email Corporativo</Label>
                      <Input
                        id="company-email"
                        type="email"
                        value={companyInfo.email}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-phone">Telefone Comercial</Label>
                      <Input
                        id="company-phone"
                        value={companyInfo.phone}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="address">Endereço Completo</Label>
                      <Input
                        id="address"
                        value={companyInfo.address}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tasks">
              <Card>
                <CardHeader>
                  <CardTitle>Minhas Tarefas</CardTitle>
                  <CardDescription>
                    Gerencie suas tarefas e atividades pendentes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-full ${
                            task.status === 'completed' ? 'bg-green-100' : 'bg-orange-100'
                          }`}>
                            {task.status === 'completed' ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <Clock className="w-5 h-5 text-orange-600" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="text-sm text-gray-600">Vence em: {task.dueDate}</p>
                          </div>
                        </div>
                        <Button
                          variant={task.status === 'completed' ? 'outline' : 'default'}
                          size="sm"
                          onClick={() => {
                            setTasks(tasks.map(t => 
                              t.id === task.id 
                                ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' }
                                : t
                            ));
                          }}
                        >
                          {task.status === 'completed' ? 'Concluída' : 'Marcar como Concluída'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
