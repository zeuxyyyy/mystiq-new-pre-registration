// app/api/leaderboard/route.js
import { NextResponse } from 'next/server';
import { getLeaderboard } from '/lib/db';

export async function GET() {
  try {
    const leaderboard = await getLeaderboard();
    
    return NextResponse.json({
      success: true,
      leaderboard
    });
  } catch (error) {
    console.error('Leaderboard API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}

// Enable caching but revalidate every 10 seconds
export const revalidate = 10;