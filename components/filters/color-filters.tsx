'use client';

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";

export function ColorFilters() {
  const colors = [
    { id: "beige", label: "Bege", hex: "#E8DCC4" },
    { id: "white", label: "Branco", hex: "#FFFFFF" },
    { id: "gray", label: "Cinza", hex: "#808080" },
    { id: "silver", label: "Prata", hex: "#C0C0C0" },
    { id: "black", label: "Preto", hex: "#000000" },
    { id: "blue", label: "Azul", hex: "#0000FF" },
    { id: "red", label: "Vermelho", hex: "#FF0000" },
    { id: "green", label: "Verde", hex: "#008000" },
    { id: "yellow", label: "Amarelo", hex: "#FFFF00" },
    { id: "brown", label: "Marrom", hex: "#8B4513" },
    { id: "orange", label: "Laranja", hex: "#FFA500" },
    { id: "purple", label: "Roxo", hex: "#800080" }
  ];

  return (
    <AccordionItem value="colors" className="border rounded-lg px-4">
      <AccordionTrigger className="text-lg font-semibold hover:no-underline">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2"
        >
          <span>Cores e Acabamentos</span>
        </motion.div>
      </AccordionTrigger>
      <AccordionContent>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-6 pt-4"
        >
          {/* Cores */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Cores</Label>
            <div className="grid grid-cols-2 gap-4">
              {colors.map((color) => (
                <div key={color.id} className="flex items-center space-x-3">
                  <Checkbox id={color.id} />
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.hex }}
                    />
                    <label htmlFor={color.id} className="text-sm">
                      {color.label}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tipo de Pintura */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Tipo de Pintura</Label>
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">Todos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="metallic" id="metallic" />
                <Label htmlFor="metallic">Metálica</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pearl" id="pearl" />
                <Label htmlFor="pearl">Perolizada</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="matte" id="matte" />
                <Label htmlFor="matte">Fosca</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="solid" id="solid" />
                <Label htmlFor="solid">Sólida</Label>
              </div>
            </RadioGroup>
          </div>
        </motion.div>
      </AccordionContent>
    </AccordionItem>
  );
}
