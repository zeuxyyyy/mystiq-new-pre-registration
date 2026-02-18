// components/Leaderboard.jsx
'use client';
import { useState, useEffect } from 'react';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/leaderboard');
      const data = await response.json();
      setLeaders(data.leaderboard || []);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMedalEmoji = (index) => {
    switch(index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `#${index + 1}`;
    }
  };

  // Function to anonymize Instagram handle
  const anonymizeInstagram = (instagram) => {
    if (!instagram) return '@***';
    
    // Remove @ if present
    const cleanName = instagram.replace('@', '');
    
    if (cleanName.length <= 2) {
      return '@' + cleanName.charAt(0) + '***';
    }
    
    if (cleanName.length === 3) {
      return '@' + cleanName.charAt(0) + '*' + cleanName.charAt(2);
    }
    
    // Split by underscore if exists
    const parts = cleanName.split('_');
    
    if (parts.length > 1) {
      // Has underscore (e.g., sarah_2k24 → s***h_2k24)
      const firstPart = parts[0];
      const lastPart = parts.slice(1).join('_');
      
      let anonymizedFirst;
      if (firstPart.length <= 3) {
        anonymizedFirst = firstPart.charAt(0) + '***';
      } else {
        anonymizedFirst = firstPart.charAt(0) + '***' + firstPart.charAt(firstPart.length - 1);
      }
      
      return '@' + anonymizedFirst + '_' + lastPart;
    } else {
      // No underscore (e.g., username → u***e)
      if (cleanName.length <= 4) {
        return '@' + cleanName.charAt(0) + '***';
      }
      return '@' + cleanName.charAt(0) + '***' + cleanName.charAt(cleanName.length - 1);
    }
  };

  // Function to anonymize name
  const anonymizeName = (name) => {
    if (!name || name === 'Anonymous') return null;
    
    if (name.length <= 3) {
      return name.charAt(0) + '***';
    }
    
    // Split by space if exists (e.g., "John Doe" → "J*** D***")
    const parts = name.split(' ');
    
    if (parts.length > 1) {
      return parts.map(part => {
        if (part.length <= 2) return part.charAt(0) + '*';
        return part.charAt(0) + '***';
      }).join(' ');
    } else {
      // Single name (e.g., "Sarah" → "S***h")
      if (name.length <= 4) {
        return name.charAt(0) + '***';
      }
      return name.charAt(0) + '***' + name.charAt(name.length - 1);
    }
  };

  return (
    <section className="leaderboard-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title gradient-text">
            🏆 Leaderboard
          </h2>
          <p className="section-subtitle">
            Top referrers get exclusive early access & perks!
          </p>
          <p className="privacy-badge">
            🎭 All identities are anonymized
          </p>
        </div>

        <div className="leaderboard-wrapper">
          <div className="card">
            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p className="loading-text">Loading leaderboard...</p>
              </div>
            ) : leaders.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🎯</div>
                <p className="empty-text">
                  Be the first to refer and claim the top spot!
                </p>
                <p className="empty-subtext">
                  Share your referral link to get started
                </p>
              </div>
            ) : (
              <div className="leaders-list">
                {leaders.map((leader, index) => (
                  <div
                    key={leader.referral_code}
                    className={`leader-item ${index < 3 ? 'top-three' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="leader-rank">
                      {getMedalEmoji(index)}
                    </div>
                    <div className="leader-info">
                      <div className="leader-name">
                        {anonymizeInstagram(leader.instagram)}
                      </div>
                      {leader.name && leader.name !== 'Anonymous' && (
                        <div className="leader-real-name">
                          {anonymizeName(leader.name)}
                        </div>
                      )}
                    </div>
                    <div className="leader-stats">
                      <div className="leader-points gradient-text">
                        {leader.points}
                      </div>
                      <div className="leader-referrals">
                        {leader.total_referrals} {leader.total_referrals === 1 ? 'referral' : 'referrals'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .leaderboard-section {
          padding: 2rem 0;
        }

        @media (min-width: 768px) {
          .leaderboard-section {
            padding: 3rem 0;
          }
        }

        .section-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        @media (min-width: 768px) {
          .section-header {
            margin-bottom: 2.5rem;
          }
        }

        .section-title {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        @media (min-width: 768px) {
          .section-title {
            font-size: 2.75rem;
          }
        }

        .section-subtitle {
          color: #9ca3af;
          font-size: 0.9rem;
          margin-bottom: 0.75rem;
        }

        @media (min-width: 768px) {
          .section-subtitle {
            font-size: 1rem;
          }
        }

        .privacy-badge {
          display: inline-block;
          background: rgba(176, 38, 255, 0.1);
          border: 1px solid rgba(176, 38, 255, 0.3);
          padding: 0.375rem 0.875rem;
          border-radius: 20px;
          font-size: 0.75rem;
          color: #c084fc;
          font-weight: 500;
          margin-top: 0.5rem;
        }

        @media (min-width: 768px) {
          .privacy-badge {
            font-size: 0.8rem;
            padding: 0.5rem 1rem;
          }
        }

        .leaderboard-wrapper {
          max-width: 100%;
        }

        @media (min-width: 768px) {
          .leaderboard-wrapper {
            max-width: 800px;
            margin: 0 auto;
          }
        }

        .loading-state,
        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
        }

        @media (min-width: 768px) {
          .loading-state,
          .empty-state {
            padding: 4rem 2rem;
          }
        }

        .loading-text {
          color: #9ca3af;
          margin-top: 1rem;
          font-size: 0.9rem;
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .empty-text {
          color: #d1d5db;
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        @media (min-width: 768px) {
          .empty-text {
            font-size: 1.25rem;
          }
        }

        .empty-subtext {
          color: #9ca3af;
          font-size: 0.9rem;
          margin: 0;
        }

        .leaders-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        @media (min-width: 768px) {
          .leaders-list {
            gap: 1rem;
          }
        }

        .leader-item {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 1rem;
          background: rgba(21, 21, 32, 0.6);
          border-radius: 12px;
          border: 1px solid rgba(176, 38, 255, 0.2);
          transition: all 0.3s ease;
          animation: slideIn 0.5s ease-out both;
        }

        @media (min-width: 768px) {
          .leader-item {
            gap: 1.25rem;
            padding: 1.25rem 1.5rem;
            border-radius: 16px;
          }
        }

        .leader-item:active {
          transform: translateX(3px);
        }

        @media (min-width: 768px) {
          .leader-item:hover {
            background: rgba(21, 21, 32, 0.9);
            border-color: var(--neon-purple);
            transform: translateX(5px);
          }
        }

        .leader-item.top-three {
          background: linear-gradient(135deg, rgba(176, 38, 255, 0.15), rgba(255, 6, 183, 0.15));
          border: 1px solid rgba(176, 38, 255, 0.4);
          position: relative;
          overflow: hidden;
        }

        .leader-item.top-three::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--neon-purple), var(--neon-pink), var(--neon-blue));
        }

        .leader-rank {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 700;
          background: rgba(176, 38, 255, 0.1);
          border-radius: 10px;
          border: 1px solid rgba(176, 38, 255, 0.3);
          flex-shrink: 0;
        }

        @media (min-width: 768px) {
          .leader-rank {
            width: 48px;
            height: 48px;
            font-size: 1.5rem;
            border-radius: 12px;
          }
        }

        .leader-item.top-three .leader-rank {
          background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
          border-color: transparent;
        }

        .leader-info {
          flex: 1;
          min-width: 0;
        }

        .leader-name {
          font-weight: 600;
          color: white;
          font-size: 0.95rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-family: 'Courier New', monospace;
          letter-spacing: 0.02em;
        }

        @media (min-width: 768px) {
          .leader-name {
            font-size: 1.05rem;
          }
        }

        .leader-real-name {
          font-size: 0.75rem;
          color: #9ca3af;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-family: 'Courier New', monospace;
          margin-top: 0.125rem;
        }

        @media (min-width: 768px) {
          .leader-real-name {
            font-size: 0.8rem;
          }
        }

        .leader-stats {
          text-align: right;
          flex-shrink: 0;
        }

        .leader-points {
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1;
        }

        @media (min-width: 768px) {
          .leader-points {
            font-size: 1.875rem;
          }
        }

        .leader-referrals {
          font-size: 0.7rem;
          color: #9ca3af;
          margin-top: 0.125rem;
        }

        @media (min-width: 768px) {
          .leader-referrals {
            font-size: 0.75rem;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}