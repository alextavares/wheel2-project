import { generateMassiveTemplateCollection, CATEGORY_CONFIG } from './src/data/massiveTemplateGenerator';
import * as fs from 'fs';

console.log('🎯 Iniciando teste do sistema...');

try {
  const templates = generateMassiveTemplateCollection();
  
  const report = `
🎯 Relatório do Sistema de Geração de Templates SEO
================================================

📝 Total de templates gerados: ${templates.length.toLocaleString()}
📂 Total de categorias: ${Object.keys(CATEGORY_CONFIG).length}

📊 Templates por categoria:
${Object.entries(CATEGORY_CONFIG).map(([categoryId, category]) => {
  const count = templates.filter(t => t.category === categoryId).length;
  return `   📋 ${category.name}: ${count.toLocaleString()} templates`;
}).join('\n')}

💾 Tamanho estimado: ${(templates.length * 15 / 1024).toFixed(2)} MB
⏱️  Tempo estimado de geração: ${(templates.length / 1000 * 30 / 60).toFixed(1)} minutos

🎉 Sistema funcionando corretamente!

Exemplo de template gerado:
${JSON.stringify(templates[0], null, 2)}
`;

  fs.writeFileSync('./seo-report.txt', report);
  console.log('✅ Relatório salvo em seo-report.txt');
  
} catch (error) {
  console.error('❌ Erro:', error);
  fs.writeFileSync('./seo-error.txt', `Erro: ${error.message}\n${error.stack}`);
}