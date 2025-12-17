export interface BirthdayWish {
  id: string;
  unique_id: string;
  person_name: string;
  photo_url: string | null;
  template: string;
  message: string;
  sender_name: string;
  created_at: string;
}

export type TemplateType = 
  | 'classic' 
  | 'colorful' 
  | 'neon' 
  | 'dark' 
  | 'kids' 
  | 'minimal';

export const TEMPLATES: { id: TemplateType; name: string; description: string }[] = [
  { id: 'classic', name: 'Classic Elegant', description: 'Timeless and sophisticated' },
  { id: 'colorful', name: 'Cute & Colorful', description: 'Bright and cheerful' },
  { id: 'neon', name: 'Neon Party', description: 'Vibrant and electric' },
  { id: 'dark', name: 'Dark Premium', description: 'Luxurious and modern' },
  { id: 'kids', name: 'Kids Cartoon', description: 'Fun and playful' },
  { id: 'minimal', name: 'Minimal Modern', description: 'Clean and simple' },
];