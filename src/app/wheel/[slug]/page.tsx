import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import WheelPage from '@/components/WheelPage';
import { WheelTemplate } from '@/types/wheel';
import { WHEEL_ROUTES } from '@/generated-pages/routes';
import { getStaticPageTemplate } from '@/data/staticPagesMap';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all wheel routes
export async function generateStaticParams() {
  return WHEEL_ROUTES.map((route) => ({
    slug: route.slug,
  }));
}

// Generate metadata for each wheel page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Try to get static template first
  const staticTemplate = getStaticPageTemplate(slug);
  if (staticTemplate) {
    return {
      title: staticTemplate.seoTitle || staticTemplate.title,
      description: staticTemplate.seoDescription || staticTemplate.description,
      keywords: staticTemplate.keywords?.join(', '),
    };
  }
  
  // Fallback to dynamic generation
  const route = WHEEL_ROUTES.find(r => r.slug === slug);
  if (!route) {
    return {
      title: 'Página não encontrada',
      description: 'A página solicitada não foi encontrada.',
    };
  }

  const title = `${route.title} - Roleta Online Grátis`;
  const description = `Use nossa roleta ${route.title} online grátis. Ferramenta perfeita para sorteios, decisões e diversão.`;

  return {
    title,
    description,
    keywords: route.keywords?.join(', '),
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://wheelmaker.app/wheel/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// Function to generate template data based on route
function generateTemplateData(route: any): WheelTemplate {
  const baseItems = [
    { id: 'item-1', label: 'Opção 1', color: '#FF6B6B', weight: 1 },
    { id: 'item-2', label: 'Opção 2', color: '#4ECDC4', weight: 1 },
    { id: 'item-3', label: 'Opção 3', color: '#45B7D1', weight: 1 },
    { id: 'item-4', label: 'Opção 4', color: '#96CEB4', weight: 1 },
    { id: 'item-5', label: 'Opção 5', color: '#FFEAA7', weight: 1 },
    { id: 'item-6', label: 'Opção 6', color: '#DDA0DD', weight: 1 },
  ];

  // Customize items based on category
  if (route.category === 'food') {
    baseItems[0].label = 'Pizza';
    baseItems[1].label = 'Hambúrguer';
    baseItems[2].label = 'Sushi';
    baseItems[3].label = 'Tacos';
    baseItems[4].label = 'Salada';
    baseItems[5].label = 'Surpresa';
  } else if (route.category === 'games') {
    baseItems[0].label = 'Ação';
    baseItems[1].label = 'Aventura';
    baseItems[2].label = 'RPG';
    baseItems[3].label = 'Estratégia';
    baseItems[4].label = 'Esportes';
    baseItems[5].label = 'Puzzle';
  } else if (route.category === 'entertainment') {
    baseItems[0].label = 'Filme';
    baseItems[1].label = 'Série';
    baseItems[2].label = 'Música';
    baseItems[3].label = 'Livro';
    baseItems[4].label = 'Podcast';
    baseItems[5].label = 'Jogo';
  }

  return {
    id: route.slug,
    title: route.title,
    description: route.description,
    category: route.category,
    items: baseItems,
    tags: route.keywords || [],
    usageCount: 0,
    isPopular: false,
    createdAt: new Date().toISOString().split('T')[0],
    slug: route.slug,
    seoTitle: route.title,
    seoDescription: route.description,
    keywords: route.keywords || [],
  };
}

// Main page component
export default async function WheelPageRoute({ params }: PageProps) {
  const { slug } = await params;
  
  // Try to get static template first
  const staticTemplate = getStaticPageTemplate(slug);
  if (staticTemplate) {
    return (
      <WheelPage 
        template={staticTemplate}
        seoTitle={staticTemplate.seoTitle || staticTemplate.title}
        seoDescription={staticTemplate.seoDescription || staticTemplate.description}
      />
    );
  }
  
  // Fallback to dynamic generation
  const route = WHEEL_ROUTES.find(r => r.slug === slug);
  if (!route) {
    notFound();
  }

  const template = generateTemplateData(route);

  return (
    <WheelPage 
      template={template}
      seoTitle={template.seoTitle}
      seoDescription={template.seoDescription}
    />
  );
}