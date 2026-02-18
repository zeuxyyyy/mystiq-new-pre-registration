// components/Hero.jsx
'use client';
import { useState, useEffect } from 'react';

export default function Hero({ spotsRemaining, totalJoined }) {
  const [recentJoins, setRecentJoins] = useState([
    { name: '@s***h_2k24', time: '2m ago' },
    { name: '@m***e_cs', time: '5m ago' },
    { name: '@p***a_med', time: '8m ago' },
  ]);

  // Function to anonymize username
  const anonymizeUsername = (username) => {
    // Remove @ if present
    const cleanName = username.replace('@', '');
    
    if (cleanName.length <= 3) {
      return '@' + cleanName.charAt(0) + '***';
    }
    
    // Show first letter, hide middle, show last part if there's an underscore
    const parts = cleanName.split('_');
    
    if (parts.length > 1) {
      // Has underscore (e.g., sarah_2k24)
      const firstPart = parts[0];
      const lastPart = parts.slice(1).join('_');
      
      const anonymizedFirst = firstPart.charAt(0) + '***' + (firstPart.length > 3 ? firstPart.charAt(firstPart.length - 1) : '');
      return '@' + anonymizedFirst + '_' + lastPart;
    } else {
      // No underscore (e.g., username)
      return '@' + cleanName.charAt(0) + '***' + (cleanName.length > 4 ? cleanName.charAt(cleanName.length - 1) : '');
    }
  };

  // Simulate live activity with anonymized names
  useEffect(() => {
    const names = [
      'alex_student', 
      'emma_college', 
      'raj_tech', 
      'lily_art', 
      'john_biz',
      'sarah_cs',
      'mike_med',
      'priya_eng',
      'david_law',
      'anna_design'
    ];
    
    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const anonymizedName = anonymizeUsername(randomName);
      
      setRecentJoins(prev => [
        { name: anonymizedName, time: 'just now' },
        ...prev.slice(0, 2)
      ]);
    }, 15000); // New join every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section">
      <div className="container">
        {/* Floating notification */}
        <div className="live-activity">
          <div className="activity-dot"></div>
          <span className="activity-text">
            <strong>{totalJoined}</strong> students already joined!
          </span>
        </div>

        <div className="hero-content">
          {/* Logo */}
          <div className="logo-container">
            <div className="beta-badge">
              <span className="beta-text">BETA ACCESS</span>
            </div>
            <h1 className="hero-title gradient-text neon-text">
              MystiQ
            </h1>
            <p className="hero-subtitle">
              The First Anonymous College Chat App
            </p>
            <p className="hero-tagline">
              🎭 Connect. Share. Stay Anonymous.
            </p>
          </div>

          {/* FOMO Section */}
          <div className="fomo-section">
            {/* Main FOMO Card */}
            <div className="fomo-main-card card">
              <div className="fomo-header">
                <div className="pulse-indicator">
                  <div className="pulse-dot"></div>
                  <span className="pulse-text">LIMITED BETA</span>
                </div>
              </div>

              <div className="fomo-stats">
                <div className="fomo-stat-item">
                  <div className="fomo-stat-number gradient-text count-animation">
                    {spotsRemaining}
                  </div>
                  <div className="fomo-stat-label">Spots Left</div>
                </div>

                <div className="fomo-divider"></div>

                <div className="fomo-stat-item">
                  <div className="fomo-stat-number gradient-text count-animation">
                    {totalJoined}
                  </div>
                  <div className="fomo-stat-label">Students Joined</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="progress-bar-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${Math.min((totalJoined / (totalJoined + spotsRemaining)) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="progress-text">
                  {Math.round((totalJoined / (totalJoined + spotsRemaining)) * 100)}% filled
                </p>
              </div>

              {/* Urgency Message */}
              <div className="urgency-message">
                ⚡ Join now before spots run out!
              </div>
            </div>

            {/* Recent Joins */}
            <div className="recent-joins">
              <p className="recent-joins-title">🔥 Recently Joined</p>
              <div className="recent-joins-list">
                {recentJoins.map((join, index) => (
                  <div key={`${join.name}-${index}`} className="recent-join-item">
                    <div className="join-avatar">
                      {join.name.charAt(1).toUpperCase()}
                    </div>
                    <span className="join-name">{join.name}</span>
                    <span className="join-time">{join.time}</span>
                  </div>
                ))}
              </div>
              <p className="privacy-note">
                🔒 Identities protected
              </p>
            </div>
          </div>

          {/* CTA Guidance */}
          <div className="cta-guidance">
            <div className="guidance-arrow">👇</div>
            <p className="guidance-text">
              <strong>Join the waitlist below</strong> and get your unique referral link
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          padding: 1.5rem 0 2rem;
          min-height: auto;
          position: relative;
        }

        @media (min-width: 768px) {
          .hero-section {
            padding: 3rem 0 3rem;
          }
        }

        /* Live Activity Notification */
        .live-activity {
          position: fixed;
          top: 1rem;
          right: 1rem;
          background: rgba(21, 21, 32, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(176, 38, 255, 0.5);
          border-radius: 50px;
          padding: 0.5rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          z-index: 100;
          box-shadow: 0 4px 15px rgba(176, 38, 255, 0.3);
          animation: slideInRight 0.5s ease-out;
        }

        @media (min-width: 768px) {
          .live-activity {
            top: 1.5rem;
            right: 1.5rem;
            padding: 0.625rem 1.25rem;
          }
        }

        .activity-dot {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          animation: pulse-green 2s ease-in-out infinite;
        }

        @keyframes pulse-green {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
            box-shadow: 0 0 0 6px rgba(34, 197, 94, 0);
          }
        }

        .activity-text {
          font-size: 0.75rem;
          color: #e0e0e0;
        }

        @media (min-width: 768px) {
          .activity-text {
            font-size: 0.85rem;
          }
        }

        .activity-text strong {
          color: #22c55e;
          font-weight: 700;
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .hero-content {
          text-align: center;
        }

        /* Logo Section */
        .logo-container {
          margin-bottom: 2rem;
          animation: fadeInDown 1s ease-out;
          position: relative;
        }

        @media (min-width: 768px) {
          .logo-container {
            margin-bottom: 2.5rem;
          }
        }

        .beta-badge {
          display: inline-block;
          background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
          padding: 0.375rem 1rem;
          border-radius: 20px;
          margin-bottom: 1rem;
          animation: glow-pulse 2s ease-in-out infinite;
        }

        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 0 0 10px rgba(176, 38, 255, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(176, 38, 255, 0.8);
          }
        }

        .beta-text {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: white;
        }

        @media (min-width: 768px) {
          .beta-text {
            font-size: 0.75rem;
          }
        }

        .hero-title {
          font-size: 3.5rem;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }

        @media (min-width: 640px) {
          .hero-title {
            font-size: 5rem;
          }
        }

        @media (min-width: 768px) {
          .hero-title {
            font-size: 6rem;
          }
        }

        .hero-subtitle {
          font-size: 1.1rem;
          color: #e0e0e0;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        @media (min-width: 768px) {
          .hero-subtitle {
            font-size: 1.5rem;
          }
        }

        .hero-tagline {
          font-size: 0.9rem;
          color: #9ca3af;
        }

        @media (min-width: 768px) {
          .hero-tagline {
            font-size: 1.1rem;
          }
        }

        /* FOMO Section */
        .fomo-section {
          animation: fadeInUp 1s ease-out 0.3s both;
          max-width: 600px;
          margin: 0 auto;
        }

        .fomo-main-card {
          padding: 1.25rem;
          background: rgba(21, 21, 32, 0.9);
          margin-bottom: 1rem;
        }

        @media (min-width: 768px) {
          .fomo-main-card {
            padding: 1.75rem;
          }
        }

        .fomo-header {
          margin-bottom: 1rem;
        }

        .pulse-indicator {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid #ef4444;
          padding: 0.375rem 0.875rem;
          border-radius: 20px;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background: #ef4444;
          border-radius: 50%;
          animation: pulse-red 1.5s ease-in-out infinite;
        }

        @keyframes pulse-red {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.3);
          }
        }

        .pulse-text {
          font-size: 0.7rem;
          color: #fca5a5;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        @media (min-width: 768px) {
          .pulse-text {
            font-size: 0.75rem;
          }
        }

        .fomo-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 1.25rem;
        }

        @media (min-width: 768px) {
          .fomo-stats {
            gap: 2.5rem;
            margin-bottom: 1.5rem;
          }
        }

        .fomo-stat-item {
          text-align: center;
        }

        .fomo-stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        @media (min-width: 768px) {
          .fomo-stat-number {
            font-size: 3.5rem;
          }
        }

        .fomo-stat-label {
          font-size: 0.8rem;
          color: #9ca3af;
          font-weight: 500;
        }

        @media (min-width: 768px) {
          .fomo-stat-label {
            font-size: 0.9rem;
          }
        }

        .fomo-divider {
          width: 2px;
          height: 50px;
          background: linear-gradient(180deg, transparent, var(--neon-purple), transparent);
        }

        /* Progress Bar */
        .progress-bar-container {
          margin-bottom: 1rem;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: rgba(176, 38, 255, 0.1);
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--neon-purple), var(--neon-pink));
          border-radius: 10px;
          transition: width 0.5s ease;
          box-shadow: 0 0 10px rgba(176, 38, 255, 0.5);
          animation: progress-glow 2s ease-in-out infinite;
        }

        @keyframes progress-glow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(176, 38, 255, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(176, 38, 255, 0.8);
          }
        }

        .progress-text {
          text-align: center;
          font-size: 0.75rem;
          color: #9ca3af;
          margin: 0;
        }

        @media (min-width: 768px) {
          .progress-text {
            font-size: 0.85rem;
          }
        }

        .urgency-message {
          text-align: center;
          font-size: 0.95rem;
          font-weight: 600;
          color: #fbbf24;
          background: rgba(251, 191, 36, 0.1);
          border: 1px solid rgba(251, 191, 36, 0.3);
          padding: 0.75rem;
          border-radius: 10px;
          animation: urgency-pulse 2s ease-in-out infinite;
        }

        @keyframes urgency-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        /* Recent Joins */
        .recent-joins {
          background: rgba(21, 21, 32, 0.6);
          border: 1px solid rgba(176, 38, 255, 0.2);
          border-radius: 16px;
          padding: 1rem;
        }

        @media (min-width: 768px) {
          .recent-joins {
            padding: 1.25rem;
          }
        }

        .recent-joins-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: #d1d5db;
          margin-bottom: 0.75rem;
          text-align: center;
        }

        .recent-joins-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .recent-join-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem;
          background: rgba(176, 38, 255, 0.05);
          border-radius: 8px;
          animation: slideInLeft 0.5s ease-out;
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .join-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
          color: white;
          flex-shrink: 0;
        }

        .join-name {
          flex: 1;
          font-size: 0.85rem;
          color: #e0e0e0;
          font-weight: 500;
          font-family: 'Courier New', monospace;
          letter-spacing: 0.02em;
        }

        .join-time {
          font-size: 0.7rem;
          color: #9ca3af;
          flex-shrink: 0;
        }

        .privacy-note {
          text-align: center;
          font-size: 0.7rem;
          color: #9ca3af;
          margin: 0;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(176, 38, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
        }

        @media (min-width: 768px) {
          .privacy-note {
            font-size: 0.75rem;
          }
        }

        /* CTA Guidance */
        .cta-guidance {
          margin-top: 2rem;
          animation: bounce 2s ease-in-out infinite;
        }

        @media (min-width: 768px) {
          .cta-guidance {
            margin-top: 2.5rem;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .guidance-arrow {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          animation: bounce-arrow 1.5s ease-in-out infinite;
        }

        @keyframes bounce-arrow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }

        .guidance-text {
          font-size: 0.95rem;
          color: #d1d5db;
          margin: 0;
        }

        @media (min-width: 768px) {
          .guidance-text {
            font-size: 1.05rem;
          }
        }

        .guidance-text strong {
          color: white;
          background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}