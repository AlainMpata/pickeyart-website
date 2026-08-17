import { useEffect, useState, type FormEvent } from 'react';
import { X, Upload } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import type { Artwork, ArtworkInput } from '@/lib/supabase';

type ArtworkModalProps = {
  artwork: Artwork | null;
  onClose: () => void;
  onSave: (data: ArtworkInput, id?: string) => Promise<void>;
};

const blankArtwork: ArtworkInput = {
  title: '',
  title_fr: '',
  description: '',
  description_fr: '',
  category: 'painting',
  price: null,
  currency: 'USD',
  image_url: '',
  dimensions: '',
  artist: '',
  available: true,
  featured: false,
};

export default function ArtworkModal({ artwork, onClose, onSave }: ArtworkModalProps) {
  const { t } = useLanguage();
  const [form, setForm] = useState<ArtworkInput>(blankArtwork);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (artwork) {
      setForm({
        title: artwork.title,
        title_fr: artwork.title_fr ?? '',
        description: artwork.description ?? '',
        description_fr: artwork.description_fr ?? '',
        category: artwork.category,
        price: artwork.price,
        currency: artwork.currency,
        image_url: artwork.image_url ?? '',
        dimensions: artwork.dimensions ?? '',
        artist: artwork.artist ?? '',
        available: artwork.available,
        featured: artwork.featured,
      });
    } else {
      setForm(blankArtwork);
    }
  }, [artwork]);

  const updateField = <K extends keyof ArtworkInput>(field: K, value: ArtworkInput[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      await onSave(form, artwork?.id);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-5 border-b border-stone-100 flex items-center justify-between">
          <h2 className="text-xl font-serif font-bold text-stone-800">
            {artwork ? t('manage.editTitle') : t('manage.addTitle')}
          </h2>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors">
            <X className="w-5 h-5 text-stone-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="field-label">{t('manage.fieldTitle')} *</span>
              <input required value={form.title} onChange={(e) => updateField('title', e.target.value)} className="field-input" />
            </label>
            <label className="block">
              <span className="field-label">{t('manage.fieldTitleFr')}</span>
              <input value={form.title_fr ?? ''} onChange={(e) => updateField('title_fr', e.target.value)} className="field-input" />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="field-label">{t('manage.fieldArtist')}</span>
              <input value={form.artist ?? ''} onChange={(e) => updateField('artist', e.target.value)} className="field-input" />
            </label>
            <label className="block">
              <span className="field-label">{t('manage.fieldCategory')} *</span>
              <select value={form.category} onChange={(e) => updateField('category', e.target.value as ArtworkInput['category'])} className="field-input">
                <option value="painting">{t('manage.catPainting')}</option>
                <option value="sculpture">{t('manage.catSculpture')}</option>
              </select>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="field-label">{t('manage.fieldPrice')}</span>
              <input type="number" min="0" step="0.01" value={form.price ?? ''} onChange={(e) => updateField('price', e.target.value ? Number(e.target.value) : null)} className="field-input" />
            </label>
            <label className="block">
              <span className="field-label">{t('manage.fieldCurrency')}</span>
              <select value={form.currency} onChange={(e) => updateField('currency', e.target.value)} className="field-input">
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="field-label">{t('manage.fieldImageUrl')} *</span>
            <div className="relative">
              <input required type="url" value={form.image_url ?? ''} onChange={(e) => updateField('image_url', e.target.value)} className="field-input pr-10" placeholder="https://..." />
              <Upload className="w-4 h-4 text-stone-400 absolute right-3 top-3" />
            </div>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="field-label">{t('manage.fieldDimensions')}</span>
              <input value={form.dimensions ?? ''} onChange={(e) => updateField('dimensions', e.target.value)} className="field-input" />
            </label>
            <div className="flex items-end gap-5 pb-2">
              <label className="inline-flex items-center gap-2 text-sm text-stone-600 cursor-pointer">
                <input type="checkbox" checked={form.available} onChange={(e) => updateField('available', e.target.checked)} className="accent-amber-700 w-4 h-4" />
                {t('manage.fieldAvailable')}
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="field-label">{t('manage.fieldDescription')}</span>
              <textarea rows={3} value={form.description ?? ''} onChange={(e) => updateField('description', e.target.value)} className="field-input resize-none" />
            </label>
            <label className="block">
              <span className="field-label">{t('manage.fieldDescriptionFr')}</span>
              <textarea rows={3} value={form.description_fr ?? ''} onChange={(e) => updateField('description_fr', e.target.value)} className="field-input resize-none" />
            </label>
          </div>

          <label className="inline-flex items-center gap-2 text-sm text-stone-600 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => updateField('featured', e.target.checked)} className="accent-amber-700 w-4 h-4" />
            {t('manage.fieldFeatured')}
          </label>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-full text-sm font-medium text-stone-600 hover:bg-stone-100 transition-colors">
              {t('manage.cancel')}
            </button>
            <button disabled={saving} type="submit" className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 disabled:opacity-60 transition-colors">
              {saving ? t('manage.saving') : t('manage.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
