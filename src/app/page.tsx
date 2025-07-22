'use client';

import { useState } from 'react';
import Wheel from '@/components/Wheel';
import { TemplateCard, CategoryFilter, SearchBar } from '@/components/TemplateLibrary';
import { 
  WHEEL_TEMPLATES, 
  getTemplatesByCategory, 
  getPopularTemplates, 
  searchTemplates,
  WheelTemplate,
  CATEGORIES 
} from '@/data/templates';
import { SavedWheels, ShareWheel } from '@/components/WheelExtras';
import AdvancedEditor from '@/components/AdvancedEditor';
import WheelStore from '@/components/WheelStore';
import MultipleWheels from '@/components/MultipleWheels';
import SoundSettings from '@/components/SoundSettings';
import ResultHistory from '@/components/ResultHistory';
import BulkEdit from '@/components/BulkEdit';
import FullscreenMode from '@/components/FullscreenMode';
import ModernLayout from '@/components/ModernLayout';
import ModernCard, { ActionButton, StatsCard } from '@/components/ModernCard';
import WeightSystem from '@/components/WeightSystem';
import EliminationMode from '@/components/EliminationMode';
import ColorPalette from '@/components/ColorPalette';
import SoundSystem from '@/components/SoundSystem';
import Analytics from '@/components/Analytics';
import WheelStats from '@/components/WheelStats';

const defaultItems = [
  { id: '1', label: 'Opção 1', color: '#FF6B6B' },
  { id: '2', label: 'Opção 2', color: '#4ECDC4' },
  { id: '3', label: 'Opção 3', color: '#45B7D1' },
  { id: '4', label: 'Opção 4', color: '#96CEB4' },
  { id: '5', label: 'Opção 5', color: '#FFEAA7' },
  { id: '6', label: 'Opção 6', color: '#DDA0DD' },
];

export default function Home() {
  const [items, setItems] = useState(defaultItems);
  const [result, setResult] = useState<string | null>(null);
  const [newItem, setNewItem] = useState('');
  const [currentView, setCurrentView] = useState<'wheel' | 'templates' | 'store'>('wheel');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedEditor, setShowAdvancedEditor] = useState(false);
  const [showWheelStore, setShowWheelStore] = useState(false);
  const [showMultipleWheels, setShowMultipleWheels] = useState(false);
  const [showSoundSettings, setShowSoundSettings] = useState(false);
  const [showResultHistory, setShowResultHistory] = useState(false);
  const [showBulkEdit, setShowBulkEdit] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  
  // Estados para funcionalidades avançadas
  const [spinHistory, setSpinHistory] = useState<any[]>([]);
  const [soundSettings, setSoundSettings] = useState({
    enabled: true,
    startSound: 'click',
    spinSound: 'spin',
    endSound: 'bell',
    volume: 0.7
  });
  
  // Estados para novos componentes avançados
  const [showWeightSystem, setShowWeightSystem] = useState(false);
  const [showEliminationMode, setShowEliminationMode] = useState(false);
  const [showColorPalette, setShowColorPalette] = useState(false);
  const [showSoundSystem, setShowSoundSystem] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showWheelStats, setShowWheelStats] = useState(false);
  const [itemWeights, setItemWeights] = useState<{[key: string]: number}>({});
  const [eliminationHistory, setEliminationHistory] = useState<string[]>([]);

  const handleSpin = (resultItem: any) => {
    setResult(resultItem);
    
    // Adicionar ao histórico
    const historyEntry = {
      id: Date.now().toString(),
      result: resultItem,
      timestamp: new Date(),
      wheelTitle: 'Roda Personalizada',
      totalItems: items.length
    };
    setSpinHistory(prev => [historyEntry, ...prev]);
  };

  const addItem = () => {
    if (newItem.trim()) {
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#F39C12', '#E74C3C'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      setItems([...items, {
        id: Date.now().toString(),
        label: newItem.trim(),
        color: randomColor
      }]);
      setNewItem('');
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleTemplateSelect = (template: any) => {
    setItems(template.items);
    setCurrentView('wheel');
    setResult(null);
  };

  const handleCommunityWheelSelect = (wheel: any) => {
    setItems(wheel.items);
    setResult(null);
    setCurrentView('wheel');
    setShowWheelStore(false);
  };

  const handleSoundSettingsChange = (settings: any) => {
    setSoundSettings(settings);
  };

  const handleClearHistory = () => {
    setSpinHistory([]);
  };

  const handleReset = () => {
    setResult(null);
  };
  // Filtrar templates baseado na categoria e busca
  const getFilteredTemplates = () => {
    let filtered = WHEEL_TEMPLATES;
    
    if (searchQuery.trim()) {
      filtered = searchTemplates(searchQuery);
    } else if (selectedCategory) {
      filtered = getTemplatesByCategory(selectedCategory);
    }
    
    return filtered;
  };

  return (
    <ModernLayout
      title="Wheel Maker"
      subtitle="Spin the Wheel - Random Picker"
      currentView={currentView}
      onViewChange={setCurrentView}
      templatesCount={WHEEL_TEMPLATES.length}
    >
        {currentView === 'wheel' ? (
          // Visualização da Roda
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Wheel Section - Central */}
            <div className="lg:col-span-2 space-y-6">
              {/* Estatísticas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <StatsCard
                  title="Total de Itens"
                  value={items.length}
                  icon="📊"
                  color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                />
                <StatsCard
                  title="Giros Hoje"
                  value={spinHistory.filter(h => {
                    const today = new Date().toDateString();
                    return new Date(h.timestamp).toDateString() === today;
                  }).length}
                  icon="🎯"
                  color="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                />
                <StatsCard
                  title="Total de Giros"
                  value={spinHistory.length}
                  icon="🏆"
                  color="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                />
              </div>

              {/* Roda */}
              <ModernCard 
                title="Sua Roda Personalizada"
                subtitle="Clique no centro para girar"
                icon="🎯"
                gradient={true}
                className="text-center"
              >
                <Wheel items={items} size={500} onSpin={handleSpin} />
              </ModernCard>
              
              {/* Resultado */}
              {result && (
                <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white p-8 rounded-2xl shadow-2xl transform animate-pulse">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎉</div>
                    <p className="text-lg opacity-90 mb-2">🏆 Vencedor!</p>
                    <h3 className="text-4xl font-bold mb-4">
                      {typeof result === 'string' ? result : result?.label || 'Resultado'}
                    </h3>
                    <ActionButton
                      onClick={handleReset}
                      variant="secondary"
                      size="sm"
                      icon="🔄"
                    >
                      Girar Novamente
                    </ActionButton>
                  </div>
                </div>
              )}
            </div>

            {/* Controls Section */}
            <div className="space-y-6">
              {/* Add Item */}
              <ModernCard
                title="Adicionar Item"
                subtitle="Digite um novo item para a roda"
                icon="+"
              >
                <div className="space-y-4">
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Digite seu item aqui..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white/70 backdrop-blur-sm"
                    onKeyPress={(e) => e.key === 'Enter' && addItem()}
                  />
                  <ActionButton
                    onClick={addItem}
                    variant="primary"
                    size="md"
                    icon="➕"
                    className="w-full"
                  >
                    Adicionar à Roda
                  </ActionButton>
                </div>
              </ModernCard>

              {/* Entries List */}
              <ModernCard
                title="Lista de Itens"
                subtitle={`${items.length} ${items.length === 1 ? 'item' : 'itens'} na roda`}
                icon="📝"
              >
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {items.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      <div className="text-4xl mb-2">🎯</div>
                      <p className="font-medium">Nenhum item ainda</p>
                      <p className="text-sm">Adicione alguns itens para começar!</p>
                    </div>
                  ) : (
                    items.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-white/80 to-white/60 rounded-xl hover:from-white/90 hover:to-white/80 transition-all duration-300 group border border-white/30 shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-bold shadow-lg">
                            {index + 1}
                          </div>
                          <div
                            className="w-5 h-5 rounded-full border-2 border-white shadow-lg"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="font-semibold text-gray-800">{item.label}</span>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all p-2 rounded-lg hover:bg-red-50"
                          title="Remover item"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </ModernCard>

              {/* Quick Actions */}
              <ModernCard
                title="Ações Rápidas"
                subtitle="Ferramentas e funcionalidades avançadas"
                icon="⚡"
              >
                <div className="grid grid-cols-2 gap-3">
                  <ActionButton
                    onClick={() => setShowAdvancedEditor(true)}
                    variant="secondary"
                    size="sm"
                    icon="🎨"
                  >
                    Editor
                  </ActionButton>
                  <ActionButton
                    onClick={() => setShowWheelStore(true)}
                    variant="secondary"
                    size="sm"
                    icon="🏪"
                  >
                    Store
                  </ActionButton>
                  <ActionButton
                    onClick={() => setShowMultipleWheels(true)}
                    variant="secondary"
                    size="sm"
                    icon="🎯"
                  >
                    Múltiplas
                  </ActionButton>
                  <ActionButton
                    onClick={() => setShowBulkEdit(true)}
                    variant="secondary"
                    size="sm"
                    icon="✏️"
                  >
                    Edição
                  </ActionButton>
                  <ActionButton
                    onClick={() => setShowFullscreen(true)}
                    variant="secondary"
                    size="sm"
                    icon="🔍"
                  >
                    Tela Cheia
                  </ActionButton>
                  <ActionButton
                    onClick={() => setShowSoundSettings(true)}
                    variant="secondary"
                    size="sm"
                    icon="🔊"
                  >
                    Sons
                  </ActionButton>
                  <ActionButton
                    onClick={() => setShowResultHistory(true)}
                    variant="secondary"
                    size="sm"
                    icon="📊"
                  >
                    Histórico
                  </ActionButton>
                  <ActionButton
                    onClick={() => setShowWeightSystem(true)}
                    variant="secondary"
                    size="sm"
                    icon="⚖️"
                  >
                    Pesos
                  </ActionButton>
                  <ActionButton
                    onClick={() => setShowEliminationMode(true)}
                    variant="secondary"
                    size="sm"
                    icon="🎯"
                  >
                    Eliminação
                  </ActionButton>
                  <ActionButton
                    onClick={() => setShowColorPalette(true)}
                    variant="secondary"
                    size="sm"
                    icon="🎨"
                  >
                    Cores
                  </ActionButton>
                  <ActionButton
                    onClick={() => setShowSoundSystem(true)}
                    variant="secondary"
                    size="sm"
                    icon="🔊"
                  >
                    Som Pro
                  </ActionButton>
                  <ActionButton
                    onClick={() => setShowAnalytics(true)}
                    variant="secondary"
                    size="sm"
                    icon="📈"
                  >
                    Analytics
                  </ActionButton>
                  <ActionButton
                    onClick={() => setShowWheelStats(true)}
                    variant="secondary"
                    size="sm"
                    icon="📊"
                  >
                    Estatísticas
                  </ActionButton>
                  <ActionButton
                    onClick={() => setCurrentView('templates')}
                    variant="success"
                    size="sm"
                    icon="📚"
                  >
                    Templates
                  </ActionButton>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200/50">
                  <div className="grid grid-cols-2 gap-3">
                    <ActionButton
                      onClick={() => setItems([])}
                      variant="danger"
                      size="sm"
                      icon="🗑️"
                    >
                      Limpar Tudo
                    </ActionButton>
                    <ActionButton
                      onClick={() => {
                        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#F39C12', '#E74C3C'];
                        const examples = ['Pizza', 'Burger', 'Salad', 'Pasta', 'Sushi', 'Tacos'];
                        setItems(examples.map((label, i) => ({
                          id: Date.now().toString() + i,
                          label,
                          color: colors[i % colors.length]
                        })));
                      }}
                      variant="warning"
                      size="sm"
                      icon="🍕"
                    >
                      Exemplo
                    </ActionButton>
                  </div>
                </div>
              </ModernCard>
            </div>
          </div>
        ) : currentView === 'templates' ? (
          // Visualização de Templates
          <div>
            {/* Header da seção de templates */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Biblioteca de Templates
              </h2>
              <p className="text-gray-600">
                Escolha entre {WHEEL_TEMPLATES.length} templates pré-definidos para começar rapidamente
              </p>
            </div>

            {/* Seção de Templates Populares */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                Templates Mais Populares
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {getPopularTemplates().slice(0, 6).map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onSelect={handleTemplateSelect}
                  />
                ))}
              </div>
            </div>

            {/* Filtros e Busca */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Encontre o Template Perfeito
              </h3>
              
              <SearchBar 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
              
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>

            {/* Grid de Templates Filtrados */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  {searchQuery ? `Resultados para "${searchQuery}"` : 
                   selectedCategory ? `${Object.values(CATEGORIES).find(cat => cat.id === selectedCategory)?.name}` : 
                   'Todos os Templates'}
                </h3>
                <span className="text-sm text-gray-500">
                  {getFilteredTemplates().length} templates encontrados
                </span>
              </div>
              
              {getFilteredTemplates().length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Nenhum template encontrado
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Tente ajustar sua busca ou escolher uma categoria diferente
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(null);
                    }}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Ver Todos os Templates
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredTemplates().map((template) => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      onSelect={handleTemplateSelect}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
           // Visualização da Store
           <div className="text-center py-12">
             <div className="text-6xl mb-4">🏪</div>
             <h2 className="text-2xl font-bold mb-4">Wheel Store</h2>
             <p className="text-gray-600 mb-6">
               Descubra milhares de rodas criadas pela comunidade!
             </p>
             <button
               onClick={() => setShowWheelStore(true)}
               className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
             >
               🏪 Abrir Wheel Store
             </button>
           </div>
         )}

        {/* Modais dos Componentes Avançados */}
        <AdvancedEditor
          isOpen={showAdvancedEditor}
          onClose={() => setShowAdvancedEditor(false)}
          items={items}
          onItemsChange={setItems}
        />

        <WheelStore
          isOpen={showWheelStore}
          onClose={() => setShowWheelStore(false)}
          onWheelSelect={handleCommunityWheelSelect}
        />

        <MultipleWheels
          isOpen={showMultipleWheels}
          onClose={() => setShowMultipleWheels(false)}
        />

        <SoundSettings
          isOpen={showSoundSettings}
          onClose={() => setShowSoundSettings(false)}
          onSoundChange={handleSoundSettingsChange}
        />

        <ResultHistory
          isOpen={showResultHistory}
          onClose={() => setShowResultHistory(false)}
          results={spinHistory}
          onClearHistory={handleClearHistory}
        />

        <BulkEdit
          isOpen={showBulkEdit}
          onClose={() => setShowBulkEdit(false)}
          items={items}
          onItemsChange={setItems}
        />

        <FullscreenMode
          isOpen={showFullscreen}
          onClose={() => setShowFullscreen(false)}
          items={items.map(item => item.label)}
          onSpin={() => handleSpin(items[Math.floor(Math.random() * items.length)])}
          result={typeof result === 'string' ? result : result?.label || null}
          isSpinning={false}
          onReset={handleReset}
        />

        {/* Novos Componentes Avançados */}
        <WeightSystem
          isOpen={showWeightSystem}
          onClose={() => setShowWeightSystem(false)}
          items={items}
          weights={itemWeights}
          onWeightsChange={setItemWeights}
        />

        <EliminationMode
          isOpen={showEliminationMode}
          onClose={() => setShowEliminationMode(false)}
          items={items}
          eliminationHistory={eliminationHistory}
          onEliminationHistoryChange={setEliminationHistory}
        />

        <ColorPalette
          isOpen={showColorPalette}
          onClose={() => setShowColorPalette(false)}
          items={items}
          onItemsChange={setItems}
        />

        <SoundSystem
          isOpen={showSoundSystem}
          onClose={() => setShowSoundSystem(false)}
          onSoundChange={(enabled, type, volume) => {
            setSoundSettings({
              ...soundSettings,
              enabled,
              type,
              volume
            });
          }}
          currentSettings={{
            enabled: soundSettings.enabled,
            type: soundSettings.startSound,
            volume: soundSettings.volume * 100
          }}
        />

        <Analytics
          isOpen={showAnalytics}
          onClose={() => setShowAnalytics(false)}
          spinHistory={spinHistory.map(h => ({
            id: h.id,
            result: h.result,
            timestamp: h.timestamp,
            duration: Math.random() * 3 + 2 // Simular duração
          }))}
          items={items}
        />

        <WheelStats
          isOpen={showWheelStats}
          onClose={() => setShowWheelStats(false)}
          currentResult={result}
          wheelItems={items.map(item => item.label)}
        />
    </ModernLayout>
  );
}
