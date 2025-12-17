import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { TEMPLATES, TemplateType } from '@/types/birthday';
import { DEFAULT_BIRTHDAY_WISH } from '@/constants/birthdayWish';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, Upload, Sparkles, Cake, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminCreate = () => {
  const { isAdmin } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [personName, setPersonName] = useState('');
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [template, setTemplate] = useState<TemplateType>('colorful');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please select an image under 5MB',
          variant: 'destructive',
        });
        return;
      }
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const useDefaultMessage = () => {
    setMessage(DEFAULT_BIRTHDAY_WISH);
    toast({
      title: 'Default message added!',
      description: 'A beautiful birthday wish has been added',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!personName.trim() || !senderName.trim()) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in person name and sender name',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let photoUrl: string | null = null;

      if (photo) {
        const fileExt = photo.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('birthday-photos')
          .upload(fileName, photo);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('birthday-photos')
          .getPublicUrl(fileName);

        photoUrl = urlData.publicUrl;
      }

      // Use default message if empty
      const finalMessage = message.trim() || DEFAULT_BIRTHDAY_WISH;

      const { data, error } = await supabase
        .from('birthday_wishes')
        .insert({
          person_name: personName.trim(),
          message: finalMessage,
          sender_name: senderName.trim(),
          template,
          photo_url: photoUrl,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: '🎉 Success!',
        description: 'Birthday page created successfully',
      });

      const url = `${window.location.origin}/birthday/${data.unique_id}`;
      navigator.clipboard.writeText(url);
      
      toast({
        title: '📋 Link copied!',
        description: 'The shareable link has been copied to your clipboard',
      });

      navigate('/admin/dashboard');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create birthday page',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAdmin) return null;

  const templateColors: Record<TemplateType, string> = {
    classic: 'from-rose-400 to-pink-400',
    colorful: 'from-pink-500 via-purple-500 to-indigo-500',
    neon: 'from-pink-500 via-purple-500 to-cyan-500',
    dark: 'from-yellow-400 to-amber-500',
    kids: 'from-pink-400 via-purple-400 to-blue-400',
    minimal: 'from-stone-400 to-stone-500',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-primary/10 sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center gap-3 sm:gap-4">
          <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10">
            <Link to="/admin/dashboard">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
              <Cake className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h1 className="text-base sm:text-xl font-display font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Create Birthday Page
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-8">
          {/* Basic Info */}
          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 px-4 sm:px-6 py-4 sm:py-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <span className="text-xl sm:text-2xl">🎂</span>
                Birthday Person Details
              </CardTitle>
              <CardDescription className="text-sm">
                Enter the details of the birthday person
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 px-4 sm:px-6">
              <div className="space-y-2">
                <Label htmlFor="personName" className="text-sm sm:text-base font-medium">Birthday Person Name *</Label>
                <Input
                  id="personName"
                  placeholder="Enter the birthday person's name"
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  maxLength={100}
                  className="h-11 sm:h-12 text-base sm:text-lg border-primary/20 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo" className="text-sm sm:text-base font-medium">Photo (optional)</Label>
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  {photoPreview ? (
                    <div className="relative group">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-primary shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <span className="text-white text-sm">Change</span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center border-2 border-dashed border-primary/30">
                      <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-primary/50" />
                    </div>
                  )}
                  <div className="flex-1 w-full sm:w-auto">
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="cursor-pointer border-primary/20"
                    />
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                      Max file size: 5MB. Recommended: Square photo
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Message */}
          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 px-4 sm:px-6 py-4 sm:py-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <span className="text-xl sm:text-2xl">💌</span>
                    Birthday Message
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Write a heartfelt birthday message or use our default
                  </CardDescription>
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={useDefaultMessage}
                  className="border-primary/30 hover:bg-primary hover:text-white w-full sm:w-auto"
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  Use Default Message
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 px-4 sm:px-6">
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm sm:text-base font-medium">Message (optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Write your birthday message here... or leave empty to use our beautiful default message!"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  maxLength={2000}
                  className="border-primary/20 focus:border-primary text-sm sm:text-base"
                />
                <p className="text-xs sm:text-sm text-muted-foreground text-right">
                  {message.length}/2000
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="senderName" className="text-sm sm:text-base font-medium">Your Name (Sender) *</Label>
                <Input
                  id="senderName"
                  placeholder="Enter your name"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  maxLength={100}
                  className="h-11 sm:h-12 text-base sm:text-lg border-primary/20 focus:border-primary"
                />
              </div>
            </CardContent>
          </Card>

          {/* Template Selection */}
          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 px-4 sm:px-6 py-4 sm:py-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <span className="text-xl sm:text-2xl">🎨</span>
                Choose Template
              </CardTitle>
              <CardDescription className="text-sm">
                Select a beautiful design for the birthday page
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
              <RadioGroup
                value={template}
                onValueChange={(value) => setTemplate(value as TemplateType)}
                className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
              >
                {TEMPLATES.map((t) => (
                  <div key={t.id}>
                    <RadioGroupItem
                      value={t.id}
                      id={t.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={t.id}
                      className="flex flex-col items-center justify-center rounded-xl sm:rounded-2xl border-2 border-muted bg-card p-3 sm:p-5 hover:bg-accent/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all hover:scale-105"
                    >
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${templateColors[t.id]} flex items-center justify-center mb-2 sm:mb-3 shadow-lg`}>
                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <span className="font-semibold text-xs sm:text-sm">{t.name}</span>
                      <span className="text-xs text-muted-foreground mt-1 text-center hidden sm:block">
                        {t.description}
                      </span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Submit */}
          <Button 
            type="submit" 
            size="lg" 
            className="w-full h-12 sm:h-14 text-base sm:text-lg rounded-full bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%] hover:bg-right transition-all duration-500 shadow-xl" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin mr-2">🎂</span>
                Creating Magic...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                Generate Birthday Page 🎉
              </>
            )}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default AdminCreate;