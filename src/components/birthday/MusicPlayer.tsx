import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const MusicPlayer = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/audio/happy-birthday.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.5;
    audioRef.current = audio;

    // Try to autoplay immediately
    const tryAutoplay = async () => {
      try {
        await audio.play();
      } catch {
        // Autoplay blocked - wait for first user interaction
        const playOnInteraction = async () => {
          try {
            await audio.play();
          } catch {
            // Still blocked
          }
        };
        
        document.addEventListener('click', playOnInteraction, { once: true });
        document.addEventListener('touchstart', playOnInteraction, { once: true });
        document.addEventListener('keydown', playOnInteraction, { once: true });
      }
    };

    tryAutoplay();

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.play();
      setIsMuted(false);
    } else {
      audio.pause();
      setIsMuted(true);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleMute}
      className={`fixed top-4 right-4 z-50 h-14 w-14 rounded-full shadow-xl transition-all duration-300 ${
        isMuted 
          ? 'bg-gray-200 hover:bg-gray-300' 
          : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 animate-pulse'
      }`}
      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
    >
      {isMuted ? (
        <VolumeX className="h-6 w-6 text-gray-600" />
      ) : (
        <Volume2 className="h-6 w-6 text-white" />
      )}
    </Button>
  );
};
