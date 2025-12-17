import React from 'react';
import { BirthdayWish } from '@/types/birthday';
import { DEFAULT_BIRTHDAY_WISH } from '@/constants/birthdayWish';

interface TemplateProps {
  wish: BirthdayWish;
}

export const ClassicTemplate = ({ wish }: TemplateProps) => {
  const displayMessage = wish.message || DEFAULT_BIRTHDAY_WISH;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-100 to-amber-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-rose-300/30 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-amber-300/30 rounded-full blur-2xl animate-float-slow" />
        <div className="absolute top-1/3 right-10 w-24 h-24 bg-pink-300/30 rounded-full blur-xl animate-float" />
      </div>

      <div className="max-w-3xl w-full relative z-10">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in border-2 border-rose-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 p-8 text-center relative">
            <div className="flex justify-center gap-6 mb-4">
              <span className="text-4xl animate-bounce-soft">🎂</span>
              <span className="text-4xl animate-bounce-soft" style={{ animationDelay: '0.2s' }}>🎁</span>
              <span className="text-4xl animate-bounce-soft" style={{ animationDelay: '0.4s' }}>❤️</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display text-white drop-shadow-lg">
              Happy Birthday!
            </h1>
            <div className="flex justify-center gap-2 mt-4">
              {['✨', '⭐', '✨', '⭐', '✨'].map((star, i) => (
                <span key={i} className="text-2xl animate-sparkle" style={{ animationDelay: `${i * 0.2}s` }}>
                  {star}
                </span>
              ))}
            </div>
          </div>

          {/* Photo */}
          {wish.photo_url && (
            <div className="flex justify-center -mt-14 relative z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-rose-400 rounded-full blur-lg opacity-50 animate-pulse" style={{ transform: 'scale(1.1)' }} />
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl overflow-hidden animate-float relative z-10">
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
              <span className="text-3xl">🌹</span>
              <h2 className="text-3xl md:text-4xl font-display text-rose-600">
                {wish.person_name}
              </h2>
              <span className="text-3xl">🌹</span>
            </div>

            {/* Message */}
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 mb-6 border border-rose-200 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4">
                <span className="text-2xl">💌</span>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line mt-2">
                {displayMessage}
              </p>
            </div>

            {/* Sender */}
            <div className="flex items-center justify-center gap-3 bg-rose-500 text-white px-8 py-4 rounded-full shadow-lg inline-flex">
              <span className="text-2xl">🎁</span>
              <span className="font-script text-2xl">
                With love from {wish.sender_name}
              </span>
              <span className="text-2xl">💕</span>
            </div>

            {/* Bottom decorations */}
            <div className="mt-8 flex justify-center gap-3">
              {['🎀', '💖', '🎂', '💖', '🎀'].map((emoji, i) => (
                <span key={i} className="text-2xl animate-bounce-soft" style={{ animationDelay: `${i * 0.1}s` }}>
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