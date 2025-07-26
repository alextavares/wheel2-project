// Componente para páginas de categoria
import React, { useState, useEffect } from 'react';
import { WheelTemplate } from '@/data/templates';
import Link from 'next/link';

interface CategoryPageProps {
  category: {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    subcategories: string[];
    seoTitle: string;
    seoDescription: string;
  };
  templates: WheelTemplate[];
  totalTemplates: number;
}

export default function CategoryPage({ category, templates, totalTemplates }: CategoryPageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const templatesPerPage = 12;

  const filteredTemplates = selectedSubcategory === 'all' 
    ? templates 
    : templates.filter(t => t.tags.includes(selectedSubcategory));

  const totalPages = Math.ceil(filteredTemplates.length / templatesPerPage);
  const startIndex = (currentPage - 1) * templatesPerPage;
  const currentTemplates = filteredTemplates.slice(startIndex, startIndex + templatesPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header da Categoria */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">{category.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Rodas de {category.name}
            </h1>
            <p className="text-xl text-purple-200 mb-6 max-w-3xl mx-auto">
              {category.description}
            </p>
            
            {/* Estatísticas */}
            <div className="flex justify-center gap-8 text-purple-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{totalTemplates}</div>
                <div className="text-sm">Rodas disponíveis</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{category.subcategories.length}</div>
                <div className="text-sm">Subcategorias</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {templates.reduce((sum, t) => sum + t.usageCount, 0).toLocaleString()}
                </div>
                <div className="text-sm">Usos totais</div>
              </div>
            </div>
          </div>

          {/* Filtros por Subcategoria */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedSubcategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedSubcategory === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/10 text-purple-200 hover:bg-white/20'
                }`}
              >
                Todas ({templates.length})
              </button>
              {category.subcategories.map((sub) => {
                const count = templates.filter(t => t.tags.includes(sub)).length;
                return (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubcategory(sub)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedSubcategory === sub
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/10 text-purple-200 hover:bg-white/20'
                    }`}
                  >
                    {sub} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid de Templates */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {currentTemplates.map((template) => (
              <Link
                key={template.id}
                href={`/wheel/${template.id}`}
                className="group"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  {/* Ícone da categoria */}
                  <div className="text-3xl mb-3 text-center">{category.icon}</div>
                  
                  {/* Título */}
                  <h3 className="text-lg font-semibold text-white mb-2 text-center group-hover:text-purple-200">
                    {template.title}
                  </h3>
                  
                  {/* Descrição */}
                  <p className="text-purple-200 text-sm mb-4 text-center line-clamp-2">
                    {template.description}
                  </p>
                  
                  {/* Estatísticas */}
                  <div className="flex justify-between items-center text-xs text-purple-300 mb-3">
                    <span>{template.items.length} itens</span>
                    <span>{template.usageCount.toLocaleString()} usos</span>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {template.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-600/30 text-purple-200 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {template.tags.length > 3 && (
                      <span className="px-2 py-1 bg-purple-600/30 text-purple-200 rounded text-xs">
                        +{template.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  {/* Indicadores */}
                  <div className="flex justify-center gap-2">
                    {template.isPopular && (
                      <span className="text-yellow-400 text-xs">⭐ Popular</span>
                    )}
                    <span className="text-purple-300 text-xs">
                      🎲 Clique para usar
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mb-12">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white/10 text-purple-200 rounded hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded ${
                      currentPage === page
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/10 text-purple-200 hover:bg-white/20'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white/10 text-purple-200 rounded hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próxima
              </button>
            </div>
          )}

          {/* Conteúdo SEO */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Sobre as Rodas de {category.name}
              </h2>
              <div className="text-purple-200 space-y-4">
                <p>
                  Explore nossa coleção completa de <strong>{totalTemplates} rodas de {category.name.toLowerCase()}</strong>, 
                  cuidadosamente criadas para atender todas as suas necessidades de escolha aleatória.
                </p>
                
                <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                  Subcategorias disponíveis:
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {category.subcategories.map((sub, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-purple-400">•</span>
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                  Por que usar nossas rodas?
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>✨ Algoritmo de aleatoriedade comprovadamente justo</li>
                  <li>🎨 Design moderno e intuitivo</li>
                  <li>📱 Totalmente responsivo para todos os dispositivos</li>
                  <li>🚀 Carregamento rápido e performance otimizada</li>
                  <li>🔄 Possibilidade de personalização completa</li>
                  <li>📊 Histórico detalhado de resultados</li>
                  <li>🎵 Efeitos sonoros e visuais envolventes</li>
                </ul>

                <div className="mt-8 p-4 bg-purple-600/20 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">📈 Estatísticas impressionantes</h4>
                  <p className="text-sm">
                    As rodas desta categoria já foram usadas mais de{' '}
                    <strong>{templates.reduce((sum, t) => sum + t.usageCount, 0).toLocaleString()}</strong> vezes 
                    por usuários do mundo todo. Junte-se à nossa comunidade!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}