// components/WaitlistForm.jsx
'use client';
import { useState } from 'react';
import confetti from 'canvas-confetti';

export default function WaitlistForm({ onSuccess, referralCode }) {
  const [formData, setFormData] = useState({
    name: '',
    instagram: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        colors: ['#B026FF', '#FF06B7', '#00D9FF']
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.instagram.trim()) {
      setError('Instagram handle is required!');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          referredBy: referralCode
        }),
      });

      const data = await response.json();

      if (data.success) {
        triggerConfetti();
        onSuccess(data.referralCode);
      } else {
        setError(data.error || 'Something went wrong!');
      }
    } catch (err) {
      setError('Failed to join waitlist. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="waitlist-section" id="join-waitlist">
      <div className="container">
        <div className="form-wrapper">
          <div className="card">
            {/* Step Indicator */}
            <div className="step-indicator">
              <div className="step-item active">
                <div className="step-number">1</div>
                <div className="step-text">Join Waitlist</div>
              </div>
              <div className="step-line"></div>
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-text">Get Link</div>
              </div>
              <div className="step-line"></div>
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-text">Share & Earn</div>
              </div>
            </div>

            <h2 className="form-title gradient-text">
              Secure Your Spot Now!
            </h2>
            <p className="form-subtitle">
              Join <strong>exclusive early access</strong> to MystiQ
            </p>

            {/* Benefits List */}
            <div className="benefits-list">
              <div className="benefit-item">
                <span className="benefit-icon">✨</span>
                <span className="benefit-text">Priority beta access</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🎁</span>
                <span className="benefit-text">Exclusive features for early members</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🏆</span>
                <span className="benefit-text">Compete on leaderboard for rewards</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="waitlist-form">
              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">👤</span>
                  Name (Optional)
                </label>
                <input
                  type="text"
                  className="input-neon"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <p className="input-hint">We'll keep it anonymous. This is just for leaderboard display.</p>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">📸</span>
                  Instagram Handle <span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <span className="input-prefix">@</span>
                  <input
                    type="text"
                    className="input-neon input-with-prefix"
                    placeholder="your_instagram"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value.replace('@', '') })}
                    required
                  />
                </div>
                <p className="input-hint">
                  We'll use this to send you beta access when we launch! 🚀
                </p>
              </div>

              {error && (
                <div className="error-message">
                  ❌ {error}
                </div>
              )}

              {referralCode && (
                <div className="referral-badge-inline">
                  <div className="referral-icon">🎉</div>
                  <div className="referral-info">
                    <strong>Bonus activated!</strong>
                    <p>You're joining with a referral. Both you and your friend will get bonus points!</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="btn-neon submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner"></div>
                ) : (
                  <>
                    <span className="btn-text">Join Waitlist Now</span>
                    <span className="btn-icon">🚀</span>
                  </>
                )}
              </button>

              <p className="form-footer">
                By joining, you'll get a <strong>unique referral link</strong> to share with friends!
              </p>
            </form>

            {/* Trust Signals */}
            <div className="trust-signals">
              <div className="trust-item">
                <span className="trust-icon">🔒</span>
                <span className="trust-text">100% Secure</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">⚡</span>
                <span className="trust-text">Instant Access</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">🎓</span>
                <span className="trust-text">Students Only</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .waitlist-section {
          padding: 2rem 0;
          scroll-margin-top: 2rem;
        }

        @media (min-width: 768px) {
          .waitlist-section {
            padding: 3rem 0;
          }
        }

        .form-wrapper {
          max-width: 100%;
        }

        @media (min-width: 640px) {
          .form-wrapper {
            max-width: 600px;
            margin: 0 auto;
          }
        }

        /* Step Indicator */
        .step-indicator {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding: 0 1rem;
        }

        @media (min-width: 768px) {
          .step-indicator {
            padding: 0 2rem;
          }
        }

        .step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          flex: 1;
        }

        .step-number {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(176, 38, 255, 0.1);
          border: 2px solid rgba(176, 38, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #9ca3af;
          font-size: 0.9rem;
          transition: all 0.3s;
        }

        @media (min-width: 768px) {
          .step-number {
            width: 44px;
            height: 44px;
            font-size: 1rem;
          }
        }

        .step-item.active .step-number {
          background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
          border-color: var(--neon-purple);
          color: white;
          box-shadow: 0 0 15px rgba(176, 38, 255, 0.5);
        }

        .step-text {
          font-size: 0.65rem;
          color: #9ca3af;
          font-weight: 500;
          text-align: center;
        }

        @media (min-width: 768px) {
          .step-text {
            font-size: 0.75rem;
          }
        }

        .step-item.active .step-text {
          color: var(--neon-purple);
          font-weight: 600;
        }

        .step-line {
          flex: 1;
          height: 2px;
          background: rgba(176, 38, 255, 0.2);
          margin: 0 0.5rem;
          max-width: 60px;
        }

        .form-title {
          font-size: 1.75rem;
          text-align: center;
          margin-bottom: 0.5rem;
        }

        @media (min-width: 768px) {
          .form-title {
            font-size: 2.25rem;
          }
        }

        .form-subtitle {
          text-align: center;
          color: #d1d5db;
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
        }

        @media (min-width: 768px) {
          .form-subtitle {
            font-size: 1.05rem;
            margin-bottom: 2rem;
          }
        }

        .form-subtitle strong {
          color: var(--neon-pink);
        }

        /* Benefits List */
        .benefits-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: rgba(176, 38, 255, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(176, 38, 255, 0.1);
        }

        @media (min-width: 768px) {
          .benefits-list {
            margin-bottom: 2rem;
          }
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .benefit-icon {
          font-size: 1.25rem;
        }

        .benefit-text {
          font-size: 0.85rem;
          color: #d1d5db;
        }

        @media (min-width: 768px) {
          .benefit-text {
            font-size: 0.95rem;
          }
        }

        .waitlist-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        @media (min-width: 768px) {
          .waitlist-form {
            gap: 1.5rem;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #d1d5db;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        @media (min-width: 768px) {
          .form-label {
            font-size: 0.95rem;
          }
        }

        .label-icon {
          font-size: 1.1rem;
        }

        .required {
          color: #ef4444;
        }

        .input-wrapper {
          position: relative;
        }

        .input-prefix {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          font-size: 1rem;
          pointer-events: none;
          z-index: 1;
        }

        .input-with-prefix {
          padding-left: 2rem;
        }

        .input-hint {
          font-size: 0.75rem;
          color: #9ca3af;
          margin: 0;
          font-style: italic;
        }

        @media (min-width: 768px) {
          .input-hint {
            font-size: 0.8rem;
          }
        }

        .error-message {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid #ef4444;
          border-radius: 12px;
          padding: 0.875rem;
          color: #fca5a5;
          font-size: 0.875rem;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .referral-badge-inline {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid #22c55e;
          border-radius: 12px;
          animation: slideInUp 0.5s ease-out;
        }

        @keyframes slideInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .referral-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .referral-info {
          flex: 1;
        }

        .referral-info strong {
          display: block;
          color: #86efac;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }

        .referral-info p {
          font-size: 0.8rem;
          color: #86efac;
          margin: 0;
          opacity: 0.9;
        }

        .submit-btn {
          margin-top: 0.5rem;
          min-height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          font-size: 1rem;
          position: relative;
          overflow: hidden;
        }

        .btn-text {
          position: relative;
          z-index: 1;
        }

        .btn-icon {
          font-size: 1.25rem;
          position: relative;
          z-index: 1;
          animation: rocket 1.5s ease-in-out infinite;
        }

        @keyframes rocket {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        .form-footer {
          text-align: center;
          font-size: 0.8rem;
          color: #9ca3af;
          margin: 0;
        }

        @media (min-width: 768px) {
          .form-footer {
            font-size: 0.85rem;
          }
        }

        .form-footer strong {
          color: var(--neon-pink);
        }

        /* Trust Signals */
        .trust-signals {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(176, 38, 255, 0.2);
        }

        @media (min-width: 768px) {
          .trust-signals {
            gap: 2rem;
            margin-top: 2rem;
            padding-top: 2rem;
          }
        }

        .trust-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        .trust-icon {
          font-size: 1.5rem;
        }

        .trust-text {
          font-size: 0.7rem;
          color: #9ca3af;
          font-weight: 500;
        }

        @media (min-width: 768px) {
          .trust-text {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </section>
  );
}