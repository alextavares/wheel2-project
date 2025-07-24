#!/usr/bin/env ts-node

// Script para integrar todas as páginas geradas em um sistema unificado
import fs from 'fs';
import path from 'path';

interface RouteInfo {
  slug: string;
  category: string;
  title: string;
  source: string;
}

async function integrateAllPages() {
  console.log('🔗 Integrando todas as páginas geradas...\n');
  
  const allRoutes: RouteInfo[] = [];
  
  // 1. Carregar rotas das páginas SEO originais
  try {
    const { WHEEL_ROUTES } = await import('../generated-pages/routes');
    WHEEL_ROUTES.forEach((route: any) => {
      allRoutes.push({
        ...route,
        source: 'seo-generated'
      });
    });
    console.log(`✅ ${WHEEL_ROUTES.length} rotas SEO carregadas`);
  } catch (error) {
    console.log('⚠️  Rotas SEO não encontradas');
  }
  
  // 2. Carregar rotas das páginas avançadas
  try {
    const { ADVANCED_WHEEL_ROUTES } = await import('../advanced-pages/routes');
    ADVANCED_WHEEL_ROUTES.forEach((route: any) => {
      allRoutes.push({
        ...route,
        source: 'advanced-generated'
      });
    });
    console.log(`✅ ${ADVANCED_WHEEL_ROUTES.length} rotas avançadas carregadas`);
  } catch (error) {
    console.log('⚠️  Rotas avançadas não encontradas');
  }
  
  // 3. Carregar rotas das páginas inteligentes
  try {
    const intelligentRoutesPath = '../intelligent-pages/routes';
    if (fs.existsSync(path.join(__dirname, intelligentRoutesPath + '.ts'))) {
      const { INTELLIGENT_WHEEL_ROUTES } = await import(intelligentRoutesPath);
      INTELLIGENT_WHEEL_ROUTES.forEach((route: any) => {
        allRoutes.push({
          ...route,
          source: 'intelligent-generated'
        });
      });
      console.log(`✅ ${INTELLIGENT_WHEEL_ROUTES.length} rotas inteligentes carregadas`);
    }
  } catch (error) {
    console.log('⚠️  Rotas inteligentes não encontradas');
  }
  
  // 4. Remover duplicatas baseado no slug
  const uniqueRoutes = allRoutes.reduce((acc: RouteInfo[], current) => {
    const exists = acc.find(route => route.slug === current.slug);
    if (!exists) {
      acc.push(current);
    }
    return acc;
  }, []);
  
  console.log(`\n📊 Estatísticas de integração:`);
  console.log(`🎯 Total de rotas únicas: ${uniqueRoutes.length}`);
  console.log(`🔄 Duplicatas removidas: ${allRoutes.length - uniqueRoutes.length}`);
  
  // 5. Estatísticas por categoria
  const byCategory: { [key: string]: number } = {};
  const bySource: { [key: string]: number } = {};
  
  uniqueRoutes.forEach(route => {
    byCategory[route.category] = (byCategory[route.category] || 0) + 1;
    bySource[route.source] = (bySource[route.source] || 0) + 1;
  });
  
  console.log(`\n📂 Por categoria:`);
  Object.entries(byCategory).forEach(([category, count]) => {
    console.log(`   ${getCategoryIcon(category)} ${category}: ${count} páginas`);
  });
  
  console.log(`\n🔧 Por fonte:`);
  Object.entries(bySource).forEach(([source, count]) => {
    console.log(`   📄 ${source}: ${count} páginas`);
  });
  
  // 6. Gerar arquivo de rotas unificado
  const unifiedRoutesContent = generateUnifiedRoutes(uniqueRoutes);
  const outputPath = './src/unified-routes.ts';
  fs.writeFileSync(outputPath, unifiedRoutesContent);
  console.log(`\n✅ Rotas unificadas salvas em: ${outputPath}`);
  
  // 7. Gerar sitemap unificado
  const unifiedSitemapContent = generateUnifiedSitemap(uniqueRoutes);
  const sitemapPath = './public/unified-sitemap.xml';
  
  // Criar diretório public se não existir
  if (!fs.existsSync('./public')) {
    fs.mkdirSync('./public', { recursive: true });
  }
  
  fs.writeFileSync(sitemapPath, unifiedSitemapContent);
  console.log(`✅ Sitemap unificado salvo em: ${sitemapPath}`);
  
  // 8. Gerar estatísticas detalhadas
  const statsContent = generateDetailedStats(uniqueRoutes, byCategory, bySource);
  const statsPath = './src/page-generation-stats.json';
  fs.writeFileSync(statsPath, statsContent);
  console.log(`✅ Estatísticas detalhadas salvas em: ${statsPath}`);
  
  console.log(`\n🎉 Integração concluída com sucesso!`);
  console.log(`📈 Total de ${uniqueRoutes.length} páginas únicas integradas`);
  console.log(`💾 Tamanho estimado total: ${Math.round(uniqueRoutes.length * 0.015 * 100) / 100} MB`);
}

function getCategoryIcon(category: string): string {
  const icons: { [key: string]: string } = {
    food: '🍽️',
    games: '🎮',
    education: '📚',
    travel: '✈️',
    business: '💼',
    health: '🏥',
    technology: '💻',
    entertainment: '🎭',
    movies: '🎬',
    music: '🎵',
    decisions: '🤔',
    sports: '⚽',
    work: '💼',
    random: '🎲'
  };
  return icons[category] || '📋';
}

function generateUnifiedRoutes(routes: RouteInfo[]): string {
  return `// Rotas unificadas de todas as páginas geradas
// Gerado automaticamente em ${new Date().toISOString()}

export interface UnifiedRoute {
  slug: string;
  category: string;
  title: string;
  source: 'seo-generated' | 'advanced-generated' | 'intelligent-generated';
}

export const ALL_WHEEL_ROUTES: UnifiedRoute[] = ${JSON.stringify(routes, null, 2)};

// Funções utilitárias
export function getRoutesByCategory(category: string): UnifiedRoute[] {
  return ALL_WHEEL_ROUTES.filter(route => route.category === category);
}

export function getRoutesBySource(source: string): UnifiedRoute[] {
  return ALL_WHEEL_ROUTES.filter(route => route.source === source);
}

export function findRouteBySlug(slug: string): UnifiedRoute | undefined {
  return ALL_WHEEL_ROUTES.find(route => route.slug === slug);
}

export function getCategories(): string[] {
  return [...new Set(ALL_WHEEL_ROUTES.map(route => route.category))];
}

export function getTotalPages(): number {
  return ALL_WHEEL_ROUTES.length;
}

// Estatísticas
export const ROUTE_STATS = {
  total: ${routes.length},
  categories: ${[...new Set(routes.map(r => r.category))].length},
  sources: ${[...new Set(routes.map(r => r.source))].length},
  generatedAt: '${new Date().toISOString()}'
};
`;
}

function generateUnifiedSitemap(routes: RouteInfo[]): string {
  const baseUrl = 'https://wheelmaker.app';
  const today = new Date().toISOString().split('T')[0];
  
  const urls = routes.map(route => 
    `  <url>
    <loc>${baseUrl}/wheel/${route.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  ).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Category pages -->
  <url>
    <loc>${baseUrl}/category/food</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/category/games</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/category/education</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/category/travel</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/category/business</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/category/health</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/category/technology</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/category/entertainment</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Generated wheel pages -->
${urls}
</urlset>`;
}

function generateDetailedStats(routes: RouteInfo[], byCategory: { [key: string]: number }, bySource: { [key: string]: number }): string {
  return JSON.stringify({
    generatedAt: new Date().toISOString(),
    summary: {
      totalPages: routes.length,
      totalCategories: Object.keys(byCategory).length,
      totalSources: Object.keys(bySource).length,
      estimatedSizeMB: Math.round(routes.length * 0.015 * 100) / 100
    },
    byCategory,
    bySource,
    topCategories: Object.entries(byCategory)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([category, count]) => ({ category, count })),
    sampleRoutes: routes.slice(0, 10),
    categories: [...new Set(routes.map(r => r.category))].sort(),
    sources: [...new Set(routes.map(r => r.source))].sort()
  }, null, 2);
}

// Executar script
if (require.main === module) {
  integrateAllPages().catch(error => {
    console.error('❌ Erro durante a integração:', error);
    process.exit(1);
  });
}