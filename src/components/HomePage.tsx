'use client';

import React, { useState, useEffect } from 'react';
import { Locale, getTranslations } from '@/lib/i18n';
import Wheel from '@/components/Wheel';
import ModernLayout from '@/components/ModernLayout';
import { WheelItem } from '@/types/wheel';

interface HomePageProps {
  locale: Locale;
}

export default function HomePage({ locale }: HomePageProps) {
  const [isClient, setIsClient] = useState(false);
  const [items, setItems] = useState<WheelItem[]>([]);
  const [currentView, setCurrentView] = useState<'wheel' | 'templates' | 'store'>('wheel');
  const [newItem, setNewItem] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [result, setResult] = useState<WheelItem | null>(null);
  const t = getTranslations(locale);

  useEffect(() => {
    setIsClient(true);
    // Itens padrão da roleta
    setItems([
      { id: '1', label: `${t.option} 1`, color: '#FF6B6B', weight: 1 },
      { id: '2', label: `${t.option} 2`, color: '#4ECDC4', weight: 1 },
      { id: '3', label: `${t.option} 3`, color: '#45B7D1', weight: 1 },
      { id: '4', label: `${t.option} 4`, color: '#96CEB4', weight: 1 },
      { id: '5', label: `${t.option} 5`, color: '#FFEAA7', weight: 1 },
      { id: '6', label: `${t.option} 6`, color: '#DDA0DD', weight: 1 },
    ]);
  }, [locale, t]);

  const handleViewChange = (view: 'wheel' | 'templates' | 'store') => {
    setCurrentView(view);
  };

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
    setItems([
      { id: '1', label: `${t.option} 1`, color: '#FF6B6B', weight: 1 },
      { id: '2', label: `${t.option} 2`, color: '#4ECDC4', weight: 1 },
      { id: '3', label: `${t.option} 3`, color: '#45B7D1', weight: 1 },
      { id: '4', label: `${t.option} 4`, color: '#96CEB4', weight: 1 },
      { id: '5', label: `${t.option} 5`, color: '#FFEAA7', weight: 1 },
      { id: '6', label: `${t.option} 6`, color: '#DDA0DD', weight: 1 },
    ]);
    setResult(null);
  };

  const handleSpin = (resultItem: WheelItem) => {
    setResult(resultItem);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'wheel':
        return (
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                {t.seoTitle}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {t.seoDescription}
              </p>
            </div>

            {/* Wheel Component */}
            <div className="mb-12">
              {/* Controles da Roda */}
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

                {/* Editor de Itens */}
                {showEditor && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">✏️ Personalizar Opções</h3>
                    
                    {/* Adicionar novo item */}
                    <div className="flex gap-3 mb-6">
                      <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="Digite uma nova opção..."
                        className="flex-1 px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
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
                      <h4 className="text-lg font-semibold text-gray-800">📝 Opções Atuais ({items.length})</h4>
                      {items.map((item, index) => (
                        <div key={item.id} className="flex items-center gap-3 p-3 bg-white/80 rounded-lg">
                          <div 
                            className="w-6 h-6 rounded-full border-2 border-gray-300"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-gray-800 font-medium">{index + 1}.</span>
                          <input
                            type="text"
                            value={item.label}
                            onChange={(e) => updateItem(item.id, e.target.value)}
                            className="flex-1 px-3 py-1 rounded bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-400"
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
                        <div className="text-center py-8 text-gray-600">
                          <div className="text-4xl mb-2">🎯</div>
                          <p>Nenhuma opção ainda. Adicione algumas opções acima!</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Componente da Roda */}
              <div className="flex justify-center">
                {items.length > 0 ? (
                  <Wheel 
                    items={items}
                    onSpin={handleSpin}
                  />
                ) : (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Roda Vazia</h3>
                    <p className="text-gray-600 mb-6">
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
              </div>

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
            </div>

            {/* Features Section */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2">Fácil de Usar</h3>
                <p className="text-gray-600">Interface simples e intuitiva</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold mb-2">Personalizável</h3>
                <p className="text-gray-600">Customize cores e opções</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-semibold mb-2">Responsivo</h3>
                <p className="text-gray-600">Funciona em todos os dispositivos</p>
              </div>
            </div>

            {/* Categories Section */}
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-8">Categorias</h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="p-4 bg-gradient-to-br from-red-100 to-red-200 rounded-xl cursor-pointer hover:scale-105 transition-transform">
                  <div className="text-3xl mb-2">🍕</div>
                  <h3 className="font-semibold">Comida</h3>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl cursor-pointer hover:scale-105 transition-transform">
                  <div className="text-3xl mb-2">🎵</div>
                  <h3 className="font-semibold">Música</h3>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-xl cursor-pointer hover:scale-105 transition-transform">
                  <div className="text-3xl mb-2">🎬</div>
                  <h3 className="font-semibold">Filmes</h3>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl cursor-pointer hover:scale-105 transition-transform">
                  <div className="text-3xl mb-2">📚</div>
                  <h3 className="font-semibold">Educação</h3>
                </div>
              </div>
            </div>
          </div>
        );

      case 'templates':
        return (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                📚 Templates
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Escolha entre centenas de templates prontos para usar
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Template Cards */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4 text-center">🍕</div>
                <h3 className="text-xl font-semibold mb-2">Comidas Favoritas</h3>
                <p className="text-gray-600 mb-4">Pizza, Hambúrguer, Sushi, Tacos...</p>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
                  Usar Template
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4 text-center">🎬</div>
                <h3 className="text-xl font-semibold mb-2">Filmes Populares</h3>
                <p className="text-gray-600 mb-4">Ação, Comédia, Drama, Terror...</p>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
                  Usar Template
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4 text-center">🎵</div>
                <h3 className="text-xl font-semibold mb-2">Gêneros Musicais</h3>
                <p className="text-gray-600 mb-4">Rock, Pop, Jazz, Eletrônica...</p>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
                  Usar Template
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4 text-center">🏃</div>
                <h3 className="text-xl font-semibold mb-2">Exercícios</h3>
                <p className="text-gray-600 mb-4">Corrida, Yoga, Musculação...</p>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
                  Usar Template
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4 text-center">🎮</div>
                <h3 className="text-xl font-semibold mb-2">Jogos</h3>
                <p className="text-gray-600 mb-4">RPG, FPS, Estratégia, Puzzle...</p>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
                  Usar Template
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4 text-center">📚</div>
                <h3 className="text-xl font-semibold mb-2">Matérias Escolares</h3>
                <p className="text-gray-600 mb-4">Matemática, História, Ciências...</p>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
                  Usar Template
                </button>
              </div>
            </div>
          </div>
        );

      case 'store':
        return (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
                🏪 Store
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Recursos premium para sua roda da sorte
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Premium Features */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-lg p-6 border-2 border-yellow-200">
                <div className="text-4xl mb-4 text-center">⭐</div>
                <h3 className="text-xl font-semibold mb-2">Premium</h3>
                <p className="text-gray-600 mb-4">Recursos avançados e sem anúncios</p>
                <ul className="text-sm text-gray-600 mb-6 space-y-2">
                  <li>✅ Sem anúncios</li>
                  <li>✅ Templates ilimitados</li>
                  <li>✅ Exportar resultados</li>
                  <li>✅ Temas personalizados</li>
                </ul>
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition-colors">
                  R$ 9,90/mês
                </button>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-6 border-2 border-purple-200">
                <div className="text-4xl mb-4 text-center">🎨</div>
                <h3 className="text-xl font-semibold mb-2">Temas Extras</h3>
                <p className="text-gray-600 mb-4">Pacote com 50+ temas visuais</p>
                <ul className="text-sm text-gray-600 mb-6 space-y-2">
                  <li>✅ 50+ temas únicos</li>
                  <li>✅ Animações especiais</li>
                  <li>✅ Efeitos sonoros</li>
                  <li>✅ Atualizações mensais</li>
                </ul>
                <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors">
                  R$ 4,90
                </button>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 border-2 border-blue-200">
                <div className="text-4xl mb-4 text-center">📊</div>
                <h3 className="text-xl font-semibold mb-2">Analytics</h3>
                <p className="text-gray-600 mb-4">Estatísticas detalhadas dos sorteios</p>
                <ul className="text-sm text-gray-600 mb-6 space-y-2">
                  <li>✅ Histórico completo</li>
                  <li>✅ Gráficos e relatórios</li>
                  <li>✅ Exportar dados</li>
                  <li>✅ Análise de padrões</li>
                </ul>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
                  R$ 2,90/mês
                </button>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">🎁 Oferta Especial</h3>
                <p className="text-gray-600 mb-6">
                  Adquira todos os recursos premium com 50% de desconto!
                </p>
                <div className="text-3xl font-bold text-green-600 mb-4">
                  <span className="line-through text-gray-400 text-xl">R$ 16,70</span>
                  {' '}R$ 8,35/mês
                </div>
                <button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold transition-all transform hover:scale-105">
                  Aproveitar Oferta
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <ModernLayout
      title={t.home}
      subtitle={t.seoDescription}
      currentView={currentView}
      onViewChange={handleViewChange}
      templatesCount={50}
    >
      {renderContent()}
    </ModernLayout>
  );
}