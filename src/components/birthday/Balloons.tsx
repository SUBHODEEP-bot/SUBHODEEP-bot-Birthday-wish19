import React, { useEffect, useState } from 'react';

interface Balloon {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  emoji: string;
}

const balloonEmojis = ['🎈', '💖', '❤️', '💕', '🩷', '💜', '💙', '💚', '💛', '🧡', '🎀', '🎁', '🌟', '✨', '🦋'];

const balloonColors = [
  '#FF6B6B', '#4ECDC4', '#FFE66D', '#FF9A8B',
  '#C9FFBF', '#FFAFCC', '#BDE0FE', '#DDA0DD',
  '#F0E68C', '#98D8C8', '#F7DC6F', '#BB8FCE'
];

export const Balloons = () => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    const b: Balloon[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 10 + Math.random() * 8,
      color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
      size: 30 + Math.random() * 30,
      emoji: balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)],
    }));
    setBalloons(b);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="absolute animate-balloon-rise"
          style={{
            left: `${balloon.left}%`,
            animationDelay: `${balloon.delay}s`,
            animationDuration: `${balloon.duration}s`,
            bottom: '-100px',
            fontSize: balloon.size,
          }}
        >
          {balloon.emoji}
        </div>
      ))}
    </div>
  );
};