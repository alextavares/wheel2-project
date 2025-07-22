import React, { useState, useRef, useEffect } from 'react';

interface SoundSystemProps {
  isOpen: boolean;
  onClose: () => void;
  onSoundChange: (soundEnabled: boolean, soundType: string, volume: number) => void;
  currentSettings: {
    enabled: boolean;
    type: string;
    volume: number;
  };
}

const SoundSystem: React.FC<SoundSystemProps> = ({
  isOpen,
  onClose,
  onSoundChange,
  currentSettings
}) => {
  const [soundEnabled, setSoundEnabled] = useState(currentSettings.enabled);
  const [selectedSound, setSelectedSound] = useState(currentSettings.type);
  const [volume, setVolume] = useState(currentSettings.volume);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const soundOptions = {
    classic: {
      name: '🎰 Clássico',
      description: 'Som tradicional de roleta de cassino',
      preview: 'Som suave e elegante'
    },
    modern: {
      name: '🎵 Moderno',
      description: 'Som eletrônico contemporâneo',
      preview: 'Efeito digital futurista'
    },
    fun: {
      name: '🎪 Divertido',
      description: 'Som alegre e animado',
      preview: 'Perfeito para festas e jogos'
    },
    dramatic: {
      name: '🎭 Dramático',
      description: 'Som intenso e suspenseful',
      preview: 'Cria tensão e expectativa'
    },
    nature: {
      name: '🌿 Natureza',
      description: 'Sons naturais relaxantes',
      preview: 'Vento suave e pássaros'
    },
    retro: {
      name: '📻 Retrô',
      description: 'Som vintage dos anos 80',
      preview: 'Nostalgia dos fliperamas'
    },
    space: {
      name: '🚀 Espacial',
      description: 'Sons futuristas do espaço',
      preview: 'Efeitos sci-fi épicos'
    },
    minimal: {
      name: '⚪ Minimalista',
      description: 'Som sutil e discreto',
      preview: 'Apenas um clique suave'
    }
  };

  const customSounds = [
    { id: 'applause', name: '👏 Aplausos', icon: '👏' },
    { id: 'fanfare', name: '🎺 Fanfarra', icon: '🎺' },
    { id: 'bell', name: '🔔 Sino', icon: '🔔' },
    { id: 'chime', name: '🎐 Carrilhão', icon: '🎐' },
    { id: 'whistle', name: '🎵 Apito', icon: '🎵' },
    { id: 'pop', name: '💥 Pop', icon: '💥' },
    { id: 'ding', name: '✨ Ding', icon: '✨' },
    { id: 'swoosh', name: '💨 Swoosh', icon: '💨' }
  ];

  const playPreview = (soundType: string) => {
    setIsPlaying(soundType);
    // Simular reprodução de som
    setTimeout(() => setIsPlaying(null), 1000);
  };

  const handleSave = () => {
    onSoundChange(soundEnabled, selectedSound, volume);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                🔊 Sistema de Som Avançado
              </h2>
              <p className="text-purple-100 mt-1">
                Personalize a experiência sonora da sua roda
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
          <div className="space-y-6">
            {/* Sound Toggle */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">🎵 Ativar Sons</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Habilite efeitos sonoros para uma experiência mais imersiva
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={soundEnabled}
                    onChange={(e) => setSoundEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>

            {soundEnabled && (
              <>
                {/* Volume Control */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">🔊 Controle de Volume</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">🔇</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <span className="text-2xl">🔊</span>
                      <span className="font-bold text-purple-600 min-w-[3rem]">{volume}%</span>
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={() => playPreview('volume-test')}
                        className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium"
                      >
                        🎵 Testar Volume
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sound Themes */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">🎨 Temas Sonoros</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(soundOptions).map(([key, sound]) => (
                      <div
                        key={key}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                          selectedSound === key ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedSound(key)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-800">{sound.name}</h4>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              playPreview(key);
                            }}
                            className={`p-2 rounded-lg transition-colors ${
                              isPlaying === key 
                                ? 'bg-purple-500 text-white' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {isPlaying === key ? '⏸️' : '▶️'}
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{sound.description}</p>
                        <p className="text-xs text-purple-600 font-medium">{sound.preview}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Custom Sounds */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">🎯 Sons Personalizados</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {customSounds.map((sound) => (
                      <button
                        key={sound.id}
                        onClick={() => playPreview(sound.id)}
                        className={`p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all text-center ${
                          isPlaying === sound.id ? 'border-purple-500 bg-purple-100' : ''
                        }`}
                      >
                        <div className="text-2xl mb-2">{sound.icon}</div>
                        <div className="text-sm font-medium text-gray-700">{sound.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Advanced Settings */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">⚙️ Configurações Avançadas</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">🎵 Durante o Giro</h4>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span className="text-sm">Som de rotação contínua</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span className="text-sm">Acelerar som com velocidade</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Eco espacial</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">🎯 No Resultado</h4>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span className="text-sm">Som de vitória</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Aplausos automáticos</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Fanfarra especial</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sound Visualization */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Visualização Sonora</h3>
                  <div className="flex items-center justify-center h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl">
                    <div className="flex items-end gap-1">
                      {Array.from({ length: 20 }, (_, i) => (
                        <div
                          key={i}
                          className={`w-2 bg-gradient-to-t from-purple-500 to-blue-500 rounded-t transition-all duration-300 ${
                            isPlaying ? 'animate-pulse' : ''
                          }`}
                          style={{
                            height: `${Math.random() * 40 + 10}px`,
                            animationDelay: `${i * 50}ms`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2">
                    Visualização em tempo real dos efeitos sonoros
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
          <div className="text-sm text-gray-600">
            💡 Dica: Use sons para criar uma experiência mais envolvente!
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-colors font-medium"
            >
              🔊 Salvar Configurações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundSystem;