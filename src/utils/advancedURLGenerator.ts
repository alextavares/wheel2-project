// Sistema Avançado de Geração de URLs SEO-Friendly
// Melhorias baseadas em melhores práticas de SEO e UX

export interface URLOptimizationConfig {
  maxLength: number;
  includeCategory: boolean;
  includeKeywords: boolean;
  removeStopWords: boolean;
  useSemanticStructure: boolean;
  addContextualInfo: boolean;
}

export class AdvancedURLGenerator {
  private config: URLOptimizationConfig;
  private generatedSlugs: Set<string> = new Set();
  
  // Palavras irrelevantes que devem ser removidas para URLs mais limpas
  private readonly STOP_WORDS = [
    'para', 'de', 'da', 'do', 'das', 'dos', 'em', 'na', 'no', 'nas', 'nos',
    'com', 'por', 'ao', 'aos', 'à', 'às', 'um', 'uma', 'uns', 'umas',
    'o', 'a', 'os', 'as', 'e', 'ou', 'mas', 'que', 'se', 'quando',
    'modelo', 'página', 'pgina', 'template', 'roleta', 'wheel'
  ];

  // Palavras-chave importantes que devem ser mantidas
  private readonly IMPORTANT_KEYWORDS = [
    'escolher', 'decidir', 'sortear', 'sorteio', 'random', 'aleatório',
    'grátis', 'online', 'interativo', 'personalizado', 'customizado'
  ];

  // Mapeamento de categorias para URLs mais amigáveis
  private readonly CATEGORY_MAPPING = {
    'food': 'comida',
    'movies': 'filmes', 
    'games': 'jogos',
    'travel': 'viagem',
    'music': 'musica',
    'sports': 'esportes',
    'education': 'educacao',
    'work': 'trabalho',
    'decisions': 'decisoes',
    'raffles': 'sorteios',
    'fortune': 'sorte',
    'random': 'aleatorio'
  };

  constructor(config: Partial<URLOptimizationConfig> = {}) {
    this.config = {
      maxLength: 60,
      includeCategory: true,
      includeKeywords: true,
      removeStopWords: true,
      useSemanticStructure: true,
      addContextualInfo: false,
      ...config
    };
  }

  /**
   * 🎯 Gera URL otimizada baseada no título e contexto
   */
  generateOptimizedURL(
    title: string, 
    category: string, 
    context?: {
      subcategory?: string;
      intent?: string;
      difficulty?: string;
      audience?: string;
    }
  ): string {
    // 1. Limpar e normalizar o título
    let cleanTitle = this.cleanTitle(title);
    
    // 2. Remover stop words se configurado
    if (this.config.removeStopWords) {
      cleanTitle = this.removeStopWords(cleanTitle);
    }
    
    // 3. Adicionar contexto semântico
    if (this.config.useSemanticStructure && context) {
      cleanTitle = this.addSemanticContext(cleanTitle, context);
    }
    
    // 4. Construir URL com estrutura hierárquica
    let urlParts: string[] = [];
    
    // Categoria (sempre incluir se configurado)
    if (this.config.includeCategory) {
      const categorySlug = this.CATEGORY_MAPPING[category as keyof typeof this.CATEGORY_MAPPING] || category;
      urlParts.push(categorySlug);
    }
    
    // Título principal
    urlParts.push(cleanTitle);
    
    // 5. Juntar partes e otimizar
    let finalSlug = urlParts.join('-');
    
    // 6. Aplicar limitações de tamanho
    finalSlug = this.applyLengthLimits(finalSlug);
    
    // 7. Garantir unicidade
    finalSlug = this.ensureUniqueness(finalSlug);
    
    return finalSlug;
  }

  /**
   * 🧹 Limpa e normaliza o título
   */
  private cleanTitle(title: string): string {
    return title
      .toLowerCase()
      .trim()
      // Remover caracteres especiais, mas manter acentos importantes
      .replace(/[^\w\s\-áàâãéèêíìîóòôõúùûç]/g, '')
      // Normalizar espaços
      .replace(/\s+/g, ' ')
      // Converter para slug
      .replace(/\s/g, '-')
      // Remover hífens duplicados
      .replace(/-+/g, '-')
      // Remover hífens no início e fim
      .replace(/^-+|-+$/g, '');
  }

  /**
   * 🚫 Remove palavras irrelevantes
   */
  private removeStopWords(slug: string): string {
    const words = slug.split('-');
    const filteredWords = words.filter(word => {
      // Manter palavras importantes mesmo que sejam stop words
      if (this.IMPORTANT_KEYWORDS.includes(word)) {
        return true;
      }
      // Remover stop words
      return !this.STOP_WORDS.includes(word);
    });
    
    return filteredWords.join('-');
  }

  /**
   * 🎯 Adiciona contexto semântico
   */
  private addSemanticContext(
    slug: string, 
    context: {
      subcategory?: string;
      intent?: string;
      difficulty?: string;
      audience?: string;
    }
  ): string {
    const contextParts: string[] = [];
    
    // Adicionar subcategoria se relevante
    if (context.subcategory && context.subcategory !== 'general') {
      contextParts.push(context.subcategory.toLowerCase());
    }
    
    // Adicionar intenção do usuário
    if (context.intent) {
      const intentMap: { [key: string]: string } = {
        'choose': 'escolher',
        'decide': 'decidir',
        'random': 'aleatorio',
        'fun': 'diversao',
        'quick': 'rapido'
      };
      const intentSlug = intentMap[context.intent] || context.intent;
      contextParts.push(intentSlug);
    }
    
    // Combinar contexto com slug principal
    if (contextParts.length > 0) {
      return `${contextParts.join('-')}-${slug}`;
    }
    
    return slug;
  }

  /**
   * ✂️ Aplica limitações de tamanho
   */
  private applyLengthLimits(slug: string): string {
    if (slug.length <= this.config.maxLength) {
      return slug;
    }
    
    // Estratégia inteligente de corte
    const words = slug.split('-');
    let result = '';
    
    for (const word of words) {
      const testResult = result ? `${result}-${word}` : word;
      if (testResult.length <= this.config.maxLength) {
        result = testResult;
      } else {
        break;
      }
    }
    
    return result || slug.substring(0, this.config.maxLength);
  }

  /**
   * 🔄 Garante unicidade do slug
   */
  private ensureUniqueness(slug: string): string {
    if (!this.generatedSlugs.has(slug)) {
      this.generatedSlugs.add(slug);
      return slug;
    }
    
    // Estratégia inteligente para variações
    let counter = 1;
    let uniqueSlug = slug;
    
    while (this.generatedSlugs.has(uniqueSlug)) {
      // Usar sufixos semânticos em vez de números simples
      const semanticSuffixes = ['v2', 'plus', 'pro', 'especial', 'novo'];
      const suffix = counter <= semanticSuffixes.length 
        ? semanticSuffixes[counter - 1]
        : counter.toString();
      
      uniqueSlug = `${slug}-${suffix}`;
      counter++;
    }
    
    this.generatedSlugs.add(uniqueSlug);
    return uniqueSlug;
  }

  /**
   * 🎨 Gera variações de URL para A/B testing
   */
  generateURLVariations(title: string, category: string): string[] {
    const variations: string[] = [];
    
    // Variação 1: URL curta e direta
    const shortConfig = { ...this.config, maxLength: 40, removeStopWords: true };
    const shortGenerator = new AdvancedURLGenerator(shortConfig);
    variations.push(shortGenerator.generateOptimizedURL(title, category));
    
    // Variação 2: URL com contexto completo
    const contextConfig = { ...this.config, addContextualInfo: true, maxLength: 80 };
    const contextGenerator = new AdvancedURLGenerator(contextConfig);
    variations.push(contextGenerator.generateOptimizedURL(title, category, {
      intent: 'choose',
      audience: 'geral'
    }));
    
    // Variação 3: URL focada em SEO
    const seoConfig = { ...this.config, includeKeywords: true, useSemanticStructure: true };
    const seoGenerator = new AdvancedURLGenerator(seoConfig);
    variations.push(seoGenerator.generateOptimizedURL(title, category));
    
    return variations;
  }

  /**
   * 📊 Analisa qualidade da URL
   */
  analyzeURLQuality(url: string): {
    score: number;
    issues: string[];
    suggestions: string[];
  } {
    const issues: string[] = [];
    const suggestions: string[] = [];
    let score = 100;
    
    // Verificar comprimento
    if (url.length > 60) {
      issues.push('URL muito longa');
      suggestions.push('Reduzir para menos de 60 caracteres');
      score -= 20;
    }
    
    // Verificar stop words
    const hasStopWords = this.STOP_WORDS.some(word => url.includes(word));
    if (hasStopWords) {
      issues.push('Contém palavras irrelevantes');
      suggestions.push('Remover stop words para URL mais limpa');
      score -= 10;
    }
    
    // Verificar estrutura semântica
    if (!url.includes('-')) {
      issues.push('Falta estrutura hierárquica');
      suggestions.push('Usar hífens para separar conceitos');
      score -= 15;
    }
    
    // Verificar números desnecessários
    if (/\d+/.test(url) && !url.includes('top') && !url.includes('melhores')) {
      issues.push('Contém números desnecessários');
      suggestions.push('Evitar números que não agregam valor semântico');
      score -= 10;
    }
    
    return { score: Math.max(0, score), issues, suggestions };
  }
}

// Instância global otimizada
export const urlGenerator = new AdvancedURLGenerator({
  maxLength: 55,
  includeCategory: true,
  includeKeywords: true,
  removeStopWords: true,
  useSemanticStructure: true,
  addContextualInfo: false
});

// Função de conveniência para uso rápido
export const generateSEOFriendlyURL = (
  title: string, 
  category: string, 
  context?: any
): string => {
  return urlGenerator.generateOptimizedURL(title, category, context);
};