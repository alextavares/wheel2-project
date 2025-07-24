// Teste específico do SEOPageGenerator
const fs = require('fs');

async function testSEOPageGenerator() {
  const logFile = './seo-test-logs.txt';
  
  function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logFile, logMessage);
    console.log(message);
  }
  
  try {
    // Limpar log anterior
    if (fs.existsSync(logFile)) {
      fs.unlinkSync(logFile);
    }
    
    log('🔍 Testando SEOPageGenerator...');
    
    // Teste 1: Importar o módulo
    log('1. Importando SEOPageGenerator...');
    const { SEOPageGenerator } = require('./src/utils/seoPageGenerator');
    log('✅ SEOPageGenerator importado');
    
    // Teste 2: Criar instância
    log('2. Criando instância...');
    const generator = new SEOPageGenerator('./src/seo-test-output');
    log('✅ Instância criada');
    
    // Teste 3: Chamar createDirectoryStructure
    log('3. Chamando createDirectoryStructure...');
    await generator.createDirectoryStructure();
    log('✅ createDirectoryStructure executado');
    
    // Teste 4: Verificar se foi criado
    log('4. Verificando diretório...');
    if (fs.existsSync('./src/seo-test-output')) {
      log('✅ Diretório criado com sucesso');
      const contents = fs.readdirSync('./src/seo-test-output');
      log(`📁 Conteúdo: ${contents.join(', ')}`);
    } else {
      log('❌ Diretório não foi criado');
    }
    
    log('🎉 Teste do SEOPageGenerator concluído!');
    
  } catch (error) {
    log(`❌ Erro: ${error.message}`);
    log(`Stack: ${error.stack}`);
  }
}

testSEOPageGenerator();