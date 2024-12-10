'use client';

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export function ElectricFilters() {
  const chargingTypes = [
    { id: "ccs", label: "CCS" },
    { id: "chademo", label: "CHAdeMO" },
    { id: "schuko", label: "Schuko" },
    { id: "type1", label: "Type 1" },
    { id: "type2", label: "Type 2" }
  ];

  return (
    <AccordionItem value="electric" className="border rounded-lg px-4">
      <AccordionTrigger className="text-lg font-semibold hover:no-underline">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2"
        >
          <span>Especificações Elétricas</span>
        </motion.div>
      </AccordionTrigger>
      <AccordionContent>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-6 pt-4"
        >
          {/* Capacidade da Bateria */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Capacidade da Bateria (kWh)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm">Mínima</Label>
                <Input type="number" placeholder="kWh" />
              </div>
              <div className="space-y-1">
                <Label className="text-sm">Máxima</Label>
                <Input type="number" placeholder="kWh" />
              </div>
            </div>
          </div>

          {/* Autonomia Elétrica */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Autonomia Elétrica (km)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm">Mínima</Label>
                <Input type="number" placeholder="km" />
              </div>
              <div className="space-y-1">
                <Label className="text-sm">Máxima</Label>
                <Input type="number" placeholder="km" />
              </div>
            </div>
          </div>

          {/* Tipos de Carregamento */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Tipos de Carregamento</Label>
            <div className="grid grid-cols-2 gap-2">
              {chargingTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox id={type.id} />
                  <label htmlFor={type.id} className="text-sm">
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Potência de Carregamento AC */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Potência de Carregamento AC (kW)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm">Mínima</Label>
                <Input type="number" placeholder="kW" />
              </div>
              <div className="space-y-1">
                <Label className="text-sm">Máxima</Label>
                <Input type="number" placeholder="kW" />
              </div>
            </div>
          </div>

          {/* Potência de Carregamento DC */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Potência de Carregamento DC (kW)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm">Mínima</Label>
                <Input type="number" placeholder="kW" />
              </div>
              <div className="space-y-1">
                <Label className="text-sm">Máxima</Label>
                <Input type="number" placeholder="kW" />
              </div>
            </div>
          </div>

          {/* Garantia da Bateria */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Garantia da Bateria</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm">Anos</Label>
                <Input type="number" placeholder="Anos" />
              </div>
              <div className="space-y-1">
                <Label className="text-sm">Quilômetros</Label>
                <Input type="number" placeholder="km" />
              </div>
            </div>
          </div>
        </motion.div>
      </AccordionContent>
    </AccordionItem>
  );
}
