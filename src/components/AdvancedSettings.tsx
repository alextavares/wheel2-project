'use client';

import React, { useState } from 'react';

interface AdvancedSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    spinDuration: number;
    spinEasing: string;
    autoSpin: boolean;
    showConfetti: boolean;
    soundEnabled: boolean;
    vibrationEnabled: boolean;
    showWinner: boolean;
    winnerDisplayTime: number;
    allowRepeats: boolean;
    highlightWinner: boolean;
  };
  onSettingsChange: (settings: {
    spinDuration: number;
    spinEasing: string;
    autoSpin: boolean;
    showConfetti: boolean;
    soundEnabled: boolean;
    vibrationEnabled: boolean;
    showWinner: boolean;
    winnerDisplayTime: number;
    allowRepeats: boolean;
    highlightWinner: boolean;
  }) => void;
}

export const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange
}) => {
  const [localSettings, setLocalSettings] = useState(settings);

  if (!isOpen) return null;

  const handleSettingChange = (key: string, value: boolean | number | string) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const easingOptions = [
    { value: 'ease-out', label: 'Suave (Padrão)' },
    { value: 'ease-in-out', label: 'Suave Entrada/Saída' },
    { value: 'ease-in', label: 'Aceleração Gradual' },
    { value: 'linear', label: 'Linear' },
    { value: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', label: 'Personalizado 1' },
    { value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', label: 'Bounce' }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/50">
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-8 py-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800 leading-tight">⚙️ Configurações Avançadas</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-3xl font-bold transition-all duration-200 hover:scale-110 p-2 rounded-full hover:bg-gray-100"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Configurações de Animação */}
          <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-blue-800 mb-6 flex items-center gap-3 leading-tight">
              <span className="text-2xl">🎬</span>
              Animação
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Duração do Giro (segundos)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={localSettings.spinDuration}
                  onChange={(e) => handleSettingChange('spinDuration', parseFloat(e.target.value))}
                  className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-lg font-bold text-blue-700 mt-2">
                  {localSettings.spinDuration}s
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Tipo de Animação
                </label>
                <select
                  value={localSettings.spinEasing}
                  onChange={(e) => handleSettingChange('spinEasing', e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl font-semibold text-gray-700 bg-white/80 backdrop-blur-sm shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {easingOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Configurações de Comportamento */}
          <div className="bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-green-800 mb-6 flex items-center gap-3 leading-tight">
              <span className="text-2xl">🎯</span>
              Comportamento
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-green-100">
                <div>
                  <label className="text-base font-bold text-gray-700 leading-tight">Giro Automático</label>
                  <p className="text-sm text-gray-600 font-medium mt-1">Gira automaticamente ao carregar</p>
                </div>
                <input
                  type="checkbox"
                  checked={localSettings.autoSpin}
                  onChange={(e) => handleSettingChange('autoSpin', e.target.checked)}
                  className="w-6 h-6 text-green-600 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-green-100">
                <div>
                  <label className="text-base font-bold text-gray-700 leading-tight">Permitir Repetições</label>
                  <p className="text-sm text-gray-600 font-medium mt-1">Mesmo item pode ser sorteado novamente</p>
                </div>
                <input
                  type="checkbox"
                  checked={localSettings.allowRepeats}
                  onChange={(e) => handleSettingChange('allowRepeats', e.target.checked)}
                  className="w-6 h-6 text-green-600 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-green-100">
                <div>
                  <label className="text-base font-bold text-gray-700 leading-tight">Destacar Vencedor</label>
                  <p className="text-sm text-gray-600 font-medium mt-1">Destaca o item vencedor na roda</p>
                </div>
                <input
                  type="checkbox"
                  checked={localSettings.highlightWinner}
                  onChange={(e) => handleSettingChange('highlightWinner', e.target.checked)}
                  className="w-6 h-6 text-green-600 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Configurações Visuais */}
          <div className="bg-purple-50/80 backdrop-blur-sm border border-purple-200 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-purple-800 mb-6 flex items-center gap-3 leading-tight">
              <span className="text-2xl">🎨</span>
              Visual
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100">
                <div>
                  <label className="text-base font-bold text-gray-700 leading-tight">Mostrar Confetes</label>
                  <p className="text-sm text-gray-600 font-medium mt-1">Animação de confetes ao vencer</p>
                </div>
                <input
                  type="checkbox"
                  checked={localSettings.showConfetti}
                  onChange={(e) => handleSettingChange('showConfetti', e.target.checked)}
                  className="w-6 h-6 text-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100">
                <div>
                  <label className="text-base font-bold text-gray-700 leading-tight">Mostrar Resultado</label>
                  <p className="text-sm text-gray-600 font-medium mt-1">Exibe o resultado na tela</p>
                </div>
                <input
                  type="checkbox"
                  checked={localSettings.showWinner}
                  onChange={(e) => handleSettingChange('showWinner', e.target.checked)}
                  className="w-6 h-6 text-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {localSettings.showWinner && (
                <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100">
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Tempo de Exibição do Resultado (segundos)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={localSettings.winnerDisplayTime}
                    onChange={(e) => handleSettingChange('winnerDisplayTime', parseFloat(e.target.value))}
                    className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-lg font-bold text-purple-700 mt-2">
                    {localSettings.winnerDisplayTime}s
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Configurações de Som e Vibração */}
          <div className="bg-orange-50/80 backdrop-blur-sm border border-orange-200 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-orange-800 mb-6 flex items-center gap-3 leading-tight">
              <span className="text-2xl">🔊</span>
              Som e Vibração
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-orange-100">
                <div>
                  <label className="text-base font-bold text-gray-700 leading-tight">Som Habilitado</label>
                  <p className="text-sm text-gray-600 font-medium mt-1">Reproduz sons durante o giro</p>
                </div>
                <input
                  type="checkbox"
                  checked={localSettings.soundEnabled}
                  onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
                  className="w-6 h-6 text-orange-600 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-orange-100">
                <div>
                  <label className="text-base font-bold text-gray-700 leading-tight">Vibração (Mobile)</label>
                  <p className="text-sm text-gray-600 font-medium mt-1">Vibra no dispositivo móvel</p>
                </div>
                <input
                  type="checkbox"
                  checked={localSettings.vibrationEnabled}
                  onChange={(e) => handleSettingChange('vibrationEnabled', e.target.checked)}
                  className="w-6 h-6 text-orange-600 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-between pt-8 border-t border-gray-200">
            <button
              onClick={() => {
                const defaultSettings = {
                  spinDuration: 3,
                  spinEasing: 'ease-out',
                  autoSpin: false,
                  showConfetti: true,
                  soundEnabled: true,
                  vibrationEnabled: true,
                  showWinner: true,
                  winnerDisplayTime: 3,
                  allowRepeats: true,
                  highlightWinner: true
                };
                setLocalSettings(defaultSettings);
                onSettingsChange(defaultSettings);
              }}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-bold text-lg bg-gray-100/80 backdrop-blur-sm rounded-xl border border-gray-200 hover:bg-gray-200/80 transition-all duration-200 hover:scale-105 shadow-md"
            >
              🔄 Restaurar Padrão
            </button>
            
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              ✅ Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings;