// components/ReferralSection.jsx
'use client';
import { useState } from 'react';
import { 
  WhatsappShareButton, 
  TwitterShareButton,
  TelegramShareButton,
  WhatsappIcon,
  TwitterIcon,
  TelegramIcon
} from 'react-share';

export default function ReferralSection({ referralCode, userStats }) {
  const [copied, setCopied] = useState(false);
  
  // FIXED: Changed from /waitlist?ref= to /?ref=
  const referralLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/?ref=${referralCode}`;
  const shareMessage = `Join MystiQ, the first anonymous college chat app! Use my link to get early beta access: ${referralLink}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="referral-section">
      <div className="container">
        <div className="referral-wrapper">
          <div className="card">
            <div className="section-header">
              <h2 className="section-title gradient-text">
                🎁 Share & Earn Rewards
              </h2>
              <p className="section-subtitle">
                Invite friends and climb the leaderboard!
              </p>
            </div>

            {/* User Stats */}
            {userStats && (
              <div className="stats-grid">
                <div className="stat-card stat-purple">
                  <div className="stat-value">{userStats.points}</div>
                  <div className="stat-label">Points</div>
                </div>
                <div className="stat-card stat-pink">
                  <div className="stat-value">{userStats.total_referrals}</div>
                  <div className="stat-label">Referrals</div>
                </div>
                <div className="stat-card stat-blue">
                  <div className="stat-value">#{userStats.rank}</div>
                  <div className="stat-label">Rank</div>
                </div>
              </div>
            )}

            {/* Referral Link */}
            <div className="link-section">
              <label className="link-label">
                Your Unique Referral Link
              </label>
              <div className="link-input-group">
                <input
                  type="text"
                  className="input-neon link-input"
                  value={referralLink}
                  readOnly
                  onClick={(e) => e.target.select()}
                />
                <button
                  onClick={copyToClipboard}
                  className="btn-neon copy-btn"
                >
                  {copied ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
              <p className="link-hint">
                💡 Share this link to earn points when friends join!
              </p>
            </div>

            {/* Social Share */}
            <div className="share-section">
              <p className="share-label">Share on social media</p>
              <div className="share-buttons">
                <WhatsappShareButton url={referralLink} title={shareMessage}>
                  <div className="share-button">
                    <WhatsappIcon size={56} round />
                    <span className="share-name">WhatsApp</span>
                  </div>
                </WhatsappShareButton>

                <TwitterShareButton url={referralLink} title={shareMessage}>
                  <div className="share-button">
                    <TwitterIcon size={56} round />
                    <span className="share-name">Twitter</span>
                  </div>
                </TwitterShareButton>

                <TelegramShareButton url={referralLink} title={shareMessage}>
                  <div className="share-button">
                    <TelegramIcon size={56} round />
                    <span className="share-name">Telegram</span>
                  </div>
                </TelegramShareButton>

                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Join MystiQ',
                        text: shareMessage,
                        url: referralLink
                      });
                    } else {
                      copyToClipboard();
                    }
                  }}
                  className="share-button"
                >
                  <div className="share-icon-custom">
                    📱
                  </div>
                  <span className="share-name">More</span>
                </button>
              </div>
            </div>

            {/* Instagram Template */}
            <div className="instagram-template">
              <p className="template-title">📸 Instagram Story Template:</p>
              <p className="template-text">
                "Just joined the MystiQ waitlist! 🎭 First anonymous chat app for college students. Join me: {referralLink}"
              </p>
              <button 
                onClick={copyToClipboard}
                className="copy-template-btn"
              >
                Copy Template
              </button>
            </div>

            {/* How it Works */}
            <div className="how-it-works">
              <h3 className="how-title">📊 How Referrals Work</h3>
              <div className="how-steps">
                <div className="how-step">
                  <div className="how-step-number">1</div>
                  <p className="how-step-text">Share your unique link</p>
                </div>
                <div className="how-step-arrow">→</div>
                <div className="how-step">
                  <div className="how-step-number">2</div>
                  <p className="how-step-text">Friends join using your link</p>
                </div>
                <div className="how-step-arrow">→</div>
                <div className="how-step">
                  <div className="how-step-number">3</div>
                  <p className="how-step-text">You both get +1 point!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .referral-section {
          padding: 2rem 0;
        }

        @media (min-width: 768px) {
          .referral-section {
            padding: 3rem 0;
          }
        }

        .referral-wrapper {
          max-width: 100%;
        }

        @media (min-width: 768px) {
          .referral-wrapper {
            max-width: 700px;
            margin: 0 auto;
          }
        }

        .section-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        @media (min-width: 768px) {
          .section-header {
            margin-bottom: 2rem;
          }
        }

        .section-title {
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
        }

        @media (min-width: 768px) {
          .section-title {
            font-size: 2.25rem;
          }
        }

        .section-subtitle {
          color: #9ca3af;
          font-size: 0.9rem;
        }

        @media (min-width: 768px) {
          .section-subtitle {
            font-size: 1rem;
          }
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        @media (min-width: 480px) {
          .stats-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 768px) {
          .stats-grid {
            gap: 1rem;
            margin-bottom: 2rem;
          }
        }

        .stat-card {
          text-align: center;
          padding: 1rem;
          border-radius: 12px;
          border: 1px solid;
          transition: transform 0.2s;
        }

        .stat-card:active {
          transform: scale(0.98);
        }

        @media (min-width: 768px) {
          .stat-card {
            padding: 1.25rem;
          }
          
          .stat-card:hover {
            transform: translateY(-2px);
          }
        }

        .stat-purple {
          background: rgba(176, 38, 255, 0.1);
          border-color: rgba(176, 38, 255, 0.3);
        }

        .stat-pink {
          background: rgba(255, 6, 183, 0.1);
          border-color: rgba(255, 6, 183, 0.3);
        }

        .stat-blue {
          background: rgba(0, 217, 255, 0.1);
          border-color: rgba(0, 217, 255, 0.3);
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        @media (min-width: 768px) {
          .stat-value {
            font-size: 2rem;
          }
        }

        .stat-purple .stat-value {
          color: #c084fc;
        }

        .stat-pink .stat-value {
          color: #f9a8d4;
        }

        .stat-blue .stat-value {
          color: #67e8f9;
        }

        .stat-label {
          font-size: 0.8rem;
          color: #9ca3af;
        }

        @media (min-width: 768px) {
          .stat-label {
            font-size: 0.875rem;
          }
        }

        /* Link Section */
        .link-section {
          margin-bottom: 1.5rem;
        }

        @media (min-width: 768px) {
          .link-section {
            margin-bottom: 2rem;
          }
        }

        .link-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #d1d5db;
          margin-bottom: 0.5rem;
        }

        .link-input-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        @media (min-width: 640px) {
          .link-input-group {
            flex-direction: row;
          }
        }

        .link-input {
          flex: 1;
          font-size: 0.85rem;
          cursor: pointer;
        }

        @media (min-width: 768px) {
          .link-input {
            font-size: 0.95rem;
          }
        }

        .copy-btn {
          width: 100%;
          transition: all 0.3s;
        }

        @media (min-width: 640px) {
          .copy-btn {
            width: auto;
            min-width: 120px;
          }
        }

        .link-hint {
          font-size: 0.75rem;
          color: #9ca3af;
          margin-top: 0.5rem;
          text-align: center;
        }

        @media (min-width: 768px) {
          .link-hint {
            font-size: 0.8rem;
          }
        }

        /* Share Section */
        .share-section {
          margin-bottom: 1.5rem;
        }

        .share-label {
          font-size: 0.85rem;
          color: #9ca3af;
          text-align: center;
          margin-bottom: 1rem;
        }

        .share-buttons {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          justify-items: center;
        }

        @media (min-width: 640px) {
          .share-buttons {
            gap: 1.5rem;
          }
        }

        .share-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: transform 0.2s;
          background: none;
          border: none;
          padding: 0;
          -webkit-tap-highlight-color: transparent;
        }

        .share-button:active {
          transform: scale(0.9);
        }

        @media (min-width: 768px) {
          .share-button:hover {
            transform: scale(1.1);
          }
        }

        .share-icon-custom {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
        }

        .share-name {
          font-size: 0.7rem;
          color: #d1d5db;
          text-align: center;
        }

        @media (min-width: 768px) {
          .share-name {
            font-size: 0.75rem;
          }
        }

        /* Instagram Template */
        .instagram-template {
          padding: 1rem;
          background: linear-gradient(135deg, rgba(176, 38, 255, 0.1), rgba(255, 6, 183, 0.1));
          border: 1px solid rgba(176, 38, 255, 0.3);
          border-radius: 12px;
          margin-bottom: 1.5rem;
        }

        @media (min-width: 768px) {
          .instagram-template {
            padding: 1.25rem;
          }
        }

        .template-title {
          font-size: 0.85rem;
          color: #d1d5db;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        @media (min-width: 768px) {
          .template-title {
            font-size: 0.95rem;
          }
        }

        .template-text {
          font-size: 0.8rem;
          color: #9ca3af;
          font-style: italic;
          line-height: 1.5;
          margin: 0 0 0.75rem 0;
          word-break: break-word;
        }

        @media (min-width: 768px) {
          .template-text {
            font-size: 0.875rem;
          }
        }

        .copy-template-btn {
          background: rgba(176, 38, 255, 0.2);
          border: 1px solid var(--neon-purple);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
        }

        @media (min-width: 768px) {
          .copy-template-btn {
            width: auto;
          }
        }

        .copy-template-btn:hover {
          background: rgba(176, 38, 255, 0.3);
        }

        .copy-template-btn:active {
          transform: scale(0.98);
        }

        /* How it Works */
        .how-it-works {
          padding: 1.25rem;
          background: rgba(21, 21, 32, 0.4);
          border-radius: 12px;
          border: 1px solid rgba(176, 38, 255, 0.2);
        }

        .how-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #d1d5db;
          margin-bottom: 1rem;
          text-align: center;
        }

        @media (min-width: 768px) {
          .how-title {
            font-size: 1.05rem;
          }
        }

        .how-steps {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        @media (min-width: 640px) {
          .how-steps {
            flex-wrap: nowrap;
          }
        }

        .how-step {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          min-width: 80px;
        }

        .how-step-number {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
        }

        @media (min-width: 768px) {
          .how-step-number {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }
        }

        .how-step-text {
          font-size: 0.7rem;
          color: #9ca3af;
          text-align: center;
          margin: 0;
          line-height: 1.3;
        }

        @media (min-width: 768px) {
          .how-step-text {
            font-size: 0.8rem;
          }
        }

        .how-step-arrow {
          color: var(--neon-purple);
          font-size: 1.25rem;
          font-weight: 700;
          display: none;
        }

        @media (min-width: 640px) {
          .how-step-arrow {
            display: block;
          }
        }
      `}</style>
    </section>
  );
}