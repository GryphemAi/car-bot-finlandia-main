'use client';

import { useState } from 'react';
import { Bell, Mail, Car, Newspaper, Sparkles } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NotificationSettings {
  email: string;
  vehicleSales: boolean;
  vehicleNegotiations: boolean;
  updates: boolean;
  news: boolean;
}

export function NotificationsPopup() {
  const [settings, setSettings] = useState<NotificationSettings>({
    email: '',
    vehicleSales: false,
    vehicleNegotiations: false,
    updates: false,
    news: false,
  });

  const handleToggle = (key: keyof Omit<NotificationSettings, 'email'>) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const saveSettings = () => {
    // TODO: Implementar salvamento das configurações
    console.log('Configurações salvas:', settings);
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Configurações de Notificação
        </CardTitle>
        <CardDescription>
          Gerencie suas preferências de notificação
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email para Notificações</Label>
          <div className="flex gap-2">
            <Mail className="w-5 h-5 text-gray-500" />
            <Input
              id="email"
              type="email"
              value={settings.email}
              onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
              placeholder="seu@email.com"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Car className="w-4 h-4 text-gray-500" />
              <Label htmlFor="sales">Veículos Vendidos</Label>
            </div>
            <Switch
              id="sales"
              checked={settings.vehicleSales}
              onCheckedChange={() => handleToggle('vehicleSales')}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Car className="w-4 h-4 text-gray-500" />
              <Label htmlFor="negotiations">Veículos em Negociação</Label>
            </div>
            <Switch
              id="negotiations"
              checked={settings.vehicleNegotiations}
              onCheckedChange={() => handleToggle('vehicleNegotiations')}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-gray-500" />
              <Label htmlFor="updates">Novas Funcionalidades</Label>
            </div>
            <Switch
              id="updates"
              checked={settings.updates}
              onCheckedChange={() => handleToggle('updates')}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Newspaper className="w-4 h-4 text-gray-500" />
              <Label htmlFor="news">Notícias e Atualizações</Label>
            </div>
            <Switch
              id="news"
              checked={settings.news}
              onCheckedChange={() => handleToggle('news')}
            />
          </div>
        </div>

        <Button onClick={saveSettings} className="w-full">
          Salvar Preferências
        </Button>
      </CardContent>
    </Card>
  );
}
