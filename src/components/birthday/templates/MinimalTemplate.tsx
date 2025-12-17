import React from 'react';
import { BirthdayWish } from '@/types/birthday';
import { DEFAULT_BIRTHDAY_WISH } from '@/constants/birthdayWish';

interface TemplateProps {
  wish: BirthdayWish;
}

export const MinimalTemplate = ({ wish }: TemplateProps) => {
  const displayMessage = wish.message || DEFAULT_BIRTHDAY_WISH;

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-100 to-stone-50 flex items-center justify-center p-4 relative">
      {/* Subtle decorations */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-32 h-32 bg-stone-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-stone-300 rounded-full blur-3xl" />
      </div>

      <div className="max-w-2xl w-full relative z-10">
        <div className="animate-slide-up bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-stone-200">
          {/* Photo */}
          {wish.photo_url && (
            <div className="flex justify-center mb-10">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg border-2 border-stone-200">
                <img
                  src={wish.photo_url}
                  alt={wish.person_name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="text-center">
            <p className="text-stone-400 uppercase tracking-[0.3em] text-sm mb-4">
              Happy Birthday
            </p>
            
            <h1 className="text-4xl md:text-6xl font-display text-stone-800 mb-8">
              {wish.person_name}
            </h1>

            <div className="w-20 h-px bg-stone-300 mx-auto mb-8" />

            {/* Message */}
            <div className="bg-stone-50 rounded-xl p-6 mb-8 border border-stone-200">
              <p className="text-lg text-stone-600 leading-relaxed whitespace-pre-line">
                {displayMessage}
              </p>
            </div>

            <div className="w-20 h-px bg-stone-300 mx-auto mb-6" />

            <p className="text-stone-400 text-sm uppercase tracking-[0.2em]">
              With warm wishes
            </p>
            <p className="text-stone-700 font-display text-2xl mt-2">
              {wish.sender_name}
            </p>

            {/* Subtle decorations */}
            <div className="mt-8 flex justify-center gap-3 opacity-50">
              <span className="text-xl">🎂</span>
              <span className="text-xl">✨</span>
              <span className="text-xl">🎁</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};