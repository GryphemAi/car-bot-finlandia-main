"use client";

import Sidebar from "@/components/layout/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PoliticaDePrivacidade() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div className="flex justify-center items-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-100">
        <ScrollArea className="h-full">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-8">Política de Privacidade</h1>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Coleta de Dados</h2>
              <p className="text-gray-700 mb-4">
                Nossa plataforma coleta e processa dados necessários para a operação do serviço,
                incluindo:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Informações de cadastro e verificação de usuários</li>
                <li>Dados de veículos anunciados</li>
                <li>Histórico de mensagens e interações</li>
                <li>Informações de contato de vendedores</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Uso dos Dados</h2>
              <p className="text-gray-700 mb-4">
                Os dados coletados são utilizados para:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Facilitar a comunicação entre compradores e vendedores</li>
                <li>Melhorar a experiência do usuário na plataforma</li>
                <li>Garantir a segurança e integridade do serviço</li>
                <li>Processar cobranças e pagamentos</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Proteção de Dados</h2>
              <p className="text-gray-700 mb-4">
                Implementamos medidas técnicas e organizacionais para proteger seus dados, incluindo:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Criptografia de dados sensíveis</li>
                <li>Controle de acesso restrito</li>
                <li>Monitoramento de segurança</li>
                <li>Backups regulares</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Compartilhamento de Dados</h2>
              <p className="text-gray-700 mb-4">
                Seus dados podem ser compartilhados apenas nas seguintes situações:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Entre compradores e vendedores para facilitação da negociação</li>
                <li>Com prestadores de serviço necessários para operação da plataforma</li>
                <li>Por requisição legal ou ordem judicial</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Seus Direitos</h2>
              <p className="text-gray-700 mb-4">
                Você tem direito a:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Acessar seus dados pessoais</li>
                <li>Solicitar correção de dados incorretos</li>
                <li>Solicitar exclusão de seus dados</li>
                <li>Revogar consentimento de uso</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Retenção de Dados</h2>
              <p className="text-gray-700 mb-4">
                Mantemos seus dados apenas pelo tempo necessário para:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Cumprir as finalidades para as quais foram coletados</li>
                <li>Atender requisitos legais</li>
                <li>Resolver disputas</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Contato</h2>
              <p className="text-gray-700 mb-4">
                Para questões relacionadas à privacidade de seus dados, entre em contato através dos
                canais oficiais disponíveis em nossa plataforma.
              </p>
            </section>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
