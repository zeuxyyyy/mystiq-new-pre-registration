// app/api/waitlist/route.js
import { NextResponse } from 'next/server';
import { addToWaitlist, getUserStats, initDB } from '/lib/db';

// Initialize database on first request
let dbInitialized = false;

export async function POST(request) {
  try {
    // Initialize DB if not already done
    if (!dbInitialized) {
      await initDB();
      dbInitialized = true;
    }

    const body = await request.json();
    const { name, instagram, referredBy } = body;

    // Validate Instagram handle
    if (!instagram || instagram.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Instagram handle is required' },
        { status: 400 }
      );
    }

    // Clean Instagram handle (remove @ if present)
    const cleanInstagram = instagram.replace('@', '').trim().toLowerCase();

    // Add to waitlist
    const result = await addToWaitlist(name, cleanInstagram, referredBy);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    // Get user stats
    const stats = await getUserStats(result.referralCode);

    return NextResponse.json({
      success: true,
      referralCode: result.referralCode,
      stats
    });

  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}