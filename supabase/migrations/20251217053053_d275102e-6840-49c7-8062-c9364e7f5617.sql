-- Create birthday_wishes table
CREATE TABLE public.birthday_wishes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  unique_id TEXT NOT NULL UNIQUE DEFAULT substr(md5(random()::text), 1, 12),
  person_name TEXT NOT NULL,
  photo_url TEXT,
  template TEXT NOT NULL DEFAULT 'classic',
  message TEXT NOT NULL,
  sender_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.birthday_wishes ENABLE ROW LEVEL SECURITY;

-- Public read policy for viewing birthday pages
CREATE POLICY "Anyone can view birthday wishes" 
ON public.birthday_wishes 
FOR SELECT 
USING (true);

-- Public insert/update/delete (admin will be handled client-side with hardcoded credentials)
CREATE POLICY "Anyone can insert birthday wishes" 
ON public.birthday_wishes 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update birthday wishes" 
ON public.birthday_wishes 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete birthday wishes" 
ON public.birthday_wishes 
FOR DELETE 
USING (true);

-- Create storage bucket for photos
INSERT INTO storage.buckets (id, name, public) VALUES ('birthday-photos', 'birthday-photos', true);

-- Storage policies
CREATE POLICY "Anyone can view birthday photos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'birthday-photos');

CREATE POLICY "Anyone can upload birthday photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'birthday-photos');

CREATE POLICY "Anyone can delete birthday photos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'birthday-photos');