import React from 'react';
import { BirthdayWish } from '@/types/birthday';
import { DEFAULT_BIRTHDAY_WISH } from '@/constants/birthdayWish';

interface TemplateProps {
  wish: BirthdayWish;
}

export const NeonTemplate = ({ wish }: TemplateProps) => {
  const displayMessage = wish.message || DEFAULT_BIRTHDAY_WISH;

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Neon glow effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-20 right-20 w-48 h-48 bg-yellow-500/20 rounded-full blur-2xl animate-float" />
      </div>

      <div className="max-w-3xl w-full relative z-10">
        <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl overflow-hidden animate-scale-in border-2 border-pink-500/50 shadow-[0_0_60px_rgba(236,72,153,0.4)]">
          {/* Header */}
          <div className="p-8 text-center border-b border-pink-500/30 relative overflow-hidden">
            <div className="flex justify-center mb-4 gap-4">
              <span className="text-5xl animate-bounce-soft">⚡</span>
              <span className="text-5xl animate-bounce-soft" style={{ animationDelay: '0.2s' }}>🎆</span>
              <span className="text-5xl animate-bounce-soft" style={{ animationDelay: '0.4s' }}>⚡</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 drop-shadow-[0_0_30px_rgba(236,72,153,0.5)]">
              HAPPY BIRTHDAY
            </h1>
            <div className="flex justify-center gap-2 mt-4">
              {['💜', '💙', '💚', '💛', '💜'].map((heart, i) => (
                <span key={i} className="text-2xl animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
                  {heart}
                </span>
              ))}
            </div>
          </div>

          {/* Photo */}
          {wish.photo_url && (
            <div className="flex justify-center py-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full blur-xl opacity-60 animate-pulse" style={{ transform: 'scale(1.15)' }} />
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.4)] relative z-10">
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
              <span className="text-3xl">🌟</span>
              <h2 className="text-4xl md:text-5xl font-display text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                {wish.person_name}
              </h2>
              <span className="text-3xl">🌟</span>
            </div>

            {/* Message */}
            <div className="bg-gray-800/60 rounded-2xl p-6 mb-6 border border-purple-500/30 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 px-4">
                <span className="text-2xl">💎</span>
              </div>
              <p className="text-lg text-gray-200 leading-relaxed whitespace-pre-line mt-2">
                {displayMessage}
              </p>
            </div>

            {/* Sender */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 text-white px-8 py-4 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              <span className="text-2xl">🎁</span>
              <span className="font-display text-xl md:text-2xl">
                From: {wish.sender_name}
              </span>
              <span className="text-2xl">💜</span>
            </div>

            {/* Bottom decorations */}
            <div className="mt-8 flex justify-center gap-4">
              {['🎆', '✨', '🎇', '✨', '🎆'].map((emoji, i) => (
                <span key={i} className="text-3xl animate-sparkle" style={{ animationDelay: `${i * 0.2}s` }}>
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