const fs = require('fs');

console.log('🔍 Teste básico de console e filesystem...');

try {
  // Teste 1: Console básico
  console.log('✅ Console funcionando');
  
  // Teste 2: Filesystem básico
  const testDir = './src/test-console';
  
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
    console.log('✅ Diretório criado:', testDir);
  }
  
  // Teste 3: Escrever arquivo
  fs.writeFileSync(`${testDir}/test.txt`, 'Hello World!');
  console.log('✅ Arquivo criado');
  
  // Teste 4: Ler arquivo
  const content = fs.readFileSync(`${testDir}/test.txt`, 'utf8');
  console.log('✅ Arquivo lido:', content);
  
  console.log('🎉 Todos os testes passaram!');
  
} catch (error) {
  console.error('❌ Erro:', error.message);
  console.error('Stack:', error.stack);
}