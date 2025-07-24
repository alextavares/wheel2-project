const fs = require('fs');

async function testGenerationWithFile() {
  let output = '';
  
  try {
    output += '🧪 Testando geração de páginas SEO...\n';
    
    const { SEOPageGenerator } = require('./src/utils/seoPageGenerator.ts');
    output += '✅ Importação bem-sucedida\n';
    
    const generator = new SEOPageGenerator('./test-generated');
    output += '✅ Instância criada\n';
    
    await generator.createDirectoryStructure();
    output += '✅ Estrutura de diretórios criada\n';
    
    // Verificar se os diretórios foram criados
    if (fs.existsSync('./test-generated')) {
      output += '✅ Diretório principal criado\n';
      
      const dirs = fs.readdirSync('./test-generated');
      output += `📁 Subdiretórios criados: ${dirs.join(', ')}\n`;
    } else {
      output += '❌ Diretório principal não foi criado\n';
    }
    
    output += '🎉 Teste concluído com sucesso!\n';
    
  } catch (error) {
    output += `❌ Erro no teste: ${error.message}\n`;
    output += `Stack: ${error.stack}\n`;
  }
  
  fs.writeFileSync('test-generator-result.txt', output, 'utf8');
  console.log('✅ Resultado salvo em test-generator-result.txt');
}

testGenerationWithFile();