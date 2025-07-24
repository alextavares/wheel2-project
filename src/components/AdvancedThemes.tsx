'use client';

import { useState, useEffect } from 'react';

interface Theme {
  id: string;
  name: string;
  description: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    wheelBorder: string;
    segmentColors: string[];
  };
  fonts: {
    primary: string;
    secondary: string;
    size: {
      small: string;
      medium: string;
      large: string;
    };
  };
  effects: {
    shadows: boolean;
    gradients: boolean;
    animations: boolean;
    particles: boolean;
  };
  wheelStyle: {
    borderWidth: number;
    borderStyle: 'solid' | 'dashed' | 'dotted';
    innerShadow: boolean;
    outerGlow: boolean;
    texture?: string;
  };
}

interface AdvancedThemesProps {
  currentTheme?: Theme;
  onThemeChange: (theme: Theme) => void;
  onClose: () => void;
}

const defaultThemes: Theme[] = [
  {
    id: 'classic',
    name: 'Clássico',
    description: 'Design tradicional e elegante',
    preview: '🎨',
    colors: {
      primary: '#3b82f6',
      secondary: '#1e40af',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937',
      wheelBorder: '#374151',
      segmentColors: ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6']
    },
    fonts: {
      primary: 'Inter, sans-serif',
      secondary: 'Inter, sans-serif',
      size: { small: '14px', medium: '16px', large: '24px' }
    },
    effects: {
      shadows: true,
      gradients: false,
      animations: true,
      particles: false
    },
    wheelStyle: {
      borderWidth: 4,
      borderStyle: 'solid',
      innerShadow: true,
      outerGlow: false
    }
  },
  {
    id: 'neon',
    name: 'Neon',
    description: 'Estilo cyberpunk com cores vibrantes',
    preview: '⚡',
    colors: {
      primary: '#ff00ff',
      secondary: '#00ffff',
      accent: '#ffff00',
      background: '#0a0a0a',
      text: '#ffffff',
      wheelBorder: '#ff00ff',
      segmentColors: ['#ff0080', '#ff8000', '#ffff00', '#80ff00', '#00ff80', '#0080ff', '#8000ff', '#ff0040']
    },
    fonts: {
      primary: 'Orbitron, monospace',
      secondary: 'Orbitron, monospace',
      size: { small: '14px', medium: '18px', large: '28px' }
    },
    effects: {
      shadows: true,
      gradients: true,
      animations: true,
      particles: true
    },
    wheelStyle: {
      borderWidth: 6,
      borderStyle: 'solid',
      innerShadow: false,
      outerGlow: true
    }
  },
  {
    id: 'nature',
    name: 'Natureza',
    description: 'Cores terrosas e orgânicas',
    preview: '🌿',
    colors: {
      primary: '#16a34a',
      secondary: '#15803d',
      accent: '#ca8a04',
      background: '#f7f7f7',
      text: '#374151',
      wheelBorder: '#92400e',
      segmentColors: ['#dc2626', '#ea580c', '#ca8a04', '#65a30d', '#16a34a', '#0891b2', '#2563eb', '#7c3aed']
    },
    fonts: {
      primary: 'Poppins, sans-serif',
      secondary: 'Poppins, sans-serif',
      size: { small: '14px', medium: '16px', large: '24px' }
    },
    effects: {
      shadows: true,
      gradients: true,
      animations: true,
      particles: false
    },
    wheelStyle: {
      borderWidth: 5,
      borderStyle: 'solid',
      innerShadow: true,
      outerGlow: false,
      texture: 'wood'
    }
  },
  {
    id: 'ocean',
    name: 'Oceano',
    description: 'Tons azuis relaxantes',
    preview: '🌊',
    colors: {
      primary: '#0ea5e9',
      secondary: '#0284c7',
      accent: '#06b6d4',
      background: '#f0f9ff',
      text: '#0c4a6e',
      wheelBorder: '#0369a1',
      segmentColors: ['#1e40af', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe', '#06b6d4', '#0891b2']
    },
    fonts: {
      primary: 'Nunito, sans-serif',
      secondary: 'Nunito, sans-serif',
      size: { small: '14px', medium: '16px', large: '24px' }
    },
    effects: {
      shadows: true,
      gradients: true,
      animations: true,
      particles: true
    },
    wheelStyle: {
      borderWidth: 4,
      borderStyle: 'solid',
      innerShadow: true,
      outerGlow: true
    }
  },
  {
    id: 'sunset',
    name: 'Pôr do Sol',
    description: 'Gradientes quentes e acolhedores',
    preview: '🌅',
    colors: {
      primary: '#f97316',
      secondary: '#ea580c',
      accent: '#fbbf24',
      background: '#fef3c7',
      text: '#92400e',
      wheelBorder: '#c2410c',
      segmentColors: ['#dc2626', '#ef4444', '#f97316', '#f59e0b', '#eab308', '#ca8a04', '#a16207', '#92400e']
    },
    fonts: {
      primary: 'Playfair Display, serif',
      secondary: 'Lato, sans-serif',
      size: { small: '14px', medium: '18px', large: '26px' }
    },
    effects: {
      shadows: true,
      gradients: true,
      animations: true,
      particles: false
    },
    wheelStyle: {
      borderWidth: 6,
      borderStyle: 'solid',
      innerShadow: true,
      outerGlow: true
    }
  },
  {
    id: 'minimal',
    name: 'Minimalista',
    description: 'Design limpo e moderno',
    preview: '⚪',
    colors: {
      primary: '#6b7280',
      secondary: '#4b5563',
      accent: '#374151',
      background: '#ffffff',
      text: '#111827',
      wheelBorder: '#d1d5db',
      segmentColors: ['#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280', '#4b5563', '#374151', '#1f2937']
    },
    fonts: {
      primary: 'SF Pro Display, sans-serif',
      secondary: 'SF Pro Text, sans-serif',
      size: { small: '13px', medium: '15px', large: '22px' }
    },
    effects: {
      shadows: false,
      gradients: false,
      animations: true,
      particles: false
    },
    wheelStyle: {
      borderWidth: 2,
      borderStyle: 'solid',
      innerShadow: false,
      outerGlow: false
    }
  }
];

export function AdvancedThemes({ currentTheme, onThemeChange, onClose }: AdvancedThemesProps) {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(currentTheme || defaultThemes[0]);
  const [customTheme, setCustomTheme] = useState<Theme | null>(null);
  const [isCreatingCustom, setIsCreatingCustom] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const applyTheme = (theme: Theme) => {
    setSelectedTheme(theme);
    if (previewMode) {
      onThemeChange(theme);
    }
  };

  const saveTheme = () => {
    onThemeChange(selectedTheme);
    onClose();
  };

  const createCustomTheme = () => {
    const newCustomTheme: Theme = {
      ...defaultThemes[0],
      id: 'custom-' + Date.now(),
      name: 'Tema Personalizado',
      description: 'Criado por você'
    };
    setCustomTheme(newCustomTheme);
    setIsCreatingCustom(true);
  };

  const updateCustomTheme = (updates: Partial<Theme>) => {
    if (customTheme) {
      const updated = { ...customTheme, ...updates };
      setCustomTheme(updated);
      setSelectedTheme(updated);
    }
  };

  const exportTheme = () => {
    const themeData = JSON.stringify(selectedTheme, null, 2);
    const blob = new Blob([themeData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `theme-${selectedTheme.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          setCustomTheme(imported);
          setSelectedTheme(imported);
          setIsCreatingCustom(true);
        } catch (error) {
          alert('Erro ao importar tema. Verifique se o arquivo é válido.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-8 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="flex items-center gap-4">
            <div className="text-4xl drop-shadow-sm">🎨</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Temas Avançados</h2>
              <p className="text-base text-gray-600 font-medium">Personalize a aparência da sua roda</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-3 text-sm text-gray-700 font-medium cursor-pointer hover:text-purple-600 transition-colors">
              <input
                type="checkbox"
                checked={previewMode}
                onChange={(e) => setPreviewMode(e.target.checked)}
                className="rounded-md w-4 h-4 text-purple-600 focus:ring-purple-500 focus:ring-2"
              />
              Pré-visualização
            </label>
            
            <button
              onClick={onClose}
              className="p-3 hover:bg-white hover:shadow-md rounded-xl transition-all duration-200 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista de Temas */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 tracking-tight">Temas Disponíveis</h3>
                <div className="flex gap-3">
                  <button
                    onClick={createCustomTheme}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Criar Personalizado
                  </button>
                  <label className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer">
                    Importar
                    <input
                      type="file"
                      accept=".json"
                      onChange={importTheme}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {defaultThemes.map((theme) => (
                  <div
                    key={theme.id}
                    onClick={() => applyTheme(theme)}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-xl transform hover:scale-105 ${
                      selectedTheme.id === theme.id
                        ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-purple-100 shadow-lg'
                        : 'border-gray-200 hover:border-purple-300 bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-3xl drop-shadow-sm">{theme.preview}</div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-800 tracking-tight">{theme.name}</h4>
                        <p className="text-sm text-gray-600 font-medium leading-relaxed">{theme.description}</p>
                      </div>
                    </div>
                    
                    {/* Preview das cores */}
                    <div className="flex gap-2 mb-4">
                      {theme.colors.segmentColors.slice(0, 6).map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-lg border-2 border-white shadow-md"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                        {theme.fonts.primary.split(',')[0]}
                      </div>
                      <div className="flex gap-2">
                        {Object.entries(theme.effects)
                          .filter(([_, value]) => value)
                          .slice(0, 2)
                          .map(([key]) => (
                            <span
                              key={key}
                              className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full capitalize"
                            >
                              {key}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}

                {customTheme && (
                  <div
                    onClick={() => applyTheme(customTheme)}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-xl transform hover:scale-105 ${
                      selectedTheme.id === customTheme.id
                        ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-purple-100 shadow-lg'
                        : 'border-gray-200 hover:border-purple-300 bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-3xl drop-shadow-sm">🎨</div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-800 tracking-tight">{customTheme.name}</h4>
                        <p className="text-sm text-gray-600 font-medium leading-relaxed">{customTheme.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mb-4">
                      {customTheme.colors.segmentColors.slice(0, 6).map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-lg border-2 border-white shadow-md"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    
                    <div className="text-xs text-purple-600 font-bold uppercase tracking-wider bg-purple-100 px-3 py-1 rounded-full inline-block">
                      Personalizado
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Painel de Customização */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 tracking-tight mb-6">
                  {isCreatingCustom ? 'Personalizar Tema' : 'Detalhes do Tema'}
                </h3>
                
                {isCreatingCustom && customTheme ? (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 tracking-wide">
                        Nome do Tema
                      </label>
                      <input
                        type="text"
                        value={customTheme.name}
                        onChange={(e) => updateCustomTheme({ name: e.target.value })}
                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 font-medium text-gray-800 placeholder-gray-400"
                        placeholder="Digite o nome do tema..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 tracking-wide">
                        Descrição
                      </label>
                      <input
                        type="text"
                        value={customTheme.description}
                        onChange={(e) => updateCustomTheme({ description: e.target.value })}
                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 font-medium text-gray-800 placeholder-gray-400"
                        placeholder="Descreva seu tema..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 tracking-wide">
                        Cor Principal
                      </label>
                      <input
                        type="color"
                        value={customTheme.colors.primary}
                        onChange={(e) => updateCustomTheme({
                          colors: { ...customTheme.colors, primary: e.target.value }
                        })}
                        className="w-full h-12 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-purple-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 tracking-wide">
                        Cor de Fundo
                      </label>
                      <input
                        type="color"
                        value={customTheme.colors.background}
                        onChange={(e) => updateCustomTheme({
                          colors: { ...customTheme.colors, background: e.target.value }
                        })}
                        className="w-full h-12 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-purple-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 tracking-wide">
                        Fonte Principal
                      </label>
                      <select
                        value={customTheme.fonts.primary}
                        onChange={(e) => updateCustomTheme({
                          fonts: { ...customTheme.fonts, primary: e.target.value }
                        })}
                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 font-medium text-gray-800 bg-white"
                      >
                        <option value="Inter, sans-serif">Inter</option>
                        <option value="Poppins, sans-serif">Poppins</option>
                        <option value="Roboto, sans-serif">Roboto</option>
                        <option value="Playfair Display, serif">Playfair Display</option>
                        <option value="Orbitron, monospace">Orbitron</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-4 tracking-wide">
                        Efeitos
                      </label>
                      <div className="space-y-3">
                        {Object.entries(customTheme.effects).map(([key, value]) => (
                          <label key={key} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => updateCustomTheme({
                                effects: { ...customTheme.effects, [key]: e.target.checked }
                              })}
                              className="rounded-md w-5 h-5 text-purple-600 focus:ring-purple-500 focus:ring-2"
                            />
                            <span className="text-sm font-medium text-gray-700 capitalize">{key}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-3 tracking-tight">{selectedTheme.name}</h4>
                      <p className="text-sm text-gray-600 mb-6 font-medium leading-relaxed">{selectedTheme.description}</p>
                    </div>

                    <div>
                      <h5 className="text-sm font-bold text-gray-700 mb-4 tracking-wide uppercase">Paleta de Cores</h5>
                      <div className="grid grid-cols-4 gap-3">
                        {selectedTheme.colors.segmentColors.map((color, index) => (
                          <div
                            key={index}
                            className="w-full h-12 rounded-lg border-2 border-white shadow-md hover:scale-105 transition-transform cursor-pointer"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-bold text-gray-700 mb-3 tracking-wide uppercase">Tipografia</h5>
                      <p className="text-sm text-gray-600 font-medium bg-gray-50 p-3 rounded-lg">{selectedTheme.fonts.primary}</p>
                    </div>

                    <div>
                      <h5 className="text-sm font-bold text-gray-700 mb-4 tracking-wide uppercase">Efeitos Ativos</h5>
                      <div className="flex flex-wrap gap-3">
                        {Object.entries(selectedTheme.effects)
                          .filter(([_, value]) => value)
                          .map(([key]) => (
                            <span
                              key={key}
                              className="px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 text-xs font-bold rounded-full capitalize tracking-wide"
                            >
                              {key}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Ações */}
              <div className="space-y-4">
                <button
                  onClick={saveTheme}
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Aplicar Tema
                </button>
                
                <button
                  onClick={exportTheme}
                  className="w-full py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Exportar Tema
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}