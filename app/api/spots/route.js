// app/api/spots/route.js
import { NextResponse } from 'next/server';
import { getRemainingSpots } from '@/lib/db';

export async function GET() {
  try {
    const spots = await getRemainingSpots();
    
    return NextResponse.json({
      success: true,
      ...spots
    });
  } catch (error) {
    console.error('Spots API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch spots' },
      { status: 500 }
    );
  }
}

// Enable caching but revalidate every 5 seconds for real-time feel
export const revalidate = 5;