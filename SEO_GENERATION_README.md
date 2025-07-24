# Sistema de Geração de 10.000 Páginas SEO

Este sistema permite gerar automaticamente 10.000 páginas otimizadas para SEO, organizadas por categorias e subcategorias.

## 🚀 Funcionalidades

- **10.000 páginas únicas** com conteúdo otimizado para SEO
- **12 categorias principais** com subcategorias específicas
- **Metadados únicos** para cada página (título, descrição, keywords)
- **Sitemap XML** automático para indexação
- **Structured Data (JSON-LD)** para rich snippets
- **URLs amigáveis** com slugs otimizados
- **Open Graph** e **Twitter Cards** para redes sociais
- **Robots.txt** configurado
- **Middleware** para redirecionamentos e segurança

## 📁 Estrutura Gerada

```
src/generated-pages/
├── wheels/           # 10.000 páginas individuais de rodas
├── categories/       # 12 páginas de categoria
├── sitemap.xml       # Sitemap principal
├── sitemap-index.xml # Índice de sitemaps
├── robots.txt        # Configuração para crawlers
├── routes.ts         # Rotas para Next.js
└── middleware.ts     # Middleware de redirecionamento
```

## 🛠️ Como Usar

### 1. Instalar Dependências

```bash
npm install
```

### 2. Comandos Disponíveis

#### Gerar todas as 10.000 páginas
```bash
npm run seo:generate
```

#### Gerar amostra para teste (100 páginas)
```bash
npm run seo:sample
```

#### Ver estatísticas dos templates
```bash
npm run seo:stats
```

#### Limpar arquivos gerados
```bash
npm run seo:clean
```

## 📊 Estatísticas

- **Total de páginas**: 10.000+
- **Categorias**: 12 principais
- **Subcategorias**: 5-8 por categoria
- **Templates por categoria**: ~833
- **Tamanho estimado**: ~150 MB
- **Tempo de geração**: ~5-10 minutos

## 🎯 Categorias Incluídas

1. **🍕 Comida** - Restaurantes, pratos, bebidas, sobremesas
2. **🎮 Jogos** - Videogames, jogos de tabuleiro, esportes
3. **📚 Educação** - Matérias, atividades, exercícios
4. **🎬 Filmes** - Gêneros, diretores, atores, séries
5. **🎵 Música** - Gêneros, artistas, instrumentos
6. **🤔 Decisões** - Escolhas do dia a dia, dilemas
7. **🎁 Sorteios** - Prêmios, brindes, competições
8. **🔮 Sorte** - Previsões, números da sorte
9. **⚽ Esportes** - Modalidades, times, exercícios
10. **✈️ Viagem** - Destinos, atividades, planejamento
11. **💼 Trabalho** - Tarefas, decisões profissionais
12. **🎲 Aleatório** - Temas diversos e criativos

## 🔧 Personalização

### Modificar Templates

Edite o arquivo `src/data/massiveTemplateGenerator.ts` para:
- Adicionar novas categorias
- Modificar subcategorias
- Ajustar dados base para geração
- Personalizar metadados SEO

### Ajustar Componentes

- **WheelPage.tsx**: Layout das páginas individuais
- **CategoryPage.tsx**: Layout das páginas de categoria
- **seoPageGenerator.ts**: Lógica de geração

## 📈 SEO Features

### Metadados Únicos
Cada página possui:
- Título único e descritivo
- Meta description otimizada
- Keywords relevantes
- URL canônica

### Structured Data
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Título da Roda",
  "description": "Descrição otimizada",
  "url": "URL canônica",
  "applicationCategory": "GameApplication"
}
```

### Open Graph
```html
<meta property="og:title" content="Título SEO" />
<meta property="og:description" content="Descrição" />
<meta property="og:image" content="Imagem gerada" />
<meta property="og:url" content="URL canônica" />
```

### Sitemap XML
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://wheelmaker.app/wheel/slug</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

## 🚀 Deploy

### Next.js Static Export

1. Configure `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

2. Gere as páginas:
```bash
npm run seo:generate
```

3. Build estático:
```bash
npm run build
```

### Integração com CMS

Para integrar com um CMS:

1. Modifique `massiveTemplateGenerator.ts`
2. Conecte com API do CMS
3. Gere páginas dinamicamente
4. Configure regeneração automática

## 📊 Monitoramento

### Google Search Console
- Submeta o sitemap: `https://seusite.com/sitemap-index.xml`
- Monitore indexação das páginas
- Acompanhe performance de busca

### Analytics
- Configure Google Analytics
- Monitore tráfego por categoria
- Acompanhe conversões

## 🔄 Manutenção

### Atualização Regular
```bash
# Limpar páginas antigas
npm run seo:clean

# Gerar novas páginas
npm run seo:generate

# Rebuild do site
npm run build
```

### Backup
- Faça backup dos templates originais
- Versione as configurações SEO
- Monitore mudanças de performance

## 🐛 Troubleshooting

### Erro de Memória
```bash
# Use geração em lotes
node --max-old-space-size=4096 src/scripts/generate-seo.ts batch 500
```

### Páginas Não Indexadas
1. Verifique robots.txt
2. Confirme sitemap no Search Console
3. Teste URLs individuais

### Performance Lenta
1. Otimize imagens
2. Configure CDN
3. Use cache agressivo

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique os logs de geração
2. Execute `npm run seo:stats` para diagnóstico
3. Consulte a documentação do Next.js

---

**Nota**: Este sistema é otimizado para gerar milhares de páginas de forma eficiente. Use com responsabilidade e monitore o impacto no servidor.