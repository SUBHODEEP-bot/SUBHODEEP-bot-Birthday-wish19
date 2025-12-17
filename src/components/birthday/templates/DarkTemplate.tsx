import React from 'react';
import { BirthdayWish } from '@/types/birthday';
import { DEFAULT_BIRTHDAY_WISH } from '@/constants/birthdayWish';

interface TemplateProps {
  wish: BirthdayWish;
}

export const DarkTemplate = ({ wish }: TemplateProps) => {
  const displayMessage = wish.message || DEFAULT_BIRTHDAY_WISH;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Gold particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              opacity: 0.6,
            }}
          />
        ))}
        <div className="absolute top-20 left-20 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl w-full relative z-10">
        <div className="bg-gradient-to-br from-gray-900/98 to-purple-900/98 backdrop-blur-xl rounded-3xl overflow-hidden animate-scale-in border border-yellow-600/40 shadow-[0_0_80px_rgba(234,179,8,0.15)]">
          {/* Header */}
          <div className="p-8 text-center border-b border-yellow-600/30">
            <div className="flex justify-center mb-4">
              <span className="text-6xl animate-float">👑</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400">
              Happy Birthday
            </h1>
            <div className="flex justify-center gap-3 mt-4">
              {['✨', '💫', '⭐', '💫', '✨'].map((star, i) => (
                <span key={i} className="text-2xl text-yellow-400 animate-sparkle" style={{ animationDelay: `${i * 0.2}s` }}>
                  {star}
                </span>
              ))}
            </div>
          </div>

          {/* Photo */}
          {wish.photo_url && (
            <div className="flex justify-center py-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full blur-xl opacity-40 animate-pulse" style={{ transform: 'scale(1.15)' }} />
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-yellow-600/60 relative z-10">
                  <img
                    src={wish.photo_url}
                    alt={wish.person_name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-3xl">💎</span>
              <h2 className="text-4xl md:text-5xl font-display text-yellow-400">
                {wish.person_name}
              </h2>
              <span className="text-3xl">💎</span>
            </div>

            {/* Message */}
            <div className="bg-black/40 rounded-2xl p-6 mb-6 border border-yellow-600/30 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 px-4">
                <span className="text-2xl">🏆</span>
              </div>
              <p className="text-lg text-gray-200 leading-relaxed whitespace-pre-line italic mt-2">
                {displayMessage}
              </p>
            </div>

            {/* Sender */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-600 to-amber-600 text-white px-8 py-4 rounded-full shadow-xl">
              <span className="text-2xl">🎁</span>
              <span className="font-display text-xl md:text-2xl">
                With regards, {wish.sender_name}
              </span>
              <span className="text-2xl">✨</span>
            </div>

            {/* Bottom decorations */}
            <div className="mt-8 flex justify-center gap-4">
              {['🌟', '💛', '👑', '💛', '🌟'].map((emoji, i) => (
                <span key={i} className="text-3xl animate-bounce-soft" style={{ animationDelay: `${i * 0.1}s` }}>
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};