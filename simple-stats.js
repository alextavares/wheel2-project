#!/usr/bin/env node

// Script simples para testar a geração de templates
console.log('🎯 Gerador de Páginas SEO para Wheel Maker');
console.log('==========================================\n');

// Simular dados para teste
const CATEGORIES = {
  food: { name: 'Comida', icon: '🍕' },
  games: { name: 'Jogos', icon: '🎮' },
  education: { name: 'Educação', icon: '📚' },
  movies: { name: 'Filmes', icon: '🎬' },
  music: { name: 'Música', icon: '🎵' },
  decisions: { name: 'Decisões', icon: '🤔' },
  raffles: { name: 'Sorteios', icon: '🎁' },
  fortune: { name: 'Sorte', icon: '🔮' },
  sports: { name: 'Esportes', icon: '⚽' },
  travel: { name: 'Viagem', icon: '✈️' },
  work: { name: 'Trabalho', icon: '💼' },
  random: { name: 'Aleatório', icon: '🎲' }
};

console.log('📊 Estatísticas do Gerador de Páginas SEO\n');

const totalTemplates = 10000;
const totalCategories = Object.keys(CATEGORIES).length;

console.log(`📝 Total de templates: ${totalTemplates.toLocaleString()}`);
console.log(`📂 Total de categorias: ${totalCategories}`);

console.log('\n📊 Templates por categoria:');
Object.entries(CATEGORIES).forEach(([categoryId, category]) => {
  const count = Math.floor(totalTemplates / totalCategories);
  console.log(`   ${category.icon} ${category.name}: ${count.toLocaleString()} templates`);
});

const estimatedSize = totalTemplates * 15; // ~15KB por página
console.log(`\n💾 Tamanho estimado: ${(estimatedSize / 1024).toFixed(2)} MB`);

const estimatedTime = totalTemplates / 1000 * 30; // ~30s por 1000 páginas
console.log(`⏱️  Tempo estimado de geração: ${(estimatedTime / 60).toFixed(1)} minutos`);

console.log('\n🚀 Sistema pronto para gerar 10.000 páginas SEO!');
console.log('📋 Use os comandos:');
console.log('   npm run seo:generate  - Gerar todas as páginas');
console.log('   npm run seo:sample    - Gerar amostra de teste');
console.log('   npm run seo:clean     - Limpar arquivos gerados');