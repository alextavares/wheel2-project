#!/usr/bin/env ts-node

// Script TypeScript para gerar 10.000 páginas SEO
import fs from 'fs';
import path from 'path';
import { SEOPageGenerator } from '../utils/seoPageGenerator';
import { generateMassiveTemplateCollection, CATEGORY_CONFIG } from '../data/massiveTemplateGenerator';
import { generateIntelligentTemplateCollection } from '../data/intelligentTemplateGenerator';

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';

  console.log('🎯 Gerador de Páginas SEO para Wheel Maker');
  console.log('==========================================\n');

  switch (command) {
    case 'generate':
      await generateFullSite();
      break;
    
    case 'sample':
      const count = parseInt(args[1]) || 100;
      await generateSample(count);
      break;
    
    case 'batch':
      const batchSize = parseInt(args[1]) || 1000;
      await generateInBatches(batchSize);
      break;
    
    case 'intelligent':
      const intelligentCount = parseInt(args[1]) || 1000;
      await generateIntelligentSample(intelligentCount);
      break;
    
    case 'intelligent-full':
      await generateIntelligentFullSite();
      break;
    
    case 'compare':
      const compareCount = parseInt(args[1]) || 100;
      await compareGenerators(compareCount);
      break;
    
    case 'stats':
      await showStats();
      break;
    
    case 'intelligent-stats':
      await showIntelligentStats();
      break;
    
    case 'clean':
      await cleanGenerated();
      break;
    
    case 'help':
    default:
      showHelp();
      break;
  }
}

async function generateFullSite() {
  console.log('🚀 Iniciando geração completa de 10.000 páginas...\n');
  
  const startTime = Date.now();
  
  try {
    const generator = new SEOPageGenerator('./src/generated-pages');
    await generator.generateAllPages();
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    console.log(`\n✅ Geração completa finalizada em ${duration.toFixed(2)} segundos!`);
    console.log('📁 Arquivos gerados em: ./src/generated-pages/');
    
    await showGeneratedStats();
    
  } catch (error) {
    console.error('❌ Erro durante a geração:', error);
    process.exit(1);
  }
}

async function generateSample(count: number) {
  console.log(`🧪 Gerando amostra de ${count} páginas para teste...\n`);
  
  const startTime = Date.now();
  
  try {
    console.log('📝 Passo 1: Criando instância do SEOPageGenerator...');
    const generator = new SEOPageGenerator('./src/sample-pages');
    console.log('✅ Instância criada com sucesso');
    
    console.log('📝 Passo 2: Gerando templates...');
    const templates = generateMassiveTemplateCollection().slice(0, count);
    console.log(`✅ ${templates.length} templates gerados`);
    
    console.log('📝 Passo 3: Gerando páginas estáticas...');
    const staticPages = generator['generateStaticPagesFromTemplates'](templates);
    console.log(`✅ ${staticPages.length} páginas estáticas geradas`);
    
    console.log('📝 Passo 4: Definindo propriedades...');
    generator['templates'] = templates;
    generator['staticPages'] = staticPages;
    console.log('✅ Propriedades definidas');
    
    console.log('📝 Passo 5: Criando estrutura de diretórios...');
    await generator.createDirectoryStructure();
    console.log('✅ Estrutura de diretórios criada');
    
    console.log('📝 Passo 6: Gerando páginas individuais...');
    await generator['generateIndividualPages']();
    console.log('✅ Páginas individuais geradas');
    
    console.log('📝 Passo 7: Gerando páginas de categoria...');
    await generator['generateCategoryPages']();
    console.log('✅ Páginas de categoria geradas');
    
    console.log('📝 Passo 8: Gerando sitemap...');
    await generator['generateSitemapFile']();
    console.log('✅ Sitemap gerado');
    
    console.log(`✅ Amostra de ${count} páginas gerada!`);
    console.log(`📁 Arquivos gerados em: ./src/sample-pages/`);
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    console.log(`⏱️  Tempo: ${duration.toFixed(2)} segundos`);
    
    // Mostrar estatísticas da amostra
    console.log('📝 Passo 9: Mostrando estatísticas...');
    await showSampleStats();
    
  } catch (error) {
    console.error('❌ Erro durante a geração da amostra:', error);
    if (error instanceof Error) {
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

async function generateInBatches(batchSize: number) {
  console.log(`🔄 Iniciando geração em lotes de ${batchSize} páginas...\n`);
  
  const startTime = Date.now();
  
  try {
    const generator = new SEOPageGenerator('./src/generated-pages');
    await generator.generateInBatches(batchSize);
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    console.log(`\n✅ Geração em lotes finalizada em ${duration.toFixed(2)} segundos!`);
    await showGeneratedStats();
    
  } catch (error) {
    console.error('❌ Erro durante a geração em lotes:', error);
    process.exit(1);
  }
}

async function showStats() {
  console.log('📊 Estatísticas do Gerador de Páginas SEO\n');
  
  const templates = generateMassiveTemplateCollection();
  
  console.log(`📝 Total de templates: ${templates.length.toLocaleString()}`);
  console.log(`📂 Total de categorias: ${Object.keys(CATEGORY_CONFIG).length}`);
  
  // Estatísticas por categoria
  console.log('\n📊 Templates por categoria:');
  Object.entries(CATEGORY_CONFIG).forEach(([categoryId, category]: [string, any]) => {
    const count = templates.filter((t: any) => t.category === categoryId).length;
    console.log(`   ${category.icon || '📋'} ${category.name}: ${count.toLocaleString()} templates`);
  });
  
  // Estimativa de tamanho
  const estimatedSize = templates.length * 15; // ~15KB por página
  console.log(`\n💾 Tamanho estimado: ${(estimatedSize / 1024).toFixed(2)} MB`);
  
  // Tempo estimado
  const estimatedTime = templates.length / 1000 * 30; // ~30s por 1000 páginas
  console.log(`⏱️  Tempo estimado de geração: ${(estimatedTime / 60).toFixed(1)} minutos`);
}

async function showSampleStats() {
  const sampleDir = './src/sample-pages';
  
  if (!fs.existsSync(sampleDir)) {
    console.log('❌ Diretório de páginas de amostra não encontrado');
    return;
  }
  
  console.log('\n📊 Estatísticas da amostra gerada:');
  
  // Contar arquivos
  const wheelsDir = path.join(sampleDir, 'wheels');
  const categoriesDir = path.join(sampleDir, 'categories');
  
  let wheelCount = 0;
  let categoryCount = 0;
  let totalSize = 0;
  
  if (fs.existsSync(wheelsDir)) {
    const wheelFiles = fs.readdirSync(wheelsDir);
    wheelCount = wheelFiles.length;
    
    wheelFiles.forEach(file => {
      const filePath = path.join(wheelsDir, file);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
    });
  }
  
  if (fs.existsSync(categoriesDir)) {
    const categoryFiles = fs.readdirSync(categoriesDir);
    categoryCount = categoryFiles.length;
    
    categoryFiles.forEach(file => {
      const filePath = path.join(categoriesDir, file);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
    });
  }
  
  console.log(`🎯 Páginas de roda: ${wheelCount.toLocaleString()}`);
  console.log(`📂 Páginas de categoria: ${categoryCount}`);
  console.log(`💾 Tamanho total: ${(totalSize / 1024).toFixed(2)} KB`);
  
  // Verificar outros arquivos
  const otherFiles = ['sitemap.xml', 'sitemap-index.xml', 'robots.txt'];
  console.log('\n📄 Arquivos auxiliares:');
  
  otherFiles.forEach(file => {
    const filePath = path.join(sampleDir, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`   ✅ ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
    } else {
      console.log(`   ❌ ${file} (não encontrado)`);
    }
  });
}

async function showGeneratedStats() {
  const generatedDir = './src/generated-pages';
  
  if (!fs.existsSync(generatedDir)) {
    console.log('❌ Diretório de páginas geradas não encontrado');
    return;
  }
  
  console.log('\n📊 Estatísticas dos arquivos gerados:');
  
  // Contar arquivos
  const wheelsDir = path.join(generatedDir, 'wheels');
  const categoriesDir = path.join(generatedDir, 'categories');
  
  let wheelCount = 0;
  let categoryCount = 0;
  let totalSize = 0;
  
  if (fs.existsSync(wheelsDir)) {
    const wheelFiles = fs.readdirSync(wheelsDir);
    wheelCount = wheelFiles.length;
    
    wheelFiles.forEach(file => {
      const filePath = path.join(wheelsDir, file);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
    });
  }
  
  if (fs.existsSync(categoriesDir)) {
    const categoryFiles = fs.readdirSync(categoriesDir);
    categoryCount = categoryFiles.length;
    
    categoryFiles.forEach(file => {
      const filePath = path.join(categoriesDir, file);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
    });
  }
  
  console.log(`🎯 Páginas de roda: ${wheelCount.toLocaleString()}`);
  console.log(`📂 Páginas de categoria: ${categoryCount}`);
  console.log(`💾 Tamanho total: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  
  // Verificar outros arquivos
  const otherFiles = ['sitemap.xml', 'sitemap-index.xml', 'robots.txt', 'routes.ts', 'middleware.ts'];
  console.log('\n📄 Arquivos auxiliares:');
  
  otherFiles.forEach(file => {
    const filePath = path.join(generatedDir, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`   ✅ ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
    } else {
      console.log(`   ❌ ${file} (não encontrado)`);
    }
  });
}

async function cleanGenerated() {
  const generatedDir = './src/generated-pages';
  const sampleDir = './src/sample-pages';
  const intelligentDir = './src/intelligent-pages';
  
  console.log('🧹 Limpando arquivos gerados...\n');
  
  if (fs.existsSync(generatedDir)) {
    fs.rmSync(generatedDir, { recursive: true, force: true });
    console.log('✅ Diretório generated-pages removido');
  }
  
  if (fs.existsSync(sampleDir)) {
    fs.rmSync(sampleDir, { recursive: true, force: true });
    console.log('✅ Diretório sample-pages removido');
  }
  
  if (fs.existsSync(intelligentDir)) {
    fs.rmSync(intelligentDir, { recursive: true, force: true });
    console.log('✅ Diretório intelligent-pages removido');
  }
  
  console.log('\n🎉 Limpeza concluída!');
}

async function generateIntelligentSample(count: number) {
  console.log(`🧠 Gerando amostra inteligente de ${count} páginas...\n`);
  
  const startTime = Date.now();
  
  try {
    console.log('📝 Passo 1: Criando instância do SEOPageGenerator...');
    const generator = new SEOPageGenerator('./src/intelligent-pages');
    console.log('✅ Instância criada com sucesso');
    
    console.log('📝 Passo 2: Gerando templates inteligentes...');
    const templates = generateIntelligentTemplateCollection(count);
    console.log(`✅ ${templates.length} templates inteligentes gerados`);
    
    console.log('📝 Passo 3: Gerando páginas estáticas...');
    const staticPages = generator['generateStaticPagesFromTemplates'](templates);
    console.log(`✅ ${staticPages.length} páginas estáticas geradas`);
    
    console.log('📝 Passo 4: Definindo propriedades...');
    generator['templates'] = templates;
    generator['staticPages'] = staticPages;
    console.log('✅ Propriedades definidas');
    
    console.log('📝 Passo 5: Criando estrutura de diretórios...');
    await generator.createDirectoryStructure();
    console.log('✅ Estrutura de diretórios criada');
    
    console.log('📝 Passo 6: Gerando páginas individuais...');
    await generator['generateIndividualPages']();
    console.log('✅ Páginas individuais geradas');
    
    console.log('📝 Passo 7: Gerando páginas de categoria...');
    await generator['generateCategoryPages']();
    console.log('✅ Páginas de categoria geradas');
    
    console.log('📝 Passo 8: Gerando sitemap...');
    await generator['generateSitemapFile']();
    console.log('✅ Sitemap gerado');
    
    console.log(`✅ Amostra inteligente de ${count} páginas gerada!`);
    console.log(`📁 Arquivos gerados em: ./src/intelligent-pages/`);
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    console.log(`⏱️  Tempo: ${duration.toFixed(2)} segundos`);
    
    // Mostrar estatísticas da amostra inteligente
    console.log('📝 Passo 9: Mostrando estatísticas...');
    await showIntelligentSampleStats();
    
  } catch (error) {
    console.error('❌ Erro durante a geração da amostra inteligente:', error);
    if (error instanceof Error) {
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

async function generateIntelligentFullSite() {
  console.log('🧠 Iniciando geração inteligente completa de 10.000 páginas...\n');
  
  const startTime = Date.now();
  
  try {
    const generator = new SEOPageGenerator('./src/intelligent-pages');
    
    console.log('📝 Gerando templates inteligentes...');
    const templates = generateIntelligentTemplateCollection(10000);
    console.log(`✅ ${templates.length} templates inteligentes gerados`);
    
    const staticPages = generator['generateStaticPagesFromTemplates'](templates);
    generator['templates'] = templates;
    generator['staticPages'] = staticPages;
    
    await generator.createDirectoryStructure();
    await generator['generateIndividualPages']();
    await generator['generateCategoryPages']();
    await generator['generateSitemapFile']();
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    console.log(`\n✅ Geração inteligente completa finalizada em ${duration.toFixed(2)} segundos!`);
    console.log('📁 Arquivos gerados em: ./src/intelligent-pages/');
    
    await showIntelligentGeneratedStats();
    
  } catch (error) {
    console.error('❌ Erro durante a geração inteligente:', error);
    process.exit(1);
  }
}

async function compareGenerators(count: number) {
  console.log(`🔍 Comparando geradores com ${count} páginas cada...\n`);
  
  const startTime = Date.now();
  
  try {
    // Gerador tradicional
    console.log('📊 Testando gerador tradicional...');
    const traditionalStart = Date.now();
    const traditionalTemplates = generateMassiveTemplateCollection().slice(0, count);
    const traditionalTime = Date.now() - traditionalStart;
    
    // Gerador inteligente
    console.log('🧠 Testando gerador inteligente...');
    const intelligentStart = Date.now();
    const intelligentTemplates = generateIntelligentTemplateCollection(count);
    const intelligentTime = Date.now() - intelligentStart;
    
    console.log('\n📊 Resultados da comparação:');
    console.log('=====================================');
    
    console.log('\n🔧 Gerador Tradicional:');
    console.log(`   ⏱️  Tempo: ${traditionalTime}ms`);
    console.log(`   📝 Templates: ${traditionalTemplates.length}`);
    console.log(`   🎯 Categorias únicas: ${new Set(traditionalTemplates.map(t => t.category)).size}`);
    
    console.log('\n🧠 Gerador Inteligente:');
    console.log(`   ⏱️  Tempo: ${intelligentTime}ms`);
    console.log(`   📝 Templates: ${intelligentTemplates.length}`);
    console.log(`   🎯 Categorias únicas: ${new Set(intelligentTemplates.map(t => t.category)).size}`);
    
    // Análise de qualidade
    console.log('\n🔍 Análise de qualidade:');
    
    // Diversidade de títulos
    const traditionalTitles = new Set(traditionalTemplates.map(t => t.title));
    const intelligentTitles = new Set(intelligentTemplates.map(t => t.title));
    
    console.log(`   📝 Títulos únicos (tradicional): ${traditionalTitles.size}/${traditionalTemplates.length} (${(traditionalTitles.size/traditionalTemplates.length*100).toFixed(1)}%)`);
    console.log(`   📝 Títulos únicos (inteligente): ${intelligentTitles.size}/${intelligentTemplates.length} (${(intelligentTitles.size/intelligentTemplates.length*100).toFixed(1)}%)`);
    
    // Comprimento médio de descrições
    const traditionalDescAvg = traditionalTemplates.reduce((sum, t) => sum + t.description.length, 0) / traditionalTemplates.length;
    const intelligentDescAvg = intelligentTemplates.reduce((sum, t) => sum + t.description.length, 0) / intelligentTemplates.length;
    
    console.log(`   📄 Comprimento médio descrição (tradicional): ${traditionalDescAvg.toFixed(0)} caracteres`);
    console.log(`   📄 Comprimento médio descrição (inteligente): ${intelligentDescAvg.toFixed(0)} caracteres`);
    
    const endTime = Date.now();
    const totalTime = (endTime - startTime) / 1000;
    console.log(`\n⏱️  Tempo total de comparação: ${totalTime.toFixed(2)} segundos`);
    
  } catch (error) {
    console.error('❌ Erro durante a comparação:', error);
    process.exit(1);
  }
}

async function showIntelligentStats() {
  console.log('🧠 Estatísticas do Gerador Inteligente\n');
  
  const templates = generateIntelligentTemplateCollection(1000);
  
  console.log(`📝 Total de templates (amostra): ${templates.length.toLocaleString()}`);
  console.log(`📂 Total de categorias: ${Object.keys(CATEGORY_CONFIG).length}`);
  
  // Estatísticas por categoria
  console.log('\n📊 Templates por categoria:');
  Object.entries(CATEGORY_CONFIG).forEach(([categoryId, category]: [string, any]) => {
    const count = templates.filter((t: any) => t.category === categoryId).length;
    console.log(`   ${category.icon || '📋'} ${category.name}: ${count.toLocaleString()} templates`);
  });
  
  // Análise de qualidade
  const uniqueTitles = new Set(templates.map(t => t.title));
  const uniqueDescriptions = new Set(templates.map(t => t.description));
  
  console.log('\n🔍 Análise de qualidade:');
  console.log(`   📝 Títulos únicos: ${uniqueTitles.size}/${templates.length} (${(uniqueTitles.size/templates.length*100).toFixed(1)}%)`);
  console.log(`   📄 Descrições únicas: ${uniqueDescriptions.size}/${templates.length} (${(uniqueDescriptions.size/templates.length*100).toFixed(1)}%)`);
  
  // Comprimento médio
  const avgTitleLength = templates.reduce((sum, t) => sum + t.title.length, 0) / templates.length;
  const avgDescLength = templates.reduce((sum, t) => sum + t.description.length, 0) / templates.length;
  
  console.log(`   📏 Comprimento médio título: ${avgTitleLength.toFixed(0)} caracteres`);
  console.log(`   📏 Comprimento médio descrição: ${avgDescLength.toFixed(0)} caracteres`);
  
  // Estimativa de tamanho para 10k
  const estimatedSize = 10000 * 15; // ~15KB por página
  console.log(`\n💾 Tamanho estimado (10k páginas): ${(estimatedSize / 1024).toFixed(2)} MB`);
  
  // Tempo estimado
  const estimatedTime = 10000 / 1000 * 35; // ~35s por 1000 páginas (mais lento devido à complexidade)
  console.log(`⏱️  Tempo estimado de geração: ${(estimatedTime / 60).toFixed(1)} minutos`);
}

async function showIntelligentSampleStats() {
  const intelligentDir = './src/intelligent-pages';
  
  if (!fs.existsSync(intelligentDir)) {
    console.log('❌ Diretório de páginas inteligentes não encontrado');
    return;
  }
  
  console.log('\n📊 Estatísticas da amostra inteligente gerada:');
  
  // Contar arquivos
  const wheelsDir = path.join(intelligentDir, 'wheels');
  const categoriesDir = path.join(intelligentDir, 'categories');
  
  let wheelCount = 0;
  let categoryCount = 0;
  let totalSize = 0;
  
  if (fs.existsSync(wheelsDir)) {
    const wheelFiles = fs.readdirSync(wheelsDir);
    wheelCount = wheelFiles.length;
    
    wheelFiles.forEach(file => {
      const filePath = path.join(wheelsDir, file);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
    });
  }
  
  if (fs.existsSync(categoriesDir)) {
    const categoryFiles = fs.readdirSync(categoriesDir);
    categoryCount = categoryFiles.length;
    
    categoryFiles.forEach(file => {
      const filePath = path.join(categoriesDir, file);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
    });
  }
  
  console.log(`🎯 Páginas de roda: ${wheelCount.toLocaleString()}`);
  console.log(`📂 Páginas de categoria: ${categoryCount}`);
  console.log(`💾 Tamanho total: ${(totalSize / 1024).toFixed(2)} KB`);
  
  // Verificar outros arquivos
  const otherFiles = ['sitemap.xml', 'sitemap-index.xml', 'robots.txt'];
  console.log('\n📄 Arquivos auxiliares:');
  
  otherFiles.forEach(file => {
    const filePath = path.join(intelligentDir, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`   ✅ ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
    } else {
      console.log(`   ❌ ${file} (não encontrado)`);
    }
  });
}

async function showIntelligentGeneratedStats() {
  const intelligentDir = './src/intelligent-pages';
  
  if (!fs.existsSync(intelligentDir)) {
    console.log('❌ Diretório de páginas inteligentes não encontrado');
    return;
  }
  
  console.log('\n📊 Estatísticas dos arquivos inteligentes gerados:');
  
  // Contar arquivos
  const wheelsDir = path.join(intelligentDir, 'wheels');
  const categoriesDir = path.join(intelligentDir, 'categories');
  
  let wheelCount = 0;
  let categoryCount = 0;
  let totalSize = 0;
  
  if (fs.existsSync(wheelsDir)) {
    const wheelFiles = fs.readdirSync(wheelsDir);
    wheelCount = wheelFiles.length;
    
    wheelFiles.forEach(file => {
      const filePath = path.join(wheelsDir, file);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
    });
  }
  
  if (fs.existsSync(categoriesDir)) {
    const categoryFiles = fs.readdirSync(categoriesDir);
    categoryCount = categoryFiles.length;
    
    categoryFiles.forEach(file => {
      const filePath = path.join(categoriesDir, file);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
    });
  }
  
  console.log(`🎯 Páginas de roda: ${wheelCount.toLocaleString()}`);
  console.log(`📂 Páginas de categoria: ${categoryCount}`);
  console.log(`💾 Tamanho total: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  
  // Verificar outros arquivos
  const otherFiles = ['sitemap.xml', 'sitemap-index.xml', 'robots.txt', 'routes.ts', 'middleware.ts'];
  console.log('\n📄 Arquivos auxiliares:');
  
  otherFiles.forEach(file => {
    const filePath = path.join(intelligentDir, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`   ✅ ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
    } else {
      console.log(`   ❌ ${file} (não encontrado)`);
    }
  });
}

function showHelp() {
  console.log(`Uso: npm run seo:<comando> [opções]

Comandos disponíveis:

🔧 GERADOR TRADICIONAL:
  seo:generate         Gera todas as 10.000 páginas SEO (tradicional)
  seo:sample [count]   Gera uma amostra de páginas (padrão: 100)
  seo:batch [size]     Gera páginas em lotes (padrão: 1000)
  seo:stats            Mostra estatísticas dos templates tradicionais

🧠 GERADOR INTELIGENTE:
  seo:intelligent [count]     Gera amostra inteligente (padrão: 1000)
  seo:intelligent-full        Gera 10.000 páginas com IA
  seo:intelligent-stats       Estatísticas do gerador inteligente
  seo:compare [count]         Compara geradores (padrão: 100)

🧹 UTILITÁRIOS:
  seo:clean            Remove todos os arquivos gerados

Exemplos:

  npm run seo:generate
  npm run seo:sample 50
  npm run seo:intelligent 200
  npm run seo:intelligent-full
  npm run seo:compare 100
  npm run seo:stats
  npm run seo:clean

Notas:

  • O gerador tradicional usa combinações matemáticas simples
  • O gerador inteligente usa estratégias avançadas de IA
  • Use 'compare' para ver diferenças entre os geradores
  • A geração completa pode levar vários minutos
  • Os arquivos são gerados em ./src/generated-pages/ ou ./src/intelligent-pages/
  • Cada página é otimizada para SEO com metadados únicos
`);
}

// Executar script
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Erro fatal:', error);
    process.exit(1);
  });
}