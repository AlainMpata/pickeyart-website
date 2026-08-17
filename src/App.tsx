import { useCallback, useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ArtworkModal from '@/components/ArtworkModal';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Gallery from '@/pages/Gallery';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import { supabase, type Artwork, type ArtworkInput } from '@/lib/supabase';
import { LanguageProvider, useLanguage } from '@/lib/i18n';
import { Plus, Settings2 } from 'lucide-react';

type Page = 'home' | 'services' | 'painting' | 'sculpture' | 'about' | 'contact' | 'manage';

function ManagePage({ artworks, onAdd, onEdit, onDelete }: { artworks: Artwork[]; onAdd: () => void; onEdit: (artwork: Artwork) => void; onDelete: (id: string) => void }) {
  const { t } = useLanguage();
  return <main className="pt-20"><section className="py-20 bg-stone-900"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6"><div><p className="eyebrow text-amber-400">PickeyArt Studio</p><h1 className="page-title !text-4xl sm:!text-5xl">{t('manage.title')}</h1><p className="page-subtitle !text-left">{t('manage.subtitle')}</p></div><button onClick={onAdd} className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-amber-700 hover:bg-amber-600 text-white font-semibold transition-colors"><Plus className="w-4 h-4" />{t('gallery.addNew')}</button></div></section><section className="py-16 bg-stone-50"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="flex items-center gap-2 mb-7 text-stone-500"><Settings2 className="w-4 h-4" /><span className="text-sm">{artworks.length} {t('home.statsWorks')}</span></div><div className="space-y-16"><div><h2 className="text-2xl font-serif font-bold text-stone-800 mb-6">{t('gallery.paintingTitle')}</h2><Gallery category="painting" artworks={artworks} manage onEdit={onEdit} onDelete={onDelete} /></div><div><h2 className="text-2xl font-serif font-bold text-stone-800 mb-6">{t('gallery.sculptureTitle')}</h2><Gallery category="sculpture" artworks={artworks} manage onEdit={onEdit} onDelete={onDelete} /></div></div></div></section></main>;
}

function AppContent() {
  const [page, setPage] = useState<Page>('home');
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');
  const { t } = useLanguage();

  const loadArtworks = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase.from('artworks').select('*').order('created_at', { ascending: false });
    if (fetchError) setError('Something went wrong. Please try again.');
    else setArtworks((data ?? []) as Artwork[]);
    setLoading(false);
  }, []);

  useEffect(() => { void loadArtworks(); }, [loadArtworks]);

  const saveArtwork = async (data: ArtworkInput, id?: string) => {
    const result = id ? await supabase.from('artworks').update(data).eq('id', id) : await supabase.from('artworks').insert(data);
    if (result.error) { setError(t('common.error')); return; }
    await loadArtworks();
  };

  const deleteArtwork = async (id: string) => {
    if (!window.confirm(t('gallery.deleteConfirm'))) return;
    const { error: deleteError } = await supabase.from('artworks').delete().eq('id', id);
    if (deleteError) { setError(t('common.error')); return; }
    setArtworks((current) => current.filter((artwork) => artwork.id !== id));
  };

  const openAdd = () => { setSelectedArtwork(null); setModalOpen(true); };
  const openEdit = (artwork: Artwork) => { setSelectedArtwork(artwork); setModalOpen(true); };

  let content;
  if (loading && artworks.length === 0) content = <div className="min-h-screen pt-40 text-center text-stone-500">{t('common.loading')}</div>;
  else if (page === 'home') content = <Home artworks={artworks} onNavigate={(next) => setPage(next)} />;
  else if (page === 'services') content = <Services onNavigate={(next) => setPage(next)} />;
  else if (page === 'painting') content = <Gallery category="painting" artworks={artworks} />;
  else if (page === 'sculpture') content = <Gallery category="sculpture" artworks={artworks} />;
  else if (page === 'about') content = <About />;
  else if (page === 'contact') content = <Contact />;
  else content = <ManagePage artworks={artworks} onAdd={openAdd} onEdit={openEdit} onDelete={deleteArtwork} />;

  return <div className="min-h-screen bg-stone-50 text-stone-800"><Header currentPage={page} onNavigate={(next) => setPage(next)} />{error && <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[70] bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-xl shadow-lg text-sm" role="alert">{error}<button onClick={() => setError('')} className="ml-3 font-bold">×</button></div>}{content}<Footer onNavigate={(next) => setPage(next)} />{page === 'manage' && modalOpen && <ArtworkModal artwork={selectedArtwork} onClose={() => setModalOpen(false)} onSave={saveArtwork} />}<WhatsAppButton /></div>;
}

export default function App() { return <LanguageProvider><AppContent /></LanguageProvider>; }
