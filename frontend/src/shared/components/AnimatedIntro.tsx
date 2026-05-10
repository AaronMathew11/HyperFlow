import { useEffect, useState } from 'react';

interface AnimatedIntroProps {
  onComplete: () => void;
}

export default function AnimatedIntro({ onComplete }: AnimatedIntroProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Play futuristic sound
    playFuturisticSound();

    // Total animation time: 2.5s draw + 0.5s hold + 0.8s fade = 3.8s
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 800); // Wait for fade out
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const playFuturisticSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = audioContext.currentTime;

      // Create a series of rising tones for futuristic effect
      const notes = [
        { freq: 523.25, start: 0, duration: 0.1 },      // C5
        { freq: 659.25, start: 0.15, duration: 0.1 },   // E5
        { freq: 783.99, start: 0.3, duration: 0.1 },    // G5
        { freq: 987.77, start: 0.45, duration: 0.15 },  // B5
        { freq: 1174.66, start: 0.65, duration: 0.2 },  // D6
        { freq: 1396.91, start: 0.9, duration: 0.3 },   // F6
      ];

      notes.forEach(({ freq, start, duration }) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.frequency.setValueAtTime(freq, now + start);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.2, now + start + duration * 0.3);
        osc.frequency.exponentialRampToValueAtTime(freq, now + start + duration);

        gain.gain.setValueAtTime(0, now + start);
        gain.gain.linearRampToValueAtTime(0.3, now + start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, now + start + duration);

        osc.start(now + start);
        osc.stop(now + start + duration);
      });
    } catch (error) {
      console.log('Audio context not available');
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-800 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background: 'linear-gradient(135deg, #FAFAFA 0%, #FFFFFF 50%, #F0F0F8 100%)',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tangerine:wght@400;700&display=swap');

        @keyframes drawStroke {
          to {
            stroke-dashoffset: 0;
          }
        }

        .calligraphy-text {
          font-family: 'Tangerine', cursive;
          font-size: 180px;
          font-weight: 700;
          letter-spacing: 8px;
          stroke: url(#textGradient);
          stroke-width: 1.5;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1500;
          stroke-dashoffset: 1500;
          animation: drawStroke 2.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <svg
        width="900"
        height="350"
        viewBox="0 0 900 350"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-full px-8"
      >
        <defs>
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9393D0" />
            <stop offset="100%" stopColor="#06063D" />
          </linearGradient>
        </defs>

        <text x="450" y="175" dominantBaseline="middle" textAnchor="middle" className="calligraphy-text">
          HyperVision
        </text>
      </svg>
    </div>
  );
}
