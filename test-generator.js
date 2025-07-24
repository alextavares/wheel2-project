import { SEOPageGenerator } from './src/utils/seoPageGenerator.ts';

async function testGeneration() {
  console.log('🧪 Testando geração de páginas SEO...');
  
  try {
    const generator = new SEOPageGenerator('./test-generated');
    console.log('✅ Instância criada');
    
    await generator.createDirectoryStructure();
    console.log('✅ Estrutura de diretórios criada');
    
    console.log('🎉 Teste concluído com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro no teste:', error.message);
    console.error('Stack:', error.stack);
  }
}

testGeneration();