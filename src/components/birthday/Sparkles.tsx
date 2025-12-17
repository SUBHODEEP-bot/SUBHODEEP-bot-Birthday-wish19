import React, { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  left: number;
  top: number;
  delay: number;
  size: number;
  emoji: string;
}

const sparkleEmojis = ['✨', '⭐', '🌟', '💫', '🎇', '🎆', '💥', '🔥'];

export const Sparkles = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const s: Sparkle[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4,
      size: 16 + Math.random() * 24,
      emoji: sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)],
    }));
    setSparkles(s);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-sparkle"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            animationDelay: `${sparkle.delay}s`,
            fontSize: sparkle.size,
          }}
        >
          {sparkle.emoji}
        </div>
      ))}
    </div>
  );
};