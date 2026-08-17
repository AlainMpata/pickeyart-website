import { Pencil, Trash2, Check } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import type { Artwork } from '@/lib/supabase';

type ArtworkCardProps = {
  artwork: Artwork;
  onEdit?: (artwork: Artwork) => void;
  onDelete?: (id: string) => void;
  showManage?: boolean;
};

export default function ArtworkCard({ artwork, onEdit, onDelete, showManage }: ArtworkCardProps) {
  const { t, lang } = useLanguage();

  const title = lang === 'fr' && artwork.title_fr ? artwork.title_fr : artwork.title;
  const description = lang === 'fr' && artwork.description_fr ? artwork.description_fr : artwork.description;
  const currencySymbol = t(`common.currency.${artwork.currency}`);

  const priceLabel = artwork.price
    ? `${currencySymbol}${artwork.price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
    : t('gallery.notPriced');

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-100">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
        {artwork.image_url ? (
          <img
            src={artwork.image_url}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-300">
            <span className="text-sm">No image</span>
          </div>
        )}
        {/* Status badge */}
        <div className="absolute top-3 left-3">
          {artwork.available ? (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-600/90 text-white backdrop-blur-sm">
              {t('gallery.available')}
            </span>
          ) : (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-stone-800/90 text-white backdrop-blur-sm">
              {t('gallery.sold')}
            </span>
          )}
        </div>
        {/* Manage buttons */}
        {showManage && (
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => onEdit?.(artwork)}
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-amber-600 hover:text-white text-stone-700 flex items-center justify-center transition-colors shadow-sm"
              aria-label={t('manage.edit')}
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete?.(artwork.id)}
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-red-600 hover:text-white text-stone-700 flex items-center justify-center transition-colors shadow-sm"
              aria-label={t('manage.delete')}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-lg font-serif font-bold text-stone-800 mb-1 line-clamp-1">{title}</h3>
        {artwork.artist && (
          <p className="text-sm text-stone-500 mb-2">
            {t('gallery.by')} {artwork.artist}
          </p>
        )}
        {description && (
          <p className="text-sm text-stone-500 line-clamp-2 mb-3 leading-relaxed">{description}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-amber-800">{priceLabel}</span>
          {artwork.dimensions && (
            <span className="text-xs text-stone-400 flex items-center gap-1">
              <Check className="w-3 h-3" />
              {artwork.dimensions}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
