import { Palette, MapPin, Phone, Mail, Facebook, Twitter } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

type Page = 'home' | 'services' | 'painting' | 'sculpture' | 'about' | 'contact' | 'manage';

type FooterProps = {
  onNavigate: (page: Page) => void;
};

export default function Footer({ onNavigate }: FooterProps) {
  const { t } = useLanguage();

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-amber-800 flex items-center justify-center">
                <Palette className="w-5 h-5 text-stone-50" />
              </div>
              <span className="text-xl font-serif font-bold text-stone-50">
                Pickey<span className="text-amber-500">Art</span>
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-stone-100 uppercase tracking-wider mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => handleNav(item.key)}
                    className="text-sm text-stone-400 hover:text-amber-500 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-stone-100 uppercase tracking-wider mb-4">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-stone-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-600" />
                <span>{t('contact.address')}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-stone-400">
                <Phone className="w-4 h-4 flex-shrink-0 text-amber-600" />
                <span>{t('contact.phone')}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-stone-400">
                <Mail className="w-4 h-4 flex-shrink-0 text-amber-600" />
                <span>{t('contact.emailValue')}</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-stone-100 uppercase tracking-wider mb-4">
              {t('footer.follow')}
            </h3>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-800 hover:bg-amber-800 flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-stone-300" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-800 hover:bg-amber-800 flex items-center justify-center transition-colors duration-300"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-5 h-5 text-stone-300" />
              </a>
              <a
                href="https://wa.me/33123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-800 hover:bg-green-700 flex items-center justify-center transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5 text-stone-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500">
            &copy; {new Date().getFullYear()} PickeyArt. {t('footer.rights')}
          </p>
          <p className="text-xs text-stone-500">{t('footer.madeWith')}</p>
        </div>
      </div>
    </footer>
  );
}
