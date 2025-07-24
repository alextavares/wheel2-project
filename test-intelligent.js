// Teste simples do gerador inteligente
const { generateIntelligentTemplateCollection } = require('./src/data/intelligentTemplateGenerator.ts');

console.log('🧪 Testando o gerador inteligente...');

try {
  const templates = generateIntelligentTemplateCollection(5);
  console.log(`✅ Gerado ${templates.length} templates com sucesso!`);
  
  if (templates.length > 0) {
    console.log('\n📋 Exemplo de template gerado:');
    console.log('Título:', templates[0].title);
    console.log('Categoria:', templates[0].category);
    console.log('Descrição:', templates[0].description);
    console.log('Tags:', templates[0].tags);
  }
} catch (error) {
  console.error('❌ Erro ao testar o gerador:', error.message);
}