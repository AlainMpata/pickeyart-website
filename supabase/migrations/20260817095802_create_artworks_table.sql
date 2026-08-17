/*
# Create artworks table for PickeyArt gallery

1. New Tables
- `artworks`
  - `id` (uuid, primary key)
  - `title` (text, not null) — English title
  - `title_fr` (text) — French title
  - `description` (text) — English description
  - `description_fr` (text) — French description
  - `category` (text, not null) — 'painting' or 'sculpture'
  - `price` (numeric) — sale price
  - `currency` (text, default 'USD')
  - `image_url` (text) — URL of the artwork image
  - `dimensions` (text) — e.g. "24 x 36 inches"
  - `artist` (text) — artist name
  - `available` (boolean, default true) — whether it's for sale
  - `featured` (boolean, default false) — show on home page
  - `created_at` (timestamptz)
2. Security
- Enable RLS on `artworks`.
- Single-tenant, no-auth app: allow anon + authenticated full CRUD (data is intentionally public/shared).
*/

CREATE TABLE IF NOT EXISTS artworks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  title_fr text,
  description text,
  description_fr text,
  category text NOT NULL CHECK (category IN ('painting', 'sculpture')),
  price numeric(10, 2),
  currency text NOT NULL DEFAULT 'USD',
  image_url text,
  dimensions text,
  artist text,
  available boolean NOT NULL DEFAULT true,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_artworks" ON artworks;
CREATE POLICY "anon_select_artworks" ON artworks FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_artworks" ON artworks;
CREATE POLICY "anon_insert_artworks" ON artworks FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_artworks" ON artworks;
CREATE POLICY "anon_update_artworks" ON artworks FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_artworks" ON artworks;
CREATE POLICY "anon_delete_artworks" ON artworks FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_artworks_category ON artworks(category);
CREATE INDEX IF NOT EXISTS idx_artworks_featured ON artworks(featured);
