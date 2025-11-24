import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const destination = await prisma.destination.findUnique({
      where: { id: parseInt(params.id) }
    });
    if (!destination) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
    }
    return NextResponse.json(destination);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch destination' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const destination = await prisma.destination.update({
      where: { id: parseInt(params.id) },
      data: {
        name: body.name,
        country: body.country,
        city: body.city,
        description: body.description,
        visited: body.visited,
        rating: body.rating ? parseInt(body.rating) : null,
        notes: body.notes || null,
        budget: body.budget || null,
      }
    });
    return NextResponse.json(destination);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update destination' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.destination.delete({
      where: { id: parseInt(params.id) }
    });
    return NextResponse.json({ message: 'Destination deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete destination' }, { status: 500 });
  }
}