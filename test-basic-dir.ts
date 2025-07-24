// Teste básico de criação de diretório
import fs from 'fs';

console.log('🧪 Testando criação de diretório...');

const testDir = './test-basic-dir';

try {
  console.log(`📁 Tentando criar: ${testDir}`);
  
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
    console.log('✅ Diretório criado com sucesso!');
  } else {
    console.log('ℹ️ Diretório já existe');
  }
  
  // Criar subdiretórios
  const subdirs = ['wheels', 'categories', 'sitemaps'];
  
  for (const subdir of subdirs) {
    const fullPath = `${testDir}/${subdir}`;
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`✅ Subdiretório criado: ${subdir}`);
    }
  }
  
  // Verificar estrutura
  const items = fs.readdirSync(testDir);
  console.log('📂 Estrutura criada:', items);
  
  // Criar um arquivo de teste
  fs.writeFileSync(`${testDir}/test.txt`, 'Teste de criação de arquivo');
  console.log('📄 Arquivo de teste criado');
  
} catch (error) {
  console.error('❌ Erro:', error.message);
}