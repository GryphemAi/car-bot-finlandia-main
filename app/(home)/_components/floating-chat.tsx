'use client';

import { useState } from 'react';
import { MessageCircle, X, Send, Minimize2, Maximize2, Bug, HelpCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Message {
    id: number;
    text: string;
    isUser: boolean;
    timestamp: string;
    type?: 'bug' | 'question' | 'urgent';
    developer?: any;
}

interface Developer {
    id: number;
    name: string;
    role: string;
    avatar: string;
    status: 'online' | 'offline';
    description: string;
}

const developers: Developer[] = [
    { 
        id: 1, 
        name: 'Will', 
        role: 'Líder de Desenvolvimento', 
        avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=will&hair=long01&hairColor=red&backgroundColor=b6e3f4',
        status: 'online',
        description: 'Especialista em arquitetura de software e líder técnico do projeto.'
    },
    { 
        id: 2, 
        name: 'Robson', 
        role: 'Gerente Comercial', 
        avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=robson&backgroundColor=c1f4b6',
        status: 'online',
        description: 'Responsável pela gestão comercial e relacionamento com clientes.'
    },
    { 
        id: 3, 
        name: 'Everton', 
        role: 'Desenvolvedor Bot', 
        avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=everton&backgroundColor=f4b6b6',
        status: 'online',
        description: 'Especialista em desenvolvimento de bots e automação.'
    },
];

const getInitialMessage = (type: 'bug' | 'question' | 'urgent', dev: Developer) => {
    switch (type) {
        case 'bug':
            return `Olá ${dev.name}, encontrei um bug no sistema que precisa ser analisado. Segue a descrição:`;
        case 'question':
            return `Olá ${dev.name}, tenho uma dúvida sobre o sistema. Pode me ajudar?`;
        case 'urgent':
            return `Olá ${dev.name}, preciso de ajuda urgente com o seguinte problema:`;
        default:
            return '';
    }
};

export function FloatingChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [selectedDev, setSelectedDev] = useState<Developer | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [messageType, setMessageType] = useState<'bug' | 'question' | 'urgent'>('question');

    const teamMembers = [
        {
            id: 1,
            name: 'Will',
            role: 'Developer & Marketing Estrategista',
            avatar: 'https://ui-avatars.com/api/?name=Will+Marques&background=0D8ABC&color=fff',
            welcomeMessage: 'Olá! Sou o Will, desenvolvedor e estrategista de marketing. Como posso ajudar você com marketing digital ou desenvolvimento?'
        },
        {
            id: 2,
            name: 'Nicolas',
            role: 'CEO & Founder',
            avatar: 'https://ui-avatars.com/api/?name=Nicolas&background=27AE60&color=fff',
            welcomeMessage: 'Olá! Sou Nicolas, CEO da Gryphem AI. Estou aqui para discutir parcerias e oportunidades de negócio.'
        },
        {
            id: 3,
            name: 'Everton',
            role: 'Desenvolvedor Backend Júnior',
            avatar: 'https://ui-avatars.com/api/?name=Everton&background=E74C3C&color=fff',
            welcomeMessage: 'Olá! Sou o Everton, desenvolvedor backend. Posso ajudar com questões técnicas e desenvolvimento.'
        }
    ];

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: messages.length + 1,
            text: inputValue,
            isUser: true,
            timestamp: new Date().toLocaleTimeString(),
            type: messageType
        };

        setMessages([...messages, newMessage]);
        setInputValue('');

        // Simular resposta do desenvolvedor selecionado
        setTimeout(() => {
            const autoResponse: Message = {
                id: messages.length + 2,
                text: selectedDev 
                    ? `${selectedDev.welcomeMessage}` 
                    : `Olá! Recebemos seu ${messageType === 'bug' ? 'reporte de bug' : 'questionamento'}. Nossa equipe irá analisar e retornar em breve.`,
                isUser: false,
                timestamp: new Date().toLocaleTimeString(),
                developer: selectedDev || undefined
            };
            setMessages(prev => [...prev, autoResponse]);
        }, 1000);
    };

    const handleDevSelection = (dev: any) => {
        setSelectedDev(dev);
        // Limpa as mensagens anteriores
        setMessages([]);
        // Adiciona mensagem de boas-vindas do desenvolvedor
        const welcomeMessage: Message = {
            id: 1,
            text: dev.welcomeMessage,
            isUser: false,
            timestamp: new Date().toLocaleTimeString(),
            developer: dev
        };
        setMessages([welcomeMessage]);
    };

    const getMessageIcon = (type?: 'bug' | 'question' | 'urgent') => {
        switch (type) {
            case 'bug':
                return <Bug className="h-4 w-4" />;
            case 'urgent':
                return <AlertCircle className="h-4 w-4" />;
            default:
                return <HelpCircle className="h-4 w-4" />;
        }
    };

    return (
        <TooltipProvider>
            <div className="fixed bottom-4 right-4 z-50">
                {!isOpen && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={() => setIsOpen(true)}
                                className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 p-3 text-white shadow-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-200"
                            >
                                <MessageCircle className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            <p>Abrir chat de suporte</p>
                        </TooltipContent>
                    </Tooltip>
                )}

                {isOpen && (
                    <div className={`bg-white rounded-xl shadow-2xl w-96 ${isMinimized ? 'h-12' : 'h-[600px]'} border border-gray-200 transition-all duration-200`}>
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-xl">
                            <h3 className="font-semibold">Suporte Técnico</h3>
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="hover:bg-white/20 text-white"
                                >
                                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                    className="hover:bg-white/20 text-white"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {!isMinimized && (
                            <>
                                {/* Message Type Selector */}
                                <div className="p-4 border-b bg-gray-50">
                                    <div className="flex gap-2">
                                        <Button
                                            variant={messageType === 'bug' ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setMessageType('bug')}
                                            className="flex items-center gap-2"
                                        >
                                            <Bug className="h-4 w-4" />
                                            Bug
                                        </Button>
                                        <Button
                                            variant={messageType === 'question' ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setMessageType('question')}
                                            className="flex items-center gap-2"
                                        >
                                            <HelpCircle className="h-4 w-4" />
                                            Dúvida
                                        </Button>
                                        <Button
                                            variant={messageType === 'urgent' ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setMessageType('urgent')}
                                            className="flex items-center gap-2"
                                        >
                                            <AlertCircle className="h-4 w-4" />
                                            Urgente
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 h-[calc(100%-144px)]">
                                    {/* Team Members List */}
                                    <div className="col-span-1 border-r bg-gray-50 p-2 overflow-y-auto">
                                        {teamMembers.map((member) => (
                                            <div
                                                key={member.id}
                                                onClick={() => handleDevSelection(member)}
                                                className={`flex flex-col items-center p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                                    selectedDev?.id === member.id
                                                        ? 'bg-blue-100'
                                                        : 'hover:bg-gray-100'
                                                }`}
                                            >
                                                <img
                                                    src={member.avatar}
                                                    alt={member.name}
                                                    className="w-10 h-10 rounded-full mb-1"
                                                />
                                                <span className="text-xs font-medium text-center">
                                                    {member.name}
                                                </span>
                                                <span className="text-[10px] text-gray-500 text-center">
                                                    {member.role}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Chat Area */}
                                    <div className="col-span-3 flex flex-col">
                                        {/* Messages */}
                                        <div className="flex-1 p-4 overflow-y-auto space-y-4">
                                            {messages.map((msg) => (
                                                <div
                                                    key={msg.id}
                                                    className={`flex ${
                                                        msg.isUser ? 'justify-end' : 'justify-start'
                                                    }`}
                                                >
                                                    <div
                                                        className={`max-w-[80%] rounded-lg p-3 ${
                                                            msg.isUser
                                                                ? 'bg-blue-500 text-white'
                                                                : 'bg-gray-100'
                                                        }`}
                                                    >
                                                        {!msg.isUser && msg.developer && (
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <img
                                                                    src={msg.developer.avatar}
                                                                    alt={msg.developer.name}
                                                                    className="w-6 h-6 rounded-full"
                                                                />
                                                                <span className="text-xs font-medium">
                                                                    {msg.developer.name}
                                                                </span>
                                                            </div>
                                                        )}
                                                        <p className="text-sm">{msg.text}</p>
                                                        <span className="text-xs opacity-70 mt-1 block">
                                                            {msg.timestamp}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Input Area */}
                                        <div className="p-4 border-t">
                                            <div className="flex gap-2">
                                                <Input
                                                    value={inputValue}
                                                    onChange={(e) => setInputValue(e.target.value)}
                                                    placeholder="Digite sua mensagem..."
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleSendMessage();
                                                        }
                                                    }}
                                                />
                                                <Button onClick={handleSendMessage}>
                                                    <Send className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </TooltipProvider>
    );
}
