'use client';

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

export function BasicFilters() {
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    // Carregar IDs dos favoritos do localStorage
    const favorites = JSON.parse(localStorage.getItem('favoriteCards') || '[]');
    setFavoriteIds(favorites);
  }, []);

  const vehicleTypes = [
    { id: "henkiloauto", label: "Henkilöauto" },
    { id: "pakettiauto", label: "Pakettiauto" },
    { id: "minibussi", label: "Minibussi" },
    { id: "kuorma-auto", label: "Kuorma-auto" }
  ];

  const fuelTypes = [
    { id: "bensiini", label: "Bensiini" },
    { id: "diesel", label: "Diesel" },
    { id: "e85", label: "E85/bensiini" },
    { id: "hybridi", label: "Hybridi" },
    { id: "kaasu", label: "Kaasu" },
    { id: "sahko", label: "Sähkö" }
  ];

  const bodyTypes = [
    { id: "avoauto", label: "Avoauto" },
    { id: "coupe", label: "Coupé" },
    { id: "farmari", label: "Farmari" },
    { id: "suv", label: "Maastoauto/SUV" },
    { id: "sedan", label: "Porrasperä" }
  ];

  return (
    <AccordionItem value="basic" className="border rounded-lg px-4">
      <AccordionTrigger className="text-lg font-semibold hover:no-underline">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2"
        >
          <span>Informações Básicas</span>
        </motion.div>
      </AccordionTrigger>
      <AccordionContent>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-6 pt-4"
        >
          {/* Favoritos */}
          <div className="space-y-2 border-b pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="favoritos" 
                  checked={showFavorites}
                  onCheckedChange={(checked) => setShowFavorites(checked as boolean)}
                />
                <Label htmlFor="favoritos" className="text-base font-medium flex items-center gap-2">
                  <Heart className={`h-4 w-4 ${showFavorites ? 'text-red-500 fill-red-500' : ''}`} />
                  Favoritos
                </Label>
              </div>
              <span className="text-sm text-gray-500">
                {favoriteIds.length} favoritados
              </span>
            </div>
          </div>

          {/* Tipo de Veículo */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Tipo de Veículo</Label>
            <div className="grid grid-cols-2 gap-2">
              {vehicleTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox id={type.id} />
                  <label htmlFor={type.id} className="text-sm">
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Combustível */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Combustível</Label>
            <div className="grid grid-cols-2 gap-2">
              {fuelTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox id={type.id} />
                  <label htmlFor={type.id} className="text-sm">
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Tipo de Carroceria */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Tipo de Carroceria</Label>
            <div className="grid grid-cols-2 gap-2">
              {bodyTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox id={type.id} />
                  <label htmlFor={type.id} className="text-sm">
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Transmissão */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Transmissão</Label>
            <RadioGroup defaultValue="todos">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manual" id="manual" />
                <Label htmlFor="manual">Manual</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="automatico" id="automatico" />
                <Label htmlFor="automatico">Automático</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Ano */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Ano</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm">De</Label>
                <Input type="number" placeholder="Ano mínimo" />
              </div>
              <div className="space-y-1">
                <Label className="text-sm">Até</Label>
                <Input type="number" placeholder="Ano máximo" />
              </div>
            </div>
          </div>

          {/* Preço */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Preço</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm">Mínimo</Label>
                <Input type="number" placeholder="€" />
              </div>
              <div className="space-y-1">
                <Label className="text-sm">Máximo</Label>
                <Input type="number" placeholder="€" />
              </div>
            </div>
          </div>

          {/* Quilometragem */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Quilometragem</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm">Mínimo</Label>
                <Input type="number" placeholder="km" />
              </div>
              <div className="space-y-1">
                <Label className="text-sm">Máximo</Label>
                <Input type="number" placeholder="km" />
              </div>
            </div>
          </div>
        </motion.div>
      </AccordionContent>
    </AccordionItem>
  );
}
