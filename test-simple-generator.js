// Teste simples do gerador SEO
const { SEOPageGenerator } = require('./src/utils/seoPageGenerator.ts');

async function testGenerator() {
  try {
    console.log('🧪 Testando gerador SEO...');
    
    const generator = new SEOPageGenerator('./test-output');
    
    console.log('📁 Criando estrutura de diretórios...');
    await generator.createDirectoryStructure();
    
    console.log('✅ Teste concluído!');
    
    // Verificar se os diretórios foram criados
    const fs = require('fs');
    const testDir = './test-output';
    
    if (fs.existsSync(testDir)) {
      console.log('✅ Diretório test-output criado com sucesso!');
      
      const subdirs = fs.readdirSync(testDir);
      console.log('📂 Subdiretórios criados:', subdirs);
    } else {
      console.log('❌ Diretório test-output não foi criado');
    }
    
  } catch (error) {
    console.error('❌ Erro no teste:', error.message);
    console.error('Stack:', error.stack);
  }
}

testGenerator();