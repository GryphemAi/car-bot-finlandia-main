import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/cars - Listar todos os carros
export async function GET() {
  try {
    const cars = await prisma.car.findMany();
    console.log('Carros encontrados:', cars);
    return NextResponse.json(cars);
  } catch (error) {
    console.error('Erro ao buscar carros:', error);
    return NextResponse.json({ error: 'Error fetching cars' }, { status: 500 });
  }
}

// POST /api/cars - Adicionar um novo carro
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const car = await prisma.car.create({
      data: {
        nome: body.nome,
        carID: body.ID, // Campo renomeado
        placa: body.placa,
        vendedor: body.vendedor,
        preco: body.preco,
        data: body.data,
        condicao: body.condicao,
        contato: body.contato,
        quilometragem: body.quilometragem,
        ano: body.ano,
        motor: body.motor,
        cambio: body.cambio,
        proprietarios: body.proprietarios,
        inspecionado: body.inspecionado,
        sistema_de_transmissao: body.sistema_de_transmissao,
        especificacoes: body.especificacoes,
        seguranca: body.seguranca,
        interior_comodidades: body.interior_comodidades,
        eletronica: body.eletronica,
        informacoes_adicionais: body.informacoes_adicionais,
        outros: body.outros,
        imagem: body.imagem
      }
    });
    console.log('Carro criado:', car);
    return NextResponse.json(car, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar carro:', error);
    return NextResponse.json({ error: 'Error creating car' }, { status: 500 });
  }
}
