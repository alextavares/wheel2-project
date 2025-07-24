// Sistema de Geração de Páginas Estáticas para SEO
import { generateMassiveTemplateCollection, searchTemplatesSEO, getTemplatesByCategorySEO, getPopularTemplatesSEO, CATEGORY_CONFIG } from '../data/massiveTemplateGenerator';
import { WheelTemplate } from '../data/templates';
import fs from 'fs';
import path from 'path';

interface StaticPage {
  slug: string;
  template: WheelTemplate & {
    slug: string;
    seoTitle: string;
    seoDescription: string;
    keywords: string[];
  };
  metadata: {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
    openGraph: {
      title: string;
      description: string;
      type: string;
      url: string;
      image: string;
    };
  };
}

export class SEOPageGenerator {
  private templates: WheelTemplate[] = [];
  private staticPages: StaticPage[] = [];
  private outputDir: string;

  constructor(outputDir: string = './generated-pages') {
    this.outputDir = outputDir;
  }

  async generateAllPages(): Promise<void> {
    console.log('🚀 Iniciando geração de 10.000 páginas SEO...');
    
    // 1. Gerar templates
    console.log('📝 Gerando templates...');
    this.templates = generateMassiveTemplateCollection();
    console.log(`✅ ${this.templates.length} templates gerados`);

    // 2. Gerar páginas estáticas
    console.log('🔧 Gerando páginas estáticas...');
    this.staticPages = this.generateStaticPagesFromTemplates(this.templates);
    console.log(`✅ ${this.staticPages.length} páginas estáticas geradas`);

    // 3. Criar estrutura de diretórios
    await this.createDirectoryStructure();

    // 4. Gerar páginas individuais
    await this.generateIndividualPages();

    // 5. Gerar páginas de categoria
    await this.generateCategoryPages();

    // 6. Gerar sitemap
    await this.generateSitemapFile();

    // 7. Gerar robots.txt
    await this.generateRobotsFile();

    // 8. Gerar arquivo de rotas para Next.js
    await this.generateNextJSRoutes();

    console.log('🎉 Geração completa! 10.000 páginas SEO criadas.');
  }

  public async createDirectoryStructure(): Promise<void> {
    const dirs = [
      this.outputDir,
      `${this.outputDir}/wheels`,
      `${this.outputDir}/categories`,
      `${this.outputDir}/sitemaps`,
      `${this.outputDir}/api`,
      `${this.outputDir}/components`
    ];

    for (const dir of dirs) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }
  }

  public generateStaticPagesFromTemplates(templates: WheelTemplate[]): StaticPage[] {
    return templates.map(template => {
      const slug = template.title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      return {
        slug,
        template: {
          ...template,
          slug,
          seoTitle: `${template.title} - Roleta Online Grátis`,
          seoDescription: `Use nossa roleta ${template.title} online grátis. Ferramenta perfeita para sorteios, decisões e diversão.`,
          keywords: template.tags || []
        },
        metadata: {
          title: `${template.title} - Roleta Online Grátis`,
          description: `Use nossa roleta ${template.title} online grátis. Ferramenta perfeita para sorteios, decisões e diversão.`,
          keywords: (template.tags || []).join(', '),
          canonical: `https://wheelmaker.app/wheel/${slug}`,
          openGraph: {
            title: `${template.title} - Roleta Online Grátis`,
            description: `Use nossa roleta ${template.title} online grátis. Ferramenta perfeita para sorteios, decisões e diversão.`,
            type: 'website',
            url: `https://wheelmaker.app/wheel/${slug}`,
            image: `https://wheelmaker.app/api/og/wheel/${slug}`
          }
        }
      };
    });
  }

  private generateSitemapContent(templates: WheelTemplate[]): string {
    const baseUrl = 'https://wheelmaker.app';
    const currentDate = new Date().toISOString().split('T')[0];
    
    let urls = `  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

    // Adicionar páginas de categoria
    Object.keys(CATEGORY_CONFIG).forEach(categoryKey => {
      urls += `
  <url>
    <loc>${baseUrl}/category/${categoryKey}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    // Adicionar páginas individuais
    this.staticPages.forEach(page => {
      urls += `
  <url>
    <loc>${baseUrl}/wheel/${page.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  }

  private async generateIndividualPages(): Promise<void> {
    console.log('📄 Gerando páginas individuais...');
    
    for (let i = 0; i < this.staticPages.length; i++) {
      const page = this.staticPages[i];
      const pageContent = this.generateWheelPageContent(page);
      
      const filePath = `${this.outputDir}/wheels/${page.slug}.tsx`;
      fs.writeFileSync(filePath, pageContent);

      if (i % 1000 === 0) {
        console.log(`📄 ${i + 1}/${this.staticPages.length} páginas geradas`);
      }
    }
  }

  private generateWheelPageContent(page: StaticPage): string {
    return `// Página gerada automaticamente para SEO
import React from 'react';
import { Metadata } from 'next';
import WheelPage from '@/components/WheelPage';
import { WheelTemplate } from '@/types/wheel';

// Template data
const wheelTemplate: WheelTemplate = ${JSON.stringify(page.template, null, 2)};

// SEO Metadata
export const metadata: Metadata = {
  title: '${page.metadata.title}',
  description: '${page.metadata.description}',
  keywords: '${page.metadata.keywords}',
  canonical: '${page.metadata.canonical}',
  openGraph: {
    title: '${page.metadata.openGraph.title}',
    description: '${page.metadata.openGraph.description}',
    type: '${page.metadata.openGraph.type}',
    url: '${page.metadata.openGraph.url}',
    images: [
      {
        url: '${page.metadata.openGraph.image}',
        width: 1200,
        height: 630,
        alt: '${page.metadata.title}'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '${page.metadata.title}',
    description: '${page.metadata.description}',
    images: ['${page.metadata.openGraph.image}']
  },
  alternates: {
    canonical: '${page.metadata.canonical}'
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
  "name": "${page.metadata.title}",
  "description": "${page.metadata.description}",
  "url": "${page.metadata.canonical}",
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

export default function ${page.slug.replace(/-/g, '')}Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <WheelPage 
        template={wheelTemplate}
        seoTitle="${page.metadata.title}"
        seoDescription="${page.metadata.description}"
      />
    </>
  );
}

// Generate static params for static generation
export async function generateStaticParams() {
  return [{ slug: '${page.slug}' }];
}
`;
  }

  private async generateCategoryPages(): Promise<void> {
    console.log('📂 Gerando páginas de categoria...');
    
    Object.entries(CATEGORY_CONFIG).forEach(([key, category]) => {
      const categoryTemplates = this.templates.filter(t => t.category === key);
      const pageContent = this.generateCategoryPageContent(category, categoryTemplates, key);
      
      const filePath = `${this.outputDir}/categories/${key}.tsx`;
      fs.writeFileSync(filePath, pageContent);
    });
  }

  private generateCategoryPageContent(category: any, templates: WheelTemplate[], categoryKey: string): string {
    return `// Página de categoria gerada automaticamente
import React from 'react';
import { Metadata } from 'next';
import CategoryPage from '@/components/CategoryPage';
import { WheelTemplate } from '@/types/wheel';

// Category data
const categoryData = ${JSON.stringify(category, null, 2)};

// Templates for this category
const categoryTemplates: WheelTemplate[] = ${JSON.stringify(templates.slice(0, 50), null, 2)}; // Primeiros 50 para performance

// SEO Metadata
export const metadata: Metadata = {
  title: '${category.name} - Roletas e Sorteios',
  description: 'Descubra roletas e sorteios para ${category.name}. Crie suas próprias roletas personalizadas.',
  keywords: '${category.keywords?.join(', ') || ''}, roleta, sorteio, escolha aleatória',
  canonical: 'https://wheelmaker.app/category/${categoryKey}',
  openGraph: {
    title: '${category.name} - Roletas e Sorteios',
    description: 'Descubra roletas e sorteios para ${category.name}. Crie suas próprias roletas personalizadas.',
    type: 'website',
    url: 'https://wheelmaker.app/category/${categoryKey}',
    images: [
      {
        url: 'https://wheelmaker.app/api/og/category/${categoryKey}',
        width: 1200,
        height: 630,
        alt: '${category.name} - Roletas e Sorteios'
      }
    ]
  }
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#3B82F6'
  }
}

export default function ${categoryKey}CategoryPage() {
  return (
    <CategoryPage 
      category={categoryData}
      templates={categoryTemplates}
      totalTemplates={${templates.length}}
    />
  );
}
`;
  }

  private async generateSitemapFile(): Promise<void> {
    console.log('🗺️ Gerando sitemap...');
    
    const sitemap = this.generateSitemapContent(this.templates);
    fs.writeFileSync(`${this.outputDir}/sitemap.xml`, sitemap);

    // Gerar sitemap index para dividir em chunks
    const sitemapIndex = this.generateSitemapIndex();
    fs.writeFileSync(`${this.outputDir}/sitemap-index.xml`, sitemapIndex);
  }

  private generateSitemapIndex(): string {
    const chunkSize = 50000; // Máximo de URLs por sitemap
    const chunks = Math.ceil(this.templates.length / chunkSize);
    
    let sitemaps = '';
    for (let i = 0; i < chunks; i++) {
      sitemaps += `
  <sitemap>
    <loc>https://wheelmaker.app/sitemap-${i + 1}.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>`;
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemaps}
</sitemapindex>`;
  }

  private async generateRobotsFile(): Promise<void> {
    const robots = `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://wheelmaker.app/sitemap-index.xml
Sitemap: https://wheelmaker.app/sitemap.xml

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

    fs.writeFileSync(`${this.outputDir}/robots.txt`, robots);
  }

  private async generateNextJSRoutes(): Promise<void> {
    console.log('🛣️ Gerando rotas Next.js...');
    
    // Gerar arquivo de rotas dinâmicas
    const routesContent = `// Rotas geradas automaticamente para 10.000 páginas
export const WHEEL_ROUTES = ${JSON.stringify(
      this.staticPages.map(page => ({
        slug: page.slug,
        category: page.template.category,
        title: page.template.title
      })), 
      null, 
      2
    )};

export const CATEGORY_ROUTES = ${JSON.stringify(
      Object.entries(CATEGORY_CONFIG).map(([key, cat]) => ({
        id: key,
        name: cat.name,
        slug: key
      })),
      null,
      2
    )};

// Função para buscar rota por slug
export function getRouteBySlug(slug: string) {
  return WHEEL_ROUTES.find(route => route.slug === slug);
}

// Função para buscar rotas por categoria
export function getRoutesByCategory(category: string) {
  return WHEEL_ROUTES.filter(route => route.category === category);
}
`;

    fs.writeFileSync(`${this.outputDir}/routes.ts`, routesContent);

    // Gerar middleware para redirecionamentos
    const middlewareContent = `// Middleware para redirecionamentos e SEO
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Redirecionamento para URLs canônicas
  if (url.pathname.includes('//')) {
    url.pathname = url.pathname.replace(/\/+/g, '/');
    return NextResponse.redirect(url);
  }
  
  // Headers de segurança
  const response = NextResponse.next();
  
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
`;

    fs.writeFileSync(`${this.outputDir}/middleware.ts`, middlewareContent);
  }

  // Método para gerar em lotes (para não sobrecarregar)
  async generateInBatches(batchSize: number = 1000): Promise<void> {
    console.log('🔄 Gerando em lotes para otimizar performance...');
    
    this.templates = generateMassiveTemplateCollection();
    this.staticPages = this.generateStaticPagesFromTemplates(this.templates);
    
    await this.createDirectoryStructure();
    
    // Processar em lotes
    for (let i = 0; i < this.staticPages.length; i += batchSize) {
      const batch = this.staticPages.slice(i, i + batchSize);
      
      console.log(`📦 Processando lote ${Math.floor(i / batchSize) + 1}/${Math.ceil(this.staticPages.length / batchSize)}`);
      
      for (const page of batch) {
        const pageContent = this.generateWheelPageContent(page);
        const filePath = `${this.outputDir}/wheels/${page.slug}.tsx`;
        fs.writeFileSync(filePath, pageContent);
      }
      
      // Pequena pausa para não sobrecarregar
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    await this.generateCategoryPages();
    await this.generateSitemapFile();
    await this.generateRobotsFile();
    await this.generateNextJSRoutes();
    
    console.log('✅ Geração em lotes concluída!');
  }
}

// Script de execução
export async function runSEOGeneration() {
  const generator = new SEOPageGenerator('./src/generated-pages');
  await generator.generateInBatches(1000);
}

// Função para gerar apenas uma amostra (para testes)
export async function generateSample(count: number = 100) {
  console.log(`🧪 Gerando amostra de ${count} páginas para teste...`);
  
  const generator = new SEOPageGenerator('./src/sample-pages');
  const templates = generateMassiveTemplateCollection().slice(0, count);
  const staticPages = generator.generateStaticPagesFromTemplates(templates);
  
  // Definir propriedades usando métodos públicos
  generator['templates'] = templates;
  generator['staticPages'] = staticPages;
  
  await generator.createDirectoryStructure();
  await generator['generateIndividualPages']();
  await generator['generateCategoryPages']();
  await generator['generateSitemapFile']();
  
  console.log(`✅ Amostra de ${count} páginas gerada!`);
}