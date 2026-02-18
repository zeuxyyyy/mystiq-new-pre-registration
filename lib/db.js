// lib/db.js
import { neon } from '@neondatabase/serverless';

// Initialize Neon connection
const sql = neon(process.env.DATABASE_URL);

// Initialize database tables
export async function initDB() {
  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        instagram VARCHAR(255) UNIQUE NOT NULL,
        referral_code VARCHAR(8) UNIQUE NOT NULL,
        referred_by VARCHAR(8),
        points INTEGER DEFAULT 0,
        joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create referrals tracking table
    await sql`
      CREATE TABLE IF NOT EXISTS referrals (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        referred_user_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

// Generate unique referral code
export function generateReferralCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Add user to waitlist
export async function addToWaitlist(name, instagram, referredBy = null) {
  try {
    let referralCode = generateReferralCode();
    
    // Ensure unique referral code
    let exists = true;
    while (exists) {
      const check = await sql`
        SELECT referral_code FROM users WHERE referral_code = ${referralCode}
      `;
      if (check.length === 0) {
        exists = false;
      } else {
        referralCode = generateReferralCode();
      }
    }

    // Insert new user
    const result = await sql`
      INSERT INTO users (name, instagram, referral_code, referred_by)
      VALUES (${name || 'Anonymous'}, ${instagram}, ${referralCode}, ${referredBy})
      RETURNING id, referral_code
    `;

    const newUser = result[0];

    // If referred by someone, update referrer's points and create referral record
    if (referredBy) {
      // Update referrer points
      await sql`
        UPDATE users 
        SET points = points + 1 
        WHERE referral_code = ${referredBy}
      `;

      // Get referrer's user ID
      const referrer = await sql`
        SELECT id FROM users WHERE referral_code = ${referredBy}
      `;

      if (referrer.length > 0) {
        // Create referral record
        await sql`
          INSERT INTO referrals (user_id, referred_user_id)
          VALUES (${referrer[0].id}, ${newUser.id})
        `;
      }
    }

    return {
      success: true,
      referralCode: newUser.referral_code,
      userId: newUser.id
    };
  } catch (error) {
    console.error('Add to waitlist error:', error);
    
    if (error.message.includes('duplicate key')) {
      return { success: false, error: 'Instagram handle already registered!' };
    }
    
    return { success: false, error: 'Failed to join waitlist. Please try again.' };
  }
}

// Get leaderboard
export async function getLeaderboard() {
  try {
    const result = await sql`
      SELECT 
        instagram,
        name,
        points,
        referral_code,
        (SELECT COUNT(*) FROM referrals WHERE user_id = users.id) as total_referrals
      FROM users
      WHERE points > 0
      ORDER BY points DESC
      LIMIT 10
    `;
    return result;
  } catch (error) {
    console.error('Get leaderboard error:', error);
    return [];
  }
}

// Get remaining spots (for FOMO)
export async function getRemainingSpots() {
  try {
    const MAX_SPOTS = 300; // Set your limit
    
    const result = await sql`
      SELECT COUNT(*) as count FROM users
    `;
    
    const currentCount = parseInt(result[0].count);
    const remaining = Math.max(0, MAX_SPOTS - currentCount);
    
    return {
      total: MAX_SPOTS,
      filled: currentCount,
      remaining
    };
  } catch (error) {
    console.error('Get spots error:', error);
    return { total: 300, filled: 0, remaining:300 };
  }
}

// Get user stats by referral code
export async function getUserStats(referralCode) {
  try {
    const user = await sql`
      SELECT 
        instagram,
        points,
        (SELECT COUNT(*) FROM referrals WHERE user_id = users.id) as total_referrals,
        (SELECT COUNT(*) + 1 FROM users u WHERE u.points > users.points) as rank
      FROM users
      WHERE referral_code = ${referralCode}
    `;
    
    if (user.length === 0) return null;
    
    return user[0];
  } catch (error) {
    console.error('Get user stats error:', error);
    return null;
  }
}

export { sql };