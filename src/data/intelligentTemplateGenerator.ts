// Enhanced Template Generator - Baseado nas melhores práticas das 4 IAs
// Combina estratégias do Qwen (long-tail), Claude (APIs), Gemini (combinação) e GPT-4 (programático)

import { SEOEnhancedTemplate, SEOMetadata, CATEGORY_CONFIG } from './massiveTemplateGenerator';
import { 
  ENHANCED_CATEGORY_ITEMS, 
  TEMPLATE_GENERATORS, 
  LONG_TAIL_PATTERNS,
  REAL_WORLD_DATA 
} from './enhancedDataSources';
import { generateSEOFriendlyURL, urlGenerator } from '../utils/advancedURLGenerator';

interface EnhancedGenerationConfig {
  useRealWorldData: boolean;
  useLongTailKeywords: boolean;
  generateVariations: boolean;
  maxVariationsPerBase: number;
  includeSeasonalContent: boolean;
  includeTrendingContent: boolean;
}

export class IntelligentTemplateGenerator {
  private config: EnhancedGenerationConfig;
  private generatedSlugs: Set<string> = new Set();

  constructor(config: Partial<EnhancedGenerationConfig> = {}) {
    this.config = {
      useRealWorldData: true,
      useLongTailKeywords: true,
      generateVariations: true,
      maxVariationsPerBase: 5,
      includeSeasonalContent: true,
      includeTrendingContent: true,
      ...config
    };
  }

  /**
   * 🎯 Estratégia Qwen: Gera templates baseados em long-tail keywords reais
   */
  generateLongTailTemplates(category: keyof typeof ENHANCED_CATEGORY_ITEMS, count: number): SEOEnhancedTemplate[] {
    const templates: SEOEnhancedTemplate[] = [];
    const categoryData = ENHANCED_CATEGORY_ITEMS[category];
    const longTailPatterns = LONG_TAIL_PATTERNS[category] || [];

    for (let i = 0; i < count && templates.length < count; i++) {
      // Combinar elementos para criar variações únicas
      const subcategories = Object.keys(categoryData);
      const subcategory = subcategories[i % subcategories.length];
      const items = categoryData[subcategory as keyof typeof categoryData] as string[];
      const item = items[i % items.length];
      const pattern = longTailPatterns[i % longTailPatterns.length];

      // Gerar título SEO otimizado
      const title = TEMPLATE_GENERATORS.generateSEOTitle(category, item, subcategory, pattern);
      const slug = this.generateUniqueSlug(title, category);
      
      if (!this.generatedSlugs.has(slug)) {
        this.generatedSlugs.add(slug);
        templates.push(this.createEnhancedTemplate(category, title, item, subcategory, i));
      }
    }

    return templates;
  }

  /**
   * 🎯 Estratégia Claude: Integra dados de fontes externas (simulado)
   */
  generateFromExternalSources(category: string, count: number): SEOEnhancedTemplate[] {
    const templates: SEOEnhancedTemplate[] = [];
    
    // Verificar se a categoria existe nos dados reais
    const realData = REAL_WORLD_DATA[category as keyof typeof REAL_WORLD_DATA];
    if (!realData) {
      // Se não existir, usar dados genéricos
      return this.generateProgrammaticTemplates(category, count);
    }

    // Simular dados de APIs externas
    const externalData = Array.isArray(realData) ? realData : Object.values(realData).flat();

    for (let i = 0; i < count && i < externalData.length; i++) {
      const item = externalData[i];
      const title = `Roleta: ${item} - Escolha Inteligente`;
      const slug = this.generateUniqueSlug(title, category);

      if (!this.generatedSlugs.has(slug)) {
        this.generatedSlugs.add(slug);
        templates.push(this.createEnhancedTemplate(category, title, item, 'trending', i));
      }
    }

    return templates;
  }

  /**
   * 🎯 Estratégia Gemini: Combinação matemática inteligente
   */
  generateCombinationalTemplates(category: keyof typeof ENHANCED_CATEGORY_ITEMS, count: number): SEOEnhancedTemplate[] {
    const templates: SEOEnhancedTemplate[] = [];
    const categoryData = ENHANCED_CATEGORY_ITEMS[category];
    
    // Obter todas as combinações possíveis
    const combinations = this.generateAllCombinations(categoryData);
    
    for (let i = 0; i < count && i < combinations.length; i++) {
      const combo = combinations[i];
      const title = `${combo.type} ${combo.item} ${combo.modifier} - ${combo.context}`;
      const slug = this.generateUniqueSlug(title, category);

      if (!this.generatedSlugs.has(slug)) {
        this.generatedSlugs.add(slug);
        templates.push(this.createEnhancedTemplate(category, title, combo.item, combo.type, i));
      }
    }

    return templates;
  }

  /**
   * 🎯 Estratégia GPT-4: Geração programática avançada com IA
   */
  generateProgrammaticTemplates(category: string, count: number): SEOEnhancedTemplate[] {
    const templates: SEOEnhancedTemplate[] = [];
    
    // Padrões programáticos baseados em comportamento do usuário
    const userBehaviorPatterns = [
      "não consigo decidir",
      "preciso escolher",
      "qual é o melhor",
      "me ajude a decidir",
      "sorteio justo",
      "escolha aleatória"
    ];

    const timeContexts = [
      "hoje", "agora", "fim de semana", "feriado", "noite", "manhã", "tarde"
    ];

    const emotionalContexts = [
      "divertido", "relaxante", "emocionante", "nostálgico", "energizante", "inspirador"
    ];

    for (let i = 0; i < count; i++) {
      const behavior = userBehaviorPatterns[i % userBehaviorPatterns.length];
      const timeContext = timeContexts[i % timeContexts.length];
      const emotion = emotionalContexts[i % emotionalContexts.length];
      
      const title = `Roleta ${emotion} para ${behavior} ${timeContext}`;
      const slug = this.generateUniqueSlug(title, category);

      if (!this.generatedSlugs.has(slug)) {
        this.generatedSlugs.add(slug);
        templates.push(this.createEnhancedTemplate(category as any, title, behavior, emotion, i));
      }
    }

    return templates;
  }

  /**
   * 🚀 Gerador Master: Combina todas as estratégias
   */
  generateIntelligentCollection(totalCount: number = 10000): SEOEnhancedTemplate[] {
    const templates: SEOEnhancedTemplate[] = [];
    const categories = Object.keys(ENHANCED_CATEGORY_ITEMS);
    const templatesPerCategory = Math.floor(totalCount / categories.length);

    categories.forEach(category => {
      const categoryTemplates: SEOEnhancedTemplate[] = [];
      
      // 40% Long-tail (Qwen)
      const longTailCount = Math.floor(templatesPerCategory * 0.4);
      if (category in ENHANCED_CATEGORY_ITEMS) {
        categoryTemplates.push(...this.generateLongTailTemplates(category as keyof typeof ENHANCED_CATEGORY_ITEMS, longTailCount));
      }
      
      // 25% Dados externos (Claude)
      const externalCount = Math.floor(templatesPerCategory * 0.25);
      categoryTemplates.push(...this.generateFromExternalSources(category, externalCount));
      
      // 25% Combinacional (Gemini)
      const combinationalCount = Math.floor(templatesPerCategory * 0.25);
      if (category in ENHANCED_CATEGORY_ITEMS) {
        categoryTemplates.push(...this.generateCombinationalTemplates(category as keyof typeof ENHANCED_CATEGORY_ITEMS, combinationalCount));
      }
      
      // 10% Programático (GPT-4)
      const programmaticCount = templatesPerCategory - categoryTemplates.length;
      if (programmaticCount > 0) {
        categoryTemplates.push(...this.generateProgrammaticTemplates(category, programmaticCount));
      }

      templates.push(...categoryTemplates);
    });

    // Completar até o total se necessário
    while (templates.length < totalCount) {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const extraTemplates = this.generateProgrammaticTemplates(randomCategory, 1);
      if (extraTemplates.length > 0) {
        templates.push(extraTemplates[0]);
      } else {
        break; // Evitar loop infinito
      }
    }

    return templates.slice(0, totalCount);
  }

  // Métodos auxiliares
  private generateUniqueSlug(title: string, category?: string): string {
    // Usar o sistema avançado de URLs
    const optimizedSlug = generateSEOFriendlyURL(
      title, 
      category || 'random',
      {
        intent: 'choose',
        audience: 'geral'
      }
    );
    
    // Garantir unicidade
    let slug = optimizedSlug;
    let counter = 1;
    
    while (this.generatedSlugs.has(slug)) {
      // Usar sufixos semânticos em vez de números
      const semanticSuffixes = ['v2', 'plus', 'pro', 'especial', 'novo'];
      const suffix = counter <= semanticSuffixes.length 
        ? semanticSuffixes[counter - 1]
        : counter.toString();
      
      slug = `${optimizedSlug}-${suffix}`;
      counter++;
    }
    
    return slug;
  }

  private generateAllCombinations(categoryData: any): any[] {
    const combinations: any[] = [];
    const keys = Object.keys(categoryData);
    
    keys.forEach(type => {
      const items = categoryData[type];
      items.forEach((item: string) => {
        keys.forEach(modifierKey => {
          if (modifierKey !== type) {
            const modifiers = categoryData[modifierKey];
            modifiers.forEach((modifier: string) => {
              combinations.push({
                type,
                item,
                modifier,
                context: `${type} ${modifier}`
              });
            });
          }
        });
      });
    });
    
    return combinations;
  }

  private createEnhancedTemplate(
    category: string, 
    title: string, 
    mainItem: string, 
    subcategory: string, 
    index: number
  ): SEOEnhancedTemplate {
    // Verificar se a categoria existe no CATEGORY_CONFIG
    const validCategory = category in CATEGORY_CONFIG ? category as keyof typeof CATEGORY_CONFIG : 'random';
    const config = CATEGORY_CONFIG[validCategory];
    const slug = this.generateUniqueSlug(title, category);
    
    // Gerar itens da roleta baseados no contexto
    const items = this.generateContextualItems(category, mainItem, subcategory);
    
    // Analisar qualidade da URL
    const urlQuality = urlGenerator.analyzeURLQuality(slug);
    
    return {
      id: `enhanced-${category}-${index}`,
      title,
      description: TEMPLATE_GENERATORS.generateDescription(category, title),
      category,
      items,
      tags: TEMPLATE_GENERATORS.generateKeywords(category, mainItem, subcategory),
      usageCount: Math.floor(Math.random() * 5000) + 100,
      isPopular: Math.random() > 0.8,
      createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 90).toISOString().split('T')[0],
      seo: {
        title: `${title} | Roleta Grátis Online`,
        description: TEMPLATE_GENERATORS.generateDescription(category, title),
        keywords: TEMPLATE_GENERATORS.generateKeywords(category, mainItem, subcategory),
        canonicalUrl: `https://wheelmaker.app/wheel/${slug}`,
        schemaType: config.schemaType,
        openGraph: {
          title: `${title} | Wheel Maker`,
          description: TEMPLATE_GENERATORS.generateDescription(category, title),
          image: `https://wheelmaker.app/og/${slug}.jpg`,
          type: 'website'
        },
        // Adicionar informações de qualidade da URL
        urlQuality: {
          score: urlQuality.score,
          optimized: urlQuality.score >= 80,
          suggestions: urlQuality.suggestions
        }
      },
      version: '2.0',
      lastModified: new Date().toISOString().split('T')[0],
      author: 'AI Enhanced Generator'
    };
  }

  private generateContextualItems(category: string, mainItem: string, subcategory: string): any[] {
    // Gerar itens relevantes baseados no contexto
    const baseItems = [mainItem];
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#F39C12', '#E74C3C'];
    
    // Adicionar itens relacionados baseados na categoria
    if (category === 'food') {
      baseItems.push('Opção 2', 'Opção 3', 'Opção 4', 'Surpresa', 'Escolha do Chef');
    } else if (category === 'movies') {
      baseItems.push('Clássico', 'Lançamento', 'Série', 'Documentário', 'Animação');
    } else {
      baseItems.push('Opção A', 'Opção B', 'Opção C', 'Surpresa', 'Aleatório');
    }

    return baseItems.slice(0, 6).map((label, i) => ({
      id: `item-${i}`,
      label,
      color: colors[i % colors.length],
      weight: 1 + (Math.random() * 2) // Peso entre 1 e 3
    }));
  }
}

// Instância global para uso
export const intelligentGenerator = new IntelligentTemplateGenerator();

// Função de conveniência para gerar coleção inteligente
export const generateIntelligentTemplateCollection = (count: number = 10000): SEOEnhancedTemplate[] => {
  return intelligentGenerator.generateIntelligentCollection(count);
};