import React, { useState } from 'react';
import { BirthdayWish } from '@/types/birthday';
import { DEFAULT_BIRTHDAY_WISH } from '@/constants/birthdayWish';
import { Heart, X } from 'lucide-react';

interface TemplateProps {
  wish: BirthdayWish;
}

export const ColorfulTemplate = ({ wish }: TemplateProps) => {
  const displayMessage = wish.message || DEFAULT_BIRTHDAY_WISH;
  const [showPhoto, setShowPhoto] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 relative overflow-hidden">
      {/* Photo Lightbox Modal */}
      {showPhoto && wish.photo_url && (
        <div 
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowPhoto(false)}
        >
          <button 
            className="absolute top-4 right-4 text-white bg-white/20 rounded-full p-2 hover:bg-white/30 transition"
            onClick={() => setShowPhoto(false)}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={wish.photo_url}
            alt={wish.person_name}
            className="max-w-[90vw] max-h-[80vh] rounded-2xl shadow-2xl object-contain animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Roses - fewer on mobile */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`rose-${i}`}
            className="absolute text-2xl sm:text-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-slow ${4 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            🌹
          </div>
        ))}
        
        {/* Floating Hearts - fewer on mobile */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`heart-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '-50px',
              animation: `float-up ${6 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`
            }}
          >
            <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-red-400 fill-red-400" />
          </div>
        ))}

        {/* Stars - fewer on mobile */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute text-lg sm:text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle 2s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          >
            ⭐
          </div>
        ))}

        {/* Love emojis floating */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`love-${i}`}
            className="absolute text-lg sm:text-2xl hidden sm:block"
            style={{
              left: `${10 + i * 15}%`,
              top: `${Math.random() * 30}%`,
              animation: `bounce-slow 3s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`
            }}
          >
            💕
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start sm:justify-center px-3 sm:px-4 py-6 sm:py-8">
        
        {/* Header with animations */}
        <div className="text-center mb-4 sm:mb-6" style={{ animation: 'bounce-in 0.8s ease-out forwards' }}>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
            <span className="text-2xl sm:text-4xl animate-bounce">🎉</span>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg">
              Happy Birthday!
            </h1>
            <span className="text-2xl sm:text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎊</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl sm:text-3xl">🎂</span>
            <span className="text-xl sm:text-3xl md:text-5xl font-display text-pink-700 animate-pulse">{wish.person_name}</span>
            <span className="text-xl sm:text-3xl">🎈</span>
          </div>
        </div>

        {/* Photo Card */}
        {wish.photo_url && (
          <div 
            className="mb-6 sm:mb-8 cursor-pointer" 
            style={{ animation: 'scale-in 0.6s ease-out forwards', animationDelay: '0.3s', opacity: 0 }}
            onClick={() => setShowPhoto(true)}
          >
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-full opacity-70 blur-sm" style={{ animation: 'spin-slow 10s linear infinite' }} />
              <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 rounded-full animate-pulse" />
              
              {/* Photo */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <img
                  src={wish.photo_url}
                  alt={wish.person_name}
                  className="w-full h-full object-cover"
                />
                {/* Tap indicator */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition flex items-center justify-center">
                  <span className="text-white text-xs opacity-0 hover:opacity-100 bg-black/50 px-2 py-1 rounded-full sm:hidden">Tap to view</span>
                </div>
              </div>
              
              {/* Crown */}
              <div className="absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2 text-3xl sm:text-5xl animate-bounce">
                👑
              </div>
              
              {/* Side decorations */}
              <div className="absolute top-1/2 -left-6 sm:-left-8 transform -translate-y-1/2 text-xl sm:text-3xl animate-pulse">🌹</div>
              <div className="absolute top-1/2 -right-6 sm:-right-8 transform -translate-y-1/2 text-xl sm:text-3xl animate-pulse" style={{ animationDelay: '0.5s' }}>🌹</div>
            </div>
          </div>
        )}

        {/* Wish Card */}
        <div className="max-w-3xl w-full animate-slide-up">
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-10 border-2 sm:border-4 border-pink-200 relative overflow-hidden">
            {/* Card decorations */}
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 text-lg sm:text-2xl animate-bounce">💝</div>
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 text-lg sm:text-2xl animate-bounce" style={{ animationDelay: '0.3s' }}>💖</div>
            <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 text-lg sm:text-2xl animate-bounce" style={{ animationDelay: '0.6s' }}>🎁</div>
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 text-lg sm:text-2xl animate-bounce" style={{ animationDelay: '0.9s' }}>🎀</div>

            {/* Title */}
            <div className="text-center mb-4 sm:mb-6">
              <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2">
                <span className="text-base sm:text-xl animate-bounce">🎉</span>
                <span className="text-sm sm:text-xl font-semibold text-purple-600">Wishing you the most magical birthday ever!</span>
                <span className="text-base sm:text-xl animate-bounce">🎂</span>
              </div>
            </div>

            {/* Message Content */}
            <div className="space-y-3 sm:space-y-4 text-center px-2 sm:px-4">
              <p className="text-sm sm:text-lg text-gray-700 leading-relaxed">
                On this special day, may your heart be filled with endless joy, your spirit soar with happiness, and your dreams take flight like colorful balloons dancing in the sky! 
                <span className="inline-block mx-1">🎈</span>
              </p>
              
              <p className="text-sm sm:text-lg text-gray-700 leading-relaxed">
                You are such an incredible person who brings so much light and love into the world. Your smile brightens every room, your kindness touches every heart, and your presence makes everything better. Today, we celebrate YOU and all the wonderful things that make you so special! 
                <span className="inline-block mx-1">✨</span>
              </p>
              
              <p className="text-sm sm:text-lg text-gray-700 leading-relaxed">
                May this birthday mark the beginning of a year filled with exciting adventures, beautiful moments, and incredible memories. 
                <span className="inline-block mx-1">😍</span>
              </p>

              <p className="text-sm sm:text-lg text-gray-700 leading-relaxed italic">
                {displayMessage}
              </p>
            </div>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-2 my-4 sm:my-6">
              <span className="text-base sm:text-xl">🌸</span>
              <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 fill-red-400 animate-pulse" />
              <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
              <span className="text-base sm:text-xl">🌸</span>
            </div>

            {/* Sender */}
            <div className="text-center">
              <p className="text-purple-500 text-xs sm:text-sm uppercase tracking-wider mb-1">With lots of love</p>
              <p className="text-xl sm:text-2xl font-display text-pink-600">{wish.sender_name}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <span className="text-sm sm:text-lg">💐</span>
                <span className="text-sm sm:text-lg">🌹</span>
                <span className="text-sm sm:text-lg">💝</span>
                <span className="text-sm sm:text-lg">🌹</span>
                <span className="text-sm sm:text-lg">💐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorations */}
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
          {['🎂', '🎁', '🎈', '🎉', '🎊', '💝'].map((emoji, i) => (
            <span 
              key={i} 
              className="text-xl sm:text-3xl animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes float-up {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.8); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes bounce-in {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes scale-in {
          0% { transform: scale(0) rotate(-10deg); opacity: 0; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
