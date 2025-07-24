import { SEOPageGenerator } from './src/utils/seoPageGenerator';
import { generateMassiveTemplateCollection } from './src/data/massiveTemplateGenerator';

async function testDirect() {
  try {
    console.log('🔍 Teste direto do gerador...');
    
    const generator = new SEOPageGenerator('./src/test-direct-sample');
    console.log('✅ Gerador criado');
    
    const templates = generateMassiveTemplateCollection().slice(0, 5);
    console.log(`✅ ${templates.length} templates gerados`);
    
    console.log('📁 Criando estrutura de diretórios...');
    await generator.createDirectoryStructure();
    console.log('✅ Estrutura criada');
    
    console.log('🎉 Teste concluído!');
    
  } catch (error) {
    console.error('❌ Erro:', error);
    console.error('Stack:', error.stack);
  }
}

testDirect();