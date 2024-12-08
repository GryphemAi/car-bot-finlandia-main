'use client';

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function EquipmentFilters() {
  const interiorEquipment = [
    { id: "ac", label: "Ar Condicionado" },
    { id: "leather", label: "Bancos em Couro" },
    { id: "heated_seats", label: "Bancos Aquecidos" },
    { id: "start_stop", label: "Start-Stop" },
    { id: "cruise_control", label: "Piloto Automático" },
    { id: "climate_control", label: "Climatização" },
    { id: "panoramic_roof", label: "Teto Panorâmico" },
    { id: "electric_seats", label: "Bancos Elétricos" },
    { id: "armrest", label: "Apoio de Braço" },
    { id: "isofix", label: "ISOFIX" }
  ];

  const electronicsEquipment = [
    { id: "bluetooth", label: "Bluetooth" },
    { id: "usb", label: "USB" },
    { id: "navigation", label: "Sistema de Navegação" },
    { id: "parking_sensors", label: "Sensores de Estacionamento" },
    { id: "reverse_camera", label: "Câmera de Ré" },
    { id: "360_camera", label: "Câmera 360°" },
    { id: "head_up_display", label: "Head-up Display" },
    { id: "apple_carplay", label: "Apple CarPlay" },
    { id: "android_auto", label: "Android Auto" },
    { id: "digital_dashboard", label: "Painel Digital" }
  ];

  const safetyEquipment = [
    { id: "abs", label: "ABS" },
    { id: "airbags", label: "Airbags" },
    { id: "esp", label: "Controle de Estabilidade" },
    { id: "traction_control", label: "Controle de Tração" },
    { id: "lane_assist", label: "Assistente de Faixa" },
    { id: "blind_spot", label: "Monitoramento de Ponto Cego" },
    { id: "emergency_brake", label: "Frenagem de Emergência" },
    { id: "tire_pressure", label: "Monitoramento de Pressão dos Pneus" },
    { id: "led_lights", label: "Faróis LED" },
    { id: "fog_lights", label: "Faróis de Neblina" },
    { id: "adaptive_cruise", label: "Piloto Automático Adaptativo" }
  ];

  return (
    <AccordionItem value="equipment" className="border rounded-lg px-4">
      <AccordionTrigger className="text-lg font-semibold hover:no-underline">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2"
        >
          <span>Equipamentos e Acessórios</span>
        </motion.div>
      </AccordionTrigger>
      <AccordionContent>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="pt-4"
        >
          <Tabs defaultValue="interior" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="interior">Interior</TabsTrigger>
              <TabsTrigger value="electronics">Eletrônica</TabsTrigger>
              <TabsTrigger value="safety">Segurança</TabsTrigger>
            </TabsList>

            <TabsContent value="interior" className="mt-4">
              <div className="grid grid-cols-2 gap-2">
                {interiorEquipment.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox id={item.id} />
                    <label htmlFor={item.id} className="text-sm">
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="electronics" className="mt-4">
              <div className="grid grid-cols-2 gap-2">
                {electronicsEquipment.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox id={item.id} />
                    <label htmlFor={item.id} className="text-sm">
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="safety" className="mt-4">
              <div className="grid grid-cols-2 gap-2">
                {safetyEquipment.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox id={item.id} />
                    <label htmlFor={item.id} className="text-sm">
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </AccordionContent>
    </AccordionItem>
  );
}
