// Sistema de internacionalização
export type Locale = 'pt' | 'en' | 'es' | 'fr';

export interface Translations {
  // Navegação
  home: string;
  about: string;
  contact: string;
  
  // Wheel Interface
  spin: string;
  reset: string;
  addItem: string;
  removeItem: string;
  editItem: string;
  result: string;
  winner: string;
  
  // Categories
  food: string;
  games: string;
  entertainment: string;
  education: string;
  business: string;
  travel: string;
  decisions: string;
  
  // Common wheel items
  option: string;
  surprise: string;
  chefChoice: string;
  
  // SEO
  seoTitle: string;
  seoDescription: string;
  
  // Food items
  pizza: string;
  burger: string;
  sushi: string;
  tacos: string;
  salad: string;
  koreanFood: string;
  
  // Actions
  share: string;
  copy: string;
  download: string;
  customize: string;
}

export const translations: Record<Locale, Translations> = {
  pt: {
    // Navegação
    home: 'Início',
    about: 'Sobre',
    contact: 'Contato',
    
    // Wheel Interface
    spin: 'Girar',
    reset: 'Resetar',
    addItem: 'Adicionar Item',
    removeItem: 'Remover Item',
    editItem: 'Editar Item',
    result: 'Resultado',
    winner: 'Vencedor',
    
    // Categories
    food: 'Comida',
    games: 'Jogos',
    entertainment: 'Entretenimento',
    education: 'Educação',
    business: 'Negócios',
    travel: 'Viagem',
    decisions: 'Decisões',
    
    // Common wheel items
    option: 'Opção',
    surprise: 'Surpresa',
    chefChoice: 'Escolha do Chef',
    
    // SEO
    seoTitle: 'Roleta Online Grátis',
    seoDescription: 'Use nossa roleta online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
    
    // Food items
    pizza: 'Pizza',
    burger: 'Hambúrguer',
    sushi: 'Sushi',
    tacos: 'Tacos',
    salad: 'Salada',
    koreanFood: 'Comida Coreana',
    
    // Actions
    share: 'Compartilhar',
    copy: 'Copiar',
    download: 'Baixar',
    customize: 'Personalizar',
  },
  
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    
    // Wheel Interface
    spin: 'Spin',
    reset: 'Reset',
    addItem: 'Add Item',
    removeItem: 'Remove Item',
    editItem: 'Edit Item',
    result: 'Result',
    winner: 'Winner',
    
    // Categories
    food: 'Food',
    games: 'Games',
    entertainment: 'Entertainment',
    education: 'Education',
    business: 'Business',
    travel: 'Travel',
    decisions: 'Decisions',
    
    // Common wheel items
    option: 'Option',
    surprise: 'Surprise',
    chefChoice: "Chef's Choice",
    
    // SEO
    seoTitle: 'Free Online Wheel',
    seoDescription: 'Use our free online wheel. Perfect tool for raffles, decisions and fun.',
    
    // Food items
    pizza: 'Pizza',
    burger: 'Burger',
    sushi: 'Sushi',
    tacos: 'Tacos',
    salad: 'Salad',
    koreanFood: 'Korean Food',
    
    // Actions
    share: 'Share',
    copy: 'Copy',
    download: 'Download',
    customize: 'Customize',
  },
  
  es: {
    // Navegación
    home: 'Inicio',
    about: 'Acerca de',
    contact: 'Contacto',
    
    // Wheel Interface
    spin: 'Girar',
    reset: 'Reiniciar',
    addItem: 'Agregar Elemento',
    removeItem: 'Eliminar Elemento',
    editItem: 'Editar Elemento',
    result: 'Resultado',
    winner: 'Ganador',
    
    // Categories
    food: 'Comida',
    games: 'Juegos',
    entertainment: 'Entretenimiento',
    education: 'Educación',
    business: 'Negocios',
    travel: 'Viaje',
    decisions: 'Decisiones',
    
    // Common wheel items
    option: 'Opción',
    surprise: 'Sorpresa',
    chefChoice: 'Elección del Chef',
    
    // SEO
    seoTitle: 'Ruleta Online Gratis',
    seoDescription: 'Usa nuestra ruleta online gratis. Herramienta perfecta para sorteos, decisiones y diversión.',
    
    // Food items
    pizza: 'Pizza',
    burger: 'Hamburguesa',
    sushi: 'Sushi',
    tacos: 'Tacos',
    salad: 'Ensalada',
    koreanFood: 'Comida Coreana',
    
    // Actions
    share: 'Compartir',
    copy: 'Copiar',
    download: 'Descargar',
    customize: 'Personalizar',
  },
  
  fr: {
    // Navigation
    home: 'Accueil',
    about: 'À propos',
    contact: 'Contact',
    
    // Wheel Interface
    spin: 'Tourner',
    reset: 'Réinitialiser',
    addItem: 'Ajouter un élément',
    removeItem: 'Supprimer un élément',
    editItem: 'Modifier un élément',
    result: 'Résultat',
    winner: 'Gagnant',
    
    // Categories
    food: 'Nourriture',
    games: 'Jeux',
    entertainment: 'Divertissement',
    education: 'Éducation',
    business: 'Affaires',
    travel: 'Voyage',
    decisions: 'Décisions',
    
    // Common wheel items
    option: 'Option',
    surprise: 'Surprise',
    chefChoice: 'Choix du Chef',
    
    // SEO
    seoTitle: 'Roue en Ligne Gratuite',
    seoDescription: 'Utilisez notre roue en ligne gratuite. Outil parfait pour les tirages au sort, les décisions et le plaisir.',
    
    // Food items
    pizza: 'Pizza',
    burger: 'Burger',
    sushi: 'Sushi',
    tacos: 'Tacos',
    salad: 'Salade',
    koreanFood: 'Cuisine Coréenne',
    
    // Actions
    share: 'Partager',
    copy: 'Copier',
    download: 'Télécharger',
    customize: 'Personnaliser',
  },
};

// Hook para usar traduções
export function useTranslations(locale: Locale): Translations {
  return translations[locale] || translations.pt;
}

// Função para obter tradução específica
export function t(locale: Locale, key: keyof Translations): string {
  return translations[locale]?.[key] || translations.pt[key] || key;
}

// Função para gerar slug baseado no idioma
export function generateLocalizedSlug(baseSlug: string, locale: Locale): string {
  const slugTranslations: Record<string, Record<Locale, string>> = {
    'roleta-comida-coreana-escolha-inteligente': {
      pt: 'roleta-comida-coreana-escolha-inteligente',
      en: 'korean-food-smart-choice-wheel',
      es: 'ruleta-comida-coreana-eleccion-inteligente',
      fr: 'roue-cuisine-coreenne-choix-intelligent',
    },
    // Adicione mais traduções de slugs conforme necessário
  };
  
  return slugTranslations[baseSlug]?.[locale] || baseSlug;
}