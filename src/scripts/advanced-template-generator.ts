#!/usr/bin/env ts-node

// Script avançado para gerar templates em massa com mais variedade
import fs from 'fs';
import path from 'path';

// Configuração de categorias expandida
const ADVANCED_CATEGORIES = {
  food: {
    name: "Comida e Restaurantes",
    icon: "🍽️",
    subcategories: [
      "restaurantes", "fast-food", "comida-caseira", "bebidas", "sobremesas", 
      "culinaria-internacional", "dietas", "receitas", "delivery", "cafeterias"
    ],
    templates: [
      "Melhor {subcategory} {location}",
      "Top 10 {subcategory} para {occasion}",
      "Onde comer {subcategory} {location}",
      "Ranking {subcategory} {year}",
      "Guia completo de {subcategory}",
      "Melhores opções de {subcategory} para {target}",
      "Descobrindo {subcategory} em {location}",
      "Avaliação dos melhores {subcategory}",
      "Comparativo de {subcategory} {location}",
      "Dicas de {subcategory} para {occasion}"
    ]
  },
  games: {
    name: "Jogos e Entretenimento",
    icon: "🎮",
    subcategories: [
      "videogames", "jogos-de-tabuleiro", "jogos-online", "mobile-games", 
      "party-games", "jogos-educativos", "esports", "indie-games", "retro-games", "vr-games"
    ],
    templates: [
      "Melhores {subcategory} de {year}",
      "Top {subcategory} para {platform}",
      "Ranking dos {subcategory} mais populares",
      "Guia de {subcategory} para iniciantes",
      "Análise dos melhores {subcategory}",
      "Comparativo {subcategory} {genre}",
      "Recomendações de {subcategory} para {age_group}",
      "Novidades em {subcategory}",
      "História dos {subcategory}",
      "Dicas para {subcategory}"
    ]
  },
  education: {
    name: "Educação e Aprendizado",
    icon: "📚",
    subcategories: [
      "cursos-online", "universidades", "escolas", "idiomas", "certificacoes",
      "programacao", "matematica", "ciencias", "historia", "literatura"
    ],
    templates: [
      "Melhores {subcategory} para {level}",
      "Guia completo de {subcategory}",
      "Como escolher {subcategory}",
      "Ranking das melhores {subcategory}",
      "Dicas para estudar {subcategory}",
      "Recursos gratuitos de {subcategory}",
      "Metodologias de {subcategory}",
      "Tendências em {subcategory}",
      "Ferramentas para {subcategory}",
      "Carreira em {subcategory}"
    ]
  },
  travel: {
    name: "Viagens e Turismo",
    icon: "✈️",
    subcategories: [
      "destinos-nacionais", "destinos-internacionais", "hoteis", "restaurantes-turisticos",
      "pontos-turisticos", "aventura", "ecoturismo", "turismo-cultural", "praias", "montanhas"
    ],
    templates: [
      "Melhores {subcategory} para {season}",
      "Guia de viagem para {subcategory}",
      "Roteiro completo {subcategory}",
      "Dicas de {subcategory} com orçamento baixo",
      "Onde ficar em {subcategory}",
      "O que fazer em {subcategory}",
      "Ranking dos melhores {subcategory}",
      "Experiências únicas em {subcategory}",
      "Planejando sua viagem para {subcategory}",
      "Segredos dos {subcategory}"
    ]
  },
  business: {
    name: "Negócios e Carreira",
    icon: "💼",
    subcategories: [
      "startups", "marketing", "vendas", "lideranca", "produtividade",
      "empreendedorismo", "investimentos", "networking", "inovacao", "gestao"
    ],
    templates: [
      "Estratégias de {subcategory} para {year}",
      "Como melhorar em {subcategory}",
      "Tendências em {subcategory}",
      "Ferramentas essenciais para {subcategory}",
      "Guia completo de {subcategory}",
      "Dicas de {subcategory} para iniciantes",
      "Casos de sucesso em {subcategory}",
      "Erros comuns em {subcategory}",
      "Futuro do {subcategory}",
      "Métricas importantes em {subcategory}"
    ]
  },
  health: {
    name: "Saúde e Bem-estar",
    icon: "🏥",
    subcategories: [
      "exercicios", "nutricao", "medicina", "terapias", "mental-health",
      "fitness", "yoga", "meditacao", "sono", "prevencao"
    ],
    templates: [
      "Melhores práticas de {subcategory}",
      "Guia completo de {subcategory} para {age_group}",
      "Como começar com {subcategory}",
      "Benefícios do {subcategory}",
      "Dicas diárias de {subcategory}",
      "Especialistas em {subcategory}",
      "Tendências em {subcategory}",
      "Mitos sobre {subcategory}",
      "Rotina de {subcategory}",
      "Equipamentos para {subcategory}"
    ]
  },
  technology: {
    name: "Tecnologia e Inovação",
    icon: "💻",
    subcategories: [
      "smartphones", "laptops", "software", "apps", "ia",
      "blockchain", "cloud", "cybersecurity", "iot", "robotica"
    ],
    templates: [
      "Melhores {subcategory} de {year}",
      "Comparativo de {subcategory}",
      "Tendências em {subcategory}",
      "Como escolher {subcategory}",
      "Futuro do {subcategory}",
      "Inovações em {subcategory}",
      "Guia para iniciantes em {subcategory}",
      "Impacto do {subcategory} na sociedade",
      "Ferramentas de {subcategory}",
      "Investindo em {subcategory}"
    ]
  },
  entertainment: {
    name: "Entretenimento e Cultura",
    icon: "🎭",
    subcategories: [
      "filmes", "series", "musica", "livros", "teatro",
      "arte", "festivais", "eventos", "celebridades", "streaming"
    ],
    templates: [
      "Melhores {subcategory} de {year}",
      "Ranking dos {subcategory} mais populares",
      "Novidades em {subcategory}",
      "Clássicos do {subcategory}",
      "Tendências em {subcategory}",
      "Críticas de {subcategory}",
      "História do {subcategory}",
      "Onde encontrar {subcategory}",
      "Recomendações de {subcategory}",
      "Análise de {subcategory}"
    ]
  }
};

// Variáveis para personalização
const LOCATIONS = [
  "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Salvador", "Brasília",
  "Fortaleza", "Recife", "Porto Alegre", "Curitiba", "Goiânia",
  "Brasil", "no Brasil", "na sua cidade", "perto de você", "online"
];

const OCCASIONS = [
  "fim de semana", "feriados", "aniversários", "encontros", "família",
  "trabalho", "estudos", "relaxar", "diversão", "celebração"
];

const TARGETS = [
  "crianças", "adultos", "idosos", "famílias", "casais",
  "estudantes", "profissionais", "iniciantes", "especialistas", "todos"
];

const YEARS = ["2024", "2025", "este ano", "próximo ano"];
const SEASONS = ["verão", "inverno", "primavera", "outono", "qualquer época"];
const PLATFORMS = ["PC", "mobile", "console", "web", "todas as plataformas"];
const GENRES = ["ação", "aventura", "estratégia", "puzzle", "RPG", "esporte"];
const AGE_GROUPS = ["crianças", "adolescentes", "adultos", "idosos", "todas as idades"];
const LEVELS = ["iniciante", "intermediário", "avançado", "todos os níveis"];

function generateAdvancedTemplates(count: number = 1000): any[] {
  const templates = [];
  const categories = Object.keys(ADVANCED_CATEGORIES);
  
  for (let i = 0; i < count; i++) {
    const categoryKey = categories[i % categories.length];
    const category = ADVANCED_CATEGORIES[categoryKey as keyof typeof ADVANCED_CATEGORIES];
    
    const subcategory = category.subcategories[i % category.subcategories.length];
    const templatePattern = category.templates[i % category.templates.length];
    
    // Substituir variáveis no template
    let title = templatePattern
      .replace('{subcategory}', subcategory)
      .replace('{location}', LOCATIONS[i % LOCATIONS.length])
      .replace('{occasion}', OCCASIONS[i % OCCASIONS.length])
      .replace('{target}', TARGETS[i % TARGETS.length])
      .replace('{year}', YEARS[i % YEARS.length])
      .replace('{season}', SEASONS[i % SEASONS.length])
      .replace('{platform}', PLATFORMS[i % PLATFORMS.length])
      .replace('{genre}', GENRES[i % GENRES.length])
      .replace('{age_group}', AGE_GROUPS[i % AGE_GROUPS.length])
      .replace('{level}', LEVELS[i % LEVELS.length]);
    
    // Capitalizar primeira letra
    title = title.charAt(0).toUpperCase() + title.slice(1);
    
    // Gerar slug
    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    // Gerar itens da roleta baseados na categoria
    const items = generateCategoryItems(categoryKey, subcategory, 8);
    
    templates.push({
      id: `advanced-template-${i + 1}`,
      title,
      slug,
      category: categoryKey,
      subcategory,
      description: `Descubra ${title.toLowerCase()} com nossa roleta interativa. Ferramenta perfeita para escolhas e decisões.`,
      items,
      tags: [categoryKey, subcategory, "roleta", "decisão", "escolha"],
      seoTitle: `${title} - Roleta Online Grátis`,
      seoDescription: `Use nossa roleta ${title.toLowerCase()} online grátis. Ferramenta perfeita para sorteios, decisões e diversão.`,
      keywords: [categoryKey, subcategory, "roleta", "sorteio", "decisão", "online", "grátis"],
      usageCount: Math.floor(Math.random() * 10000) + 100,
      isPopular: Math.random() > 0.7,
      createdAt: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    });
  }
  
  return templates;
}

function generateCategoryItems(category: string, subcategory: string, count: number): any[] {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', 
    '#DDA0DD', '#F39C12', '#E74C3C', '#9B59B6', '#3498DB'
  ];
  
  const itemSets: { [key: string]: string[] } = {
    food: [
      'Pizza Margherita', 'Hambúrguer Artesanal', 'Sushi Tradicional', 'Pasta Carbonara',
      'Tacos Mexicanos', 'Churrasco Brasileiro', 'Salada Caesar', 'Risotto de Camarão'
    ],
    games: [
      'The Legend of Zelda', 'Super Mario Bros', 'Minecraft', 'Fortnite',
      'Among Us', 'Call of Duty', 'FIFA 2024', 'Pokémon'
    ],
    education: [
      'Curso de Python', 'Inglês Avançado', 'Matemática Básica', 'História do Brasil',
      'Física Quântica', 'Literatura Clássica', 'Química Orgânica', 'Geografia Mundial'
    ],
    travel: [
      'Paris, França', 'Tokyo, Japão', 'New York, EUA', 'Rio de Janeiro, Brasil',
      'Londres, Inglaterra', 'Roma, Itália', 'Barcelona, Espanha', 'Sydney, Austrália'
    ],
    business: [
      'Marketing Digital', 'Vendas B2B', 'Liderança Ágil', 'Empreendedorismo',
      'Investimentos', 'Networking', 'Inovação', 'Gestão de Projetos'
    ],
    health: [
      'Corrida Matinal', 'Yoga Relaxante', 'Meditação', 'Musculação',
      'Natação', 'Pilates', 'Crossfit', 'Caminhada'
    ],
    technology: [
      'iPhone 15', 'Samsung Galaxy', 'MacBook Pro', 'Dell XPS',
      'ChatGPT', 'Google Bard', 'Microsoft Copilot', 'Adobe Creative'
    ],
    entertainment: [
      'Stranger Things', 'Game of Thrones', 'The Office', 'Friends',
      'Breaking Bad', 'The Crown', 'Squid Game', 'Wednesday'
    ]
  };
  
  const baseItems = itemSets[category] || [
    'Opção 1', 'Opção 2', 'Opção 3', 'Opção 4',
    'Opção 5', 'Opção 6', 'Opção 7', 'Opção 8'
  ];
  
  return baseItems.slice(0, count).map((label, index) => ({
    id: `item-${index}`,
    label,
    color: colors[index % colors.length],
    weight: 2 - (index * 0.1) // Peso decrescente
  }));
}

async function generateAdvancedPages(count: number = 1000) {
  console.log(`🚀 Gerando ${count} templates avançados...`);
  
  const templates = generateAdvancedTemplates(count);
  
  // Criar diretório de saída
  const outputDir = './src/advanced-pages';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Criar subdiretórios
  const subdirs = ['wheels', 'categories', 'api', 'components'];
  subdirs.forEach(subdir => {
    const dirPath = path.join(outputDir, subdir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
  
  console.log('📝 Gerando páginas individuais...');
  
  // Gerar páginas individuais
  templates.forEach((template, index) => {
    const pageContent = generateWheelPageContent(template);
    const fileName = `${template.slug}.tsx`;
    const filePath = path.join(outputDir, 'wheels', fileName);
    
    fs.writeFileSync(filePath, pageContent);
    
    if ((index + 1) % 100 === 0) {
      console.log(`📄 ${index + 1}/${templates.length} páginas geradas`);
    }
  });
  
  // Gerar arquivo de rotas
  console.log('🛣️ Gerando rotas...');
  const routesContent = generateRoutesFile(templates);
  fs.writeFileSync(path.join(outputDir, 'routes.ts'), routesContent);
  
  // Gerar sitemap
  console.log('🗺️ Gerando sitemap...');
  const sitemapContent = generateSitemapContent(templates);
  fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemapContent);
  
  // Gerar robots.txt
  const robotsContent = generateRobotsContent();
  fs.writeFileSync(path.join(outputDir, 'robots.txt'), robotsContent);
  
  console.log(`✅ ${templates.length} páginas avançadas geradas com sucesso!`);
  console.log(`📁 Arquivos salvos em: ${outputDir}`);
  
  // Estatísticas
  const stats = generateStats(templates);
  console.log('\n📊 Estatísticas:');
  console.log(`🎯 Total de páginas: ${stats.totalPages}`);
  console.log(`📂 Categorias: ${stats.categories}`);
  console.log(`💾 Tamanho estimado: ${stats.estimatedSize} MB`);
  
  Object.entries(stats.byCategory).forEach(([category, count]) => {
    const categoryInfo = ADVANCED_CATEGORIES[category as keyof typeof ADVANCED_CATEGORIES];
    console.log(`   ${categoryInfo?.icon || '📋'} ${categoryInfo?.name || category}: ${count} páginas`);
  });
}

function generateWheelPageContent(template: any): string {
  return `// Página gerada automaticamente para SEO
import React from 'react';
import { Metadata } from 'next';
import WheelPage from '@/components/WheelPage';
import { WheelTemplate } from '@/types/wheel';

// Template data
const wheelTemplate: WheelTemplate = ${JSON.stringify(template, null, 2)};

// SEO Metadata
export const metadata: Metadata = {
  title: '${template.seoTitle}',
  description: '${template.seoDescription}',
  keywords: '${template.keywords.join(', ')}',
  canonical: 'https://wheelmaker.app/wheel/${template.slug}',
  openGraph: {
    title: '${template.seoTitle}',
    description: '${template.seoDescription}',
    type: 'website',
    url: 'https://wheelmaker.app/wheel/${template.slug}',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/wheel/${template.slug}',
        width: 1200,
        height: 630,
        alt: '${template.seoTitle}'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '${template.seoTitle}',
    description: '${template.seoDescription}',
    images: ['https://wheelmaker.app/api/og/wheel/${template.slug}']
  },
  alternates: {
    canonical: 'https://wheelmaker.app/wheel/${template.slug}'
  }
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#3B82F6'
  }
}

// Structured Data (JSON-LD)
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "${template.seoTitle}",
  "description": "${template.seoDescription}",
  "url": "https://wheelmaker.app/wheel/${template.slug}",
  "applicationCategory": "GameApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "creator": {
    "@type": "Organization",
    "name": "Wheel Maker",
    "url": "https://wheelmaker.app"
  }
};

export default function ${template.slug.replace(/-/g, '')}Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <WheelPage 
        template={wheelTemplate}
        seoTitle="${template.seoTitle}"
        seoDescription="${template.seoDescription}"
      />
    </>
  );
}

// Generate static params for static generation
export async function generateStaticParams() {
  return [{ slug: '${template.slug}' }];
}
`;
}

function generateRoutesFile(templates: any[]): string {
  const routes = templates.map(template => ({
    slug: template.slug,
    category: template.category,
    title: template.title
  }));
  
  return `// Rotas geradas automaticamente para ${templates.length} páginas avançadas
export const ADVANCED_WHEEL_ROUTES = ${JSON.stringify(routes, null, 2)};
`;
}

function generateSitemapContent(templates: any[]): string {
  const urls = templates.map(template => 
    `  <url>
    <loc>https://wheelmaker.app/wheel/${template.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  ).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

function generateRobotsContent(): string {
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://wheelmaker.app/sitemap.xml
Sitemap: https://wheelmaker.app/advanced-sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin areas
Disallow: /admin/
Disallow: /api/internal/
Disallow: /_next/
Disallow: /static/

# Allow important pages
Allow: /wheel/
Allow: /category/
Allow: /api/og/
`;
}

function generateStats(templates: any[]) {
  const byCategory: { [key: string]: number } = {};
  
  templates.forEach(template => {
    byCategory[template.category] = (byCategory[template.category] || 0) + 1;
  });
  
  return {
    totalPages: templates.length,
    categories: Object.keys(byCategory).length,
    estimatedSize: Math.round(templates.length * 0.015 * 100) / 100, // ~15KB por página
    byCategory
  };
}

// Executar script
async function main() {
  const args = process.argv.slice(2);
  const count = parseInt(args[0]) || 1000;
  
  console.log('🎯 Gerador Avançado de Templates');
  console.log('================================\n');
  
  await generateAdvancedPages(count);
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Erro:', error);
    process.exit(1);
  });
}