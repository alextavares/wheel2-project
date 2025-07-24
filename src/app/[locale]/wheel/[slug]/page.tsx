import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { WHEEL_ROUTES } from '@/generated-pages/routes';
import { getStaticPageTemplate } from '@/data/staticPagesMap';
import { Locale } from '@/lib/i18n';
import WheelPage from '@/components/WheelPage';

interface Props {
  params: {
    locale: Locale;
    slug: string;
  };
}

// Gerar parâmetros estáticos para as páginas
export async function generateStaticParams() {
  const locales: Locale[] = ['pt', 'en', 'es', 'fr'];
  const params: Array<{ locale: Locale; slug: string }> = [];

  // Adicionar páginas estáticas para cada idioma
  locales.forEach(locale => {
    if (locale === 'pt') {
      params.push({ locale, slug: 'roleta-comida-coreana-escolha-inteligente' });
    } else if (locale === 'en') {
      params.push({ locale, slug: 'korean-food-smart-choice-wheel' });
    } else if (locale === 'es') {
      params.push({ locale, slug: 'ruleta-comida-coreana-eleccion-inteligente' });
    } else if (locale === 'fr') {
      params.push({ locale, slug: 'roue-cuisine-coreenne-choix-intelligent' });
    }
  });

  // Adicionar páginas dinâmicas apenas para português
  WHEEL_ROUTES.forEach(route => {
    params.push({ locale: 'pt', slug: route.slug });
  });

  return params;
}

// Gerar metadados
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  
  // Tentar obter template estático primeiro
  const staticTemplate = getStaticPageTemplate(slug);
  
  if (staticTemplate) {
    return {
      title: staticTemplate.seoTitle,
      description: staticTemplate.seoDescription,
      keywords: staticTemplate.keywords,
      openGraph: {
        title: staticTemplate.seoTitle,
        description: staticTemplate.seoDescription,
        type: 'website',
      },
    };
  }

  // Fallback para páginas dinâmicas
  const route = WHEEL_ROUTES.find(r => r.slug === slug);
  if (route) {
    return {
      title: `${route.title} | Roleta Grátis Online`,
      description: `Use nossa roleta ${route.title} online grátis. Ferramenta perfeita para sorteios, decisões e diversão.`,
    };
  }

  return {
    title: 'Página não encontrada',
    description: 'A página solicitada não foi encontrada.',
  };
}

// Componente da página
export default function InternationalWheelPage({ params }: Props) {
  const { locale, slug } = params;
  
  // Tentar obter template estático primeiro
  const staticTemplate = getStaticPageTemplate(slug);
  
  if (staticTemplate) {
    return <WheelPage template={staticTemplate} />;
  }

  // Fallback para páginas dinâmicas (apenas português)
  if (locale === 'pt') {
    const route = WHEEL_ROUTES.find(r => r.slug === slug);
    if (route) {
      // Aqui você pode gerar um template dinâmico baseado na rota
      // Por enquanto, vamos retornar not found
      notFound();
    }
  }

  notFound();
}