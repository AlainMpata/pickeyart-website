import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import type { Artwork } from '@/lib/supabase';
import ArtworkCard from '@/components/ArtworkCard';

type GalleryProps = { category: 'painting' | 'sculpture'; artworks: Artwork[]; onAdd?: () => void; manage?: boolean; onEdit?: (artwork: Artwork) => void; onDelete?: (id: string) => void };
export default function Gallery({ category, artworks, onAdd, manage = false, onEdit, onDelete }: GalleryProps) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'available' | 'sold'>('all');
  const isPainting = category === 'painting';
  const filtered = useMemo(() => artworks.filter((artwork) => artwork.category === category && (filter === 'all' || (filter === 'available' ? artwork.available : !artwork.available))), [artworks, category, filter]);
  const title = isPainting ? t('gallery.paintingTitle') : t('gallery.sculptureTitle');
  const subtitle = isPainting ? t('gallery.paintingSubtitle') : t('gallery.sculptureSubtitle');
  return <main className="pt-20"><section className="relative py-24 bg-stone-900 overflow-hidden"><img src={isPainting ? 'https://images.pexels.com/photos/15320566/pexels-photo-15320566.jpeg?auto=compress&cs=tinysrgb&w=1800' : 'https://images.pexels.com/photos/29057045/pexels-photo-29057045.jpeg?auto=compress&cs=tinysrgb&w=1800'} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-35" /><div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 to-stone-950/45" /><div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><p className="eyebrow text-amber-400">PickeyArt Collection</p><h1 className="page-title">{title}</h1><p className="page-subtitle max-w-xl !text-left">{subtitle}</p></div></section><section className="py-16 bg-stone-50"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="flex flex-wrap items-center justify-between gap-4 mb-10"><div className="flex gap-2 p-1 rounded-full bg-white border border-stone-200">{(['all', 'available', 'sold'] as const).map((item) => <button key={item} onClick={() => setFilter(item)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === item ? 'bg-amber-800 text-white' : 'text-stone-500 hover:text-stone-800'}`}>{t(`gallery.filter${item[0].toUpperCase()}${item.slice(1)}`)}</button>)}</div>{onAdd && <button onClick={onAdd} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-800 hover:bg-amber-900 text-white text-sm font-semibold transition-colors"><Plus className="w-4 h-4" />{t('gallery.addNew')}</button>}</div>{filtered.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{filtered.map((artwork) => <ArtworkCard key={artwork.id} artwork={artwork} showManage={manage} onEdit={onEdit} onDelete={onDelete} />)}</div> : <div className="py-24 text-center"><p className="text-stone-500">{t('gallery.empty')}</p></div>}</div></section></main>;
}
