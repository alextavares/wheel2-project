// Enhanced Data Sources - Baseado nas melhores sugestões das IAs
// Combinando estratégias do Claude, Qwen, Gemini e GPT-4

export interface DataSource {
  category: string;
  subcategories: string[];
  modifiers: string[];
  contexts: string[];
  items: string[];
}

// 🎯 Estratégia Qwen: Long-tail keywords reais
export const LONG_TAIL_PATTERNS = {
  food: [
    "o que comer hoje",
    "onde almoçar perto de mim", 
    "comida para delivery",
    "receita para jantar",
    "lanche da tarde",
    "café da manhã saudável",
    "jantar romântico",
    "comida para festa"
  ],
  movies: [
    "filme para assistir hoje",
    "série para maratonar",
    "filme de terror para noite",
    "comédia para família",
    "documentário interessante",
    "filme clássico",
    "série nova netflix"
  ],
  games: [
    "jogo para jogar com amigos",
    "atividade para festa",
    "brincadeira para crianças",
    "jogo de tabuleiro família",
    "videogame para relaxar",
    "jogo online multiplayer"
  ],
  travel: [
    "onde viajar fim de semana",
    "destino para férias",
    "viagem barata brasil",
    "lugar para relaxar",
    "turismo perto de mim",
    "roteiro de viagem",
    "destino romântico",
    "aventura para família"
  ]
};

// 🎯 Estratégia Claude: APIs e fontes externas
export const EXTERNAL_DATA_SOURCES = {
  food: {
    apis: ["Spoonacular", "Edamam", "TheMealDB"],
    datasets: ["Top 1000 restaurantes", "Receitas populares", "Cuisines mundiais"],
    realtime: ["Google Places", "Yelp", "Zomato"]
  },
  movies: {
    apis: ["TMDb", "OMDb", "JustWatch"],
    datasets: ["IMDb Top 250", "Netflix catalog", "Prime Video"],
    realtime: ["Rotten Tomatoes", "Metacritic"]
  },
  music: {
    apis: ["Spotify", "Last.fm", "Deezer"],
    datasets: ["Billboard Hot 100", "Gêneros musicais", "Artistas populares"],
    realtime: ["Apple Music", "YouTube Music"]
  }
};

// 🎯 Estratégia Gemini: Combinação inteligente
export const ENHANCED_CATEGORY_ITEMS = {
  food: {
    cuisines: ["Italiana", "Japonesa", "Mexicana", "Chinesa", "Árabe", "Indiana", "Tailandesa", "Coreana", "Francesa", "Brasileira"],
    types: ["Restaurante", "Delivery", "Fast Food", "Gourmet", "Vegetariano", "Vegano", "Saudável", "Caseiro"],
    occasions: ["Almoço", "Jantar", "Lanche", "Café", "Festa", "Romântico", "Família", "Trabalho"],
    locations: ["Shopping", "Centro", "Bairro", "Casa", "Escritório", "Praia", "Parque"]
  },
  
  movies: {
    genres: ["Ação", "Comédia", "Drama", "Terror", "Romance", "Ficção", "Documentário", "Animação", "Suspense", "Musical"],
    decades: ["Anos 80", "Anos 90", "Anos 2000", "Anos 2010", "Lançamentos", "Clássicos"],
    platforms: ["Netflix", "Prime Video", "Disney+", "HBO Max", "Globoplay", "Cinema"],
    moods: ["Relaxar", "Aventura", "Reflexão", "Diversão", "Nostalgia", "Adrenalina"]
  },

  games: {
    types: ["Tabuleiro", "Cartas", "Videogame", "Festa", "Educativo", "Estratégia", "Ação", "Puzzle"],
    players: ["Solo", "Dupla", "Grupo", "Família", "Amigos", "Crianças", "Adultos"],
    duration: ["Rápido", "Médio", "Longo", "Maratona"],
    platforms: ["PC", "Console", "Mobile", "Físico", "Online", "Offline"]
  },

  travel: {
    types: ["Praia", "Montanha", "Cidade", "Campo", "Aventura", "Relaxamento", "Cultural", "Gastronômico"],
    duration: ["Fim de semana", "Feriado", "Férias", "Bate-volta", "Semana", "Mês"],
    budget: ["Econômico", "Médio", "Luxo", "Gratuito", "Promocional"],
    distance: ["Perto", "Estado", "País", "Internacional", "Continente"]
  }
};

// 🎯 Estratégia GPT-4: Geração programática avançada
export const TEMPLATE_GENERATORS = {
  // Gerador de títulos SEO otimizados
  generateSEOTitle: (category: string, item: string, modifier: string, context: string) => {
    const patterns = [
      `${item} ${modifier} para ${context}`,
      `Melhor ${item} ${modifier} - ${context}`,
      `Escolha ${item} ${modifier} ideal para ${context}`,
      `Roleta de ${item} ${modifier} - ${context}`,
      `Sorteio: ${item} ${modifier} para ${context}`
    ];
    return patterns[Math.floor(Math.random() * patterns.length)];
  },

  // Gerador de descrições únicas
  generateDescription: (category: string, title: string) => {
    const templates = [
      `Use esta roleta interativa para decidir ${title.toLowerCase()}. Gire e deixe a sorte escolher!`,
      `Não consegue decidir? Nossa roleta de ${category} vai te ajudar a escolher ${title.toLowerCase()}.`,
      `Ferramenta gratuita para sortear ${title.toLowerCase()}. Simples, rápido e divertido!`,
      `Roleta personalizada para ${title.toLowerCase()}. Ideal para decisões rápidas e justas.`
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  },

  // Gerador de keywords long-tail
  generateKeywords: (category: string, item: string, context: string) => {
    return [
      `roleta ${item.toLowerCase()}`,
      `escolher ${item.toLowerCase()}`,
      `sorteio ${item.toLowerCase()}`,
      `decisão ${item.toLowerCase()}`,
      `${item.toLowerCase()} ${context.toLowerCase()}`,
      `roleta para ${context.toLowerCase()}`,
      `sortear ${category.toLowerCase()}`,
      `roda da sorte ${item.toLowerCase()}`
    ];
  }
};

// 🎯 Multiplicador de variações (baseado em todas as IAs)
export const VARIATION_MULTIPLIERS = {
  // 12 categorias × 10 subcategorias × 8 modificadores × 6 contextos = 5.760 combinações base
  // Com variações de título (5 padrões) = 28.800 possibilidades
  // Limitando a 10.000 para otimização

  calculateCombinations: () => {
    const categories = Object.keys(ENHANCED_CATEGORY_ITEMS).length; // 4 mostradas
    const avgSubcategories = 10;
    const avgModifiers = 8; 
    const avgContexts = 6;
    const titlePatterns = 5;
    
    return categories * avgSubcategories * avgModifiers * avgContexts * titlePatterns;
  }
};

// 🎯 Dados reais para popular (estratégia híbrida)
export const REAL_WORLD_DATA = {
  food: {
    trending: ["Açaí", "Poke", "Hambúrguer Artesanal", "Comida Coreana", "Vegano", "Sem Glúten"],
    popular: ["Pizza", "Sushi", "Hambúrguer", "Pasta", "Tacos", "Salada", "Churrasco"],
    healthy: ["Salada", "Grelhados", "Smoothie", "Wrap", "Quinoa", "Chia", "Açaí"]
  },
  
  movies_netflix: ["Stranger Things", "The Crown", "Money Heist", "Bridgerton", "Squid Game"],
  games_trending: ["Among Us", "Fall Guys", "Valorant", "Minecraft", "Fortnite", "FIFA"],
  travel_brazil: ["Rio de Janeiro", "São Paulo", "Salvador", "Florianópolis", "Gramado", "Bonito"]
};

export default {
  LONG_TAIL_PATTERNS,
  EXTERNAL_DATA_SOURCES,
  ENHANCED_CATEGORY_ITEMS,
  TEMPLATE_GENERATORS,
  VARIATION_MULTIPLIERS,
  REAL_WORLD_DATA
};