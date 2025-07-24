import { MetadataRoute } from 'next';
import { WHEEL_ROUTES } from '@/generated-pages/routes';
import { getAllStaticSlugs } from '@/data/staticPagesMap';
import { Locale } from '@/lib/i18n';

// URLs base para diferentes idiomas
const BASE_URLS: Record<Locale, string> = {
  pt: 'https://wheelmaker.app',
  en: 'https://wheelmaker.app/en',
  es: 'https://wheelmaker.app/es',
  fr: 'https://wheelmaker.app/fr',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticSlugs = getAllStaticSlugs();
  const currentDate = new Date();
  
  // URLs estáticas principais em todos os idiomas
  const staticUrls: MetadataRoute.Sitemap = [
    // Página inicial em todos os idiomas
    {
      url: BASE_URLS.pt,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: BASE_URLS.en,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: BASE_URLS.es,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: BASE_URLS.fr,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  // Páginas de categoria em todos os idiomas
  const categories = ['food', 'games', 'education', 'movies', 'music', 'decisions'];
  const categoryUrls: MetadataRoute.Sitemap = [];
  
  Object.entries(BASE_URLS).forEach(([locale, baseUrl]) => {
    categories.forEach(category => {
      categoryUrls.push({
        url: `${baseUrl}/category/${category}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      });
    });
  });

  // URLs das páginas de roleta estáticas (versões internacionais)
  const staticWheelUrls: MetadataRoute.Sitemap = staticSlugs.map(slug => {
    // Determinar o idioma baseado no slug
    let baseUrl = BASE_URLS.pt;
    
    if (slug.includes('korean-food-smart-choice-wheel')) {
      baseUrl = BASE_URLS.en;
    } else if (slug.includes('ruleta-comida-coreana-eleccion-inteligente')) {
      baseUrl = BASE_URLS.es;
    } else if (slug.includes('roue-cuisine-coreenne-choix-intelligent')) {
      baseUrl = BASE_URLS.fr;
    }

    return {
      url: `${baseUrl}/wheel/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // Prioridade alta para páginas estáticas
    };
  });

  // Páginas das roletas geradas dinamicamente (apenas português por enquanto)
  const dynamicWheelUrls: MetadataRoute.Sitemap = WHEEL_ROUTES.map((route) => ({
    url: `${BASE_URLS.pt}/wheel/${route.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticUrls, ...categoryUrls, ...staticWheelUrls, ...dynamicWheelUrls];
}