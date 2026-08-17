import { ArrowRight, ChevronDown, Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import type { Artwork } from '@/lib/supabase';
import ArtworkCard from '@/components/ArtworkCard';

type Page = 'home' | 'services' | 'painting' | 'sculpture' | 'about' | 'contact';

type HomeProps = {
  artworks: Artwork[];
  onNavigate: (page: Page) => void;
};

export default function Home({ artworks, onNavigate }: HomeProps) {
  const { t } = useLanguage();
  const featured = artworks.filter((artwork) => artwork.featured).slice(0, 4);

  return (
    <main>
      <section className="relative min-h-[680px] flex items-center overflow-hidden bg-stone-900">
        <img src="https://images.pexels.com/photos/27584011/pexels-photo-27584011.jpeg?auto=compress&cs=tinysrgb&w=1800" alt="Art gallery interior" className="absolute inset-0 w-full h-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/80 to-stone-900/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-stone-950/20" />
        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-24">
          <div className="max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-7 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-amber-300 text-sm font-medium">
              <Sparkles className="w-4 h-4" /> {t('home.heroBadge')}
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-serif font-bold text-white leading-[1.02] tracking-tight">
              {t('home.heroTitle')}
            </h1>
            <p className="mt-7 max-w-xl text-lg sm:text-xl text-stone-200 leading-relaxed">{t('home.heroSubtitle')}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <button onClick={() => onNavigate('painting')} className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-amber-700 hover:bg-amber-600 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-amber-700/25">
                {t('home.heroCta')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => onNavigate('services')} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/30 hover:bg-white/10 text-white font-semibold transition-colors">
                {t('home.heroCta2')}
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 animate-bounce"><ChevronDown className="w-6 h-6" /></div>
      </section>

      <section className="py-8 bg-amber-800 text-white">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
          {[['24+', 'home.statsWorks'], ['18', 'home.statsArtists'], ['350+', 'home.statsClients'], ['12', 'home.statsYears']].map(([value, label]) => (
            <div key={label} className="text-center px-4 py-3"><div className="text-3xl font-serif font-bold">{value}</div><div className="text-xs sm:text-sm text-amber-100 mt-1">{t(label)}</div></div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12"><div><p className="eyebrow">{t('home.heroBadge')}</p><h2 className="section-title">{t('home.featuredTitle')}</h2><p className="section-subtitle">{t('home.featuredSubtitle')}</p></div><button onClick={() => onNavigate('painting')} className="hidden sm:flex items-center gap-2 text-sm font-semibold text-amber-800 hover:text-amber-600 transition-colors">{t('home.viewAll')} <ArrowRight className="w-4 h-4" /></button></div>
          {featured.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{featured.map((artwork) => <ArtworkCard key={artwork.id} artwork={artwork} />)}</div> : <div className="py-14 text-center text-stone-500">{t('gallery.empty')}</div>}
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center mb-12"><p className="eyebrow">{t('home.heroBadge')}</p><h2 className="section-title">{t('home.categoriesTitle')}</h2><p className="section-subtitle mx-auto">{t('home.categoriesSubtitle')}</p></div>
          <div className="grid md:grid-cols-2 gap-6">
            <button onClick={() => onNavigate('painting')} className="group relative h-80 rounded-3xl overflow-hidden text-left"><img src="https://images.pexels.com/photos/1589279/pexels-photo-1589279.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Paintings" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/10 to-transparent" /><div className="absolute bottom-7 left-7 right-7"><div className="flex items-center justify-between"><div><h3 className="text-3xl font-serif font-bold text-white">{t('home.catPaintingTitle')}</h3><p className="mt-2 text-sm text-stone-200 max-w-sm">{t('home.catPaintingDesc')}</p></div><span className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-amber-600 transition-colors"><ArrowRight className="w-5 h-5" /></span></div></div></button>
            <button onClick={() => onNavigate('sculpture')} className="group relative h-80 rounded-3xl overflow-hidden text-left"><img src="https://images.pexels.com/photos/13049900/pexels-photo-13049900.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Sculptures" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/10 to-transparent" /><div className="absolute bottom-7 left-7 right-7"><div className="flex items-center justify-between"><div><h3 className="text-3xl font-serif font-bold text-white">{t('home.catSculptureTitle')}</h3><p className="mt-2 text-sm text-stone-200 max-w-sm">{t('home.catSculptureDesc')}</p></div><span className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-amber-600 transition-colors"><ArrowRight className="w-5 h-5" /></span></div></div></button>
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-stone-900 overflow-hidden"><div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-amber-600/20" /><div className="absolute -bottom-48 -left-20 w-96 h-96 rounded-full border border-amber-600/10" /><div className="relative max-w-3xl mx-auto px-4 text-center"><Heart className="w-8 h-8 text-amber-500 mx-auto mb-6" /><h2 className="text-4xl sm:text-5xl font-serif font-bold text-white">{t('home.ctaTitle')}</h2><p className="mt-5 text-lg text-stone-300 leading-relaxed">{t('home.ctaSubtitle')}</p><button onClick={() => onNavigate('contact')} className="mt-8 inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-amber-700 hover:bg-amber-600 text-white font-semibold transition-colors">{t('home.ctaButton')} <ArrowRight className="w-4 h-4" /></button></div></section>
    </main>
  );
}
