'use client';

// Componente para páginas individuais de roda
import React, { useState, useEffect } from 'react';
import { WheelTemplate, WheelItem } from '@/types/wheel';
import Wheel from '@/components/Wheel';
import RelatedWheels from '@/components/RelatedWheels';

interface WheelPageProps {
  route?: {
    slug: string;
    category: string;
    title: string;
  };
  template?: WheelTemplate;
  seoTitle?: string;
  seoDescription?: string;
}

export default function WheelPage({ route, template: providedTemplate, seoTitle: providedSeoTitle, seoDescription: providedSeoDescription }: WheelPageProps) {
  // Estados para funcionalidades interativas
  const [items, setItems] = useState<WheelItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const [result, setResult] = useState<WheelItem | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Usar template fornecido ou criar mock baseado na rota
  const template = providedTemplate || {
    id: route?.slug || 'default',
    title: route?.title || 'Roda Personalizada',
    description: route ? `Roda interativa de ${route.title.toLowerCase()}` : 'Roda interativa personalizada',
    category: route?.category || 'general',
    slug: route?.slug || 'default',
    items: [
      { id: '1', label: 'Opção 1', color: '#FF6B6B' },
      { id: '2', label: 'Opção 2', color: '#4ECDC4' },
      { id: '3', label: 'Opção 3', color: '#45B7D1' },
      { id: '4', label: 'Opção 4', color: '#96CEB4' },
      { id: '5', label: 'Opção 5', color: '#FFEAA7' },
      { id: '6', label: 'Opção 6', color: '#DDA0DD' }
    ],
    tags: [route?.category || 'geral', 'roda', 'sorteio'],
    usageCount: 1000,
    isPopular: true,
    createdAt: '2024-01-01',
    keywords: [route?.category || 'geral', 'roda', 'sorteio']
  };
  
  const seoTitle = providedSeoTitle || route?.title || template.title;
  const seoDescription = providedSeoDescription || (route ? `${route.title} - Roda interativa para sorteios e decisões aleatórias` : template.description);

  // Inicializar itens do template
  useEffect(() => {
    setItems(template.items);
    setIsClient(true);
  }, [template]);

  // Funções para editar a roda
  const addItem = () => {
    if (newItem.trim()) {
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#F39C12', '#E74C3C'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      const newWheelItem: WheelItem = {
        id: Date.now().toString(),
        label: newItem.trim(),
        color: randomColor,
        weight: 1
      };
      
      setItems([...items, newWheelItem]);
      setNewItem('');
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, newLabel: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, label: newLabel } : item
    ));
  };

  const resetToOriginal = () => {
    setItems(template.items);
    setResult(null);
  };

  const handleSpin = (resultItem: WheelItem) => {
    setResult(resultItem);
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {/* Header Simplificado */}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {template.title}
            </h1>
            <p className="text-xl text-purple-200 mb-6 max-w-2xl mx-auto">
              {template.description}
            </p>
            
            {/* Tags simplificadas */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {template.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-600/30 text-purple-200 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Estatísticas simplificadas */}
            <div className="flex justify-center gap-6 text-purple-200 text-sm">
              <span>🎯 {template.usageCount.toLocaleString()} usos</span>
              <span>📅 Criado em {new Date(template.createdAt).toLocaleDateString('pt-BR')}</span>
              {template.isPopular && <span>⭐ Popular</span>}
            </div>
          </div>

          {/* Controles Simplificados */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => setShowEditor(!showEditor)}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-semibold"
              >
                {showEditor ? '🎯 Ver Roda' : '✏️ Personalizar'}
              </button>
              <button
                onClick={resetToOriginal}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-semibold"
              >
                🔄 Resetar
              </button>
            </div>

            {/* Editor de Itens Simplificado */}
            {showEditor && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">✏️ Personalizar Opções</h3>
                
                {/* Adicionar novo item */}
                <div className="flex gap-3 mb-6">
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Digite uma nova opção..."
                    className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-purple-200 border border-purple-300/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    onKeyPress={(e) => e.key === 'Enter' && addItem()}
                  />
                  <button
                    onClick={addItem}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-semibold"
                  >
                    ➕ Adicionar
                  </button>
                </div>

                {/* Lista de itens editáveis */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white">📝 Opções Atuais ({items.length})</h4>
                  {items.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                      <div 
                        className="w-6 h-6 rounded-full border-2 border-white"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-white font-medium">{index + 1}.</span>
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => updateItem(item.id, e.target.value)}
                        className="flex-1 px-3 py-1 rounded bg-white/20 text-white border border-purple-300/30 focus:outline-none focus:ring-1 focus:ring-purple-400"
                      />
                      <button
                        onClick={() => removeItem(item.id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                        title="Remover item"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                  
                  {items.length === 0 && (
                    <div className="text-center py-8 text-purple-200">
                      <div className="text-4xl mb-2">🎯</div>
                      <p>Nenhuma opção ainda. Adicione algumas opções acima!</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Componente da Roda */}
          <div className="max-w-4xl mx-auto">
            {items.length > 0 ? (
              <>
                <Wheel 
                  items={items}
                  onSpin={handleSpin}
                />
                
                {/* Resultado */}
                {result && (
                  <div className="mt-8 text-center">
                    <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white p-8 rounded-2xl shadow-2xl transform animate-pulse max-w-md mx-auto">
                      <div className="text-6xl mb-4">🎉</div>
                      <p className="text-lg opacity-90 mb-2">🏆 Resultado:</p>
                      <h3 className="text-3xl font-bold mb-4">{result.label}</h3>
                      <button
                        onClick={() => setResult(null)}
                        className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors font-semibold"
                      >
                        🔄 Girar Novamente
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-white mb-4">Roda Vazia</h3>
                <p className="text-purple-200 mb-6">
                  Adicione algumas opções para começar a usar a roda!
                </p>
                <button
                  onClick={() => setShowEditor(true)}
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-semibold"
                >
                  ✏️ Adicionar Opções
                </button>
              </div>
            )}
            
            {/* Seção de Roletas Relacionadas */}
            <RelatedWheels 
              currentSlug={template.slug}
              category={template.category}
              maxItems={6}
            />
          </div>
        </div>
      </div>
  );
}