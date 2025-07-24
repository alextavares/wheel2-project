// Script de Demonstração: Comparação de URLs Antes vs Depois
// Mostra as melhorias implementadas no sistema de URLs

import { generateIntelligentTemplateCollection } from '../src/data/intelligentTemplateGenerator.js';
import { urlGenerator } from '../src/utils/advancedURLGenerator.js';

console.log('🎯 DEMONSTRAÇÃO: Melhorias nas URLs\n');
console.log('=' .repeat(60));

// Gerar algumas páginas para demonstração
const templates = generateIntelligentTemplateCollection(10);

console.log('\n📊 COMPARAÇÃO: URLs Antigas vs URLs Otimizadas\n');

templates.slice(0, 5).forEach((template, index) => {
  console.log(`\n${index + 1}. TEMPLATE: ${template.title}`);
  console.log('   Categoria:', template.category);
  
  // URL antiga (simulada)
  const oldUrl = template.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-') + '-modelo-1-pgina-1';
  
  // URL nova (do sistema)
  const newUrl = template.seo.canonicalUrl.split('/wheel/')[1];
  
  console.log('   ❌ URL Antiga:', oldUrl);
  console.log('   ✅ URL Nova:  ', newUrl);
  
  // Análise de qualidade
  const oldQuality = urlGenerator.analyzeURLQuality(oldUrl);
  const newQuality = urlGenerator.analyzeURLQuality(newUrl);
  
  console.log(`   📈 Melhoria: ${oldQuality.score}% → ${newQuality.score}% (+${newQuality.score - oldQuality.score}%)`);
  
  if (template.seo.urlQuality) {
    console.log('   🎯 Status:', template.seo.urlQuality.optimized ? 'OTIMIZADA' : 'PRECISA MELHORAR');
  }
});

console.log('\n' + '=' .repeat(60));
console.log('🚀 PRINCIPAIS MELHORIAS IMPLEMENTADAS:\n');

console.log('1. ✂️  REMOÇÃO DE STOP WORDS');
console.log('   - Removidas: "para", "de", "modelo", "página", etc.');
console.log('   - Resultado: URLs mais limpas e focadas\n');

console.log('2. 🎯 ESTRUTURA SEMÂNTICA');
console.log('   - Categoria + Contexto + Ação');
console.log('   - Exemplo: filmes-escolher-aleatorio\n');

console.log('3. 📏 CONTROLE DE TAMANHO');
console.log('   - Máximo 55 caracteres para SEO otimizado');
console.log('   - Corte inteligente preservando palavras importantes\n');

console.log('4. 🔄 SUFIXOS SEMÂNTICOS');
console.log('   - Em vez de números: v2, plus, pro, especial');
console.log('   - Mais amigável para usuários e SEO\n');

console.log('5. 🌍 MAPEAMENTO DE CATEGORIAS');
console.log('   - movies → filmes');
console.log('   - games → jogos');
console.log('   - travel → viagem\n');

console.log('6. 📊 ANÁLISE DE QUALIDADE');
console.log('   - Score automático de 0-100%');
console.log('   - Sugestões de melhoria');
console.log('   - Detecção de problemas\n');

// Demonstrar variações de URL
console.log('=' .repeat(60));
console.log('🎨 EXEMPLO: Variações de URL para A/B Testing\n');

const sampleTitle = "Filmes para assistir quando não consigo decidir hoje";
const variations = urlGenerator.generateURLVariations(sampleTitle, 'movies');

console.log(`Título: "${sampleTitle}"\n`);
variations.forEach((variation, index) => {
  const quality = urlGenerator.analyzeURLQuality(variation);
  console.log(`${index + 1}. ${variation} (Score: ${quality.score}%)`);
});

console.log('\n' + '=' .repeat(60));
console.log('✅ SISTEMA DE URLs OTIMIZADO IMPLEMENTADO COM SUCESSO!');
console.log('🎯 URLs agora são mais SEO-friendly, legíveis e eficientes.');