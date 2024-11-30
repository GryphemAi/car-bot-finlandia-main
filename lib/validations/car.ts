import { z } from 'zod';

export const carSchema = z.object({
  nome: z.string(),
  ID: z.string(),
  placa: z.string(),
  vendedor: z.string(),
  preco: z.string(), // Formato "XX XXX €"
  data: z.string(),
  condicao: z.string(),
  contato: z.string(),
  quilometragem: z.string(), // Formato "XXX XXX km"
  ano: z.string(), // Formato "YYYY (ensirek. MM-YYYY)"
  motor: z.string(),
  cambio: z.string(),
  proprietarios: z.string(),
  Inspecionado: z.string().optional(), // Formato "MM-YYYY"
  sistema_de_transmissao: z.string(),
  especificacoes: z.string(),
  seguranca: z.string(),
  interior_comodidades: z.string(),
  eletronica: z.string(),
  informacoes_adicionais: z.string().optional(),
  outros: z.string().optional(),
  imagem: z.string().url().optional()
});

export type CarType = z.infer<typeof carSchema>;
