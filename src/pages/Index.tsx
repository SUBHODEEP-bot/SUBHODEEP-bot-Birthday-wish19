import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Cake, Sparkles, Gift, Heart, PartyPopper, Star } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-32 sm:w-64 h-32 sm:h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-40 sm:w-80 h-40 sm:h-80 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-24 sm:w-48 h-24 sm:h-48 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Floating Icons - Hidden on small screens */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
        {[Cake, Gift, Heart, PartyPopper, Star, Sparkles].map((Icon, i) => (
          <Icon
            key={i}
            className="absolute text-primary/20 animate-float"
            style={{
              width: 40 + Math.random() * 20,
              height: 40 + Math.random() * 20,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-12">
        <div className="text-center max-w-3xl mx-auto">
          {/* Logo/Icon */}
          <div className="mb-6 sm:mb-8 animate-bounce-soft">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <Cake className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-primary-foreground" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold mb-4 sm:mb-6">
            <span className="text-gradient">Birthday</span>
            <br />
            <span className="text-foreground">Wish Generator</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-xl mx-auto leading-relaxed px-2">
            Create beautiful, personalized birthday pages with stunning animations and share them with your loved ones
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button asChild size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-full shadow-lg hover:shadow-xl transition-all w-full sm:w-auto">
              <Link to="/admin">
                <Sparkles className="w-5 h-5 mr-2" />
                Admin Panel
              </Link>
            </Button>
          </div>

          {/* Features */}
          <div className="mt-12 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
            {[
              {
                icon: Sparkles,
                title: 'Beautiful Templates',
                description: '6 stunning designs to choose from',
              },
              {
                icon: PartyPopper,
                title: 'Animations & Effects',
                description: 'Confetti, balloons, and sparkles',
              },
              {
                icon: Gift,
                title: 'Easy Sharing',
                description: 'Generate unique shareable links',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-card/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border/50 hover:border-primary/30 transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-semibold mb-1 sm:mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-3 sm:bottom-4 left-0 right-0 text-center text-muted-foreground text-xs sm:text-sm">
          <p>Made with ❤️ for birthday celebrations</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;