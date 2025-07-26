// Gerador de templates SEO otimizados para múltiplos idiomas
import { WheelTemplate } from '@/types/wheel';
import { Locale, useTranslations, t } from '@/lib/i18n';

export interface SEOTemplateConfig {
  category: 'food' | 'music' | 'movies' | 'education' | 'games' | 'decisions';
  primaryKeyword: string;
  secondaryKeywords: string[];
  modifiers: string[];
  items: string[];
  usageCount?: number;
}

// Templates base por categoria
export const SEO_TEMPLATES: Record<string, SEOTemplateConfig> = {
  // 🍕 COMIDA
  'what-to-eat-today': {
    category: 'food',
    primaryKeyword: 'whatToEatToday',
    secondaryKeywords: ['chooseRestaurant', 'pickFood', 'lunchDecision'],
    modifiers: ['online', 'free', 'today', 'quick'],
    items: ['pizza', 'burger', 'sushi', 'tacos', 'salad', 'koreanFood'],
    usageCount: 1250,
  },
  
  'choose-restaurant': {
    category: 'food',
    primaryKeyword: 'chooseRestaurant',
    secondaryKeywords: ['whatToEatToday', 'dinnerChoice'],
    modifiers: ['nearMe', 'today', 'quick', 'easy'],
    items: ['Italian Restaurant', 'Japanese Restaurant', 'Mexican Restaurant', 'Chinese Restaurant', 'Fast Food', 'Fine Dining'],
    usageCount: 980,
  },
  
  'lunch-decision': {
    category: 'food',
    primaryKeyword: 'lunchDecision',
    secondaryKeywords: ['whatToEatToday', 'pickFood'],
    modifiers: ['quick', 'healthy', 'today', 'easy'],
    items: ['Salad', 'Sandwich', 'Soup', 'Pasta', 'Rice Bowl', 'Healthy Option'],
    usageCount: 750,
  },
  
  // 🎵 MÚSICA
  'choose-music': {
    category: 'music',
    primaryKeyword: 'chooseMusic',
    secondaryKeywords: ['pickPlaylist', 'musicDecision'],
    modifiers: ['today', 'now', 'random', 'free'],
    items: ['Rock', 'Pop', 'Jazz', 'Classical', 'Electronic', 'Hip Hop'],
    usageCount: 890,
  },
  
  'spotify-playlist': {
    category: 'music',
    primaryKeyword: 'pickPlaylist',
    secondaryKeywords: ['chooseMusic', 'musicDecision'],
    modifiers: ['spotify', 'today', 'random', 'free'],
    items: ['Workout Playlist', 'Chill Playlist', 'Party Playlist', 'Study Playlist', 'Sleep Playlist', 'Road Trip Playlist'],
    usageCount: 1100,
  },
  
  // 🎬 FILMES
  'netflix-movie': {
    category: 'movies',
    primaryKeyword: 'netflixDecision',
    secondaryKeywords: ['chooseMovie', 'pickFilm'],
    modifiers: ['netflix', 'today', 'random', 'free'],
    items: ['Action Movie', 'Comedy', 'Drama', 'Horror', 'Romance', 'Documentary'],
    usageCount: 1350,
  },
  
  'weekend-movie': {
    category: 'movies',
    primaryKeyword: 'chooseMovie',
    secondaryKeywords: ['pickFilm', 'netflixDecision'],
    modifiers: ['weekend', 'today', 'random', 'easy'],
    items: ['Blockbuster', 'Indie Film', 'Classic Movie', 'New Release', 'Foreign Film', 'Family Movie'],
    usageCount: 920,
  },
  
  // 🎓 EDUCAÇÃO
  'study-topic': {
    category: 'education',
    primaryKeyword: 'studyTopic',
    secondaryKeywords: ['chooseSubject', 'learningDecision'],
    modifiers: ['today', 'quick', 'easy', 'free'],
    items: ['Mathematics', 'Science', 'History', 'Literature', 'Languages', 'Programming'],
    usageCount: 680,
  },
  
  'classroom-activity': {
    category: 'education',
    primaryKeyword: 'classroomWheel',
    secondaryKeywords: ['studyTopic', 'chooseSubject'],
    modifiers: ['classroom', 'students', 'easy', 'free'],
    items: ['Group Activity', 'Individual Task', 'Presentation', 'Quiz', 'Discussion', 'Project'],
    usageCount: 450,
  },
  
  // 🎮 JOGOS E DECISÕES
  'random-decision': {
    category: 'decisions',
    primaryKeyword: 'decisionWheel',
    secondaryKeywords: ['randomPicker', 'choose'],
    modifiers: ['random', 'quick', 'easy', 'free'],
    items: ['Yes', 'No', 'Maybe', 'Try Again', 'Definitely', 'Not Now'],
    usageCount: 1500,
  },
  
  'names-picker': {
    category: 'games',
    primaryKeyword: 'namesPicker',
    secondaryKeywords: ['randomPicker', 'raffle'],
    modifiers: ['random', 'fair', 'easy', 'free'],
    items: ['Person 1', 'Person 2', 'Person 3', 'Person 4', 'Person 5', 'Person 6'],
    usageCount: 800,
  },
};

// Função para gerar template SEO otimizado
export function generateSEOTemplate(
  templateKey: string,
  locale: Locale,
  customItems?: string[]
): WheelTemplate {
  const config = SEO_TEMPLATES[templateKey];
  if (!config) {
    throw new Error(`Template ${templateKey} not found`);
  }
  
  const translations = useTranslations(locale);
  
  // Gerar título otimizado
  const primaryKeyword = t(locale, config.primaryKeyword as any);
  const wheelKeyword = t(locale, 'wheelOfFortune');
  const freeKeyword = t(locale, 'free');
  const onlineKeyword = t(locale, 'online');
  
  const title = `${wheelKeyword} ${primaryKeyword} | ${freeKeyword} ${onlineKeyword}`;
  
  // Gerar descrição SEO
  const description = `🎯 ${wheelKeyword} para ${primaryKeyword}! ${t(locale, 'easy')}, ${t(locale, 'quick')} e ${freeKeyword}. ${t(locale, 'instant')} e ${onlineKeyword}.`;
  
  // Gerar slug otimizado
  const slug = generateSEOSlug(templateKey, locale, config);
  
  // Gerar keywords
  const keywords = [
    primaryKeyword,
    wheelKeyword,
    ...config.secondaryKeywords.map(key => t(locale, key as any)),
    ...config.modifiers.map(mod => t(locale, mod as any)),
  ];
  
  // Gerar itens da roleta
  const items = (customItems || config.items).map((item, index) => ({
    id: `item-${index}`,
    label: item,
    color: generateColor(index),
    weight: Math.random() * 2 + 1,
  }));
  
  return {
    id: `${templateKey}-${locale}`,
    title,
    description,
    slug,
    seoTitle: title,
    seoDescription: description,
    keywords,
    category: config.category,
    items,
    tags: keywords,
    usageCount: config.usageCount || 500,
    isPopular: (config.usageCount || 500) > 1000,
    createdAt: new Date().toISOString().split('T')[0],
    version: '2.0',
    lastModified: new Date().toISOString().split('T')[0],
    author: 'SEO Enhanced Generator',
  };
}

// Função para gerar slug SEO otimizado
function generateSEOSlug(templateKey: string, locale: Locale, config: SEOTemplateConfig): string {
  const wheelKeyword = t(locale, 'wheelOfFortune').replace(/\s+/g, '-');
  const primaryKeyword = t(locale, config.primaryKeyword as any).replace(/\s+/g, '-');
  const categoryKeyword = t(locale, config.category as any).replace(/\s+/g, '-');
  const onlineKeyword = t(locale, 'online');
  const freeKeyword = t(locale, 'free');
  
  return `${wheelKeyword}-${categoryKeyword}-${primaryKeyword}-${onlineKeyword}-${freeKeyword}`
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Função para gerar cores
function generateColor(index: number): string {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
    '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
    '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA'
  ];
  return colors[index % colors.length];
}

// Função para gerar todos os templates SEO para um idioma
export function generateAllSEOTemplates(locale: Locale): Record<string, WheelTemplate> {
  const templates: Record<string, WheelTemplate> = {};
  
  Object.keys(SEO_TEMPLATES).forEach(templateKey => {
    templates[templateKey] = generateSEOTemplate(templateKey, locale);
  });
  
  return templates;
}

// Função para gerar templates SEO para todos os idiomas
export function generateInternationalSEOTemplates(): Record<Locale, Record<string, WheelTemplate>> {
  const locales: Locale[] = ['pt', 'en', 'es', 'fr'];
  const internationalTemplates: Record<Locale, Record<string, WheelTemplate>> = {} as any;
  
  locales.forEach(locale => {
    internationalTemplates[locale] = generateAllSEOTemplates(locale);
  });
  
  return internationalTemplates;
}

// Função para obter template por categoria e idioma
export function getTemplatesByCategory(category: string, locale: Locale): WheelTemplate[] {
  const templates = generateAllSEOTemplates(locale);
  return Object.values(templates).filter(template => template.category === category);
}

// Função para obter templates mais populares
export function getPopularTemplates(locale: Locale, limit: number = 10): WheelTemplate[] {
  const templates = generateAllSEOTemplates(locale);
  return Object.values(templates)
    .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
    .slice(0, limit);
}