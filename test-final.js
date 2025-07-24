const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando teste final...');

// Teste básico de criação de diretório
const testDir = './src/test-final-output';

try {
  console.log('📁 Criando diretório de teste...');
  
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true, force: true });
  }
  
  fs.mkdirSync(testDir, { recursive: true });
  
  // Criar subdiretórios
  fs.mkdirSync(path.join(testDir, 'wheels'), { recursive: true });
  fs.mkdirSync(path.join(testDir, 'categories'), { recursive: true });
  
  console.log('✅ Diretórios criados com sucesso!');
  
  // Criar um arquivo de teste
  const testFile = path.join(testDir, 'test.html');
  fs.writeFileSync(testFile, '<html><body><h1>Teste Final</h1></body></html>');
  
  console.log('✅ Arquivo de teste criado!');
  
  // Verificar se tudo foi criado
  console.log('📊 Verificando estrutura criada:');
  console.log('- Diretório principal:', fs.existsSync(testDir) ? '✅' : '❌');
  console.log('- Subdiretório wheels:', fs.existsSync(path.join(testDir, 'wheels')) ? '✅' : '❌');
  console.log('- Subdiretório categories:', fs.existsSync(path.join(testDir, 'categories')) ? '✅' : '❌');
  console.log('- Arquivo de teste:', fs.existsSync(testFile) ? '✅' : '❌');
  
  console.log('🎉 Teste final concluído com sucesso!');
  
} catch (error) {
  console.error('❌ Erro no teste final:', error);
  process.exit(1);
}