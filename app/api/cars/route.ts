import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/cars - Listar todos os carros
export async function GET() {
  try {
    const cars = await prisma.car.findMany()
    return NextResponse.json(cars)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching cars' }, { status: 500 })
  }
}

// POST /api/cars - Adicionar um novo carro
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const car = await prisma.car.create({
      data: {
        brand: body.brand,
        model: body.model,
        year: body.year,
        price: body.price,
        description: body.description
      }
    })
    return NextResponse.json(car, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error creating car' }, { status: 500 })
  }
}
