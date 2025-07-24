import { SEOPageGenerator } from './src/utils/seoPageGenerator';
import * as fs from 'fs';

async function testDebug() {
  console.log('🔍 Iniciando teste de debug...');
  
  try {
    console.log('1. Criando instância do SEOPageGenerator...');
    const generator = new SEOPageGenerator('./src/debug-output');
    
    console.log('2. Chamando createDirectoryStructure...');
    await generator.createDirectoryStructure();
    
    console.log('3. Verificando se o diretório foi criado...');
    if (fs.existsSync('./src/debug-output')) {
      console.log('✅ Diretório criado com sucesso!');
      
      const contents = fs.readdirSync('./src/debug-output');
      console.log('📁 Conteúdo:', contents);
    } else {
      console.log('❌ Diretório não foi criado');
    }
    
  } catch (error) {
    console.error('❌ Erro:', error);
    console.error('Stack:', error.stack);
  }
}

testDebug();