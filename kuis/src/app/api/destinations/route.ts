import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const destinations = await prisma.destination.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(destinations);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const destination = await prisma.destination.create({
      data: {
        name: body.name,
        country: body.country,
        city: body.city,
        description: body.description,
        visited: body.visited || false,
        rating: body.rating ? parseInt(body.rating) : null,
        notes: body.notes || null,
        budget: body.budget || null,
      }
    });
    return NextResponse.json(destination, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create destination' }, { status: 500 });
  }
}