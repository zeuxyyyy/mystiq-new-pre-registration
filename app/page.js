// app/page.js
'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Hero from '@/components/Hero';
import WaitlistForm from '@/components/WaitlistForm';
import ReferralSection from '@/components/ReferralSection';
import Leaderboard from '@/components/Leaderboard';
import SocialProof from '@/components/SocialProof';

function WaitlistContent() {
  const searchParams = useSearchParams();
  const referralCode = searchParams.get('ref');
  
  const [spotsRemaining, setSpotsRemaining] = useState(300);
  const [totalJoined, setTotalJoined] = useState(0);
  const [joined, setJoined] = useState(false);
  const [userReferralCode, setUserReferralCode] = useState('');
  const [userStats, setUserStats] = useState(null);

  useEffect(() => {
    fetchSpots();
    const interval = setInterval(fetchSpots, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchSpots = async () => {
    try {
      const response = await fetch('/api/spots');
      const data = await response.json();
      setSpotsRemaining(data.remaining || 0);
      setTotalJoined(data.filled || 0);
    } catch (error) {
      console.error('Failed to fetch spots:', error);
    }
  };

  const fetchUserStats = async (refCode) => {
    try {
      const response = await fetch(`/api/leaderboard`);
      const data = await response.json();
      
      setUserStats({
        points: 0,
        total_referrals: 0,
        rank: data.leaderboard?.length + 1 || 1
      });
    } catch (error) {
      console.error('Failed to fetch user stats:', error);
    }
  };

  const handleJoinSuccess = (refCode) => {
    setJoined(true);
    setUserReferralCode(refCode);
    fetchUserStats(refCode);
    fetchSpots();
    
    setTimeout(() => {
      document.getElementById('referral-section')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 1000);
  };

  return (
    <>
      <Hero spotsRemaining={spotsRemaining} totalJoined={totalJoined} />
      
      {!joined ? (
        <WaitlistForm 
          onSuccess={handleJoinSuccess}
          referralCode={referralCode}
        />
      ) : (
        <div id="referral-section">
          <ReferralSection 
            referralCode={userReferralCode}
            userStats={userStats}
          />
        </div>
      )}
      
      <Leaderboard />
      <SocialProof />
      
      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="footer-text">
            Made with 💜 for college students
          </p>
          <p className="footer-copyright">
            © 2024 MystiQ. All rights reserved.
          </p>
        </div>

        <style jsx>{`
          .footer {
            text-align: center;
            padding: 2rem 1rem;
            border-top: 1px solid rgba(176, 38, 255, 0.2);
          }

          @media (min-width: 768px) {
            .footer {
              padding: 2.5rem 1rem;
            }
          }

          .footer-text {
            color: #9ca3af;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
          }

          @media (min-width: 768px) {
            .footer-text {
              font-size: 0.95rem;
            }
          }

          .footer-copyright {
            color: #6b7280;
            font-size: 0.75rem;
            margin: 0;
          }

          @media (min-width: 768px) {
            .footer-copyright {
              font-size: 0.8rem;
            }
          }
        `}</style>
      </footer>
    </>
  );
}

export default function Home() {
  return (
    <main className="neon-bg">
      <Suspense fallback={
        <div className="loading-page">
          <div className="spinner"></div>
        </div>
      }>
        <WaitlistContent />
      </Suspense>

      <style jsx>{`
        .loading-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </main>
  );
}