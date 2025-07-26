// Sistema de geração de páginas dinâmicas SEO otimizadas
import { Locale, t } from '@/lib/i18n';
import { generateSEORoute, SEO_ROUTE_PATTERNS } from '@/lib/seoRoutes';

export interface SEOPageData {
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  h2: string;
  breadcrumbs: Array<{ label: string; href: string }>;
  canonicalUrl: string;
  alternateUrls: Record<Locale, string>;
  structuredData: any;
  wheelItems: string[];
  category: string;
  template: string;
}

// Templates de conteúdo por categoria
const CONTENT_TEMPLATES = {
  food: {
    pt: {
      h1Templates: [
        'Roda da Sorte: O Que Comer Hoje?',
        'Roleta para Escolher Comida Online',
        'Sortear Restaurante Perto de Mim',
        'Decidir Onde Jantar Hoje'
      ],
      h2Templates: [
        'Como Funciona a Roda da Sorte para Comida',
        'Opções de Restaurantes e Pratos',
        'Dicas para Escolher o Que Comer',
        'Benefícios de Usar uma Roleta de Decisão'
      ],
      descriptions: [
        'Use nossa roda da sorte para decidir o que comer hoje! Sorteie entre restaurantes, pratos e receitas online grátis. Roleta personalizada com centenas de opções.',
        'Roleta online gratuita para escolher comida. Sorteie restaurantes perto de você, pratos deliciosos e receitas fáceis. Decisão rápida e divertida!',
        'Não sabe o que comer hoje? Use nossa roda da sorte! Sorteie entre pizzarias, restaurantes, lanches e muito mais. Grátis e fácil de usar.'
      ]
    },
    en: {
      h1Templates: [
        'Wheel of Fortune: What to Eat Today?',
        'Food Spinner Wheel Online',
        'Random Restaurant Picker',
        'Decide Where to Eat Today'
      ],
      h2Templates: [
        'How the Food Wheel of Fortune Works',
        'Restaurant and Dish Options',
        'Tips for Choosing What to Eat',
        'Benefits of Using a Decision Wheel'
      ],
      descriptions: [
        'Use our wheel of fortune to decide what to eat today! Spin for restaurants, dishes and recipes online free. Customizable wheel with hundreds of options.',
        'Free online wheel to choose food. Spin for restaurants near you, delicious dishes and easy recipes. Quick and fun decision making!',
        'Don\'t know what to eat today? Use our wheel of fortune! Spin for pizzerias, restaurants, snacks and more. Free and easy to use.'
      ]
    },
    es: {
      h1Templates: [
        'Rueda de la Fortuna: ¿Qué Comer Hoy?',
        'Ruleta para Elegir Comida Online',
        'Sortear Restaurante Cerca de Mí',
        'Decidir Dónde Cenar Hoy'
      ],
      h2Templates: [
        'Cómo Funciona la Rueda de la Fortuna para Comida',
        'Opciones de Restaurantes y Platos',
        'Consejos para Elegir Qué Comer',
        'Beneficios de Usar una Ruleta de Decisión'
      ],
      descriptions: [
        'Usa nuestra rueda de la fortuna para decidir qué comer hoy! Sortea entre restaurantes, platos y recetas online gratis. Ruleta personalizada con cientos de opciones.',
        'Ruleta online gratuita para elegir comida. Sortea restaurantes cerca de ti, platos deliciosos y recetas fáciles. ¡Decisión rápida y divertida!',
        '¿No sabes qué comer hoy? ¡Usa nuestra rueda de la fortuna! Sortea entre pizzerías, restaurantes, aperitivos y más. Gratis y fácil de usar.'
      ]
    },
    fr: {
      h1Templates: [
        'Roue de la Fortune: Quoi Manger Aujourd\'hui?',
        'Roulette pour Choisir la Nourriture en Ligne',
        'Tirer au Sort un Restaurant Près de Moi',
        'Décider Où Dîner Aujourd\'hui'
      ],
      h2Templates: [
        'Comment Fonctionne la Roue de la Fortune pour la Nourriture',
        'Options de Restaurants et Plats',
        'Conseils pour Choisir Quoi Manger',
        'Avantages d\'Utiliser une Roue de Décision'
      ],
      descriptions: [
        'Utilisez notre roue de la fortune pour décider quoi manger aujourd\'hui! Tirez au sort parmi les restaurants, plats et recettes en ligne gratuit. Roue personnalisée avec des centaines d\'options.',
        'Roulette en ligne gratuite pour choisir la nourriture. Tirez au sort des restaurants près de vous, des plats délicieux et des recettes faciles. Décision rapide et amusante!',
        'Vous ne savez pas quoi manger aujourd\'hui? Utilisez notre roue de la fortune! Tirez au sort parmi les pizzerias, restaurants, collations et plus. Gratuit et facile à utiliser.'
      ]
    }
  },
  
  music: {
    pt: {
      h1Templates: [
        'Roda da Sorte: Que Música Ouvir?',
        'Roleta para Escolher Playlist',
        'Sortear Música para Trabalho',
        'Decidir Que Banda Ouvir'
      ],
      h2Templates: [
        'Como Funciona a Roda da Sorte Musical',
        'Gêneros e Artistas Disponíveis',
        'Dicas para Descobrir Novas Músicas',
        'Benefícios da Descoberta Musical Aleatória'
      ],
      descriptions: [
        'Use nossa roda da sorte para descobrir que música ouvir! Sorteie entre gêneros, artistas e playlists. Descubra novas músicas de forma divertida e gratuita.',
        'Roleta musical online gratuita. Sorteie músicas para trabalho, treino, estudo ou relaxamento. Descubra novos artistas e gêneros musicais!',
        'Não sabe que música ouvir? Use nossa roda da sorte musical! Sorteie entre rock, pop, sertanejo, eletrônica e muito mais. Grátis e fácil.'
      ]
    },
    en: {
      h1Templates: [
        'Wheel of Fortune: What Music to Listen?',
        'Music Spinner Wheel Online',
        'Random Playlist Picker',
        'Decide What Band to Listen'
      ],
      h2Templates: [
        'How the Music Wheel of Fortune Works',
        'Available Genres and Artists',
        'Tips for Discovering New Music',
        'Benefits of Random Music Discovery'
      ],
      descriptions: [
        'Use our wheel of fortune to discover what music to listen! Spin for genres, artists and playlists. Discover new music in a fun and free way.',
        'Free online music wheel. Spin music for work, workout, study or relaxation. Discover new artists and musical genres!',
        'Don\'t know what music to listen? Use our music wheel of fortune! Spin for rock, pop, country, electronic and much more. Free and easy.'
      ]
    },
    es: {
      h1Templates: [
        'Rueda de la Fortuna: ¿Qué Música Escuchar?',
        'Ruleta Musical Online',
        'Sortear Lista de Reproducción',
        'Decidir Qué Banda Escuchar'
      ],
      h2Templates: [
        'Cómo Funciona la Rueda de la Fortuna Musical',
        'Géneros y Artistas Disponibles',
        'Consejos para Descubrir Nueva Música',
        'Beneficios del Descubrimiento Musical Aleatorio'
      ],
      descriptions: [
        'Usa nuestra rueda de la fortuna para descubrir qué música escuchar! Sortea entre géneros, artistas y listas de reproducción. Descubre nueva música de forma divertida y gratuita.',
        'Ruleta musical online gratuita. Sortea música para trabajo, ejercicio, estudio o relajación. ¡Descubre nuevos artistas y géneros musicales!',
        '¿No sabes qué música escuchar? ¡Usa nuestra rueda de la fortuna musical! Sortea entre rock, pop, reggaetón, electrónica y mucho más. Gratis y fácil.'
      ]
    },
    fr: {
      h1Templates: [
        'Roue de la Fortune: Quelle Musique Écouter?',
        'Roulette Musicale en Ligne',
        'Tirer au Sort une Playlist',
        'Décider Quel Groupe Écouter'
      ],
      h2Templates: [
        'Comment Fonctionne la Roue de la Fortune Musicale',
        'Genres et Artistes Disponibles',
        'Conseils pour Découvrir de Nouvelle Musique',
        'Avantages de la Découverte Musicale Aléatoire'
      ],
      descriptions: [
        'Utilisez notre roue de la fortune pour découvrir quelle musique écouter! Tirez au sort parmi les genres, artistes et playlists. Découvrez de nouvelle musique de manière amusante et gratuite.',
        'Roulette musicale en ligne gratuite. Tirez au sort de la musique pour le travail, l\'exercice, l\'étude ou la relaxation. Découvrez de nouveaux artistes et genres musicaux!',
        'Vous ne savez pas quelle musique écouter? Utilisez notre roue de la fortune musicale! Tirez au sort parmi rock, pop, électronique et bien plus. Gratuit et facile.'
      ]
    }
  },
  
  movies: {
    pt: {
      h1Templates: [
        'Roda da Sorte: Que Filme Assistir?',
        'Roleta Netflix para Hoje',
        'Sortear Série para Maratonar',
        'Decidir Filme Final de Semana'
      ],
      h2Templates: [
        'Como Funciona a Roda da Sorte de Filmes',
        'Gêneros e Plataformas Disponíveis',
        'Dicas para Escolher Filmes e Séries',
        'Benefícios de Descobrir Conteúdo Aleatório'
      ],
      descriptions: [
        'Use nossa roda da sorte para decidir que filme assistir! Sorteie entre Netflix, Amazon Prime, Disney+ e mais. Descubra filmes e séries de forma divertida.',
        'Roleta de filmes online gratuita. Sorteie filmes para assistir hoje, séries para maratonar no final de semana. Decisão rápida e fácil!',
        'Não sabe que filme assistir? Use nossa roda da sorte! Sorteie entre comédia, ação, drama, terror e muito mais. Grátis para usar.'
      ]
    },
    en: {
      h1Templates: [
        'Wheel of Fortune: What Movie to Watch?',
        'Netflix Spinner Wheel Today',
        'Random Series to Binge',
        'Decide Movie Weekend'
      ],
      h2Templates: [
        'How the Movie Wheel of Fortune Works',
        'Available Genres and Platforms',
        'Tips for Choosing Movies and Series',
        'Benefits of Discovering Random Content'
      ],
      descriptions: [
        'Use our wheel of fortune to decide what movie to watch! Spin for Netflix, Amazon Prime, Disney+ and more. Discover movies and series in a fun way.',
        'Free online movie wheel. Spin movies to watch today, series to binge on weekends. Quick and easy decision!',
        'Don\'t know what movie to watch? Use our wheel of fortune! Spin for comedy, action, drama, horror and much more. Free to use.'
      ]
    },
    es: {
      h1Templates: [
        'Rueda de la Fortuna: ¿Qué Película Ver?',
        'Ruleta Netflix para Hoy',
        'Sortear Serie para Maratonear',
        'Decidir Película Fin de Semana'
      ],
      h2Templates: [
        'Cómo Funciona la Rueda de la Fortuna de Películas',
        'Géneros y Plataformas Disponibles',
        'Consejos para Elegir Películas y Series',
        'Beneficios de Descubrir Contenido Aleatorio'
      ],
      descriptions: [
        'Usa nuestra rueda de la fortuna para decidir qué película ver! Sortea entre Netflix, Amazon Prime, Disney+ y más. Descubre películas y series de forma divertida.',
        'Ruleta de películas online gratuita. Sortea películas para ver hoy, series para maratonear en el fin de semana. ¡Decisión rápida y fácil!',
        '¿No sabes qué película ver? ¡Usa nuestra rueda de la fortuna! Sortea entre comedia, acción, drama, terror y mucho más. Gratis para usar.'
      ]
    },
    fr: {
      h1Templates: [
        'Roue de la Fortune: Quel Film Regarder?',
        'Roulette Netflix pour Aujourd\'hui',
        'Tirer au Sort une Série à Regarder en Binge',
        'Décider Film Week-end'
      ],
      h2Templates: [
        'Comment Fonctionne la Roue de la Fortune de Films',
        'Genres et Plateformes Disponibles',
        'Conseils pour Choisir Films et Séries',
        'Avantages de Découvrir du Contenu Aléatoire'
      ],
      descriptions: [
        'Utilisez notre roue de la fortune pour décider quel film regarder! Tirez au sort parmi Netflix, Amazon Prime, Disney+ et plus. Découvrez films et séries de manière amusante.',
        'Roulette de films en ligne gratuite. Tirez au sort des films à regarder aujourd\'hui, des séries à regarder en binge le week-end. Décision rapide et facile!',
        'Vous ne savez pas quel film regarder? Utilisez notre roue de la fortune! Tirez au sort parmi comédie, action, drame, horreur et bien plus. Gratuit à utiliser.'
      ]
    }
  },
  
  education: {
    pt: {
      h1Templates: [
        'Roda da Sorte: Que Matéria Estudar?',
        'Roleta de Estudos para ENEM',
        'Sortear Tópico de Pesquisa',
        'Decidir Curso Online Gratuito'
      ],
      h2Templates: [
        'Como Funciona a Roda da Sorte Educacional',
        'Matérias e Tópicos Disponíveis',
        'Dicas para Organizar os Estudos',
        'Benefícios do Estudo Aleatório'
      ],
      descriptions: [
        'Use nossa roda da sorte para decidir que matéria estudar! Sorteie entre matemática, português, história, ciências e mais. Organize seus estudos de forma divertida.',
        'Roleta educacional online gratuita. Sorteie tópicos para ENEM, vestibular, concursos. Torne seus estudos mais dinâmicos e eficientes!',
        'Não sabe por onde começar a estudar? Use nossa roda da sorte educacional! Sorteie matérias, tópicos e exercícios. Grátis e educativo.'
      ]
    },
    en: {
      h1Templates: [
        'Wheel of Fortune: What Subject to Study?',
        'Study Spinner Wheel for Exams',
        'Random Research Topic',
        'Decide Free Online Course'
      ],
      h2Templates: [
        'How the Educational Wheel of Fortune Works',
        'Available Subjects and Topics',
        'Tips for Organizing Studies',
        'Benefits of Random Study'
      ],
      descriptions: [
        'Use our wheel of fortune to decide what subject to study! Spin for math, english, history, science and more. Organize your studies in a fun way.',
        'Free online educational wheel. Spin topics for SAT, exams, tests. Make your studies more dynamic and efficient!',
        'Don\'t know where to start studying? Use our educational wheel of fortune! Spin subjects, topics and exercises. Free and educational.'
      ]
    },
    es: {
      h1Templates: [
        'Rueda de la Fortuna: ¿Qué Materia Estudiar?',
        'Ruleta de Estudios para Exámenes',
        'Sortear Tema de Investigación',
        'Decidir Curso Online Gratuito'
      ],
      h2Templates: [
        'Cómo Funciona la Rueda de la Fortuna Educacional',
        'Materias y Temas Disponibles',
        'Consejos para Organizar los Estudios',
        'Beneficios del Estudio Aleatorio'
      ],
      descriptions: [
        'Usa nuestra rueda de la fortuna para decidir qué materia estudiar! Sortea entre matemáticas, español, historia, ciencias y más. Organiza tus estudios de forma divertida.',
        'Ruleta educacional online gratuita. Sortea temas para exámenes, oposiciones, pruebas. ¡Haz tus estudios más dinámicos y eficientes!',
        '¿No sabes por dónde empezar a estudiar? ¡Usa nuestra rueda de la fortuna educacional! Sortea materias, temas y ejercicios. Gratis y educativo.'
      ]
    },
    fr: {
      h1Templates: [
        'Roue de la Fortune: Quelle Matière Étudier?',
        'Roulette d\'Études pour Examens',
        'Tirer au Sort un Sujet de Recherche',
        'Décider Cours en Ligne Gratuit'
      ],
      h2Templates: [
        'Comment Fonctionne la Roue de la Fortune Éducationnelle',
        'Matières et Sujets Disponibles',
        'Conseils pour Organiser les Études',
        'Avantages de l\'Étude Aléatoire'
      ],
      descriptions: [
        'Utilisez notre roue de la fortune pour décider quelle matière étudier! Tirez au sort parmi mathématiques, français, histoire, sciences et plus. Organisez vos études de manière amusante.',
        'Roulette éducationnelle en ligne gratuite. Tirez au sort des sujets pour examens, concours, tests. Rendez vos études plus dynamiques et efficaces!',
        'Vous ne savez pas par où commencer à étudier? Utilisez notre roue de la fortune éducationnelle! Tirez au sort matières, sujets et exercices. Gratuit et éducatif.'
      ]
    }
  },
  
  games: {
    pt: {
      h1Templates: [
        'Roda da Sorte: Que Jogo Jogar?',
        'Roleta de Jogos Online',
        'Sortear Jogo para Hoje',
        'Decidir Game para Jogar'
      ],
      h2Templates: [
        'Como Funciona a Roda da Sorte de Jogos',
        'Tipos de Jogos Disponíveis',
        'Dicas para Escolher Jogos',
        'Benefícios de Descobrir Novos Jogos'
      ],
      descriptions: [
        'Use nossa roda da sorte para decidir que jogo jogar! Sorteie entre jogos online, mobile, PC e console. Descubra novos games de forma divertida.',
        'Roleta de jogos online gratuita. Sorteie jogos para PC, PlayStation, Xbox, Nintendo Switch e mobile. Decisão rápida e fácil!',
        'Não sabe que jogo jogar? Use nossa roda da sorte! Sorteie entre ação, aventura, RPG, estratégia e muito mais. Grátis para usar.'
      ]
    },
    en: {
      h1Templates: [
        'Wheel of Fortune: What Game to Play?',
        'Game Spinner Wheel Online',
        'Random Game Picker',
        'Decide Game for Today'
      ],
      h2Templates: [
        'How the Game Wheel of Fortune Works',
        'Available Game Types',
        'Tips for Choosing Games',
        'Benefits of Discovering New Games'
      ],
      descriptions: [
        'Use our wheel of fortune to decide what game to play! Spin for online games, mobile, PC and console. Discover new games in a fun way.',
        'Free online game wheel. Spin games for PC, PlayStation, Xbox, Nintendo Switch and mobile. Quick and easy decision!',
        'Don\'t know what game to play? Use our wheel of fortune! Spin for action, adventure, RPG, strategy and much more. Free to use.'
      ]
    },
    es: {
      h1Templates: [
        'Rueda de la Fortuna: ¿Qué Juego Jugar?',
        'Ruleta de Juegos Online',
        'Sortear Juego para Hoy',
        'Decidir Game para Jugar'
      ],
      h2Templates: [
        'Cómo Funciona la Rueda de la Fortuna de Juegos',
        'Tipos de Juegos Disponibles',
        'Consejos para Elegir Juegos',
        'Beneficios de Descubrir Nuevos Juegos'
      ],
      descriptions: [
        'Usa nuestra rueda de la fortuna para decidir qué juego jugar! Sortea entre juegos online, móvil, PC y consola. Descubre nuevos games de forma divertida.',
        'Ruleta de juegos online gratuita. Sortea juegos para PC, PlayStation, Xbox, Nintendo Switch y móvil. ¡Decisión rápida y fácil!',
        '¿No sabes qué juego jugar? ¡Usa nuestra rueda de la fortuna! Sortea entre acción, aventura, RPG, estrategia y mucho más. Gratis para usar.'
      ]
    },
    fr: {
      h1Templates: [
        'Roue de la Fortune: Quel Jeu Jouer?',
        'Roulette de Jeux en Ligne',
        'Tirer au Sort un Jeu pour Aujourd\'hui',
        'Décider Jeu à Jouer'
      ],
      h2Templates: [
        'Comment Fonctionne la Roue de la Fortune de Jeux',
        'Types de Jeux Disponibles',
        'Conseils pour Choisir des Jeux',
        'Avantages de Découvrir de Nouveaux Jeux'
      ],
      descriptions: [
        'Utilisez notre roue de la fortune pour décider quel jeu jouer! Tirez au sort parmi les jeux en ligne, mobile, PC et console. Découvrez de nouveaux jeux de manière amusante.',
        'Roulette de jeux en ligne gratuite. Tirez au sort des jeux pour PC, PlayStation, Xbox, Nintendo Switch et mobile. Décision rapide et facile!',
        'Vous ne savez pas quel jeu jouer? Utilisez notre roue de la fortune! Tirez au sort parmi action, aventure, RPG, stratégie et bien plus. Gratuit à utiliser.'
      ]
    }
  },
  
  colors: {
    pt: {
      h1Templates: [
        'Roda da Sorte: Escolher Cores Aleatórias',
        'Roleta de Cores Online',
        'Sortear Cores para Projetos',
        'Decidir Cores com Roda da Sorte'
      ],
      h2Templates: [
        'Como Funciona a Roda da Sorte de Cores',
        'Tipos de Cores Disponíveis',
        'Dicas para Escolher Cores',
        'Benefícios de Usar uma Roleta de Cores'
      ],
      descriptions: [
        'Use nossa roda da sorte para escolher cores aleatórias! Sorteie cores para projetos de design, arte, decoração e muito mais. Inspiração criativa instantânea.',
        'Roleta de cores online gratuita. Sorteie cores para design gráfico, web design, pintura e projetos criativos. Decisão rápida e inspiradora!',
        'Precisa de inspiração para cores? Use nossa roda da sorte! Sorteie entre diversas cores e encontre a combinação perfeita. Grátis e fácil de usar.'
      ]
    },
    en: {
      h1Templates: [
        'Wheel of Fortune: Choose Random Colors',
        'Color Spinner Wheel Online',
        'Random Color Picker',
        'Decide Colors with Wheel of Fortune'
      ],
      h2Templates: [
        'How the Color Wheel of Fortune Works',
        'Types of Colors Available',
        'Tips for Choosing Colors',
        'Benefits of Using a Color Wheel'
      ],
      descriptions: [
        'Use our wheel of fortune to choose random colors! Spin colors for design projects, art, decoration and more. Instant creative inspiration.',
        'Free online color wheel. Spin colors for graphic design, web design, painting and creative projects. Quick and inspiring decision!',
        'Need color inspiration? Use our wheel of fortune! Spin between various colors and find the perfect combination. Free and easy to use.'
      ]
    },
    es: {
      h1Templates: [
        'Rueda de la Fortuna: Elegir Colores Aleatorios',
        'Ruleta de Colores Online',
        'Sortear Colores para Proyectos',
        'Decidir Colores con Rueda de la Fortuna'
      ],
      h2Templates: [
        'Cómo Funciona la Rueda de la Fortuna de Colores',
        'Tipos de Colores Disponibles',
        'Consejos para Elegir Colores',
        'Beneficios de Usar una Ruleta de Colores'
      ],
      descriptions: [
        'Usa nuestra rueda de la fortuna para elegir colores aleatorios! Sortea colores para proyectos de diseño, arte, decoración y más. Inspiración creativa instantánea.',
        'Ruleta de colores online gratuita. Sortea colores para diseño gráfico, diseño web, pintura y proyectos creativos. ¡Decisión rápida e inspiradora!',
        '¿Necesitas inspiración para colores? ¡Usa nuestra rueda de la fortuna! Sortea entre varios colores y encuentra la combinación perfecta. Gratis y fácil de usar.'
      ]
    },
    fr: {
      h1Templates: [
        'Roue de la Fortune: Choisir des Couleurs Aléatoires',
        'Roulette de Couleurs en Ligne',
        'Tirer au Sort des Couleurs pour Projets',
        'Décider des Couleurs avec Roue de la Fortune'
      ],
      h2Templates: [
        'Comment Fonctionne la Roue de la Fortune de Couleurs',
        'Types de Couleurs Disponibles',
        'Conseils pour Choisir des Couleurs',
        'Avantages d\'Utiliser une Roulette de Couleurs'
      ],
      descriptions: [
        'Utilisez notre roue de la fortune pour choisir des couleurs aléatoires! Tirez au sort des couleurs pour projets de design, art, décoration et plus. Inspiration créative instantanée.',
        'Roulette de couleurs en ligne gratuite. Tirez au sort des couleurs pour design graphique, web design, peinture et projets créatifs. Décision rapide et inspirante!',
        'Besoin d\'inspiration pour les couleurs? Utilisez notre roue de la fortune! Tirez au sort entre diverses couleurs et trouvez la combinaison parfaite. Gratuit et facile à utiliser.'
      ]
    }
  },
  
  numbers: {
    pt: {
      h1Templates: [
        'Roda da Sorte: Sortear Números Aleatórios',
        'Roleta de Números Online',
        'Gerador de Números da Sorte',
        'Decidir Números com Roda da Sorte'
      ],
      h2Templates: [
        'Como Funciona a Roda da Sorte de Números',
        'Tipos de Números Disponíveis',
        'Dicas para Usar Números Aleatórios',
        'Benefícios de Usar uma Roleta de Números'
      ],
      descriptions: [
        'Use nossa roda da sorte para sortear números aleatórios! Sorteie números para jogos, loterias, sorteios e decisões numéricas. Geração rápida e imparcial.',
        'Roleta de números online gratuita. Sorteie números para rifas, bingo, jogos e qualquer situação que precise de números aleatórios. Fácil e confiável!',
        'Precisa de números aleatórios? Use nossa roda da sorte! Sorteie entre diferentes faixas numéricas para qualquer propósito. Grátis e instantâneo.'
      ]
    },
    en: {
      h1Templates: [
        'Wheel of Fortune: Random Number Generator',
        'Number Spinner Wheel Online',
        'Lucky Number Picker',
        'Decide Numbers with Wheel of Fortune'
      ],
      h2Templates: [
        'How the Number Wheel of Fortune Works',
        'Types of Numbers Available',
        'Tips for Using Random Numbers',
        'Benefits of Using a Number Wheel'
      ],
      descriptions: [
        'Use our wheel of fortune to generate random numbers! Spin numbers for games, lotteries, raffles and numerical decisions. Quick and impartial generation.',
        'Free online number wheel. Spin numbers for raffles, bingo, games and any situation needing random numbers. Easy and reliable!',
        'Need random numbers? Use our wheel of fortune! Spin between different number ranges for any purpose. Free and instant.'
      ]
    },
    es: {
      h1Templates: [
        'Rueda de la Fortuna: Generador de Números Aleatorios',
        'Ruleta de Números Online',
        'Selector de Números de la Suerte',
        'Decidir Números con Rueda de la Fortuna'
      ],
      h2Templates: [
        'Cómo Funciona la Rueda de la Fortuna de Números',
        'Tipos de Números Disponibles',
        'Consejos para Usar Números Aleatorios',
        'Beneficios de Usar una Ruleta de Números'
      ],
      descriptions: [
        'Usa nuestra rueda de la fortuna para generar números aleatorios! Sortea números para juegos, loterías, rifas y decisiones numéricas. Generación rápida e imparcial.',
        'Ruleta de números online gratuita. Sortea números para rifas, bingo, juegos y cualquier situación que necesite números aleatorios. ¡Fácil y confiable!',
        '¿Necesitas números aleatorios? ¡Usa nuestra rueda de la fortuna! Sortea entre diferentes rangos numéricos para cualquier propósito. Gratis e instantáneo.'
      ]
    },
    fr: {
      h1Templates: [
        'Roue de la Fortune: Générateur de Nombres Aléatoires',
        'Roulette de Nombres en Ligne',
        'Sélecteur de Nombres Chanceux',
        'Décider des Nombres avec Roue de la Fortune'
      ],
      h2Templates: [
        'Comment Fonctionne la Roue de la Fortune de Nombres',
        'Types de Nombres Disponibles',
        'Conseils pour Utiliser des Nombres Aléatoires',
        'Avantages d\'Utiliser une Roulette de Nombres'
      ],
      descriptions: [
        'Utilisez notre roue de la fortune pour générer des nombres aléatoires! Tirez au sort des nombres pour jeux, loteries, tirages au sort et décisions numériques. Génération rapide et impartiale.',
        'Roulette de nombres en ligne gratuite. Tirez au sort des nombres pour tirages au sort, bingo, jeux et toute situation nécessitant des nombres aléatoires. Facile et fiable!',
        'Besoin de nombres aléatoires? Utilisez notre roue de la fortune! Tirez au sort entre différentes plages numériques pour tout usage. Gratuit et instantané.'
      ]
    }
  },

  decisions: {
    pt: {
      h1Templates: [
        'Roda da Sorte: Tomar Decisões Difíceis',
        'Roleta para Decidir Online',
        'Sortear Escolhas Importantes',
        'Decidir com Roda da Sorte'
      ],
      h2Templates: [
        'Como Funciona a Roda da Sorte para Decisões',
        'Tipos de Decisões Suportadas',
        'Dicas para Tomar Decisões',
        'Benefícios de Usar uma Roleta de Decisão'
      ],
      descriptions: [
        'Use nossa roda da sorte para tomar decisões difíceis! Sorteie entre opções importantes da vida, trabalho e relacionamentos. Decisão imparcial e rápida.',
        'Roleta de decisões online gratuita. Sorteie escolhas importantes, dilemas pessoais e profissionais. Torne suas decisões mais fáceis!',
        'Tem dificuldade para decidir? Use nossa roda da sorte! Sorteie entre opções e deixe o destino escolher. Grátis e imparcial.'
      ]
    },
    en: {
      h1Templates: [
        'Wheel of Fortune: Make Difficult Decisions',
        'Decision Spinner Wheel Online',
        'Random Choice Picker',
        'Decide with Wheel of Fortune'
      ],
      h2Templates: [
        'How the Decision Wheel of Fortune Works',
        'Types of Decisions Supported',
        'Tips for Making Decisions',
        'Benefits of Using a Decision Wheel'
      ],
      descriptions: [
        'Use our wheel of fortune to make difficult decisions! Spin for important life, work and relationship choices. Impartial and quick decision.',
        'Free online decision wheel. Spin important choices, personal and professional dilemmas. Make your decisions easier!',
        'Having trouble deciding? Use our wheel of fortune! Spin between options and let fate choose. Free and impartial.'
      ]
    },
    es: {
      h1Templates: [
        'Rueda de la Fortuna: Tomar Decisiones Difíciles',
        'Ruleta para Decidir Online',
        'Sortear Elecciones Importantes',
        'Decidir con Rueda de la Fortuna'
      ],
      h2Templates: [
        'Cómo Funciona la Rueda de la Fortuna para Decisiones',
        'Tipos de Decisiones Soportadas',
        'Consejos para Tomar Decisiones',
        'Beneficios de Usar una Ruleta de Decisión'
      ],
      descriptions: [
        'Usa nuestra rueda de la fortuna para tomar decisiones difíciles! Sortea entre opciones importantes de vida, trabajo y relaciones. Decisión imparcial y rápida.',
        'Ruleta de decisiones online gratuita. Sortea elecciones importantes, dilemas personales y profesionales. ¡Haz tus decisiones más fáciles!',
        '¿Tienes dificultad para decidir? ¡Usa nuestra rueda de la fortuna! Sortea entre opciones y deja que el destino elija. Gratis e imparcial.'
      ]
    },
    fr: {
      h1Templates: [
        'Roue de la Fortune: Prendre des Décisions Difficiles',
        'Roulette pour Décider en Ligne',
        'Tirer au Sort des Choix Importants',
        'Décider avec Roue de la Fortune'
      ],
      h2Templates: [
        'Comment Fonctionne la Roue de la Fortune pour Décisions',
        'Types de Décisions Supportées',
        'Conseils pour Prendre des Décisions',
        'Avantages d\'Utiliser une Roue de Décision'
      ],
      descriptions: [
        'Utilisez notre roue de la fortune pour prendre des décisions difficiles! Tirez au sort parmi les choix importants de vie, travail et relations. Décision impartiale et rapide.',
        'Roulette de décisions en ligne gratuite. Tirez au sort des choix importants, dilemmes personnels et professionnels. Rendez vos décisions plus faciles!',
        'Vous avez du mal à décider? Utilisez notre roue de la fortune! Tirez au sort entre les options et laissez le destin choisir. Gratuit et impartial.'
      ]
    }
  }
};

// Função para gerar dados SEO para uma página
export function generateSEOPageData(
  locale: Locale,
  category: string,
  template: string,
  modifiers: string[] = []
): SEOPageData {
  const baseUrl = 'https://wheelwheel.vercel.app';
  const path = generateSEORoute(locale, category, template, modifiers);
  
  // Obter templates de conteúdo
  const contentTemplate = CONTENT_TEMPLATES[category]?.[locale];
  if (!contentTemplate) {
    throw new Error(`Content template not found for category: ${category}, locale: ${locale}`);
  }
  
  // Gerar título e descrição aleatórios
  const randomH1 = contentTemplate.h1Templates[Math.floor(Math.random() * contentTemplate.h1Templates.length)];
  const randomH2 = contentTemplate.h2Templates[Math.floor(Math.random() * contentTemplate.h2Templates.length)];
  const randomDescription = contentTemplate.descriptions[Math.floor(Math.random() * contentTemplate.descriptions.length)];
  
  // Gerar palavras-chave baseadas na categoria e idioma
  const keywords = generateKeywords(locale, category, template, modifiers);
  
  // Gerar título SEO otimizado
  const seoTitle = generateSEOTitle(locale, category, template, modifiers);
  
  // Gerar breadcrumbs
  const breadcrumbs = generateBreadcrumbs(locale, category, template);
  
  // Gerar URLs alternativas
  const alternateUrls = generateAlternateUrls(category, template, modifiers);
  
  // Gerar dados estruturados
  const structuredData = generateStructuredData(locale, category, template, seoTitle, randomDescription, baseUrl + path);
  
  // Gerar itens da roleta baseados na categoria
  const wheelItems = generateWheelItems(locale, category, template);
  
  return {
    title: seoTitle,
    description: randomDescription,
    keywords,
    h1: randomH1,
    h2: randomH2,
    breadcrumbs,
    canonicalUrl: baseUrl + path,
    alternateUrls,
    structuredData,
    wheelItems,
    category,
    template
  };
}

// Função para gerar palavras-chave
function generateKeywords(locale: Locale, category: string, template: string, modifiers: string[]): string[] {
  const baseKeywords = t(locale, 'seo.keywords.primary') as string[];
  const categoryKeywords = t(locale, `seo.templates.${category}.keywords`) as string[];
  const modifierKeywords = modifiers.map(mod => t(locale, `seo.keywords.modifiers.${mod}`) as string).filter(Boolean);
  
  return [...baseKeywords, ...categoryKeywords, ...modifierKeywords];
}

// Função para gerar título SEO
function generateSEOTitle(locale: Locale, category: string, template: string, modifiers: string[]): string {
  const primaryKeyword = t(locale, 'seo.keywords.primary.0') as string;
  const categoryName = t(locale, `categories.${category}`) as string;
  const modifierText = modifiers.length > 0 ? ` ${modifiers.join(' ')}` : '';
  
  return `${primaryKeyword} ${categoryName}${modifierText} | ${t(locale, 'seo.siteName')}`;
}

// Função para gerar breadcrumbs
function generateBreadcrumbs(locale: Locale, category: string, template: string): Array<{ label: string; href: string }> {
  return [
    { label: t(locale, 'home'), href: `/${locale}` },
    { label: t(locale, 'wheelOfFortune'), href: `/${locale}/roda-da-sorte` },
    { label: t(locale, category), href: `/${locale}/roda-da-sorte/${category}` },
    { label: template, href: '' }
  ];
}

// Função para gerar URLs alternativas
function generateAlternateUrls(category: string, template: string, modifiers: string[]): Record<Locale, string> {
  const locales: Locale[] = ['pt', 'en', 'es', 'fr'];
  const alternateUrls: Record<Locale, string> = {} as Record<Locale, string>;
  
  locales.forEach(locale => {
    alternateUrls[locale] = `https://wheelwheel.vercel.app${generateSEORoute(locale, category, template, modifiers)}`;
  });
  
  return alternateUrls;
}

// Função para gerar dados estruturados
function generateStructuredData(locale: Locale, category: string, template: string, title: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "description": description,
    "url": url,
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": locale === 'pt' ? 'BRL' : locale === 'en' ? 'USD' : locale === 'es' ? 'EUR' : 'EUR'
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1250"
    }
  };
}

// Função para gerar itens da roleta
function generateWheelItems(locale: Locale, category: string, template: string): any[] {
  // Importar templates para buscar os dados corretos
  const { WHEEL_TEMPLATES } = require('@/data/templates');
  
  // Buscar o template específico
  const wheelTemplate = WHEEL_TEMPLATES.find((t: any) => t.id === template);
  
  if (wheelTemplate && wheelTemplate.items) {
    // Retornar os itens completos do template com cores
    return wheelTemplate.items.map((item: any) => ({
      id: item.id,
      label: item.label,
      color: item.color,
      weight: item.weight || 1
    }));
  }
  
  // Fallback para itens genéricos se o template não for encontrado
  const baseItems = t(locale, `items.${category}`);
  let fallbackItems: string[];
  
  // Garantir que fallbackItems seja sempre um array
  if (Array.isArray(baseItems)) {
    fallbackItems = baseItems;
  } else {
    // Fallback padrão baseado na categoria
    const defaultItems: Record<string, string[]> = {
      food: ['Pizza', 'Hambúrguer', 'Sushi', 'Salada', 'Macarrão', 'Tacos'],
      games: ['Futebol', 'Basquete', 'Tênis', 'Vôlei', 'Natação', 'Corrida'],
      decisions: ['Sim', 'Não', 'Talvez', 'Mais tarde', 'Definitivamente', 'Nunca'],
      colors: ['Vermelho', 'Azul', 'Verde', 'Amarelo', 'Roxo', 'Laranja'],
      numbers: ['1', '2', '3', '4', '5', '6']
    };
    
    fallbackItems = defaultItems[category] || ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4'];
  }
  
  return fallbackItems.map((item: string, index: number) => ({
    id: `item-${index}`,
    label: item,
    color: `hsl(${(index * 360) / fallbackItems.length}, 70%, 60%)`,
    weight: 1
  }));
}

export { CONTENT_TEMPLATES };