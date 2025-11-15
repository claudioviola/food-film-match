import { NextRequest, NextResponse } from 'next/server';
import { readPairings, addPairing, deletePairing } from '@/lib/storage';

/**
 * GET /api/pairings
 * Returns all saved pairings
 */
export async function GET() {
  try {
    const pairings = await readPairings();
    return NextResponse.json({ success: true, data: pairings });
  } catch (error) {
    console.error('Error reading pairings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read pairings' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/pairings
 * Adds a new pairing
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { meal, movie } = body;

    if (!meal?.name || !meal?.image || !movie?.title || !movie?.image) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newPairing = await addPairing({ meal, movie });
    return NextResponse.json({ success: true, data: newPairing }, { status: 201 });
  } catch (error) {
    console.error('Error adding pairing:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add pairing' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/pairings?id=xxx
 * Deletes a pairing by ID
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing pairing ID' },
        { status: 400 }
      );
    }

    const deleted = await deletePairing(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Pairing not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Pairing deleted' });
  } catch (error) {
    console.error('Error deleting pairing:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete pairing' },
      { status: 500 }
    );
  }
}
