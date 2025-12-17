import React from 'react';
import { BirthdayWish } from '@/types/birthday';
import { DEFAULT_BIRTHDAY_WISH } from '@/constants/birthdayWish';

interface TemplateProps {
  wish: BirthdayWish;
}

export const KidsTemplate = ({ wish }: TemplateProps) => {
  const displayMessage = wish.message || DEFAULT_BIRTHDAY_WISH;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300 via-pink-200 to-yellow-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating emojis */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['🎈', '🎁', '🎂', '🍰', '🎀', '⭐', '🌟', '🎊', '🦋', '🌈', '🍭', '🎪'].map((emoji, i) => (
          <span
            key={i}
            className="absolute text-4xl md:text-5xl animate-float"
            style={{
              left: `${5 + i * 8}%`,
              top: `${10 + (i % 4) * 22}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      <div className="max-w-3xl w-full relative z-10">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-scale-in border-8 border-dashed border-pink-400">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 p-8 text-center">
            <div className="text-7xl mb-4 animate-bounce-soft">🎂</div>
            <h1 className="text-4xl md:text-5xl font-display text-white drop-shadow-lg" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Happy Birthday!
            </h1>
            <div className="flex justify-center gap-3 mt-4">
              {['🎈', '🎈', '🎈'].map((b, i) => (
                <span key={i} className="text-4xl animate-bounce-soft" style={{ animationDelay: `${i * 0.2}s` }}>
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Photo */}
          {wish.photo_url && (
            <div className="flex justify-center -mt-14 relative z-10">
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-full border-8 border-yellow-400 shadow-xl overflow-hidden animate-float bg-white">
                <img
                  src={wish.photo_url}
                  alt={wish.person_name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-3xl">🌟</span>
              <h2 className="text-3xl md:text-4xl text-pink-500" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                {wish.person_name}
              </h2>
              <span className="text-3xl">🌟</span>
            </div>

            {/* Message */}
            <div className="bg-gradient-to-r from-yellow-100 via-pink-100 to-blue-100 rounded-3xl p-6 mb-6 border-4 border-dotted border-purple-300 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-4 rounded-full">
                <span className="text-3xl">💝</span>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line mt-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                {displayMessage}
              </p>
            </div>

            {/* Sender */}
            <div className="bg-pink-500 text-white px-10 py-5 rounded-full inline-flex items-center gap-3 transform rotate-1 shadow-lg">
              <span className="text-2xl">🎁</span>
              <span className="text-xl md:text-2xl" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                From: {wish.sender_name}
              </span>
              <span className="text-2xl">💝</span>
            </div>

            {/* Bottom decorations */}
            <div className="mt-8 flex justify-center gap-3">
              {['🎪', '🎠', '🎡', '🎢', '🎪'].map((emoji, i) => (
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