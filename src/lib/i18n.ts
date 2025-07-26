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
  
  // SEO Keywords - Primary
  wheelOfFortune: string;
  spinnerWheel: string;
  randomPicker: string;
  decisionWheel: string;
  lottery: string;
  raffle: string;
  choose: string;
  decide: string;
  pick: string;
  
  // SEO Keywords - Modifiers
  online: string;
  free: string;
  today: string;
  now: string;
  quick: string;
  easy: string;
  random: string;
  nearMe: string;
  instant: string;
  
  // SEO Templates - Food
  whatToEatToday: string;
  chooseRestaurant: string;
  pickFood: string;
  lunchDecision: string;
  dinnerChoice: string;
  
  // SEO Templates - Music
  chooseMusic: string;
  pickPlaylist: string;
  musicDecision: string;
  
  // SEO Templates - Movies
  chooseMovie: string;
  pickFilm: string;
  netflixDecision: string;
  
  // SEO Templates - Education
  studyTopic: string;
  chooseSubject: string;
  learningDecision: string;
  
  // Long-tail Keywords
  personalizedWheel: string;
  classroomWheel: string;
  namesPicker: string;
  numberGenerator: string;
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
    
    // SEO Keywords - Primary
    wheelOfFortune: 'roda da sorte',
    spinnerWheel: 'roleta',
    randomPicker: 'sorteio',
    decisionWheel: 'roleta de decisão',
    lottery: 'sorteio',
    raffle: 'rifa',
    choose: 'escolher',
    decide: 'decidir',
    pick: 'sortear',
    
    // SEO Keywords - Modifiers
    online: 'online',
    free: 'grátis',
    today: 'hoje',
    now: 'agora',
    quick: 'rápido',
    easy: 'fácil',
    random: 'aleatório',
    nearMe: 'perto de mim',
    instant: 'instantâneo',
    
    // SEO Templates - Food
    whatToEatToday: 'o que comer hoje',
    chooseRestaurant: 'escolher restaurante',
    pickFood: 'sortear comida',
    lunchDecision: 'decisão do almoço',
    dinnerChoice: 'escolha do jantar',
    
    // SEO Templates - Music
    chooseMusic: 'escolher música',
    pickPlaylist: 'sortear playlist',
    musicDecision: 'decisão musical',
    
    // SEO Templates - Movies
    chooseMovie: 'escolher filme',
    pickFilm: 'sortear filme',
    netflixDecision: 'decisão netflix',
    
    // SEO Templates - Education
    studyTopic: 'tópico de estudo',
    chooseSubject: 'escolher matéria',
    learningDecision: 'decisão de aprendizado',
    
    // Long-tail Keywords
    personalizedWheel: 'roleta personalizada',
    classroomWheel: 'roleta para sala de aula',
    namesPicker: 'sorteador de nomes',
    numberGenerator: 'gerador de números',
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
    
    // SEO Keywords - Primary
    wheelOfFortune: 'wheel of fortune',
    spinnerWheel: 'spinner wheel',
    randomPicker: 'random picker',
    decisionWheel: 'decision wheel',
    lottery: 'lottery',
    raffle: 'raffle',
    choose: 'choose',
    decide: 'decide',
    pick: 'pick',
    
    // SEO Keywords - Modifiers
    online: 'online',
    free: 'free',
    today: 'today',
    now: 'now',
    quick: 'quick',
    easy: 'easy',
    random: 'random',
    nearMe: 'near me',
    instant: 'instant',
    
    // SEO Templates - Food
    whatToEatToday: 'what to eat today',
    chooseRestaurant: 'choose restaurant',
    pickFood: 'pick food',
    lunchDecision: 'lunch decision',
    dinnerChoice: 'dinner choice',
    
    // SEO Templates - Music
    chooseMusic: 'choose music',
    pickPlaylist: 'pick playlist',
    musicDecision: 'music decision',
    
    // SEO Templates - Movies
    chooseMovie: 'choose movie',
    pickFilm: 'pick film',
    netflixDecision: 'netflix decision',
    
    // SEO Templates - Education
    studyTopic: 'study topic',
    chooseSubject: 'choose subject',
    learningDecision: 'learning decision',
    
    // Long-tail Keywords
    personalizedWheel: 'personalized wheel',
    classroomWheel: 'classroom wheel',
    namesPicker: 'names picker',
    numberGenerator: 'number generator',
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
    
    // SEO Keywords - Primary
    wheelOfFortune: 'rueda de la fortuna',
    spinnerWheel: 'ruleta',
    randomPicker: 'sorteo',
    decisionWheel: 'ruleta de decisión',
    lottery: 'lotería',
    raffle: 'rifa',
    choose: 'elegir',
    decide: 'decidir',
    pick: 'sortear',
    
    // SEO Keywords - Modifiers
    online: 'online',
    free: 'gratis',
    today: 'hoy',
    now: 'ahora',
    quick: 'rápido',
    easy: 'fácil',
    random: 'aleatorio',
    nearMe: 'cerca de mí',
    instant: 'instantáneo',
    
    // SEO Templates - Food
    whatToEatToday: 'qué comer hoy',
    chooseRestaurant: 'elegir restaurante',
    pickFood: 'sortear comida',
    lunchDecision: 'decisión del almuerzo',
    dinnerChoice: 'elección de la cena',
    
    // SEO Templates - Music
    chooseMusic: 'elegir música',
    pickPlaylist: 'sortear playlist',
    musicDecision: 'decisión musical',
    
    // SEO Templates - Movies
    chooseMovie: 'elegir película',
    pickFilm: 'sortear película',
    netflixDecision: 'decisión netflix',
    
    // SEO Templates - Education
    studyTopic: 'tema de estudio',
    chooseSubject: 'elegir materia',
    learningDecision: 'decisión de aprendizaje',
    
    // Long-tail Keywords
    personalizedWheel: 'ruleta personalizada',
    classroomWheel: 'ruleta para aula',
    namesPicker: 'sorteador de nombres',
    numberGenerator: 'generador de números',
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
    
    // SEO Keywords - Primary
    wheelOfFortune: 'roue de la fortune',
    spinnerWheel: 'roulette',
    randomPicker: 'tirage au sort',
    decisionWheel: 'roue de décision',
    lottery: 'loterie',
    raffle: 'tombola',
    choose: 'choisir',
    decide: 'décider',
    pick: 'tirer au sort',
    
    // SEO Keywords - Modifiers
    online: 'en ligne',
    free: 'gratuit',
    today: "aujourd'hui",
    now: 'maintenant',
    quick: 'rapide',
    easy: 'facile',
    random: 'aléatoire',
    nearMe: 'près de moi',
    instant: 'instantané',
    
    // SEO Templates - Food
    whatToEatToday: "quoi manger aujourd'hui",
    chooseRestaurant: 'choisir restaurant',
    pickFood: 'tirer nourriture',
    lunchDecision: 'décision déjeuner',
    dinnerChoice: 'choix dîner',
    
    // SEO Templates - Music
    chooseMusic: 'choisir musique',
    pickPlaylist: 'tirer playlist',
    musicDecision: 'décision musicale',
    
    // SEO Templates - Movies
    chooseMovie: 'choisir film',
    pickFilm: 'tirer film',
    netflixDecision: 'décision netflix',
    
    // SEO Templates - Education
    studyTopic: "sujet d'étude",
    chooseSubject: 'choisir matière',
    learningDecision: "décision d'apprentissage",
    
    // Long-tail Keywords
    personalizedWheel: 'roue personnalisée',
    classroomWheel: 'roue pour classe',
    namesPicker: 'tireur de noms',
    numberGenerator: 'générateur de nombres',
  },
};

// Hook para usar traduções
export function useTranslations(locale: Locale): Translations {
  return translations[locale] || translations.pt;
}

// Função para obter traduções (versão síncrona)
export function getTranslations(locale: Locale): Translations {
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