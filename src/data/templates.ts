// Sistema de Templates - Base de dados de wheels pré-definidas
export interface WheelTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  items: Array<{
    id: string;
    label: string;
    color: string;
    weight?: number;
  }>;
  tags: string[];
  usageCount: number;
  isPopular: boolean;
  createdAt: string;
}

export const CATEGORIES = {
  FOOD: { id: 'food', name: '🍕 Comida & Restaurantes', icon: '🍕' },
  GAMES: { id: 'games', name: '🎮 Jogos & Entretenimento', icon: '🎮' },
  EDUCATION: { id: 'education', name: '🎓 Educação', icon: '🎓' },
  MOVIES: { id: 'movies', name: '🎬 Filmes & Séries', icon: '🎬' },
  MUSIC: { id: 'music', name: '🎵 Música', icon: '🎵' },
  DECISIONS: { id: 'decisions', name: '🤔 Tomada de Decisões', icon: '🤔' },
  RAFFLES: { id: 'raffles', name: '🏆 Sorteios & Rifas', icon: '🏆' },
  FORTUNE: { id: 'fortune', name: '🔮 Sorte & Diversão', icon: '🔮' },
  SPORTS: { id: 'sports', name: '⚽ Esportes', icon: '⚽' },
  TRAVEL: { id: 'travel', name: '✈️ Viagem', icon: '✈️' },
  WORK: { id: 'work', name: '💼 Trabalho', icon: '💼' },
  RANDOM: { id: 'random', name: '🎲 Aleatório', icon: '🎲' }
} as const;

const colors = {
  red: '#FF6B6B',
  blue: '#4ECDC4', 
  green: '#45B7D1',
  mint: '#96CEB4',
  yellow: '#FFEAA7',
  purple: '#DDA0DD',
  orange: '#F39C12',
  coral: '#E74C3C',
  teal: '#1ABC9C',
  indigo: '#6C5CE7',
  pink: '#FD79A8',
  lime: '#00B894'
};

export const WHEEL_TEMPLATES: WheelTemplate[] = [
  // COMIDA & RESTAURANTES
  {
    id: 'food-restaurants',
    title: 'Onde Comer Hoje?',
    description: 'Escolha um restaurante para o almoço ou jantar',
    category: 'food',
    items: [
      { id: '1', label: 'McDonald\'s', color: colors.red },
      { id: '2', label: 'Pizza Hut', color: colors.orange },
      { id: '3', label: 'Subway', color: colors.green },
      { id: '4', label: 'KFC', color: colors.coral },
      { id: '5', label: 'Burger King', color: colors.blue },
      { id: '6', label: 'Taco Bell', color: colors.yellow },
      { id: '7', label: 'Domino\'s', color: colors.purple },
      { id: '8', label: 'Starbucks', color: colors.mint }
    ],
    tags: ['comida', 'restaurante', 'decisão', 'almoço', 'jantar'],
    usageCount: 15420,
    isPopular: true,
    createdAt: '2024-01-15'
  },
  {
    id: 'food-cuisine',
    title: 'Tipo de Culinária',
    description: 'Que tipo de comida vamos comer hoje?',
    category: 'food',
    items: [
      { id: '1', label: 'Italiana', color: colors.red },
      { id: '2', label: 'Japonesa', color: colors.coral },
      { id: '3', label: 'Mexicana', color: colors.orange },
      { id: '4', label: 'Chinesa', color: colors.yellow },
      { id: '5', label: 'Brasileira', color: colors.green },
      { id: '6', label: 'Indiana', color: colors.purple },
      { id: '7', label: 'Árabe', color: colors.teal },
      { id: '8', label: 'Francesa', color: colors.blue }
    ],
    tags: ['culinária', 'comida', 'internacional', 'decisão'],
    usageCount: 8930,
    isPopular: true,
    createdAt: '2024-01-20'
  },

  // JOGOS & ENTRETENIMENTO
  {
    id: 'games-party',
    title: 'Jogos de Festa',
    description: 'Escolha um jogo divertido para animar a festa',
    category: 'games',
    items: [
      { id: '1', label: 'Verdade ou Desafio', color: colors.red },
      { id: '2', label: 'Mímica', color: colors.blue },
      { id: '3', label: 'Stop/Adedonha', color: colors.green },
      { id: '4', label: 'Karaokê', color: colors.purple },
      { id: '5', label: 'Dança das Cadeiras', color: colors.orange },
      { id: '6', label: 'Imagem e Ação', color: colors.yellow },
      { id: '7', label: 'Telefone sem Fio', color: colors.pink },
      { id: '8', label: 'Jogo da Memória', color: colors.teal }
    ],
    tags: ['festa', 'jogos', 'diversão', 'grupo', 'entretenimento'],
    usageCount: 12350,
    isPopular: true,
    createdAt: '2024-01-10'
  },
  {
    id: 'games-video',
    title: 'Jogos de Videogame',
    description: 'Que jogo vamos jogar hoje?',
    category: 'games',
    items: [
      { id: '1', label: 'FIFA', color: colors.green },
      { id: '2', label: 'Call of Duty', color: colors.red },
      { id: '3', label: 'Minecraft', color: colors.lime },
      { id: '4', label: 'Fortnite', color: colors.blue },
      { id: '5', label: 'Among Us', color: colors.coral },
      { id: '6', label: 'Rocket League', color: colors.orange },
      { id: '7', label: 'Valorant', color: colors.purple },
      { id: '8', label: 'Fall Guys', color: colors.pink }
    ],
    tags: ['videogame', 'jogos', 'online', 'multiplayer'],
    usageCount: 9870,
    isPopular: true,
    createdAt: '2024-01-25'
  },

  // FILMES & SÉRIES
  {
    id: 'movies-netflix',
    title: 'O que Assistir na Netflix',
    description: 'Escolha um filme ou série para assistir',
    category: 'movies',
    items: [
      { id: '1', label: 'Stranger Things', color: colors.red },
      { id: '2', label: 'The Witcher', color: colors.purple },
      { id: '3', label: 'Money Heist', color: colors.coral },
      { id: '4', label: 'Bridgerton', color: colors.pink },
      { id: '5', label: 'Squid Game', color: colors.green },
      { id: '6', label: 'Ozark', color: colors.blue },
      { id: '7', label: 'The Crown', color: colors.yellow },
      { id: '8', label: 'Dark', color: colors.indigo }
    ],
    tags: ['netflix', 'filme', 'série', 'streaming', 'entretenimento'],
    usageCount: 11200,
    isPopular: true,
    createdAt: '2024-01-18'
  },
  {
    id: 'movies-genre',
    title: 'Gênero de Filme',
    description: 'Que tipo de filme assistir hoje?',
    category: 'movies',
    items: [
      { id: '1', label: 'Ação', color: colors.red },
      { id: '2', label: 'Comédia', color: colors.yellow },
      { id: '3', label: 'Drama', color: colors.blue },
      { id: '4', label: 'Terror', color: colors.indigo },
      { id: '5', label: 'Romance', color: colors.pink },
      { id: '6', label: 'Ficção Científica', color: colors.purple },
      { id: '7', label: 'Documentário', color: colors.green },
      { id: '8', label: 'Animação', color: colors.orange }
    ],
    tags: ['filme', 'gênero', 'cinema', 'entretenimento'],
    usageCount: 7650,
    isPopular: false,
    createdAt: '2024-02-01'
  },

  // EDUCAÇÃO
  {
    id: 'education-subjects',
    title: 'Matérias Escolares',
    description: 'Escolha uma matéria para estudar',
    category: 'education',
    items: [
      { id: '1', label: 'Matemática', color: colors.blue },
      { id: '2', label: 'Português', color: colors.green },
      { id: '3', label: 'História', color: colors.orange },
      { id: '4', label: 'Geografia', color: colors.teal },
      { id: '5', label: 'Ciências', color: colors.purple },
      { id: '6', label: 'Inglês', color: colors.red },
      { id: '7', label: 'Educação Física', color: colors.lime },
      { id: '8', label: 'Artes', color: colors.pink }
    ],
    tags: ['educação', 'escola', 'estudo', 'matérias'],
    usageCount: 5430,
    isPopular: false,
    createdAt: '2024-01-30'
  },

  // MÚSICA
  {
    id: 'music-genres',
    title: 'Gêneros Musicais',
    description: 'Que estilo de música ouvir hoje?',
    category: 'music',
    items: [
      { id: '1', label: 'Pop', color: colors.pink },
      { id: '2', label: 'Rock', color: colors.red },
      { id: '3', label: 'Hip Hop', color: colors.indigo },
      { id: '4', label: 'Eletrônica', color: colors.blue },
      { id: '5', label: 'Sertanejo', color: colors.orange },
      { id: '6', label: 'MPB', color: colors.green },
      { id: '7', label: 'Funk', color: colors.purple },
      { id: '8', label: 'Jazz', color: colors.yellow }
    ],
    tags: ['música', 'gênero', 'playlist', 'som'],
    usageCount: 6780,
    isPopular: false,
    createdAt: '2024-02-05'
  },

  // DECISÕES
  {
    id: 'decisions-yesno',
    title: 'Sim ou Não',
    description: 'Para decisões simples de sim ou não',
    category: 'decisions',
    items: [
      { id: '1', label: 'SIM', color: colors.green },
      { id: '2', label: 'NÃO', color: colors.red }
    ],
    tags: ['decisão', 'sim', 'não', 'simples'],
    usageCount: 18900,
    isPopular: true,
    createdAt: '2024-01-05'
  },
  {
    id: 'decisions-weekend',
    title: 'O que Fazer no Fim de Semana',
    description: 'Atividades para o fim de semana',
    category: 'decisions',
    items: [
      { id: '1', label: 'Cinema', color: colors.red },
      { id: '2', label: 'Parque', color: colors.green },
      { id: '3', label: 'Shopping', color: colors.blue },
      { id: '4', label: 'Praia', color: colors.teal },
      { id: '5', label: 'Casa de Amigos', color: colors.orange },
      { id: '6', label: 'Ficar em Casa', color: colors.purple },
      { id: '7', label: 'Restaurante', color: colors.yellow },
      { id: '8', label: 'Exercitar-se', color: colors.lime }
    ],
    tags: ['fim de semana', 'atividade', 'lazer', 'decisão'],
    usageCount: 4320,
    isPopular: false,
    createdAt: '2024-02-10'
  },

  // SORTE & DIVERSÃO
  {
    id: 'fortune-magic8ball',
    title: 'Bola Mágica 8',
    description: 'Respostas místicas para suas perguntas',
    category: 'fortune',
    items: [
      { id: '1', label: 'É certo', color: colors.green },
      { id: '2', label: 'Definitivamente sim', color: colors.lime },
      { id: '3', label: 'Sem dúvida', color: colors.teal },
      { id: '4', label: 'Sim', color: colors.blue },
      { id: '5', label: 'Provavelmente', color: colors.yellow },
      { id: '6', label: 'Talvez', color: colors.orange },
      { id: '7', label: 'Não conte com isso', color: colors.coral },
      { id: '8', label: 'Minha resposta é não', color: colors.red },
      { id: '9', label: 'Muito duvidoso', color: colors.purple },
      { id: '10', label: 'Pergunte novamente', color: colors.pink }
    ],
    tags: ['sorte', 'mágica', 'previsão', 'diversão'],
    usageCount: 13450,
    isPopular: true,
    createdAt: '2024-01-12'
  },

  // ESPORTES
  {
    id: 'sports-activities',
    title: 'Atividades Esportivas',
    description: 'Que esporte praticar hoje?',
    category: 'sports',
    items: [
      { id: '1', label: 'Futebol', color: colors.green },
      { id: '2', label: 'Basquete', color: colors.orange },
      { id: '3', label: 'Vôlei', color: colors.blue },
      { id: '4', label: 'Tênis', color: colors.yellow },
      { id: '5', label: 'Natação', color: colors.teal },
      { id: '6', label: 'Corrida', color: colors.red },
      { id: '7', label: 'Ciclismo', color: colors.lime },
      { id: '8', label: 'Academia', color: colors.purple }
    ],
    tags: ['esporte', 'atividade física', 'exercício', 'saúde'],
    usageCount: 3210,
    isPopular: false,
    createdAt: '2024-02-15'
  }
];

// Funções utilitárias
export const getTemplatesByCategory = (categoryId: string): WheelTemplate[] => {
  return WHEEL_TEMPLATES.filter(template => template.category === categoryId);
};

export const getPopularTemplates = (): WheelTemplate[] => {
  return WHEEL_TEMPLATES.filter(template => template.isPopular)
    .sort((a, b) => b.usageCount - a.usageCount);
};

export const searchTemplates = (query: string): WheelTemplate[] => {
  const lowercaseQuery = query.toLowerCase();
  return WHEEL_TEMPLATES.filter(template => 
    template.title.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getTemplateById = (id: string): WheelTemplate | undefined => {
  return WHEEL_TEMPLATES.find(template => template.id === id);
};