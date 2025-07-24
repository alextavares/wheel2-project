import { WheelTemplate } from '@/types/wheel';
import { Locale } from '@/lib/i18n';
import { generateInternationalTemplates } from '@/lib/internationalTemplates';

// Templates internacionais gerados
const internationalTemplates = generateInternationalTemplates();

// Template específico para a página de comida coreana (português - padrão)
export const wheelTemplate: WheelTemplate = internationalTemplates.pt;

// Mapeamento de páginas estáticas com versões internacionais
export const STATIC_TEMPLATES_MAP: Record<string, WheelTemplate> = {
  // Português (padrão)
  'roleta-comida-coreana-escolha-inteligente': internationalTemplates.pt,
  
  // Inglês
  'korean-food-smart-choice-wheel': internationalTemplates.en,
  
  // Espanhol
  'ruleta-comida-coreana-eleccion-inteligente': internationalTemplates.es,
  
  // Francês
  'roue-cuisine-coreenne-choix-intelligent': internationalTemplates.fr,
};

// Função para obter template de página estática
export function getStaticPageTemplate(slug: string): WheelTemplate | null {
  return STATIC_TEMPLATES_MAP[slug] || null;
}

// Função para obter template por idioma
export function getTemplateByLocale(locale: Locale): WheelTemplate {
  return internationalTemplates[locale];
}

// Função para obter todos os slugs disponíveis
export function getAllStaticSlugs(): string[] {
  return Object.keys(STATIC_TEMPLATES_MAP);
}

// Função para obter slug por idioma
export function getSlugByLocale(locale: Locale): string {
  const template = internationalTemplates[locale];
  return template.slug;
}