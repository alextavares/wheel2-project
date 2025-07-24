// Gerador de páginas estáticas internacionais
import { WheelTemplate } from '@/types/wheel';
import { Locale, t, generateLocalizedSlug } from '@/lib/i18n';

// Template base para comida coreana em diferentes idiomas
export function generateKoreanFoodTemplate(locale: Locale): WheelTemplate {
  const baseTemplate = {
    id: `korean-food-${locale}`,
    category: 'food',
    usageCount: 983,
    isPopular: false,
    createdAt: '2025-07-23',
    version: '2.0',
    lastModified: '2025-07-23',
    author: 'AI Enhanced Generator',
  };

  switch (locale) {
    case 'en':
      return {
        ...baseTemplate,
        title: 'Korean Food Smart Choice Wheel',
        description: 'Free tool to spin Korean food smart choice wheel. Simple, fast and fun!',
        slug: 'korean-food-smart-choice-wheel',
        seoTitle: 'Korean Food Smart Choice Wheel | Free Online Wheel',
        seoDescription: 'Use our Korean Food Smart Choice wheel online for free. Perfect tool for raffles, decisions and fun.',
        keywords: [
          'korean food wheel',
          'choose korean food',
          'korean food raffle',
          'korean food decision',
          'korean food trending',
          'wheel for trending',
          'spin food',
          'korean food luck wheel'
        ],
        items: [
          { id: 'item-0', label: 'Korean Food', color: '#FF6B6B', weight: 1.964585499846787 },
          { id: 'item-1', label: 'Option 2', color: '#4ECDC4', weight: 1.3502485528499493 },
          { id: 'item-2', label: 'Option 3', color: '#45B7D1', weight: 1.8574529237897617 },
          { id: 'item-3', label: 'Option 4', color: '#96CEB4', weight: 2.32857225379648 },
          { id: 'item-4', label: 'Surprise', color: '#FFEAA7', weight: 2.779446873854484 },
          { id: 'item-5', label: "Chef's Choice", color: '#DDA0DD', weight: 1.7311701964229855 }
        ],
        tags: [
          'korean food wheel',
          'choose korean food',
          'korean food raffle',
          'korean food decision',
          'korean food trending',
          'wheel for trending',
          'spin food',
          'korean food luck wheel'
        ],
      };

    case 'es':
      return {
        ...baseTemplate,
        title: 'Ruleta Comida Coreana - Elección Inteligente',
        description: 'Herramienta gratuita para girar ruleta comida coreana - elección inteligente. ¡Simple, rápido y divertido!',
        slug: 'ruleta-comida-coreana-eleccion-inteligente',
        seoTitle: 'Ruleta Comida Coreana - Elección Inteligente | Ruleta Gratis Online',
        seoDescription: 'Usa nuestra ruleta Comida Coreana - Elección Inteligente online gratis. Herramienta perfecta para sorteos, decisiones y diversión.',
        keywords: [
          'ruleta comida coreana',
          'elegir comida coreana',
          'sorteo comida coreana',
          'decisión comida coreana',
          'comida coreana trending',
          'ruleta para trending',
          'sortear comida',
          'rueda de la suerte comida coreana'
        ],
        items: [
          { id: 'item-0', label: 'Comida Coreana', color: '#FF6B6B', weight: 1.964585499846787 },
          { id: 'item-1', label: 'Opción 2', color: '#4ECDC4', weight: 1.3502485528499493 },
          { id: 'item-2', label: 'Opción 3', color: '#45B7D1', weight: 1.8574529237897617 },
          { id: 'item-3', label: 'Opción 4', color: '#96CEB4', weight: 2.32857225379648 },
          { id: 'item-4', label: 'Sorpresa', color: '#FFEAA7', weight: 2.779446873854484 },
          { id: 'item-5', label: 'Elección del Chef', color: '#DDA0DD', weight: 1.7311701964229855 }
        ],
        tags: [
          'ruleta comida coreana',
          'elegir comida coreana',
          'sorteo comida coreana',
          'decisión comida coreana',
          'comida coreana trending',
          'ruleta para trending',
          'sortear comida',
          'rueda de la suerte comida coreana'
        ],
      };

    case 'fr':
      return {
        ...baseTemplate,
        title: 'Roue Cuisine Coréenne - Choix Intelligent',
        description: 'Outil gratuit pour faire tourner la roue cuisine coréenne - choix intelligent. Simple, rapide et amusant!',
        slug: 'roue-cuisine-coreenne-choix-intelligent',
        seoTitle: 'Roue Cuisine Coréenne - Choix Intelligent | Roue Gratuite en Ligne',
        seoDescription: 'Utilisez notre roue Cuisine Coréenne - Choix Intelligent en ligne gratuitement. Outil parfait pour les tirages, décisions et plaisir.',
        keywords: [
          'roue cuisine coréenne',
          'choisir cuisine coréenne',
          'tirage cuisine coréenne',
          'décision cuisine coréenne',
          'cuisine coréenne trending',
          'roue pour trending',
          'tirer nourriture',
          'roue de la chance cuisine coréenne'
        ],
        items: [
          { id: 'item-0', label: 'Cuisine Coréenne', color: '#FF6B6B', weight: 1.964585499846787 },
          { id: 'item-1', label: 'Option 2', color: '#4ECDC4', weight: 1.3502485528499493 },
          { id: 'item-2', label: 'Option 3', color: '#45B7D1', weight: 1.8574529237897617 },
          { id: 'item-3', label: 'Option 4', color: '#96CEB4', weight: 2.32857225379648 },
          { id: 'item-4', label: 'Surprise', color: '#FFEAA7', weight: 2.779446873854484 },
          { id: 'item-5', label: 'Choix du Chef', color: '#DDA0DD', weight: 1.7311701964229855 }
        ],
        tags: [
          'roue cuisine coréenne',
          'choisir cuisine coréenne',
          'tirage cuisine coréenne',
          'décision cuisine coréenne',
          'cuisine coréenne trending',
          'roue pour trending',
          'tirer nourriture',
          'roue de la chance cuisine coréenne'
        ],
      };

    default: // pt
      return {
        ...baseTemplate,
        title: 'Roleta: Comida Coreana - Escolha Inteligente',
        description: 'Ferramenta gratuita para sortear roleta: comida coreana - escolha inteligente. Simples, rápido e divertido!',
        slug: 'roleta-comida-coreana-escolha-inteligente',
        seoTitle: 'Roleta: Comida Coreana - Escolha Inteligente | Roleta Grátis Online',
        seoDescription: 'Use nossa roleta Roleta: Comida Coreana - Escolha Inteligente online grátis. Ferramenta perfeita para sorteios, decisões e diversão.',
        keywords: [
          'roleta comida coreana',
          'escolher comida coreana',
          'sorteio comida coreana',
          'decisão comida coreana',
          'comida coreana trending',
          'roleta para trending',
          'sortear food',
          'roda da sorte comida coreana'
        ],
        items: [
          { id: 'item-0', label: 'Comida Coreana', color: '#FF6B6B', weight: 1.964585499846787 },
          { id: 'item-1', label: 'Opção 2', color: '#4ECDC4', weight: 1.3502485528499493 },
          { id: 'item-2', label: 'Opção 3', color: '#45B7D1', weight: 1.8574529237897617 },
          { id: 'item-3', label: 'Opção 4', color: '#96CEB4', weight: 2.32857225379648 },
          { id: 'item-4', label: 'Surpresa', color: '#FFEAA7', weight: 2.779446873854484 },
          { id: 'item-5', label: 'Escolha do Chef', color: '#DDA0DD', weight: 1.7311701964229855 }
        ],
        tags: [
          'roleta comida coreana',
          'escolher comida coreana',
          'sorteio comida coreana',
          'decisão comida coreana',
          'comida coreana trending',
          'roleta para trending',
          'sortear food',
          'roda da sorte comida coreana'
        ],
      };
  }
}

// Função para gerar todas as versões internacionais
export function generateInternationalTemplates(): Record<Locale, WheelTemplate> {
  const locales: Locale[] = ['pt', 'en', 'es', 'fr'];
  const templates: Record<Locale, WheelTemplate> = {} as Record<Locale, WheelTemplate>;
  
  locales.forEach(locale => {
    templates[locale] = generateKoreanFoodTemplate(locale);
  });
  
  return templates;
}