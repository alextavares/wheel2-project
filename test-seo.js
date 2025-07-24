// Teste simples para verificar se as funções estão funcionando
const { generateMassiveTemplateCollection, CATEGORY_CONFIG } = require('./src/data/massiveTemplateGenerator.ts');

console.log('🧪 Testando geração de templates...');

try {
  const templates = generateMassiveTemplateCollection();
  console.log(`✅ Templates gerados: ${templates.length}`);
  console.log(`📂 Categorias: ${Object.keys(CATEGORY_CONFIG).length}`);
  
  // Mostrar estatísticas por categoria
  Object.entries(CATEGORY_CONFIG).forEach(([categoryId, category]) => {
    const count = templates.filter(t => t.category === categoryId).length;
    console.log(`   📋 ${category.name}: ${count} templates`);
  });
  
} catch (error) {
  console.error('❌ Erro:', error.message);
}