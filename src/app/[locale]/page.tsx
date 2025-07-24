import { Metadata } from 'next';
import { Locale, useTranslations } from '@/lib/i18n';
import HomePage from '@/components/HomePage';

interface Props {
  params: {
    locale: Locale;
  };
}

// Gerar parâmetros estáticos para as páginas
export async function generateStaticParams() {
  const locales: Locale[] = ['pt', 'en', 'es', 'fr'];
  return locales.map(locale => ({ locale }));
}

// Gerar metadados
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  
  const titles = {
    pt: 'Roleta Online Grátis | Ferramenta de Sorteio e Decisão',
    en: 'Free Online Wheel | Raffle and Decision Tool',
    es: 'Ruleta Online Gratis | Herramienta de Sorteo y Decisión',
    fr: 'Roue en Ligne Gratuite | Outil de Tirage et Décision',
  };
  
  const descriptions = {
    pt: 'Crie roletas personalizadas online grátis. Ferramenta perfeita para sorteios, decisões e diversão. Simples, rápido e divertido!',
    en: 'Create custom wheels online for free. Perfect tool for raffles, decisions and fun. Simple, fast and entertaining!',
    es: 'Crea ruletas personalizadas online gratis. Herramienta perfecta para sorteos, decisiones y diversión. ¡Simple, rápido y divertido!',
    fr: 'Créez des roues personnalisées en ligne gratuitement. Outil parfait pour les tirages, décisions et plaisir. Simple, rapide et amusant!',
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      type: 'website',
    },
  };
}

// Componente da página
export default function InternationalHomePage({ params }: Props) {
  const { locale } = params;
  
  return <HomePage locale={locale} />;
}