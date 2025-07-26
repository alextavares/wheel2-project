// Sistema de rotas SEO otimizadas para múltiplos idiomas
import { Locale, t } from '@/lib/i18n';

export interface SEORoute {
  path: string;
  locale: Locale;
  category: string;
  template: string;
  priority: number;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

// Estrutura de rotas SEO por idioma
export const SEO_ROUTE_PATTERNS: Record<Locale, Record<string, string>> = {
  pt: {
    // Rotas principais
    wheelOfFortune: 'roda-da-sorte',
    spinnerWheel: 'roleta',
    randomPicker: 'sorteio',
    decisionWheel: 'decidir',
    
    // Categorias
    food: 'comida',
    music: 'musica',
    movies: 'filmes',
    education: 'educacao',
    games: 'jogos',
    decisions: 'decisoes',
    
    // Templates específicos
    whatToEatToday: 'o-que-comer-hoje',
    chooseRestaurant: 'escolher-restaurante',
    lunchDecision: 'decisao-almoco',
    chooseMusic: 'escolher-musica',
    pickPlaylist: 'sortear-playlist',
    netflixDecision: 'decisao-netflix',
    chooseMovie: 'escolher-filme',
    studyTopic: 'topico-estudo',
    classroomWheel: 'roleta-sala-aula',
    namesPicker: 'sorteador-nomes',
    
    // Modificadores
    online: 'online',
    free: 'gratis',
    today: 'hoje',
    quick: 'rapido',
    easy: 'facil',
    nearMe: 'perto-de-mim',
  },
  
  en: {
    // Main routes
    wheelOfFortune: 'wheel-of-fortune',
    spinnerWheel: 'spinner-wheel',
    randomPicker: 'random-picker',
    decisionWheel: 'decision-wheel',
    
    // Categories
    food: 'food',
    music: 'music',
    movies: 'movies',
    education: 'education',
    games: 'games',
    decisions: 'decisions',
    
    // Specific templates
    whatToEatToday: 'what-to-eat-today',
    chooseRestaurant: 'choose-restaurant',
    lunchDecision: 'lunch-decision',
    chooseMusic: 'choose-music',
    pickPlaylist: 'pick-playlist',
    netflixDecision: 'netflix-decision',
    chooseMovie: 'choose-movie',
    studyTopic: 'study-topic',
    classroomWheel: 'classroom-wheel',
    namesPicker: 'names-picker',
    
    // Modifiers
    online: 'online',
    free: 'free',
    today: 'today',
    quick: 'quick',
    easy: 'easy',
    nearMe: 'near-me',
  },
  
  es: {
    // Rutas principales
    wheelOfFortune: 'rueda-de-la-fortuna',
    spinnerWheel: 'ruleta',
    randomPicker: 'sorteo',
    decisionWheel: 'ruleta-decision',
    
    // Categorías
    food: 'comida',
    music: 'musica',
    movies: 'peliculas',
    education: 'educacion',
    games: 'juegos',
    decisions: 'decisiones',
    
    // Templates específicos
    whatToEatToday: 'que-comer-hoy',
    chooseRestaurant: 'elegir-restaurante',
    lunchDecision: 'decision-almuerzo',
    chooseMusic: 'elegir-musica',
    pickPlaylist: 'sortear-playlist',
    netflixDecision: 'decision-netflix',
    chooseMovie: 'elegir-pelicula',
    studyTopic: 'tema-estudio',
    classroomWheel: 'ruleta-aula',
    namesPicker: 'sorteador-nombres',
    
    // Modificadores
    online: 'online',
    free: 'gratis',
    today: 'hoy',
    quick: 'rapido',
    easy: 'facil',
    nearMe: 'cerca-de-mi',
  },
  
  fr: {
    // Routes principales
    wheelOfFortune: 'roue-de-la-fortune',
    spinnerWheel: 'roulette',
    randomPicker: 'tirage-au-sort',
    decisionWheel: 'roue-decision',
    
    // Catégories
    food: 'nourriture',
    music: 'musique',
    movies: 'films',
    education: 'education',
    games: 'jeux',
    decisions: 'decisions',
    
    // Templates spécifiques
    whatToEatToday: 'quoi-manger-aujourd-hui',
    chooseRestaurant: 'choisir-restaurant',
    lunchDecision: 'decision-dejeuner',
    chooseMusic: 'choisir-musique',
    pickPlaylist: 'tirer-playlist',
    netflixDecision: 'decision-netflix',
    chooseMovie: 'choisir-film',
    studyTopic: 'sujet-etude',
    classroomWheel: 'roue-classe',
    namesPicker: 'tireur-noms',
    
    // Modificateurs
    online: 'en-ligne',
    free: 'gratuit',
    today: 'aujourd-hui',
    quick: 'rapide',
    easy: 'facile',
    nearMe: 'pres-de-moi',
  },
};

// Função para gerar rota SEO otimizada
export function generateSEORoute(
  locale: Locale,
  category: string,
  template: string,
  modifiers: string[] = []
): string {
  const patterns = SEO_ROUTE_PATTERNS[locale];
  
  const wheelType = patterns.wheelOfFortune; // Usar sempre "roda da sorte" como base
  const categoryPath = patterns[category] || category;
  const templatePath = patterns[template] || template;
  const modifierPaths = modifiers.map(mod => patterns[mod] || mod).join('-');
  
  let path = `/${locale}/${wheelType}/${categoryPath}/${templatePath}`;
  
  if (modifierPaths) {
    path += `-${modifierPaths}`;
  }
  
  return path.toLowerCase().replace(/[^a-z0-9\/-]/g, '').replace(/-+/g, '-');
}

// Função para gerar todas as rotas SEO
export function generateAllSEORoutes(): SEORoute[] {
  const routes: SEORoute[] = [];
  const locales: Locale[] = ['pt', 'en', 'es', 'fr'];
  
  // Templates principais por categoria
  const templates = {
    food: ['whatToEatToday', 'chooseRestaurant', 'lunchDecision'],
    music: ['chooseMusic', 'pickPlaylist'],
    movies: ['netflixDecision', 'chooseMovie'],
    education: ['studyTopic', 'classroomWheel'],
    games: ['namesPicker'],
    decisions: ['decisionWheel'],
  };
  
  // Modificadores comuns
  const commonModifiers = [
    ['online', 'free'],
    ['today', 'quick'],
    ['easy', 'free'],
    ['online', 'today'],
  ];
  
  locales.forEach(locale => {
    Object.entries(templates).forEach(([category, categoryTemplates]) => {
      categoryTemplates.forEach(template => {
        // Rota base sem modificadores
        routes.push({
          path: generateSEORoute(locale, category, template),
          locale,
          category,
          template,
          priority: 0.8,
          changeFrequency: 'weekly',
        });
        
        // Rotas com modificadores
        commonModifiers.forEach(modifiers => {
          routes.push({
            path: generateSEORoute(locale, category, template, modifiers),
            locale,
            category,
            template,
            priority: 0.7,
            changeFrequency: 'weekly',
          });
        });
      });
    });
  });
  
  return routes;
}

// Função para gerar rotas de categoria
export function generateCategoryRoutes(): SEORoute[] {
  const routes: SEORoute[] = [];
  const locales: Locale[] = ['pt', 'en', 'es', 'fr'];
  const categories = ['food', 'music', 'movies', 'education', 'games', 'decisions'];
  
  locales.forEach(locale => {
    categories.forEach(category => {
      const patterns = SEO_ROUTE_PATTERNS[locale];
      const wheelType = patterns.wheelOfFortune;
      const categoryPath = patterns[category] || category;
      
      routes.push({
        path: `/${locale}/${wheelType}/${categoryPath}`,
        locale,
        category,
        template: 'category',
        priority: 0.9,
        changeFrequency: 'daily',
      });
    });
  });
  
  return routes;
}

// Função para gerar rotas principais
export function generateMainRoutes(): SEORoute[] {
  const routes: SEORoute[] = [];
  const locales: Locale[] = ['pt', 'en', 'es', 'fr'];
  
  locales.forEach(locale => {
    const patterns = SEO_ROUTE_PATTERNS[locale];
    
    // Rota principal da roda da sorte
    routes.push({
      path: `/${locale}/${patterns.wheelOfFortune}`,
      locale,
      category: 'main',
      template: 'wheelOfFortune',
      priority: 1.0,
      changeFrequency: 'daily',
    });
    
    // Rota da roleta
    routes.push({
      path: `/${locale}/${patterns.spinnerWheel}`,
      locale,
      category: 'main',
      template: 'spinnerWheel',
      priority: 1.0,
      changeFrequency: 'daily',
    });
    
    // Rota do sorteio
    routes.push({
      path: `/${locale}/${patterns.randomPicker}`,
      locale,
      category: 'main',
      template: 'randomPicker',
      priority: 1.0,
      changeFrequency: 'daily',
    });
  });
  
  return routes;
}

// Função para obter todas as rotas SEO
export function getAllSEORoutes(): SEORoute[] {
  return [
    ...generateMainRoutes(),
    ...generateCategoryRoutes(),
    ...generateAllSEORoutes(),
  ];
}

// Função para obter rotas por idioma
export function getRoutesByLocale(locale: Locale): SEORoute[] {
  return getAllSEORoutes().filter(route => route.locale === locale);
}

// Função para obter rotas por categoria
export function getRoutesByCategory(category: string): SEORoute[] {
  return getAllSEORoutes().filter(route => route.category === category);
}

// Função para validar rota SEO
export function validateSEORoute(path: string): boolean {
  const allRoutes = getAllSEORoutes();
  return allRoutes.some(route => route.path === path);
}

// Função para obter informações da rota
export function getRouteInfo(path: string): SEORoute | null {
  const allRoutes = getAllSEORoutes();
  return allRoutes.find(route => route.path === path) || null;
}