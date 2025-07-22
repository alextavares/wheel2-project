import React, { useState } from 'react';

interface ColorPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{ id: string; label: string; color: string }>;
  onItemsChange: (items: Array<{ id: string; label: string; color: string }>) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
  isOpen,
  onClose,
  items,
  onItemsChange
}) => {
  const [selectedTheme, setSelectedTheme] = useState<string>('');

  // Paletas de cores expandidas
  const colorThemes = {
    rainbow: {
      name: '🌈 Arco-íris',
      colors: ['#FF0000', '#FF8000', '#FFFF00', '#80FF00', '#00FF00', '#00FF80', '#00FFFF', '#0080FF', '#0000FF', '#8000FF', '#FF00FF', '#FF0080']
    },
    sunset: {
      name: '🌅 Pôr do Sol',
      colors: ['#FF6B35', '#F7931E', '#FFD23F', '#EE4B2B', '#DC143C', '#B22222', '#8B0000', '#FF4500', '#FF6347', '#FFA500', '#FFB347', '#FFCCCB']
    },
    ocean: {
      name: '🌊 Oceano',
      colors: ['#006994', '#0085C3', '#00A6FB', '#0077BE', '#4682B4', '#5F9EA0', '#87CEEB', '#B0E0E6', '#ADD8E6', '#87CEFA', '#00CED1', '#48CAE4']
    },
    forest: {
      name: '🌲 Floresta',
      colors: ['#228B22', '#32CD32', '#90EE90', '#98FB98', '#00FF7F', '#00FA9A', '#7CFC00', '#ADFF2F', '#9ACD32', '#6B8E23', '#556B2F', '#8FBC8F']
    },
    pastel: {
      name: '🎨 Pastel',
      colors: ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#E1BAFF', '#FFBAE1', '#C9BAFF', '#BAFFDF', '#DFBAFF', '#FFCBA4', '#F4A6CD']
    },
    neon: {
      name: '💡 Neon',
      colors: ['#FF073A', '#FF6B35', '#39FF14', '#00FFFF', '#FF1493', '#8A2BE2', '#FF4500', '#00FF00', '#FF69B4', '#1E90FF', '#FFD700', '#FF00FF']
    },
    vintage: {
      name: '📻 Vintage',
      colors: ['#8B4513', '#A0522D', '#CD853F', '#DEB887', '#F4A460', '#D2691E', '#BC8F8F', '#F5DEB3', '#DDD8C7', '#C19A6B', '#E6E6FA', '#D3D3D3']
    },
    monochrome: {
      name: '⚫ Monocromático',
      colors: ['#000000', '#1C1C1C', '#383838', '#555555', '#717171', '#8D8D8D', '#AAAAAA', '#C6C6C6', '#E2E2E2', '#FFFFFF', '#F5F5F5', '#DCDCDC']
    },
    fire: {
      name: '🔥 Fogo',
      colors: ['#8B0000', '#B22222', '#DC143C', '#FF0000', '#FF4500', '#FF6347', '#FF7F50', '#FFA500', '#FFB347', '#FFC0CB', '#FFD700', '#FFFF00']
    },
    ice: {
      name: '❄️ Gelo',
      colors: ['#F0F8FF', '#E6F3FF', '#CCE7FF', '#B3DBFF', '#99CFFF', '#80C4FF', '#66B8FF', '#4DACFF', '#33A0FF', '#1A94FF', '#0088FF', '#007BFF']
    }
  };

  const gradientThemes = {
    cosmic: {
      name: '🌌 Cósmico',
      gradients: [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
      ]
    },
    aurora: {
      name: '🌌 Aurora',
      gradients: [
        'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
        'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        'linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)',
        'linear-gradient(135deg, #3f2b96 0%, #a8c0ff 100%)',
        'linear-gradient(135deg, #8360c3 0%, #2ebf91 100%)',
        'linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)'
      ]
    }
  };

  const applyTheme = (theme: string) => {
    if (colorThemes[theme as keyof typeof colorThemes]) {
      const colors = colorThemes[theme as keyof typeof colorThemes].colors;
      const updatedItems = items.map((item, index) => ({
        ...item,
        color: colors[index % colors.length]
      }));
      onItemsChange(updatedItems);
      setSelectedTheme(theme);
    }
  };

  const applyRandomColors = () => {
    const allColors = Object.values(colorThemes).flatMap(theme => theme.colors);
    const updatedItems = items.map(item => ({
      ...item,
      color: allColors[Math.floor(Math.random() * allColors.length)]
    }));
    onItemsChange(updatedItems);
  };

  const applyCustomColor = (itemId: string, color: string) => {
    const updatedItems = items.map(item =>
      item.id === itemId ? { ...item, color } : item
    );
    onItemsChange(updatedItems);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                🎨 Paleta de Cores Avançada
              </h2>
              <p className="text-pink-100 mt-1">
                Personalize as cores da sua roda com temas profissionais
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Themes Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">⚡ Ações Rápidas</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <button
                    onClick={applyRandomColors}
                    className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-colors font-medium"
                  >
                    🎲 Cores Aleatórias
                  </button>
                  <button
                    onClick={() => applyTheme('rainbow')}
                    className="p-4 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-white rounded-xl hover:opacity-90 transition-opacity font-medium"
                  >
                    🌈 Arco-íris
                  </button>
                  <button
                    onClick={() => applyTheme('pastel')}
                    className="p-4 bg-gradient-to-r from-pink-300 to-purple-300 text-white rounded-xl hover:opacity-90 transition-opacity font-medium"
                  >
                    🎨 Pastel
                  </button>
                </div>
              </div>

              {/* Color Themes */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">🎨 Temas de Cores</h3>
                <div className="grid gap-4">
                  {Object.entries(colorThemes).map(([key, theme]) => (
                    <div
                      key={key}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                        selectedTheme === key ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => applyTheme(key)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-800">{theme.name}</h4>
                        <span className="text-sm text-gray-500">{theme.colors.length} cores</span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {theme.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-8 h-8 rounded-lg border-2 border-white shadow-sm"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gradient Themes */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">✨ Temas Gradiente</h3>
                <div className="grid gap-4">
                  {Object.entries(gradientThemes).map(([key, theme]) => (
                    <div
                      key={key}
                      className="p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all hover:shadow-md"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-800">{theme.name}</h4>
                        <span className="text-sm text-gray-500">{theme.gradients.length} gradientes</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {theme.gradients.map((gradient, index) => (
                          <div
                            key={index}
                            className="h-12 rounded-lg border-2 border-white shadow-sm cursor-pointer hover:scale-105 transition-transform"
                            style={{ background: gradient }}
                            title={`Gradiente ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Items Customization */}
            <div className="space-y-6">
              {/* Preview */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">👀 Visualização</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      <div className="text-4xl mb-2">🎯</div>
                      <p className="font-medium">Nenhum item</p>
                      <p className="text-sm">Adicione itens à roda!</p>
                    </div>
                  ) : (
                    items.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-xs font-bold">
                          {index + 1}
                        </div>
                        <div
                          className="w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer"
                          style={{ backgroundColor: item.color }}
                          title="Clique para alterar cor"
                        />
                        <span className="font-medium text-gray-800 text-sm flex-1">{item.label}</span>
                        <input
                          type="color"
                          value={item.color}
                          onChange={(e) => applyCustomColor(item.id, e.target.value)}
                          className="w-8 h-8 rounded border-none cursor-pointer"
                          title="Escolher cor personalizada"
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Color Picker */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">🎯 Cores Populares</h3>
                <div className="grid grid-cols-6 gap-2">
                  {[
                    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD',
                    '#F39C12', '#E74C3C', '#9B59B6', '#3498DB', '#1ABC9C', '#2ECC71',
                    '#F1C40F', '#E67E22', '#34495E', '#95A5A6', '#FF69B4', '#8A2BE2',
                    '#00CED1', '#FF4500', '#32CD32', '#FFD700', '#DC143C', '#4169E1'
                  ].map((color, index) => (
                    <button
                      key={index}
                      className="w-8 h-8 rounded-lg border-2 border-white shadow-sm hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        if (items.length > 0) {
                          applyCustomColor(items[0].id, color);
                        }
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Estatísticas</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total de Itens:</span>
                    <span className="font-bold">{items.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cores Únicas:</span>
                    <span className="font-bold">
                      {new Set(items.map(item => item.color)).size}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tema Aplicado:</span>
                    <span className="font-bold">
                      {selectedTheme ? colorThemes[selectedTheme as keyof typeof colorThemes]?.name || 'Personalizado' : 'Nenhum'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
          <div className="text-sm text-gray-600">
            💡 Dica: Use temas para criar rodas visualmente atrativas!
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-colors font-medium"
          >
            ✨ Aplicar Cores
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;