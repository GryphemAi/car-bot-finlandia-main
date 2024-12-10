'use client';

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Accordion } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import {
  BasicFilters,
  TechnicalFilters,
  ElectricFilters,
  EquipmentFilters,
  ColorFilters,
} from "@/components/filters";
import Sidebar from '@/components/layout/sidebar';
import { toast } from 'sonner';
import { Car, MessageCircle, Bot, Smile, Paperclip, Send } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function PainelPage() {
  const [templateName, setTemplateName] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [schedule, setSchedule] = useState("");
  const [sendingProgress, setSendingProgress] = useState(0);
  const [matchedVehicles, setMatchedVehicles] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [isAIEnabled, setIsAIEnabled] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: 'user',
      content: 'Olá, gostaria de mais informações sobre o veículo',
      time: '10:30'
    },
    {
      sender: 'bot',
      content: 'Claro, o veículo é um Fiat Uno, placa ABC-1234, e está em andamento.',
      time: '10:31'
    }
  ]);

  const mockChats = [
    {
      contact: {
        name: "João Silva",
        phone: "+55 11 99999-9999",
        lastMessage: "Olá, gostaria de mais informações sobre o veículo",
        timestamp: "10:30",
        messageStatus: "Entregue ✓✓"
      },
      vehicle: {
        model: "BMW X3",
        year: "2022",
        price: "R$ 350.000",
        image: "/images/bmw-x3.jpg",
        details: "2.0 Turbo, Automático, Gasolina",
        km: "45.000"
      }
    },
  ];

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      window.location.href = '/signin';
    }
  }, [status]);

  const handleStartSending = () => {
    if (!templateName || !messageContent || !schedule) {
      alert("Por favor, preencha todos os campos antes de iniciar o envio.");
      return;
    }
    setIsSending(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setSendingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsSending(false);
      }
    }, 1000);
  };

  const toggleAI = () => {
    setIsAIEnabled(!isAIEnabled);
    toast.success(
      !isAIEnabled 
        ? 'IA ativada! Agora ela irá responder automaticamente.' 
        : 'IA desativada. As respostas serão manuais.'
    );
  };

  const handleSendMessage = () => {
    if (!newMessage) return;
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', content: newMessage, time: new Date().toLocaleTimeString() }]);
    setNewMessage("");
  };

  if (status === 'loading') {
    return <div className="flex justify-center items-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50/30">
      <Sidebar />
      <main className="flex-1 p-8 ml-[calc(1rem+16rem)]">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 tracking-tight">Painel de Controle</h1>
        
        <Tabs defaultValue="mensagens" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger 
              value="mensagens" 
              className="text-sm font-medium transition-all duration-200 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
            >
              Configuração de Mensagens
            </TabsTrigger>
            <TabsTrigger 
              value="chat" 
              className="text-sm font-medium transition-all duration-200 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Monitoramento de Envios
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mensagens">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Side - Filters */}
              <Card className="lg:col-span-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200">
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Filtros</h3>
                    <Badge variant="secondary" className="text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">
                      {matchedVehicles} veículos encontrados
                    </Badge>
                  </div>
                  <ScrollArea className="h-[700px] pr-4">
                    <Accordion type="single" collapsible className="w-full">
                      <BasicFilters />
                      <TechnicalFilters />
                      <ElectricFilters />
                      <EquipmentFilters />
                      <ColorFilters />
                    </Accordion>
                  </ScrollArea>
                </div>
              </Card>

              {/* Middle - Message Configuration */}
              <div className="lg:col-span-8 space-y-6">
                <Card className="shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200">
                  <div className="p-4 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Template da Mensagem</h3>
                    
                    <div className="grid gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Título do Template</label>
                        <Input 
                          placeholder="Ex: Promoção BMW Série 3" 
                          value={templateName}
                          onChange={(e) => setTemplateName(e.target.value)}
                          className="mt-1 focus:ring-2 focus:ring-blue-500 border-gray-300 hover:border-gray-400 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700">Mensagem</label>
                        <Textarea 
                          placeholder="Digite sua mensagem aqui... Use {nome} para personalizar com o nome do cliente"
                          className="h-32 mt-1 focus:ring-2 focus:ring-blue-500 border-gray-300 hover:border-gray-400 transition-colors resize-none"
                          value={messageContent}
                          onChange={(e) => setMessageContent(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700">Agendamento do Envio</label>
                        <Input 
                          type="datetime-local" 
                          value={schedule}
                          onChange={(e) => setSchedule(e.target.value)}
                          className="mt-1 focus:ring-2 focus:ring-blue-500 border-gray-300 hover:border-gray-400 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Preview e Status do Envio */}
                <Card className="shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200">
                  <div className="p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-800">Pré-visualização</h3>
                      {schedule && (
                        <Badge variant="outline" className="font-medium bg-blue-50 text-blue-700 border border-blue-200">
                          Agendado para: {new Date(schedule).toLocaleString()}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="bg-white p-4 rounded-lg shadow-sm space-y-2 border border-gray-100">
                        <h4 className="font-medium text-gray-800">{templateName || "Título do Template"}</h4>
                        <div className="whitespace-pre-wrap text-gray-600">
                          {messageContent || "Sua mensagem aparecerá aqui..."}
                        </div>
                      </div>
                    </div>

                    {isSending && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progresso do Envio</span>
                          <span className="font-medium">{sendingProgress}%</span>
                        </div>
                        <Progress value={sendingProgress} className="h-2" indicatorClassName="bg-blue-500" />
                      </div>
                    )}

                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm hover:shadow-md transition-all duration-200"
                      onClick={handleStartSending}
                      disabled={isSending}
                    >
                      {isSending ? "Enviando..." : "Iniciar Envio em Massa"}
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chat">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Lista de Envios */}
              <Card className="lg:col-span-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200">
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Mensagens Enviadas</h3>
                  <ScrollArea className="h-[700px]">
                    {mockChats.map((chat, index) => (
                      <div 
                        key={index} 
                        className="p-3 border-b border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors duration-200"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-medium text-gray-800 block">{chat.contact.name}</span>
                            <span className="text-sm text-gray-500 block">{chat.contact.phone}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-gray-500 block">{chat.contact.timestamp}</span>
                            <span className="text-xs text-green-600 block">{chat.contact.messageStatus}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              </Card>

              {/* Chat Messages */}
              <Card className="lg:col-span-5 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200">
                <div className="h-full">
                  <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
                    {/* Header */}
                    <div className="p-4 border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">Conversa com João Silva</h3>
                          <span className="text-sm text-gray-500">+55 11 99999-9999</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={toggleAI}
                          className={`p-2 rounded-full transition-colors ${
                            isAIEnabled ? 'text-blue-600 hover:text-blue-700' : 'text-red-600 hover:text-red-700'
                          }`}
                        >
                          <Bot className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    {/* Messages Area with Scroll */}
                    <div className="flex-1 overflow-y-auto">
                      <div className="p-4 space-y-4">
                        {messages.map((message, index) => (
                          <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-3 rounded-lg max-w-[70%] ${
                              message.sender === 'user' 
                                ? 'bg-blue-50 border border-blue-100' 
                                : 'bg-gray-50 border border-gray-100'
                            }`}>
                              <p className="text-sm">{message.content}</p>
                              <span className="text-xs text-gray-500 mt-1 block text-right">
                                {message.time}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Fixed Input Area */}
                    <div className="border-t bg-white p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <Smile className="h-5 w-5 text-gray-500" />
                          </Button>
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <Paperclip className="h-5 w-5 text-gray-500" />
                          </Button>
                        </div>
                        <Input
                          placeholder="Digite uma mensagem..."
                          className="flex-1"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleSendMessage();
                            }
                          }}
                        />
                        <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700 text-white">
                          <Send className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Vehicle Information */}
              <Card className="lg:col-span-3">
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Dados do Lead</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Veículo Correspondente</h4>
                      <div className="space-y-2">
                        <img src="/images/bmw-x3.jpg" alt="BMW X3" className="rounded-lg w-full" />
                        <h5 className="font-medium">BMW X3</h5>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-600">Ano:</p>
                            <p>2022</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Placa:</p>
                            <p>ABC-1234</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Preço:</p>
                            <p>R$ 350.000</p>
                          </div>
                          <div>
                            <p className="text-gray-600">KM:</p>
                            <p>45.000</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">2.0 Turbo, Automático, Gasolina</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Informações do Contato</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-gray-600">Template:</p>
                          <p>{templateName}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Data do Envio:</p>
                          <p>15/03/2024 10:30</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Status:</p>
                          <p className="text-green-600">Mensagem Entregue</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
