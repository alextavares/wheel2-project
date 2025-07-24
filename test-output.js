const fs = require('fs');

try {
  const { generateMassiveTemplateCollection, CATEGORY_CONFIG } = require('./src/data/massiveTemplateGenerator.ts');
  
  const templates = generateMassiveTemplateCollection();
  const categories = Object.keys(CATEGORY_CONFIG);
  
  let output = '';
  output += '🚀 SISTEMA DE GERAÇÃO SEO - ESTATÍSTICAS\n';
  output += '==========================================\n\n';
  output += `📋 Total de templates: ${templates.length.toLocaleString()}\n`;
  output += `📂 Total de categorias: ${categories.length}\n\n`;
  output += '📊 Templates por categoria:\n';
  
  Object.entries(CATEGORY_CONFIG).forEach(([categoryId, category]) => {
    const count = templates.filter(t => t.category === categoryId).length;
    output += `   ${category.icon || '📋'} ${category.name}: ${count.toLocaleString()} templates\n`;
  });
  
  output += '\n✅ Sistema funcionando perfeitamente!\n';
  output += `⏰ Gerado em: ${new Date().toLocaleString()}\n`;
  
  fs.writeFileSync('seo-stats-output.txt', output, 'utf8');
  console.log('✅ Relatório salvo em seo-stats-output.txt');
  
} catch (error) {
  const errorOutput = `❌ Erro: ${error.message}\nStack: ${error.stack}\n`;
  fs.writeFileSync('seo-error-output.txt', errorOutput, 'utf8');
  console.log('❌ Erro salvo em seo-error-output.txt');
}