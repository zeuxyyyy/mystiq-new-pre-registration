// components/SocialProof.jsx
'use client';
import { useEffect, useState } from 'react';

export default function SocialProof() {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/spots');
      const data = await response.json();
      setTotalUsers(data.filled || 0);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const features = [
    {
      icon: '🎭',
      title: 'Fully Anonymous',
      description: 'Share your thoughts freely without revealing your identity'
    },
    {
      icon: '🏫',
      title: 'Students Only',
      description: 'Verified college students. Your campus, your community'
    },
    {
      icon: '💬',
      title: 'Real Conversations',
      description: 'Connect with peers, share experiences, get advice'
    },
    {
      icon: '🔐',
      title: 'Safe & Secure',
      description: 'Moderated environment with privacy-first approach'
    }
  ];

  return (
    <section className="social-proof-section">
      <div className="container">
        {/* Stats */}
        <div className="stats-section">
          <div className="stat-item">
            <div className="stat-icon">👥</div>
            <div className="stat-number">{totalUsers}+</div>
            <div className="stat-label">Students Joined</div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">🎓</div>
            <div className="stat-number">100+</div>
            <div className="stat-label">Colleges</div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">🔒</div>
            <div className="stat-number">100%</div>
            <div className="stat-label">Anonymous</div>
          </div>
        </div>

        {/* Features */}
        <div className="features-section">
          <h3 className="features-title gradient-text">
            Why Join MystiQ?
          </h3>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h4 className="feature-title">{feature.title}</h4>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .social-proof-section {
          padding: 2rem 0 3rem;
        }

        @media (min-width: 768px) {
          .social-proof-section {
            padding: 3rem 0 4rem;
          }
        }

        /* Stats Section - Mobile First */
        .stats-section {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        @media (min-width: 480px) {
          .stats-section {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 768px) {
          .stats-section {
            gap: 1.5rem;
            margin-bottom: 4rem;
          }
        }

        .stat-item {
          text-align: center;
          padding: 1.5rem 1rem;
          background: rgba(21, 21, 32, 0.6);
          border-radius: 16px;
          border: 1px solid rgba(176, 38, 255, 0.2);
          transition: all 0.3s ease;
        }

        @media (min-width: 768px) {
          .stat-item {
            padding: 2rem 1.5rem;
            border-radius: 20px;
          }
        }

        .stat-item:active {
          transform: translateY(-3px);
        }

        @media (min-width: 768px) {
          .stat-item:hover {
            border-color: var(--neon-purple);
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(176, 38, 255, 0.3);
          }
        }

        .stat-icon {
          font-size: 2.5rem;
          margin-bottom: 0.75rem;
        }

        @media (min-width: 768px) {
          .stat-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
          }
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.25rem;
        }

        @media (min-width: 768px) {
          .stat-number {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
          }
        }

        .stat-label {
          color: #9ca3af;
          font-size: 0.85rem;
        }

        @media (min-width: 768px) {
          .stat-label {
            font-size: 0.95rem;
          }
        }

        /* Features Section - Mobile First */
        .features-section {
          text-align: center;
        }

        .features-title {
          font-size: 1.75rem;
          margin-bottom: 1.5rem;
        }

        @media (min-width: 768px) {
          .features-title {
            font-size: 2.25rem;
            margin-bottom: 2.5rem;
          }
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          text-align: left;
        }

        @media (min-width: 640px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 768px) {
          .features-grid {
            gap: 1.5rem;
          }
        }

        .feature-card {
          padding: 1.25rem;
          background: rgba(21, 21, 32, 0.4);
          border-radius: 14px;
          border: 1px solid rgba(176, 38, 255, 0.1);
          transition: all 0.3s ease;
        }

        @media (min-width: 768px) {
          .feature-card {
            padding: 1.75rem;
            border-radius: 16px;
          }
        }

        .feature-card:active {
          border-color: rgba(176, 38, 255, 0.2);
        }

        @media (min-width: 768px) {
          .feature-card:hover {
            border-color: rgba(176, 38, 255, 0.3);
            background: rgba(21, 21, 32, 0.6);
            transform: translateY(-2px);
          }
        }

        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 0.75rem;
        }

        @media (min-width: 768px) {
          .feature-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
          }
        }

        .feature-title {
          font-size: 1.05rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: white;
        }

        @media (min-width: 768px) {
          .feature-title {
            font-size: 1.15rem;
            margin-bottom: 0.75rem;
          }
        }

        .feature-description {
          color: #9ca3af;
          font-size: 0.85rem;
          line-height: 1.5;
          margin: 0;
        }

        @media (min-width: 768px) {
          .feature-description {
            font-size: 0.9rem;
            line-height: 1.6;
          }
        }
      `}</style>
    </section>
  );
}