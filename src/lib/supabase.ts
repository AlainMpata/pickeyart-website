import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Artwork = {
  id: string;
  title: string;
  title_fr: string | null;
  description: string | null;
  description_fr: string | null;
  category: 'painting' | 'sculpture';
  price: number | null;
  currency: string;
  image_url: string | null;
  dimensions: string | null;
  artist: string | null;
  available: boolean;
  featured: boolean;
  created_at: string;
};

export type ArtworkInput = Omit<Artwork, 'id' | 'created_at'>;
