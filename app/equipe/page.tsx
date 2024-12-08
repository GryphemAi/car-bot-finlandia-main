'use client';

import Sidebar from '@/components/layout/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, Target, Mail, Phone, Github, Linkedin } from 'lucide-react';

const teamMembers = [
  {
    name: 'Will',
    role: 'Developer Fullstack & Proprietário Frontmidie',
    email: 'comercial@frontmidie.tech',
    phone: '+55 41 9 9888-2650',
    avatar: 'https://ui-avatars.com/api/?name=Will+Marques&background=0D8ABC&color=fff',
    status: 'online',
    description: 'Desenvolvedor fullstack e proprietário da Frontmidie, liderando o desenvolvimento do sistema Car-Bot Finlândia com tecnologias modernas e inovadoras.',
    fullDescription: [
      'Olá, sou Willian, desenvolvedor fullstack e proprietário da Frontmidie. Atualmente, estou liderando o desenvolvimento de um sistema inovador de gestão de veículos chamado Car-Bot Finlândia, construído com as mais recentes tecnologias do mercado.',
      'Como desenvolvedor fullstack e líder técnico, projetei e implementei uma aplicação web robusta utilizando Next.js 14 com TypeScript. O projeto inclui um dashboard administrativo completo, sistema de gestão de veículos, área de equipe, sistema de favoritos, gestão de contatos e analytics.',
      'O diferencial do projeto está na sua arquitetura escalável e na atenção aos detalhes técnicos, incluindo código limpo e bem documentado, práticas modernas de desenvolvimento, performance otimizada, segurança em primeiro lugar e UX/UI intuitiva e responsiva. Como proprietário da Frontmidie, lidero não apenas o desenvolvimento técnico, mas também garanto que o produto final atenda às necessidades do mercado e mantenha os mais altos padrões de qualidade.'
    ],
    github: 'https://github.com/AlwaysPalaye',
    linkedin: 'https://www.linkedin.com/in/marqueswillian/',
  },
  {
    name: 'Nicolas',
    role: 'CEO & Founder',
    email: 'nicolas@gryphemAI.com',
    phone: '+358 41 754 6749',
    avatar: 'https://ui-avatars.com/api/?name=Nicolas&background=27AE60&color=fff',
    status: 'online',
    description: 'CEO e líder do projeto Gryphem AI Oy, responsável pelos investimentos e gerenciamento estratégico da empresa.',
    fullDescription: [
      'Sou o CEO e líder do projeto atual, responsável pelos investimentos e pelo gerenciamento da Gryphem AI Oy. Tenho orgulho de contar com uma equipe excepcional de programadores altamente capacitados, que entregam resultados com excelência e dedicação.',
      'Juntos, transformamos ideias em soluções inovadoras para o mundo digital.',
      'Com carinho,\nNicolas'
    ],
    github: 'https://github.com/GryphemAi',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Everton',
    role: 'Desenvolvedor Backend Júnior',
    email: 'everton@finlandia.com',
    phone: '+55 41 9 9999-9999',
    avatar: 'https://ui-avatars.com/api/?name=Everton&background=E74C3C&color=fff',
    status: 'online',
    description: 'Desenvolvedor júnior especializado em automação e integração com IA, com experiência em Python, JavaScript, C++ e Lua.',
    fullDescription: [
      'Sou um desenvolvedor júnior e participei do projeto responsável pela captura de carros na Nettauto. Além disso, desenvolvi a funcionalidade de envio de mensagens em massa pelo WhatsApp, integrada com IA.',
      'Tenho experiência nas seguintes linguagens de programação: Python, JavaScript, C++ e Lua.',
      'Para mais informações, acesse meu perfil no GitHub'
    ],
    github: 'https://github.com/Friend96',
    linkedin: 'https://linkedin.com',
  },
];

const companyInfo = {
  mission: "Nossa missão é revolucionar o mercado automotivo através de soluções tecnológicas inovadoras que conectam compradores e vendedores de forma eficiente e transparente.",
  vision: "Ser a principal plataforma de comercialização de veículos na Finlândia, reconhecida pela excelência em tecnologia e satisfação do cliente.",
  values: [
    "Inovação constante",
    "Transparência nas relações",
    "Excelência no atendimento",
    "Compromisso com resultados",
    "Sustentabilidade"
  ]
};

export default function EquipePage() {
  const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: string]: boolean }>({});
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      window.location.href = '/signin';
    }
  }, [status]);

  const toggleDescription = (memberName: string) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [memberName]: !prev[memberName]
    }));
  };

  if (status === 'loading') {
    return <div className="flex justify-center items-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50/30">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="equipe" className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight">Nossa Equipe</h1>
              <TabsList className="grid grid-cols-2 w-[400px]">
                <TabsTrigger value="equipe">
                  <Users className="w-4 h-4 mr-2" />
                  Equipe
                </TabsTrigger>
                <TabsTrigger value="empresa">
                  <Building2 className="w-4 h-4 mr-2" />
                  Empresa
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="equipe" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                  <Card key={member.name} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                        />
                        <span
                          className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white ${
                            member.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                          }`}
                        />
                      </div>
                      <h3 className="mt-4 text-xl font-semibold">{member.name}</h3>
                      <Badge variant="secondary" className="mt-2">
                        {member.role}
                      </Badge>
                      <div className="mt-3 text-sm text-gray-600 text-left px-4">
                        {expandedDescriptions[member.name] ? (
                          Array.isArray(member.fullDescription) ? (
                            member.fullDescription.map((paragraph, index) => (
                              <p key={index} className="mb-3 leading-relaxed">
                                {paragraph}
                              </p>
                            ))
                          ) : (
                            <p className="leading-relaxed">{member.fullDescription}</p>
                          )
                        ) : (
                          <p className="line-clamp-3 leading-relaxed">{member.description}</p>
                        )}
                        {'fullDescription' in member && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleDescription(member.name)}
                            className="mt-2 text-blue-600 hover:text-blue-800"
                          >
                            {expandedDescriptions[member.name] ? 'Ler menos' : 'Ler mais'}
                          </Button>
                        )}
                      </div>
                      <div className="mt-4 space-y-2 w-full">
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span>{member.email}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{member.phone}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-4">
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="empresa" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Target className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Missão</h3>
                  </div>
                  <p className="text-gray-600">{companyInfo.mission}</p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Building2 className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Visão</h3>
                  </div>
                  <p className="text-gray-600">{companyInfo.vision}</p>
                </Card>

                <Card className="p-6 lg:col-span-2">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Valores</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {companyInfo.values.map((value, index) => (
                      <div
                        key={index}
                        className="flex items-center p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                        <span className="text-gray-700">{value}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
