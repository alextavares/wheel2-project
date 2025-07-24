const fs = require('fs');
const path = require('path');

async function testSimpleGeneration() {
  const logFile = './simple-test-logs.txt';
  
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
    
    log('🔍 Teste simples de geração...');
    
    // Teste 1: Criar diretório principal
    const outputDir = './src/simple-test-output';
    log(`1. Criando diretório: ${outputDir}`);
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      log('✅ Diretório principal criado');
    } else {
      log('ℹ️ Diretório principal já existe');
    }
    
    // Teste 2: Criar subdiretórios
    const subdirs = ['wheels', 'categories', 'sitemaps'];
    for (const subdir of subdirs) {
      const fullPath = path.join(outputDir, subdir);
      log(`2. Criando subdiretório: ${fullPath}`);
      
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        log(`✅ Subdiretório ${subdir} criado`);
      } else {
        log(`ℹ️ Subdiretório ${subdir} já existe`);
      }
    }
    
    // Teste 3: Criar arquivo de teste
    const testFile = path.join(outputDir, 'test.html');
    const testContent = `<!DOCTYPE html>
<html>
<head>
    <title>Teste de Geração</title>
</head>
<body>
    <h1>Página de Teste</h1>
    <p>Gerada em: ${new Date().toISOString()}</p>
</body>
</html>`;
    
    log('3. Criando arquivo de teste...');
    fs.writeFileSync(testFile, testContent);
    log('✅ Arquivo de teste criado');
    
    // Teste 4: Verificar estrutura
    log('4. Verificando estrutura criada...');
    const contents = fs.readdirSync(outputDir);
    log(`📁 Conteúdo do diretório: ${contents.join(', ')}`);
    
    for (const item of contents) {
      const itemPath = path.join(outputDir, item);
      const stats = fs.statSync(itemPath);
      if (stats.isDirectory()) {
        const subContents = fs.readdirSync(itemPath);
        log(`📂 ${item}/: ${subContents.length} itens`);
      } else {
        log(`📄 ${item}: ${stats.size} bytes`);
      }
    }
    
    log('🎉 Teste simples concluído com sucesso!');
    
  } catch (error) {
    log(`❌ Erro: ${error.message}`);
    log(`Stack: ${error.stack}`);
  }
}

testSimpleGeneration();