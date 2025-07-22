'use client';

import React, { useState, useRef } from 'react';
import { X, Volume2, VolumeX, Play, Pause, RotateCcw, Settings } from 'lucide-react';

interface SoundSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onSoundChange: (settings: SoundSettings) => void;
}

interface SoundSettings {
  enabled: boolean;
  startSound: string;
  spinSound: string;
  endSound: string;
  volume: number;
}

export default function SoundSettings({ isOpen, onClose, onSoundChange }: SoundSettingsProps) {
  const [settings, setSettings] = useState<SoundSettings>({
    enabled: true,
    startSound: 'click',
    spinSound: 'spin',
    endSound: 'bell',
    volume: 0.7
  });

  const audioRef = useRef<HTMLAudioElement>(null);

  const soundOptions = {
    start: [
      { value: 'click', label: 'Click' },
      { value: 'beep', label: 'Beep' },
      { value: 'pop', label: 'Pop' },
      { value: 'tick', label: 'Tick' }
    ],
    spin: [
      { value: 'spin', label: 'Spinning' },
      { value: 'whoosh', label: 'Whoosh' },
      { value: 'mechanical', label: 'Mechanical' },
      { value: 'wind', label: 'Wind' }
    ],
    end: [
      { value: 'bell', label: 'Bell' },
      { value: 'ding', label: 'Ding' },
      { value: 'chime', label: 'Chime' },
      { value: 'success', label: 'Success' },
      { value: 'fanfare', label: 'Fanfare' }
    ]
  };

  if (!isOpen) return null;

  const handleSettingChange = (key: keyof SoundSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSoundChange(newSettings);
  };

  const playPreview = (soundType: string) => {
    // Simular reprodução de som
    console.log(`Playing ${soundType} sound preview`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Volume2 size={24} />
            Configurações de Som
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Ativar/Desativar Som */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-800">Ativar Sons</h3>
              <p className="text-sm text-gray-600">Reproduzir efeitos sonoros durante o uso da roda</p>
            </div>
            <button
              onClick={() => handleSettingChange('enabled', !settings.enabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.enabled ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {settings.enabled && (
            <>
              {/* Volume */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Volume: {Math.round(settings.volume * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.volume}
                  onChange={(e) => handleSettingChange('volume', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Som de Início */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Som de Início (quando clica para girar)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {soundOptions.start.map((option) => (
                    <div key={option.value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        id={`start-${option.value}`}
                        name="startSound"
                        value={option.value}
                        checked={settings.startSound === option.value}
                        onChange={(e) => handleSettingChange('startSound', e.target.value)}
                        className="text-blue-600"
                      />
                      <label htmlFor={`start-${option.value}`} className="text-sm text-gray-700 flex-1">
                        {option.label}
                      </label>
                      <button
                        onClick={() => playPreview(option.value)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Play size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Som Durante o Giro */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Som Durante o Giro
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {soundOptions.spin.map((option) => (
                    <div key={option.value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        id={`spin-${option.value}`}
                        name="spinSound"
                        value={option.value}
                        checked={settings.spinSound === option.value}
                        onChange={(e) => handleSettingChange('spinSound', e.target.value)}
                        className="text-blue-600"
                      />
                      <label htmlFor={`spin-${option.value}`} className="text-sm text-gray-700 flex-1">
                        {option.label}
                      </label>
                      <button
                        onClick={() => playPreview(option.value)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Play size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Som de Resultado */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Som de Resultado (quando para)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {soundOptions.end.map((option) => (
                    <div key={option.value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        id={`end-${option.value}`}
                        name="endSound"
                        value={option.value}
                        checked={settings.endSound === option.value}
                        onChange={(e) => handleSettingChange('endSound', e.target.value)}
                        className="text-blue-600"
                      />
                      <label htmlFor={`end-${option.value}`} className="text-sm text-gray-700 flex-1">
                        {option.label}
                      </label>
                      <button
                        onClick={() => playPreview(option.value)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Play size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Presets de Som */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Presets de Som
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => {
                      const preset = { enabled: true, startSound: 'click', spinSound: 'spin', endSound: 'bell', volume: 0.7 };
                      setSettings(preset);
                      onSoundChange(preset);
                    }}
                    className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="font-medium">🎪 Clássico</div>
                    <div className="text-sm text-gray-600">Sons tradicionais de roda da fortuna</div>
                  </button>
                  
                  <button
                    onClick={() => {
                      const preset = { enabled: true, startSound: 'beep', spinSound: 'mechanical', endSound: 'ding', volume: 0.8 };
                      setSettings(preset);
                      onSoundChange(preset);
                    }}
                    className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="font-medium">🤖 Futurista</div>
                    <div className="text-sm text-gray-600">Sons eletrônicos e modernos</div>
                  </button>
                  
                  <button
                    onClick={() => {
                      const preset = { enabled: true, startSound: 'pop', spinSound: 'whoosh', endSound: 'chime', volume: 0.6 };
                      setSettings(preset);
                      onSoundChange(preset);
                    }}
                    className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="font-medium">✨ Suave</div>
                    <div className="text-sm text-gray-600">Sons delicados e agradáveis</div>
                  </button>
                  
                  <button
                    onClick={() => {
                      const preset = { enabled: true, startSound: 'tick', spinSound: 'wind', endSound: 'fanfare', volume: 0.9 };
                      setSettings(preset);
                      onSoundChange(preset);
                    }}
                    className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="font-medium">🎉 Celebração</div>
                    <div className="text-sm text-gray-600">Sons festivos e empolgantes</div>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Teste de Som */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">🔊 Teste de Som</h4>
            <p className="text-sm text-blue-700 mb-3">
              Clique nos botões abaixo para testar a sequência completa de sons:
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => playPreview('sequence')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm"
              >
                Testar Sequência
              </button>
              <button
                onClick={() => playPreview('start')}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 text-sm"
              >
                Som Início
              </button>
              <button
                onClick={() => playPreview('spin')}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 text-sm"
              >
                Som Giro
              </button>
              <button
                onClick={() => playPreview('end')}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 text-sm"
              >
                Som Final
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}