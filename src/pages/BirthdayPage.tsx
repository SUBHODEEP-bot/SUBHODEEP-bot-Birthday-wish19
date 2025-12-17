import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { BirthdayWish } from '@/types/birthday';
import { Confetti } from '@/components/birthday/Confetti';
import { Balloons } from '@/components/birthday/Balloons';
import { Sparkles } from '@/components/birthday/Sparkles';
import { FloatingHearts } from '@/components/birthday/FloatingHearts';
import { MusicPlayer } from '@/components/birthday/MusicPlayer';
import { ClassicTemplate } from '@/components/birthday/templates/ClassicTemplate';
import { ColorfulTemplate } from '@/components/birthday/templates/ColorfulTemplate';
import { NeonTemplate } from '@/components/birthday/templates/NeonTemplate';
import { DarkTemplate } from '@/components/birthday/templates/DarkTemplate';
import { KidsTemplate } from '@/components/birthday/templates/KidsTemplate';
import { MinimalTemplate } from '@/components/birthday/templates/MinimalTemplate';
import { Loader2 } from 'lucide-react';

const BirthdayPage = () => {
  const { id } = useParams<{ id: string }>();
  const [wish, setWish] = useState<BirthdayWish | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWish = async () => {
      if (!id) {
        setError('Invalid birthday page');
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('birthday_wishes')
        .select('*')
        .eq('unique_id', id)
        .maybeSingle();

      if (error) {
        setError('Failed to load birthday page');
      } else if (!data) {
        setError('Birthday page not found');
      } else {
        setWish(data as BirthdayWish);
      }
      setIsLoading(false);
    };

    fetchWish();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🎂</div>
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-xl text-purple-700 font-medium">Preparing your birthday surprise...</p>
          <div className="flex justify-center gap-2 mt-4">
            {['🎈', '🎁', '🎊', '🎉', '🎈'].map((e, i) => (
              <span key={i} className="text-2xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>{e}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !wish) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 flex items-center justify-center p-4">
        <div className="text-center bg-white/90 rounded-3xl p-8 shadow-xl">
          <div className="text-6xl mb-4">😢</div>
          <h1 className="text-3xl font-display text-gray-800 mb-4">Oops!</h1>
          <p className="text-gray-600 mb-6">{error || 'Birthday page not found'}</p>
          <a href="/" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition">
            <span>🏠</span> Go to homepage
          </a>
        </div>
      </div>
    );
  }

  const renderTemplate = () => {
    switch (wish.template) {
      case 'colorful':
        return <ColorfulTemplate wish={wish} />;
      case 'neon':
        return <NeonTemplate wish={wish} />;
      case 'dark':
        return <DarkTemplate wish={wish} />;
      case 'kids':
        return <KidsTemplate wish={wish} />;
      case 'minimal':
        return <MinimalTemplate wish={wish} />;
      default:
        return <ClassicTemplate wish={wish} />;
    }
  };

  // Show animations for all templates except minimal
  const showFullAnimations = wish.template !== 'minimal';

  return (
    <div className="relative">
      <MusicPlayer />
      {showFullAnimations && (
        <>
          <Confetti />
          <Balloons />
          <Sparkles />
          <FloatingHearts />
        </>
      )}
      {renderTemplate()}
    </div>
  );
};

export default BirthdayPage;