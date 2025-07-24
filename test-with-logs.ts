import { SEOPageGenerator } from './src/utils/seoPageGenerator';
import { generateMassiveTemplateCollection } from './src/data/massiveTemplateGenerator';
import * as fs from 'fs';

async function testWithLogs() {
  const logFile = './test-logs.txt';
  
  function log(message: string) {
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
    
    log('🔍 Iniciando teste com logs...');
    
    log('1. Criando instância do SEOPageGenerator...');
    const generator = new SEOPageGenerator('./src/test-with-logs');
    log('✅ Gerador criado');
    
    log('2. Gerando templates...');
    const templates = generateMassiveTemplateCollection().slice(0, 3);
    log(`✅ ${templates.length} templates gerados`);
    
    log('3. Criando estrutura de diretórios...');
    await generator.createDirectoryStructure();
    log('✅ Estrutura criada');
    
    log('4. Verificando se o diretório foi criado...');
    if (fs.existsSync('./src/test-with-logs')) {
      log('✅ Diretório confirmado');
      const contents = fs.readdirSync('./src/test-with-logs');
      log(`📁 Conteúdo: ${contents.join(', ')}`);
    } else {
      log('❌ Diretório não encontrado');
    }
    
    log('🎉 Teste concluído com sucesso!');
    
  } catch (error) {
    log(`❌ Erro: ${error.message}`);
    log(`Stack: ${error.stack}`);
  }
}

testWithLogs();