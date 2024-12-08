"use client";

import { Card } from "@/components/ui/card";
import { WorldMap } from "@/components/analytics/world-map";
import Sidebar from '@/components/layout/sidebar';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const messageData = [
  { name: "Sep", value: 4000 },
  { name: "Oct", value: 3000 },
  { name: "Nov", value: 5000 },
  { name: "Dec", value: 2800 },
  { name: "Jan", value: 5900 },
  { name: "Feb", value: 4300 },
];

const vehicleData = [
  { name: "Finlândia", value: 100, color: "#3B82F6" }
];

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        {/* Cards informativos */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Total de Mensagens</p>
              <div className="flex items-baseline space-x-2">
                <h2 className="text-3xl font-bold">34.219</h2>
              </div>
              <p className="text-sm text-green-500">+15% em relação ao mês anterior</p>
            </div>
          </Card>

          <Card className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Valor Pendente</p>
              <div className="flex items-baseline space-x-2">
                <h2 className="text-3xl font-bold">€ 1.710,95</h2>
              </div>
              <p className="text-sm text-gray-500">€0,05 por mensagem enviada</p>
            </div>
          </Card>

          <Card className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Taxa de Entrega</p>
              <div className="flex items-baseline space-x-2">
                <h2 className="text-3xl font-bold">98.5%</h2>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "98.5%" }}></div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Taxa de Resposta</p>
              <div className="flex items-baseline space-x-2">
                <h2 className="text-3xl font-bold">15.3%</h2>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "15.3%" }}></div>
              </div>
            </div>
          </Card>
        </div>

        {/* Grid principal com mapa e gráficos */}
        <div className="grid grid-cols-12 gap-6">
          {/* Mapa Mundial - Ocupa 8 colunas */}
          <Card className="col-span-8 p-6">
            <h2 className="text-lg font-semibold mb-4">Distribuição de Veículos</h2>
            <WorldMap />
          </Card>

          {/* Gráfico de Rosca - Ocupa 4 colunas */}
          <Card className="col-span-4 p-6">
            <h2 className="text-lg font-semibold mb-4">Concentração por Região</h2>
            <div className="h-[400px] flex items-center justify-center">
              <PieChart width={300} height={300}>
                <Pie
                  data={vehicleData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {vehicleData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend 
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                />
              </PieChart>
            </div>
          </Card>

          {/* Gráfico de Linha - Ocupa todas as 12 colunas */}
          <Card className="col-span-12 p-6">
            <h2 className="text-lg font-semibold mb-4">Mensagens por Mês</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={messageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#6b7280"
                    tick={{ fill: '#6b7280' }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    tick={{ fill: '#6b7280' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
