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
  onSettingsChange: (settings: any) => void;
}

export const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange
}) => {
  const [localSettings, setLocalSettings] = useState(settings);

  if (!isOpen) return null;

  const handleSettingChange = (key: string, value: any) => {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">⚙️ Configurações Avançadas</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Configurações de Animação */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">🎬 Animação</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duração do Giro (segundos)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={localSettings.spinDuration}
                  onChange={(e) => handleSettingChange('spinDuration', parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-gray-600 mt-1">
                  {localSettings.spinDuration}s
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Animação
                </label>
                <select
                  value={localSettings.spinEasing}
                  onChange={(e) => handleSettingChange('spinEasing', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
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
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-800 mb-4">🎯 Comportamento</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Giro Automático</label>
                  <p className="text-xs text-gray-500">Gira automaticamente ao carregar</p>
                </div>
                <input
                  type="checkbox"
                  checked={localSettings.autoSpin}
                  onChange={(e) => handleSettingChange('autoSpin', e.target.checked)}
                  className="w-5 h-5 text-green-600"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Permitir Repetições</label>
                  <p className="text-xs text-gray-500">Mesmo item pode ser sorteado novamente</p>
                </div>
                <input
                  type="checkbox"
                  checked={localSettings.allowRepeats}
                  onChange={(e) => handleSettingChange('allowRepeats', e.target.checked)}
                  className="w-5 h-5 text-green-600"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Destacar Vencedor</label>
                  <p className="text-xs text-gray-500">Destaca o item vencedor na roda</p>
                </div>
                <input
                  type="checkbox"
                  checked={localSettings.highlightWinner}
                  onChange={(e) => handleSettingChange('highlightWinner', e.target.checked)}
                  className="w-5 h-5 text-green-600"
                />
              </div>
            </div>
          </div>

          {/* Configurações Visuais */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-purple-800 mb-4">🎨 Visual</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Mostrar Confetes</label>
                  <p className="text-xs text-gray-500">Animação de confetes ao vencer</p>
                </div>
                <input
                  type="checkbox"
                  checked={localSettings.showConfetti}
                  onChange={(e) => handleSettingChange('showConfetti', e.target.checked)}
                  className="w-5 h-5 text-purple-600"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Mostrar Resultado</label>
                  <p className="text-xs text-gray-500">Exibe o resultado na tela</p>
                </div>
                <input
                  type="checkbox"
                  checked={localSettings.showWinner}
                  onChange={(e) => handleSettingChange('showWinner', e.target.checked)}
                  className="w-5 h-5 text-purple-600"
                />
              </div>

              {localSettings.showWinner && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tempo de Exibição do Resultado (segundos)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={localSettings.winnerDisplayTime}
                    onChange={(e) => handleSettingChange('winnerDisplayTime', parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-600 mt-1">
                    {localSettings.winnerDisplayTime}s
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Configurações de Som e Vibração */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-orange-800 mb-4">🔊 Som e Vibração</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Som Habilitado</label>
                  <p className="text-xs text-gray-500">Reproduz sons durante o giro</p>
                </div>
                <input
                  type="checkbox"
                  checked={localSettings.soundEnabled}
                  onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
                  className="w-5 h-5 text-orange-600"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Vibração (Mobile)</label>
                  <p className="text-xs text-gray-500">Vibra no dispositivo móvel</p>
                </div>
                <input
                  type="checkbox"
                  checked={localSettings.vibrationEnabled}
                  onChange={(e) => handleSettingChange('vibrationEnabled', e.target.checked)}
                  className="w-5 h-5 text-orange-600"
                />
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-between pt-4 border-t border-gray-200">
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
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              🔄 Restaurar Padrão
            </button>
            
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
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