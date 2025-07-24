import { generateMassiveTemplateCollection, CATEGORY_CONFIG } from './src/data/massiveTemplateGenerator';

console.log('🎯 Testando sistema de geração de templates...\n');

try {
  console.log('📝 Gerando templates...');
  const templates = generateMassiveTemplateCollection();
  
  console.log(`✅ Total de templates gerados: ${templates.length}`);
  console.log(`📂 Total de categorias: ${Object.keys(CATEGORY_CONFIG).length}`);
  
  console.log('\n📊 Templates por categoria:');
  Object.entries(CATEGORY_CONFIG).forEach(([categoryId, category]) => {
    const count = templates.filter(t => t.category === categoryId).length;
    console.log(`   📋 ${category.name}: ${count} templates`);
  });
  
  console.log('\n🎉 Sistema funcionando corretamente!');
  
} catch (error) {
  console.error('❌ Erro:', error);
}