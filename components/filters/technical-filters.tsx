'use client';

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function TechnicalFilters() {
  return (
    <AccordionItem value="technical" className="border rounded-lg px-4">
      <AccordionTrigger className="text-lg font-semibold hover:no-underline">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2"
        >
          <span>Especificações Técnicas</span>
        </motion.div>
      </AccordionTrigger>
      <AccordionContent>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-6 pt-4"
        >
          {/* Cilindrada */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Cilindrada (cc)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm">Mínima</Label>
                <Input type="number" placeholder="cc" />
              </div>
              <div className="space-y-1">
                <Label className="text-sm">Máxima</Label>
                <Input type="number" placeholder="cc" />
              </div>
            </div>
          </div>

          {/* Emissões CO2 */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Emissões CO2 (g/km)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm">Mínimo</Label>
                <Input type="number" placeholder="g/km" />
              </div>
              <div className="space-y-1">
                <Label className="text-sm">Máximo</Label>
                <Input type="number" placeholder="g/km" />
              </div>
            </div>
          </div>

          {/* Potência */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Potência</Label>
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

          {/* Torque */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Torque (Nm)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm">Mínimo</Label>
                <Input type="number" placeholder="Nm" />
              </div>
              <div className="space-y-1">
                <Label className="text-sm">Máximo</Label>
                <Input type="number" placeholder="Nm" />
              </div>
            </div>
          </div>

          {/* Peso de Reboque */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Peso de Reboque (kg)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm">Mínimo</Label>
                <Input type="number" placeholder="kg" />
              </div>
              <div className="space-y-1">
                <Label className="text-sm">Máximo</Label>
                <Input type="number" placeholder="kg" />
              </div>
            </div>
          </div>

          {/* Peso do Veículo */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Peso do Veículo (kg)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm">Mínimo</Label>
                <Input type="number" placeholder="kg" />
              </div>
              <div className="space-y-1">
                <Label className="text-sm">Máximo</Label>
                <Input type="number" placeholder="kg" />
              </div>
            </div>
          </div>

          {/* Aceleração */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Aceleração 0-100 km/h (s)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm">Mínima</Label>
                <Input type="number" placeholder="segundos" />
              </div>
              <div className="space-y-1">
                <Label className="text-sm">Máxima</Label>
                <Input type="number" placeholder="segundos" />
              </div>
            </div>
          </div>

          {/* Número de Passageiros */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Número de Passageiros</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {[2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} passageiros
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Número de Portas */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Número de Portas</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {[2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} portas
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>
      </AccordionContent>
    </AccordionItem>
  );
}
