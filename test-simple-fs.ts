import * as fs from 'fs';
import * as path from 'path';

console.log('🔍 Teste simples de criação de diretório...');

try {
  const testDir = './src/test-simple';
  
  console.log('1. Verificando se o diretório existe:', fs.existsSync(testDir));
  
  console.log('2. Criando diretório...');
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
    console.log('✅ Diretório criado');
  } else {
    console.log('ℹ️ Diretório já existe');
  }
  
  console.log('3. Verificando novamente:', fs.existsSync(testDir));
  
  console.log('4. Criando arquivo de teste...');
  fs.writeFileSync(path.join(testDir, 'test.txt'), 'Hello World!');
  console.log('✅ Arquivo criado');
  
  console.log('5. Listando conteúdo:');
  const contents = fs.readdirSync(testDir);
  console.log('📁 Conteúdo:', contents);
  
} catch (error) {
  console.error('❌ Erro:', error);
}