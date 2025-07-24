import { WheelTemplate } from './templates';

// SEO metadata interface
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  schemaType: string;
  openGraph: {
    title: string;
    description: string;
    image: string;
    type: string;
  };
  urlQuality?: {
    score: number;
    optimized: boolean;
    suggestions: string[];
  };
}

// Enhanced template interface with SEO
export interface SEOEnhancedTemplate extends WheelTemplate {
  seo: SEOMetadata;
  version: string;
  lastModified: string;
  author: string;
}

// Category configuration with SEO optimization
export const CATEGORY_CONFIG = {
  food: {
    name: "Comida e Restaurantes",
    icon: "🍽️",
    prefix: "Melhor",
    suffix: "Hoje",
    keywords: ["comida", "restaurante", "gastronomia", "culinária", "almoço", "jantar", "delivery"],
    schemaType: "FoodEstablishment"
  },
  games: {
    name: "Jogos e Entretenimento",
    icon: "🎮",
    prefix: "Jogos de",
    suffix: "Divertidos",
    keywords: ["jogos", "entretenimento", "diversão", "festa", "recreação", "lazer"],
    schemaType: "Game"
  },
  education: {
    name: "Educação e Aprendizado",
    icon: "📚",
    prefix: "Aprender",
    suffix: "Agora",
    keywords: ["educação", "estudo", "aprendizado", "escola", "universidade", "conhecimento"],
    schemaType: "EducationalOrganization"
  },
  movies: {
    name: "Filmes e Séries",
    icon: "🎬",
    prefix: "Filmes para",
    suffix: "Assistir",
    keywords: ["filmes", "séries", "cinema", "streaming", "entretenimento", "netflix", "prime"],
    schemaType: "Movie"
  },
  music: {
    name: "Música e Playlists",
    icon: "🎵",
    prefix: "Músicas para",
    suffix: "Ouvir",
    keywords: ["música", "playlist", "cantores", "álbuns", "shows", "concertos"],
    schemaType: "MusicPlaylist"
  },
  decisions: {
    name: "Decisões e Escolhas",
    icon: "🤔",
    prefix: "Decidir",
    suffix: "Agora",
    keywords: ["decisão", "escolha", "opção", "votação", "sorteio", "probabilidade"],
    schemaType: "DecisionSupport"
  },
  raffles: {
    name: "Sorteios e Prêmios",
    icon: "🎁",
    prefix: "Sorteio de",
    suffix: "Premiação",
    keywords: ["sorteio", "rifa", "premiação", "ganhar", "sortudo", "chance"],
    schemaType: "Raffle"
  },
  fortune: {
    name: "Sorte e Adivinhação",
    icon: "🔮",
    prefix: "Sorte e",
    suffix: "Adivinhação",
    keywords: ["sorte", "futuro", "previsão", "horóscopo", "místico", "espiritual"],
    schemaType: "CreativeWork"
  },
  sports: {
    name: "Esportes e Fitness",
    icon: "⚽",
    prefix: "Esportes para",
    suffix: "Praticar",
    keywords: ["esportes", "futebol", "basquete", "vôlei", "academia", "exercício", "fitness"],
    schemaType: "SportsOrganization"
  },
  travel: {
    name: "Viagens e Turismo",
    icon: "✈️",
    prefix: "Destinos para",
    suffix: "Viajar",
    keywords: ["viagem", "turismo", "destinos", "férias", "aventura", "passeio"],
    schemaType: "Place"
  },
  work: {
    name: "Trabalho e Carreira",
    icon: "💼",
    prefix: "Trabalho e",
    suffix: "Produtividade",
    keywords: ["trabalho", "emprego", "carreira", "negócios", "empresa", "produtividade"],
    schemaType: "Organization"
  },
  random: {
    name: "Aleatório e Surpresas",
    icon: "🎲",
    prefix: "Aleatório",
    suffix: "Surpresa",
    keywords: ["aleatório", "sorteio", "imprevisível", "surpresa", "chance", "probabilidade"],
    schemaType: "CreativeWork"
  }
} as const;

// Base items for each category
const CATEGORY_ITEMS = {
  food: [
    "Restaurante Italiano", "Restaurante Japonês", "Restaurante Mexicano", "Restaurante Chinês",
    "Churrascaria", "Pizzaria", "Hamburgueria", "Sushi", "Comida Árabe", "Comida Indiana",
    "Comida Tailandesa", "Comida Coreana", "Comida Vegetariana", "Comida Vegana", "Comida Saudável"
  ],
  games: [
    "Verdade ou Desafio", "Mímica", "Stop/Adedonha", "Karaokê", "Dança das Cadeiras",
    "Imagem e Ação", "Telefone sem Fio", "Jogo da Memória", "Jogo da Velha", "Detetive",
    "Uno", "Dominó", "Baralho", "Jogo de Tabuleiro", "Jogo de Cartas"
  ],
  education: [
    "Matemática", "Português", "História", "Geografia", "Ciências", "Física", "Química",
    "Biologia", "Inglês", "Espanhol", "Artes", "Educação Física", "Filosofia", "Sociologia", "Literatura"
  ],
  movies: [
    "Ação", "Comédia", "Drama", "Terror", "Romance", "Ficção Científica", "Documentário",
    "Animação", "Suspense", "Policial", "Aventura", "Fantasia", "Musical", "Guerra", "Histórico"
  ],
  music: [
    "Pop", "Rock", "Hip Hop", "Eletrônica", "Sertanejo", "MPB", "Funk", "Jazz", "Clássica",
    "Reggae", "Forró", "Axé", "Pagode", "Samba", "Blues"
  ],
  decisions: [
    "SIM", "NÃO", "Talvez", "Pergunte Depois", "Depende", "Não Sei", "Melhor Não",
    "Vá em Frente", "Espere", "Analise", "Pesquise", "Converse", "Pense", "Decida", "Aja"
  ],
  raffles: [
    "Carro 0km", "Viagem Internacional", "iPhone", "Notebook", "TV 4K", "PlayStation",
    "Xbox", "Câmera", "Drone", "Relógio", "Bicicleta", "Moto", "Casa", "Apartamento", "Dinheiro"
  ],
  fortune: [
    "É certo", "Definitivamente sim", "Sem dúvida", "Sim", "Provavelmente", "Talvez",
    "Não conte com isso", "Minha resposta é não", "Muito duvidoso", "Pergunte novamente",
    "Espere e veja", "Boa sorte", "Azar", "Neutro", "Equilíbrio"
  ],
  sports: [
    "Futebol", "Basquete", "Vôlei", "Tênis", "Natação", "Corrida", "Ciclismo", "Academia",
    "CrossFit", "Boxe", "Jiu-Jitsu", "Judô", "Natação", "Ginástica", "Esgrima"
  ],
  travel: [
    "Praia", "Montanha", "Cachoeira", "Cidade Histórica", "Parque Nacional", "Deserto",
    "Floresta", "Caverna", "Ilha", "Lago", "Rio", "Cachoeira", "Cachoeira", "Cachoeira", "Cachoeira"
  ],
  work: [
    "Home Office", "Presencial", "Híbrido", "Freelancer", "Empreendedor", "Autônomo",
    "CLT", "PJ", "Estágio", "Trainee", "Gerente", "Diretor", "CEO", "CFO", "CTO"
  ],
  random: [
    "Surpresa 1", "Surpresa 2", "Surpresa 3", "Surpresa 4", "Surpresa 5", "Surpresa 6",
    "Surpresa 7", "Surpresa 8", "Surpresa 9", "Surpresa 10", "Surpresa 11", "Surpresa 12",
    "Surpresa 13", "Surpresa 14", "Surpresa 15"
  ]
};

// Color palette
const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#F39C12', '#E74C3C', '#1ABC9C', '#6C5CE7',
  '#FD79A8', '#00B894', '#7F8C8D', '#3498DB', '#2ECC71'
];

/**
 * Gera um template SEO otimizado para uma categoria específica
 */
export const generateSEOTemplate = (
  categoryId: keyof typeof CATEGORY_CONFIG,
  index: number,
  baseId: string = ''
): SEOEnhancedTemplate => {
  const config = CATEGORY_CONFIG[categoryId];
  const items = CATEGORY_ITEMS[categoryId];
  
  // Gerar título SEO otimizado
  const prefix = config.prefix;
  const suffix = config.suffix;
  const position = index + 1;
  const page = Math.floor(index / 100) + 1; // 100 templates por página
  
  const title = `${prefix} ${items[index % items.length]} ${suffix} - Modelo ${position} | Página ${page}`;
  const description = `Descubra o melhor template para ${items[index % items.length]} com nosso gerador de rodas interativo. Ideal para ${config.keywords[0]} e muito mais.`;
  
  // Gerar URL canônica
  const slug = `${categoryId}-${items[index % items.length].toLowerCase().replace(/\s+/g, '-')}-${position}`;
  const canonicalUrl = `https://wheelgenerator.com/templates/${slug}`;
  
  // Distribuição de peso para itens (primeiros itens têm mais peso)
  const weightDistribution = (pos: number, total: number) => {
    return 1 + (total - pos) / total; // Itens iniciais têm peso ligeiramente maior
  };

  return {
    id: `${baseId}${categoryId}-template-${index}`,
    title,
    description,
    category: categoryId,
    items: items.slice(0, 8).map((label, i) => ({
      id: `item-${i}`,
      label: label,
      color: COLORS[i % COLORS.length],
      weight: weightDistribution(i, 8)
    })),
    tags: [...config.keywords, items[index % items.length].toLowerCase()],
    usageCount: Math.floor(Math.random() * 10000),
    isPopular: index < 100, // Primeiros 100 templates são populares
    createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30).toISOString().split('T')[0], // Até 30 dias atrás
    seo: {
      title,
      description,
      keywords: [...config.keywords, items[index % items.length].toLowerCase(), "roda", "sorteio", "decisão"],
      canonicalUrl,
      schemaType: config.schemaType,
      openGraph: {
        title,
        description,
        image: `https://wheelgenerator.com/og/${slug}.jpg`,
        type: categoryId === 'movies' ? 'video.movie' : 'website'
      }
    },
    version: '1.0',
    lastModified: new Date().toISOString().split('T')[0],
    author: 'Wheel Generator Team'
  };
};

/**
 * Gera múltiplos templates para uma categoria com paginação
 */
export const generateCategoryTemplates = (
  categoryId: keyof typeof CATEGORY_CONFIG,
  count: number = 1000,
  startFrom: number = 0
): SEOEnhancedTemplate[] => {
  return Array.from({ length: count }, (_, i) => 
    generateSEOTemplate(categoryId, startFrom + i, 'cat-')
  );
};

/**
 * Gera 10.000 templates distribuídos por categorias
 * Distribuição: 1500 por categoria principal, 500 para categorias menores
 */
export const generateMassiveTemplateCollection = (): SEOEnhancedTemplate[] => {
  const categories: Array<keyof typeof CATEGORY_CONFIG> = [
    'food', 'games', 'education', 'movies', 'music', 'decisions', 'raffles', 
    'fortune', 'sports', 'travel', 'work', 'random'
  ];
  
  // Distribuição: categorias principais (1500) e secundárias (500)
  const mainCategories = ['food', 'games', 'education', 'movies', 'music', 'decisions'];
  const totalCount = 10000;
  const templates: SEOEnhancedTemplate[] = [];
  
  categories.forEach(category => {
    const isMain = mainCategories.includes(category);
    const count = isMain ? 1500 : 500;
    const categoryTemplates = generateCategoryTemplates(category, count);
    templates.push(...categoryTemplates);
  });
  
  // Ajustar contagem final para exatamente 10.000
  return templates.slice(0, totalCount);
};

// Exportar templates gerados
export const MASSIVE_TEMPLATE_COLLECTION = generateMassiveTemplateCollection();

// Funções utilitárias para busca e filtragem SEO
export const searchTemplatesSEO = (templates: SEOEnhancedTemplate[], query: string): SEOEnhancedTemplate[] => {
  const lowercaseQuery = query.toLowerCase();
  return templates.filter(template => 
    template.seo.title.toLowerCase().includes(lowercaseQuery) ||
    template.seo.description.toLowerCase().includes(lowercaseQuery) ||
    template.seo.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery)) ||
    template.title.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getTemplatesByCategorySEO = (
  templates: SEOEnhancedTemplate[], 
  categoryId: string
): SEOEnhancedTemplate[] => {
  return templates.filter(template => template.category === categoryId);
};

export const getPopularTemplatesSEO = (
  templates: SEOEnhancedTemplate[]
): SEOEnhancedTemplate[] => {
  return templates
    .filter(template => template.isPopular)
    .sort((a, b) => b.usageCount - a.usageCount);
};