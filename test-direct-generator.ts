// Teste direto do gerador
import { SEOPageGenerator } from './src/utils/seoPageGenerator';
import fs from 'fs';

async function testDirect() {
  try {
    console.log('🧪 Teste direto do gerador...');
    
    const outputDir = './test-direct-output';
    console.log(`📁 Criando diretório: ${outputDir}`);
    
    // Criar diretório manualmente primeiro
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log('✅ Diretório criado manualmente');
    }
    
    const generator = new SEOPageGenerator(outputDir);
    
    console.log('📁 Testando createDirectoryStructure...');
    await generator.createDirectoryStructure();
    
    console.log('✅ Teste concluído!');
    
    // Verificar estrutura
    if (fs.existsSync(outputDir)) {
      console.log('✅ Diretório principal existe');
      const items = fs.readdirSync(outputDir);
      console.log('📂 Conteúdo:', items);
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    console.error('Stack:', error.stack);
  }
}

testDirect();