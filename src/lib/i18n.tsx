import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Language = 'en' | 'fr';

type TranslationKey = string;

type Translations = Record<Language, Record<TranslationKey, string>>;

const translations: Translations = {
  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.painting': 'Painting',
    'nav.sculpture': 'Sculpture',
    'nav.about': 'About Us',
    'nav.contact': 'Contact Us',
    'nav.manage': 'Manage Artworks',

    'home.heroBadge': 'Curated Fine Art Collection',
    'home.heroTitle': 'Where Every Brushstroke Tells a Story',
    'home.heroSubtitle': 'Discover an exquisite collection of original paintings and sculptures from renowned artists around the world.',
    'home.heroCta': 'Explore Collection',
    'home.heroCta2': 'Our Services',
    'home.featuredTitle': 'Featured Works',
    'home.featuredSubtitle': 'A selection of our most distinguished pieces, handpicked for the discerning collector.',
    'home.statsWorks': 'Artworks',
    'home.statsArtists': 'Artists',
    'home.statsClients': 'Collectors',
    'home.statsYears': 'Years of Excellence',
    'home.categoriesTitle': 'Explore by Category',
    'home.categoriesSubtitle': 'Browse our curated collections of fine paintings and sculptures.',
    'home.catPaintingTitle': 'Paintings',
    'home.catPaintingDesc': 'Original oil, acrylic, and mixed media works from master and contemporary artists.',
    'home.catSculptureTitle': 'Sculptures',
    'home.catSculptureDesc': 'Marble, bronze, and mixed media sculptures that capture timeless beauty and form.',
    'home.viewAll': 'View All',
    'home.ctaTitle': 'Begin Your Art Journey',
    'home.ctaSubtitle': 'Whether you are a seasoned collector or discovering art for the first time, we are here to guide you.',
    'home.ctaButton': 'Get in Touch',

    'services.title': 'Our Services',
    'services.subtitle': 'We offer a comprehensive range of art services for collectors, artists, and enthusiasts.',
    'services.s1Title': 'Art Acquisition',
    'services.s1Desc': 'Personalized guidance to help you find and acquire the perfect piece for your collection, from sourcing to negotiation.',
    'services.s2Title': 'Commissioned Works',
    'services.s2Desc': 'Collaborate with our artists to create a bespoke painting or sculpture tailored to your vision and space.',
    'services.s3Title': 'Art Consultation',
    'services.s3Desc': 'Professional advice on collection building, art investment, and interior curation for homes and offices.',
    'services.s4Title': 'Restoration & Conservation',
    'services.s4Desc': 'Expert restoration services to preserve and revive the beauty of your valued artworks.',
    'services.s5Title': 'Exhibition Curation',
    'services.s5Desc': 'Full-service exhibition planning, from concept development to installation and promotion.',
    'services.s6Title': 'Art Shipping & Framing',
    'services.s6Desc': 'Secure, insured shipping and custom framing services to protect and enhance your artwork.',
    'services.processTitle': 'How We Work',
    'services.processSubtitle': 'A simple, transparent process designed around your needs.',
    'services.step1Title': 'Consultation',
    'services.step1Desc': 'We discuss your preferences, budget, and the vision for your space.',
    'services.step2Title': 'Selection',
    'services.step2Desc': 'Browse our collection or let us source pieces that match your criteria.',
    'services.step3Title': 'Acquisition',
    'services.step3Desc': 'We handle all logistics, from negotiation to secure delivery.',
    'services.step4Title': 'Enjoy',
    'services.step4Desc': 'Receive your artwork, beautifully framed and ready to display.',

    'gallery.paintingTitle': 'Paintings',
    'gallery.paintingSubtitle': 'Explore our collection of original paintings from talented artists worldwide.',
    'gallery.sculptureTitle': 'Sculptures',
    'gallery.sculptureSubtitle': 'Discover exquisite sculptures crafted from marble, bronze, and other fine materials.',
    'gallery.filterAll': 'All',
    'gallery.filterAvailable': 'Available',
    'gallery.filterSold': 'Sold',
    'gallery.empty': 'No artworks found in this collection yet.',
    'gallery.by': 'by',
    'gallery.available': 'Available',
    'gallery.sold': 'Sold',
    'gallery.notPriced': 'Price on Request',
    'gallery.addNew': 'Add New Artwork',
    'gallery.edit': 'Edit',
    'gallery.delete': 'Delete',
    'gallery.deleteConfirm': 'Are you sure you want to delete this artwork?',

    'manage.title': 'Manage Artworks',
    'manage.subtitle': 'Add, edit, and remove paintings and sculptures from the gallery.',
    'manage.addTitle': 'Add New Artwork',
    'manage.editTitle': 'Edit Artwork',
    'manage.fieldTitle': 'Title (English)',
    'manage.fieldTitleFr': 'Title (French)',
    'manage.fieldDescription': 'Description (English)',
    'manage.fieldDescriptionFr': 'Description (French)',
    'manage.fieldCategory': 'Category',
    'manage.fieldPrice': 'Price',
    'manage.fieldCurrency': 'Currency',
    'manage.fieldImageUrl': 'Image URL',
    'manage.fieldDimensions': 'Dimensions',
    'manage.fieldArtist': 'Artist',
    'manage.fieldAvailable': 'Available for Sale',
    'manage.fieldFeatured': 'Featured on Home Page',
    'manage.save': 'Save Artwork',
    'manage.cancel': 'Cancel',
    'manage.saving': 'Saving...',
    'manage.delete': 'Delete',
    'manage.edit': 'Edit',
    'manage.catPainting': 'Painting',
    'manage.catSculpture': 'Sculpture',

    'about.title': 'About Us',
    'about.subtitle': 'A passion for art, a commitment to excellence.',
    'about.storyTitle': 'Our Story',
    'about.storyP1': 'PickeyArt was founded with a singular vision: to make extraordinary art accessible to collectors and enthusiasts around the world. What began as a small gallery has grown into a trusted destination for fine paintings and sculptures, each piece carefully selected for its quality, authenticity, and emotional resonance.',
    'about.storyP2': 'We believe that art is more than decoration — it is a conversation, a connection, and a legacy. Our team works closely with artists and collectors alike to ensure every acquisition is meaningful and every artwork finds the home it deserves.',
    'about.missionTitle': 'Our Mission',
    'about.missionDesc': 'To connect people with art that moves them, supporting artists and enriching spaces with beauty and meaning.',
    'about.visionTitle': 'Our Vision',
    'about.visionDesc': 'To be the most trusted and inspiring destination for fine art, where every collector feels guided and every artist feels valued.',
    'about.valuesTitle': 'Our Values',
    'about.value1Title': 'Authenticity',
    'about.value1Desc': 'Every piece we offer is genuine, verified, and accompanied by full provenance.',
    'about.value2Title': 'Excellence',
    'about.value2Desc': 'We hold ourselves to the highest standards in curation, service, and craftsmanship.',
    'about.value3Title': 'Community',
    'about.value3Desc': 'We nurture relationships between artists, collectors, and art lovers that last a lifetime.',

    'contact.title': 'Contact Us',
    'contact.subtitle': 'We would love to hear from you. Reach out with any questions about our collection or services.',
    'contact.formTitle': 'Send Us a Message',
    'contact.name': 'Your Name',
    'contact.email': 'Your Email',
    'contact.subject': 'Subject',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Thank you! Your message has been sent successfully.',
    'contact.infoTitle': 'Get in Touch',
    'contact.addressLabel': 'Address',
    'contact.address': '123 Artisan Lane, Gallery District, Paris, France',
    'contact.phoneLabel': 'Phone',
    'contact.phone': '+33 1 23 45 67 89',
    'contact.emailLabel': 'Email',
    'contact.emailValue': 'hello@pickeyart.com',
    'contact.hoursLabel': 'Gallery Hours',
    'contact.hours': 'Mon – Sat: 10am – 7pm\nSun: 12pm – 5pm',
    'contact.followTitle': 'Follow Us',

    'footer.tagline': 'Curating beauty, one masterpiece at a time.',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.follow': 'Follow Us',
    'footer.rights': 'All rights reserved.',
    'footer.madeWith': 'Crafted with passion for the arts.',

    'common.loading': 'Loading...',
    'common.error': 'Something went wrong. Please try again.',
    'common.currency.USD': '$',
    'common.currency.EUR': '€',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.painting': 'Peinture',
    'nav.sculpture': 'Sculpture',
    'nav.about': 'À Propos',
    'nav.contact': 'Contact',
    'nav.manage': 'Gérer les Œuvres',

    'home.heroBadge': 'Collection d\'Art Fin',
    'home.heroTitle': 'Où Chaque Coups de Pinceau Raconte une Histoire',
    'home.heroSubtitle': 'Découvrez une collection exquise de peintures et de sculptures originales d\'artistes renommés du monde entier.',
    'home.heroCta': 'Explorer la Collection',
    'home.heroCta2': 'Nos Services',
    'home.featuredTitle': 'Œuvres en Vedette',
    'home.featuredSubtitle': 'Une sélection de nos pièces les plus distinguées, choisies pour le collectionneur averti.',
    'home.statsWorks': 'Œuvres',
    'home.statsArtists': 'Artistes',
    'home.statsClients': 'Collectionneurs',
    'home.statsYears': 'Années d\'Excellence',
    'home.categoriesTitle': 'Explorer par Catégorie',
    'home.categoriesSubtitle': 'Parcourez nos collections soigneusement sélectionnées de peintures et de sculptures.',
    'home.catPaintingTitle': 'Peintures',
    'home.catPaintingDesc': 'Œuvres originales à l\'huile, à l\'acrylique et techniques mixtes de maîtres et d\'artistes contemporains.',
    'home.catSculptureTitle': 'Sculptures',
    'home.catSculptureDesc': 'Sculptures en marbre, bronze et techniques mixtes qui capturent la beauté intemporelle et la forme.',
    'home.viewAll': 'Voir Tout',
    'home.ctaTitle': 'Commencez Votre Voyage Artistique',
    'home.ctaSubtitle': 'Que vous soyez un collectionneur chevronné ou que vous découvriez l\'art pour la première fois, nous sommes là pour vous guider.',
    'home.ctaButton': 'Nous Contacter',

    'services.title': 'Nos Services',
    'services.subtitle': 'Nous offons une gamme complète de services artistiques pour les collectionneurs, les artistes et les passionnés.',
    'services.s1Title': 'Acquisition d\'Art',
    'services.s1Desc': 'Conseils personnalisés pour vous aider à trouver et à acquérir la pièce parfaite pour votre collection.',
    'services.s2Title': 'Œuvres sur Commande',
    'services.s2Desc': 'Collaborez avec nos artistes pour créer une peinture ou une sculpture sur mesure adaptée à votre vision.',
    'services.s3Title': 'Consultation Artistique',
    'services.s3Desc': 'Conseils professionnels sur la constitution de collection, l\'investissement artistique et la curation d\'intérieur.',
    'services.s4Title': 'Restauration & Conservation',
    'services.s4Desc': 'Services de restauration experts pour préserver et raviver la beauté de vos œuvres d\'art précieuses.',
    'services.s5Title': 'Curation d\'Exposition',
    'services.s5Desc': 'Planification d\'exposition complète, du développement du concept à l\'installation et la promotion.',
    'services.s6Title': 'Expédition & Encadrement',
    'services.s6Desc': 'Expédition sécurisée et assurée et services d\'encadrement sur mesure pour protéger et valoriser votre œuvre.',
    'services.processTitle': 'Notre Méthode',
    'services.processSubtitle': 'Un processus simple et transparent conçu autour de vos besoins.',
    'services.step1Title': 'Consultation',
    'services.step1Desc': 'Nous discutons de vos préférences, de votre budget et de la vision de votre espace.',
    'services.step2Title': 'Sélection',
    'services.step2Desc': 'Parcourez notre collection ou laissez-nous trouver des pièces qui correspondent à vos critères.',
    'services.step3Title': 'Acquisition',
    'services.step3Desc': 'Nous gérons toute la logistique, de la négociation à la livraison sécurisée.',
    'services.step4Title': 'Profitez',
    'services.step4Desc': 'Recevez votre œuvre d\'art, magnifiquement encadrée et prête à être exposée.',

    'gallery.paintingTitle': 'Peintures',
    'gallery.paintingSubtitle': 'Explorez notre collection de peintures originales d\'artistes talentueux du monde entier.',
    'gallery.sculptureTitle': 'Sculptures',
    'gallery.sculptureSubtitle': 'Découvrez des sculptures exquises en marbre, bronze et autres matériaux nobles.',
    'gallery.filterAll': 'Toutes',
    'gallery.filterAvailable': 'Disponibles',
    'gallery.filterSold': 'Vendues',
    'gallery.empty': 'Aucune œuvre trouvée dans cette collection pour le moment.',
    'gallery.by': 'par',
    'gallery.available': 'Disponible',
    'gallery.sold': 'Vendu',
    'gallery.notPriced': 'Prix sur Demande',
    'gallery.addNew': 'Ajouter une Œuvre',
    'gallery.edit': 'Modifier',
    'gallery.delete': 'Supprimer',
    'gallery.deleteConfirm': 'Êtes-vous sûr de vouloir supprimer cette œuvre ?',

    'manage.title': 'Gérer les Œuvres',
    'manage.subtitle': 'Ajoutez, modifiez et supprimez des peintures et des sculptures de la galerie.',
    'manage.addTitle': 'Ajouter une Nouvelle Œuvre',
    'manage.editTitle': 'Modifier l\'Œuvre',
    'manage.fieldTitle': 'Titre (Anglais)',
    'manage.fieldTitleFr': 'Titre (Français)',
    'manage.fieldDescription': 'Description (Anglais)',
    'manage.fieldDescriptionFr': 'Description (Français)',
    'manage.fieldCategory': 'Catégorie',
    'manage.fieldPrice': 'Prix',
    'manage.fieldCurrency': 'Devise',
    'manage.fieldImageUrl': 'URL de l\'Image',
    'manage.fieldDimensions': 'Dimensions',
    'manage.fieldArtist': 'Artiste',
    'manage.fieldAvailable': 'Disponible à la Vente',
    'manage.fieldFeatured': 'En Vedette sur la Page d\'Accueil',
    'manage.save': 'Enregistrer l\'Œuvre',
    'manage.cancel': 'Annuler',
    'manage.saving': 'Enregistrement...',
    'manage.delete': 'Supprimer',
    'manage.edit': 'Modifier',
    'manage.catPainting': 'Peinture',
    'manage.catSculpture': 'Sculpture',

    'about.title': 'À Propos de Nous',
    'about.subtitle': 'Une passion pour l\'art, un engagement envers l\'excellence.',
    'about.storyTitle': 'Notre Histoire',
    'about.storyP1': 'PickeyArt a été fondé avec une vision singulière : rendre l\'art extraordinaire accessible aux collectionneurs et aux passionnés du monde entier. Ce qui a commencé comme une petite galerie est devenu une destination de confiance pour les peintures et sculptures fines, chaque pièce étant soigneusement sélectionnée pour sa qualité, son authenticité et sa résonance émotionnelle.',
    'about.storyP2': 'Nous croyons que l\'art est plus qu\'une décoration — c\'est une conversation, une connexion et un héritage. Notre équipe travaille en étroite collaboration avec les artistes et les collectionneurs pour s\'assurer que chaque acquisition est significative et que chaque œuvre trouve le foyer qu\'elle mérite.',
    'about.missionTitle': 'Notre Mission',
    'about.missionDesc': 'Connecter les personnes à l\'art qui les touche, en soutenant les artistes et en enrichissant les espaces de beauté et de sens.',
    'about.visionTitle': 'Notre Vision',
    'about.visionDesc': 'Être la destination la plus fiable et inspirante pour l\'art, où chaque collectionneur se sent guidé et chaque artiste se sent valorisé.',
    'about.valuesTitle': 'Nos Valeurs',
    'about.value1Title': 'Authenticité',
    'about.value1Desc': 'Chaque pièce que nous offrons est authentique, vérifiée et accompagnée d\'une provenance complète.',
    'about.value2Title': 'Excellence',
    'about.value2Desc': 'Nous nous tenons aux normes les plus élevées en matière de curation, de service et d\'artisanat.',
    'about.value3Title': 'Communauté',
    'about.value3Desc': 'Nous nourrissons des relations entre artistes, collectionneurs et amateurs d\'art qui durent toute une vie.',

    'contact.title': 'Contactez-Nous',
    'contact.subtitle': 'Nous serions ravis de vous entendre. Contactez-nous pour toute question sur notre collection ou nos services.',
    'contact.formTitle': 'Envoyez-Nous un Message',
    'contact.name': 'Votre Nom',
    'contact.email': 'Votre Email',
    'contact.subject': 'Sujet',
    'contact.message': 'Votre Message',
    'contact.send': 'Envoyer le Message',
    'contact.sending': 'Envoi...',
    'contact.success': 'Merci ! Votre message a été envoyé avec succès.',
    'contact.infoTitle': 'Entrer en Contact',
    'contact.addressLabel': 'Adresse',
    'contact.address': '123 Rue des Artisans, Quartier des Galeries, Paris, France',
    'contact.phoneLabel': 'Téléphone',
    'contact.phone': '+33 1 23 45 67 89',
    'contact.emailLabel': 'Email',
    'contact.emailValue': 'hello@pickeyart.com',
    'contact.hoursLabel': 'Heures d\'Ouverture',
    'contact.hours': 'Lun – Sam : 10h – 19h\nDim : 12h – 17h',
    'contact.followTitle': 'Suivez-Nous',

    'footer.tagline': 'Curating la beauté, un chef-d\'œuvre à la fois.',
    'footer.quickLinks': 'Liens Rapides',
    'footer.contact': 'Contact',
    'footer.follow': 'Suivez-Nous',
    'footer.rights': 'Tous droits réservés.',
    'footer.madeWith': 'Conçu avec passion pour les arts.',

    'common.loading': 'Chargement...',
    'common.error': 'Une erreur s\'est produite. Veuillez réessayer.',
    'common.currency.USD': '$',
    'common.currency.EUR': '€',
  },
};

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('pickeyart-lang');
    return (saved === 'en' || saved === 'fr') ? saved : 'en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('pickeyart-lang', newLang);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string): string => {
    return translations[lang][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
