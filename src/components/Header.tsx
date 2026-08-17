import { useState, useEffect } from 'react';
import { Menu, X, Palette, Globe } from 'lucide-react';
import { useLanguage, type Language } from '@/lib/i18n';

type Page = 'home' | 'services' | 'painting' | 'sculpture' | 'about' | 'contact' | 'manage';

type HeaderProps = {
  currentPage: Page;
  onNavigate: (page: Page) => void;
};

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const { t, lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems: { key: Page; label: string }[] = [
    { key: 'home', label: t('nav.home') },
    { key: 'services', label: t('nav.services') },
    { key: 'painting', label: t('nav.painting') },
    { key: 'sculpture', label: t('nav.sculpture') },
    { key: 'about', label: t('nav.about') },
    { key: 'contact', label: t('nav.contact') },
    { key: 'manage', label: t('nav.manage') },
  ];

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLang = () => {
    const newLang: Language = lang === 'en' ? 'fr' : 'en';
    setLang(newLang);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-stone-50/95 backdrop-blur-md shadow-lg shadow-stone-900/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 group"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
              scrolled ? 'bg-amber-800' : 'bg-white/15 backdrop-blur-sm'
            }`}>
              <Palette className={`w-5 h-5 ${scrolled ? 'text-stone-50' : 'text-white'}`} />
            </div>
            <span className={`text-xl font-serif font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? 'text-stone-800' : 'text-white'
            }`}>
              Pickey<span className="text-amber-600">Art</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNav(item.key)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  currentPage === item.key
                    ? scrolled
                      ? 'text-amber-800 bg-amber-50'
                      : 'text-white bg-white/15 backdrop-blur-sm'
                    : scrolled
                      ? 'text-stone-600 hover:text-amber-800 hover:bg-stone-100'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side: language + mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                scrolled
                  ? 'text-stone-600 hover:bg-stone-100 border border-stone-200'
                  : 'text-white/90 hover:bg-white/10 border border-white/20'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">{lang}</span>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-full transition-colors ${
                scrolled ? 'text-stone-700 hover:bg-stone-100' : 'text-white hover:bg-white/10'
              }`}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="lg:hidden pb-4 pt-2 space-y-1 bg-stone-50/95 backdrop-blur-md rounded-2xl mt-2 shadow-lg">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNav(item.key)}
                className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  currentPage === item.key
                    ? 'text-amber-800 bg-amber-50'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
