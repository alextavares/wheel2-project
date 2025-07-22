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
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 2h12v11H4V4z" clipRule="evenodd" />
              </svg>
              Temas Avançados
            </h2>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={previewMode}
                  onChange={(e) => setPreviewMode(e.target.checked)}
                  className="rounded"
                />
                Pré-visualização
              </label>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista de Temas */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Temas Disponíveis</h3>
                <div className="flex gap-2">
                  <button
                    onClick={createCustomTheme}
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Criar Personalizado
                  </button>
                  <label className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium cursor-pointer transition-colors">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {defaultThemes.map((theme) => (
                  <div
                    key={theme.id}
                    onClick={() => applyTheme(theme)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg ${
                      selectedTheme.id === theme.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">{theme.preview}</div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{theme.name}</h4>
                        <p className="text-sm text-gray-600">{theme.description}</p>
                      </div>
                    </div>
                    
                    {/* Preview das cores */}
                    <div className="flex gap-1 mb-2">
                      {theme.colors.segmentColors.slice(0, 6).map((color, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 rounded-full border border-gray-300"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      {theme.fonts.primary.split(',')[0]} • {theme.effects.gradients ? 'Gradientes' : 'Sólido'}
                    </div>
                  </div>
                ))}

                {customTheme && (
                  <div
                    onClick={() => applyTheme(customTheme)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg ${
                      selectedTheme.id === customTheme.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">🎨</div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{customTheme.name}</h4>
                        <p className="text-sm text-gray-600">{customTheme.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-1 mb-2">
                      {customTheme.colors.segmentColors.slice(0, 6).map((color, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 rounded-full border border-gray-300"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    
                    <div className="text-xs text-purple-600 font-medium">Personalizado</div>
                  </div>
                )}
              </div>
            </div>

            {/* Painel de Customização */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {isCreatingCustom ? 'Personalizar Tema' : 'Detalhes do Tema'}
                </h3>
                
                {isCreatingCustom && customTheme ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome do Tema
                      </label>
                      <input
                        type="text"
                        value={customTheme.name}
                        onChange={(e) => updateCustomTheme({ name: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição
                      </label>
                      <input
                        type="text"
                        value={customTheme.description}
                        onChange={(e) => updateCustomTheme({ description: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cor Principal
                      </label>
                      <input
                        type="color"
                        value={customTheme.colors.primary}
                        onChange={(e) => updateCustomTheme({
                          colors: { ...customTheme.colors, primary: e.target.value }
                        })}
                        className="w-full h-10 border border-gray-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cor de Fundo
                      </label>
                      <input
                        type="color"
                        value={customTheme.colors.background}
                        onChange={(e) => updateCustomTheme({
                          colors: { ...customTheme.colors, background: e.target.value }
                        })}
                        className="w-full h-10 border border-gray-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fonte Principal
                      </label>
                      <select
                        value={customTheme.fonts.primary}
                        onChange={(e) => updateCustomTheme({
                          fonts: { ...customTheme.fonts, primary: e.target.value }
                        })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="Inter, sans-serif">Inter</option>
                        <option value="Poppins, sans-serif">Poppins</option>
                        <option value="Roboto, sans-serif">Roboto</option>
                        <option value="Playfair Display, serif">Playfair Display</option>
                        <option value="Orbitron, monospace">Orbitron</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Efeitos
                      </label>
                      <div className="space-y-2">
                        {Object.entries(customTheme.effects).map(([key, value]) => (
                          <label key={key} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => updateCustomTheme({
                                effects: { ...customTheme.effects, [key]: e.target.checked }
                              })}
                              className="rounded"
                            />
                            <span className="text-sm capitalize">{key}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">{selectedTheme.name}</h4>
                      <p className="text-sm text-gray-600 mb-4">{selectedTheme.description}</p>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Paleta de Cores</h5>
                      <div className="grid grid-cols-4 gap-2">
                        {selectedTheme.colors.segmentColors.map((color, index) => (
                          <div
                            key={index}
                            className="w-full h-8 rounded border border-gray-300"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Tipografia</h5>
                      <p className="text-sm text-gray-600">{selectedTheme.fonts.primary}</p>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Efeitos Ativos</h5>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(selectedTheme.effects)
                          .filter(([_, value]) => value)
                          .map(([key]) => (
                            <span
                              key={key}
                              className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full capitalize"
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
              <div className="space-y-3">
                <button
                  onClick={saveTheme}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all"
                >
                  Aplicar Tema
                </button>
                
                <button
                  onClick={exportTheme}
                  className="w-full py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
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