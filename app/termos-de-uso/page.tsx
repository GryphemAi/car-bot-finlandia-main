"use client";

import Sidebar from "@/components/layout/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TermosDeUso() {
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
            <h1 className="text-3xl font-bold mb-8">Termos de Uso</h1>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Aceitação dos Termos</h2>
              <p className="text-gray-700 mb-4">
                Ao acessar e utilizar a plataforma, você concorda com estes termos de uso. Se você não
                concordar com qualquer parte destes termos, não deverá utilizar nossos serviços.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Acesso Restrito</h2>
              <p className="text-gray-700 mb-4">
                Nossa plataforma é de acesso restrito e exclusivo para usuários verificados. O acesso
                não autorizado ou tentativa de burlar nossos sistemas de segurança resultará em medidas
                legais apropriadas.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Serviços e Tarifas</h2>
              <p className="text-gray-700 mb-4">
                Nosso serviço facilita a comunicação entre compradores e vendedores de veículos através
                de um sistema automatizado de mensagens. Cada mensagem enviada tem um custo de 0,05€
                (cinco centavos de euro).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Isenção de Responsabilidade</h2>
              <p className="text-gray-700 mb-4">
                Nossa plataforma atua apenas como intermediária na comunicação entre compradores e
                vendedores. Não somos proprietários dos veículos anunciados e não nos responsabilizamos
                por:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Veracidade das informações fornecidas pelos vendedores</li>
                <li>Estado dos veículos anunciados</li>
                <li>Negociações ou transações realizadas entre as partes</li>
                <li>Problemas técnicos ou mecânicos dos veículos</li>
                <li>Disputas ou conflitos entre compradores e vendedores</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Uso do Bot de WhatsApp</h2>
              <p className="text-gray-700 mb-4">
                Nossa plataforma utiliza um bot automatizado para WhatsApp que permite:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Comunicação simultânea com múltiplos vendedores</li>
                <li>Coleta automatizada de dados de veículos e vendedores</li>
                <li>Iniciação de conversas em tempo real</li>
              </ul>
              <p className="text-gray-700 mb-4">
                O usuário é responsável pelo uso adequado desta ferramenta e deve respeitar as
                políticas de uso do WhatsApp.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Proteção de Dados</h2>
              <p className="text-gray-700 mb-4">
                Todas as informações coletadas e processadas através de nossa plataforma estão sujeitas
                à nossa Política de Privacidade. O uso inadequado ou não autorizado de dados resultará
                em penalidades legais.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Modificações dos Termos</h2>
              <p className="text-gray-700 mb-4">
                Reservamo-nos o direito de modificar estes termos a qualquer momento, sendo
                responsabilidade do usuário verificar periodicamente as atualizações.
              </p>
            </section>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
