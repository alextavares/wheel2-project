'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus, Play, Pause, RotateCcw, Zap, Timer, Trophy, Share2, Download, Copy } from 'lucide-react';

interface WheelData {
  id: string;
  title: string;
  items: string[];
  result: string | null;
  isSpinning: boolean;
  spinDuration: number;
  color: string;
  lastSpinTime?: Date;
}

interface MultipleWheelsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MultipleWheels({ isOpen, onClose }: MultipleWheelsProps) {
  const [wheels, setWheels] = useState<WheelData[]>([
    {
      id: '1',
      title: '🎯 Escolher Pessoa',
      items: ['João Silva', 'Maria Santos', 'Pedro Costa', 'Ana Oliveira', 'Carlos Lima'],
      result: null,
      isSpinning: false,
      spinDuration: 3000,
      color: '#3B82F6'
    },
    {
      id: '2',
      title: '🏆 Escolher Prêmio',
      items: ['R$ 100', 'R$ 50', 'R$ 200', 'Brinde Especial', 'Desconto 20%'],
      result: null,
      isSpinning: false,
      spinDuration: 2500,
      color: '#EF4444'
    },
    {
      id: '3',
      title: '🎲 Escolher Atividade',
      items: ['Karaokê', 'Dança', 'Jogo de Cartas', 'Quiz', 'Mímica'],
      result: null,
      isSpinning: false,
      spinDuration: 3500,
      color: '#10B981'
    }
  ]);

  const [newWheelTitle, setNewWheelTitle] = useState('');
  const [newWheelItems, setNewWheelItems] = useState('');
  const [isSequentialMode, setIsSequentialMode] = useState(false);
  const [sequentialDelay, setSequentialDelay] = useState(1000);
  const [showResults, setShowResults] = useState(false);
  const [allSpinning, setAllSpinning] = useState(false);

  const addWheel = () => {
    if (!newWheelTitle.trim() || !newWheelItems.trim()) return;

    const items = newWheelItems.split('\n').filter(item => item.trim());
    const newWheel: WheelData = {
      id: Date.now().toString(),
      title: newWheelTitle,
      items,
      result: null,
      isSpinning: false
    };

    setWheels([...wheels, newWheel]);
    setNewWheelTitle('');
    setNewWheelItems('');
  };

  const removeWheel = (id: string) => {
    setWheels(wheels.filter(wheel => wheel.id !== id));
  };

  const spinWheel = (id: string) => {
    setWheels(wheels.map(wheel => {
      if (wheel.id === id) {
        return { ...wheel, isSpinning: true, lastSpinTime: new Date() };
      }
      return wheel;
    }));

    const wheel = wheels.find(w => w.id === id);
    if (!wheel) return;

    // Som de giro melhorado
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + wheel.spinDuration / 1000);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + wheel.spinDuration / 1000);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + wheel.spinDuration / 1000);
    }

    setTimeout(() => {
      setWheels(prevWheels => prevWheels.map(wheel => {
        if (wheel.id === id) {
          const randomIndex = Math.floor(Math.random() * wheel.items.length);
          return {
            ...wheel,
            isSpinning: false,
            result: wheel.items[randomIndex]
          };
        }
        return wheel;
      }));

      // Som de vitória
      if (typeof window !== 'undefined' && 'AudioContext' in window) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
        notes.forEach((freq, index) => {
          setTimeout(() => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
          }, index * 100);
        });
      }
    }, wheel.spinDuration);
  };

  const spinAllWheels = async () => {
    setAllSpinning(true);
    setShowResults(false);

    if (isSequentialMode) {
      // Modo sequencial - uma roda por vez
      for (let i = 0; i < wheels.length; i++) {
        const wheel = wheels[i];
        if (!wheel.isSpinning) {
          spinWheel(wheel.id);
          await new Promise(resolve => setTimeout(resolve, wheel.spinDuration + sequentialDelay));
        }
      }
    } else {
      // Modo simultâneo - todas as rodas ao mesmo tempo
      wheels.forEach(wheel => {
        if (!wheel.isSpinning) {
          spinWheel(wheel.id);
        }
      });
    }

    // Aguardar todas as rodas terminarem
    const maxDuration = Math.max(...wheels.map(w => w.spinDuration));
    setTimeout(() => {
      setAllSpinning(false);
      setShowResults(true);
    }, maxDuration + 500);
  };

  const resetAllWheels = () => {
    setWheels(wheels.map(wheel => ({
      ...wheel,
      result: null,
      isSpinning: false
    })));
  };

  const exportResults = () => {
    const results = wheels
      .filter(wheel => wheel.result)
      .map(wheel => `${wheel.title}: ${wheel.result}`)
      .join('\n');
    
    const blob = new Blob([results], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resultados-multiplas-rodas.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareResults = async () => {
    const results = wheels
      .filter(wheel => wheel.result)
      .map(wheel => `${wheel.title}: ${wheel.result}`)
      .join('\n');
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Resultados das Rodas',
          text: results
        });
      } catch (err) {
        console.log('Erro ao compartilhar:', err);
      }
    } else {
      // Fallback para copiar para clipboard
      navigator.clipboard.writeText(results);
      alert('Resultados copiados para a área de transferência!');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-7xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl">
          <div>
            <h2 className="text-3xl font-bold">🎡 Múltiplas Rodas Avançadas</h2>
            <p className="text-blue-100 mt-1">Sistema sincronizado de múltiplas roletas</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        <div className="p-6">
          {/* Controles Avançados */}
          <div className="mb-6 bg-gray-50 rounded-xl p-4">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-3">
                <button
                  onClick={spinAllWheels}
                  disabled={allSpinning}
                  className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all ${
                    allSpinning 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  <Zap size={20} />
                  {allSpinning ? 'Girando...' : 'Girar Todas'}
                </button>
                
                <button
                  onClick={resetAllWheels}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-lg hover:from-gray-600 hover:to-gray-700 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  <RotateCcw size={20} />
                  Resetar Todas
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={shareResults}
                  disabled={!wheels.some(w => w.result)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2 disabled:bg-gray-300 transition-all"
                >
                  <Share2 size={16} />
                  Compartilhar
                </button>
                
                <button
                  onClick={exportResults}
                  disabled={!wheels.some(w => w.result)}
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 flex items-center gap-2 disabled:bg-gray-300 transition-all"
                >
                  <Download size={16} />
                  Exportar
                </button>
              </div>
            </div>

            {/* Configurações de Modo */}
            <div className="mt-4 flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sequential"
                  checked={isSequentialMode}
                  onChange={(e) => setIsSequentialMode(e.target.checked)}
                  className="w-4 h-4 text-blue-600"
                />
                <label htmlFor="sequential" className="text-sm font-medium text-gray-700">
                  Modo Sequencial
                </label>
              </div>

              {isSequentialMode && (
                <div className="flex items-center gap-2">
                  <Timer size={16} className="text-gray-600" />
                  <label className="text-sm text-gray-600">Delay:</label>
                  <select
                    value={sequentialDelay}
                    onChange={(e) => setSequentialDelay(Number(e.target.value))}
                    className="px-2 py-1 border rounded text-sm"
                  >
                    <option value={500}>0.5s</option>
                    <option value={1000}>1s</option>
                    <option value={1500}>1.5s</option>
                    <option value={2000}>2s</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Resumo de Resultados */}
          {showResults && wheels.some(w => w.result) && (
            <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="text-green-600" size={24} />
                <h3 className="text-lg font-bold text-green-800">🎉 Resultados Finais</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {wheels.filter(w => w.result).map(wheel => (
                  <div key={wheel.id} className="bg-white rounded-lg p-3 border border-green-200 shadow-sm">
                    <p className="font-semibold text-gray-800 text-sm">{wheel.title}</p>
                    <p className="text-green-700 font-bold text-lg">{wheel.result}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Grid de Rodas Melhorado */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
            {wheels.map((wheel, index) => (
              <div key={wheel.id} className="bg-white border-2 border-gray-200 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-800 text-lg truncate">{wheel.title}</h3>
                  <button
                    onClick={() => removeWheel(wheel.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Roda Visual Melhorada */}
                <div className="relative w-36 h-36 mx-auto mb-4">
                  <div 
                    className={`w-full h-full rounded-full border-4 flex items-center justify-center shadow-lg transition-all duration-300 ${
                      wheel.isSpinning ? 'animate-spin shadow-2xl scale-110' : 'hover:scale-105'
                    }`}
                    style={{
                      borderColor: wheel.color,
                      background: `conic-gradient(${wheel.items.map((_, itemIndex) => {
                        const hue = (itemIndex * 360) / wheel.items.length;
                        return `hsl(${hue}, 70%, 65%) ${(itemIndex * 100) / wheel.items.length}% ${((itemIndex + 1) * 100) / wheel.items.length}%`;
                      }).join(', ')})`,
                      boxShadow: wheel.isSpinning 
                        ? `0 0 30px ${wheel.color}40, 0 10px 20px rgba(0,0,0,0.2)` 
                        : '0 8px 16px rgba(0,0,0,0.1)'
                    }}
                  >
                    <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold shadow-lg border-2" style={{ borderColor: wheel.color }}>
                      {wheel.items.length}
                    </div>
                  </div>
                  
                  {/* Ponteiro Melhorado */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 z-10">
                    <div 
                      className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent shadow-lg"
                      style={{ borderBottomColor: wheel.color }}
                    />
                  </div>

                  {/* Efeito de Brilho durante o Giro */}
                  {wheel.isSpinning && (
                    <div className="absolute inset-0 rounded-full animate-pulse" style={{
                      background: `radial-gradient(circle, ${wheel.color}20 0%, transparent 70%)`
                    }} />
                  )}
                </div>

                {/* Resultado com Animação */}
                {wheel.result && (
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 rounded-lg p-3 mb-4 animate-bounce">
                    <div className="flex items-center gap-2">
                      <Trophy className="text-green-600" size={16} />
                      <p className="text-center font-bold text-green-800 text-sm">
                        {wheel.result}
                      </p>
                    </div>
                  </div>
                )}

                {/* Configurações da Roda */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Duração:</span>
                    <select
                      value={wheel.spinDuration}
                      onChange={(e) => {
                        const newDuration = Number(e.target.value);
                        setWheels(wheels.map(w => 
                          w.id === wheel.id ? { ...w, spinDuration: newDuration } : w
                        ));
                      }}
                      className="text-xs border rounded px-1 py-0.5"
                    >
                      <option value={2000}>2s</option>
                      <option value={3000}>3s</option>
                      <option value={4000}>4s</option>
                      <option value={5000}>5s</option>
                    </select>
                  </div>
                </div>

                {/* Lista de Itens */}
                <div className="mb-4">
                  <p className="text-xs text-gray-600 mb-2 font-medium">Itens ({wheel.items.length}):</p>
                  <div className="text-xs text-gray-500 max-h-16 overflow-y-auto bg-gray-50 rounded p-2 border">
                    {wheel.items.map((item, idx) => (
                      <div key={idx} className="truncate">{idx + 1}. {item}</div>
                    ))}
                  </div>
                </div>

                {/* Botão de Girar Individual */}
                <button
                  onClick={() => spinWheel(wheel.id)}
                  disabled={wheel.isSpinning || allSpinning}
                  className={`w-full py-3 rounded-lg font-bold text-white transition-all duration-300 ${
                    wheel.isSpinning || allSpinning
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'hover:shadow-lg transform hover:scale-105'
                  }`}
                  style={{
                    background: wheel.isSpinning || allSpinning 
                      ? '#9CA3AF' 
                      : `linear-gradient(135deg, ${wheel.color}, ${wheel.color}dd)`
                  }}
                >
                  {wheel.isSpinning ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      Girando...
                    </div>
                  ) : (
                    'Girar Roda'
                  )}
                </button>
              </div>
            ))}

            {/* Botão Adicionar Nova Roda */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-5 flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer group">
              <Plus size={48} className="text-gray-400 group-hover:text-blue-500 mb-3 transition-colors" />
              <p className="text-gray-600 group-hover:text-blue-600 font-medium transition-colors">Adicionar Nova Roda</p>
            </div>
          </div>

          {/* Cenários de Uso */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">💡 Cenários de Uso:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>Sorteio Completo:</strong> 1ª roda escolhe a pessoa, 2ª roda escolhe o prêmio</li>
              <li>• <strong>Decisões Múltiplas:</strong> Escolher restaurante, filme e horário simultaneamente</li>
              <li>• <strong>Jogos:</strong> Escolher personagem, mapa e modo de jogo</li>
              <li>• <strong>Planejamento:</strong> Atividade, local e responsável</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const WHEEL_COLORS = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#06B6D4',
  '#EC4899', '#84CC16', '#F97316', '#6366F1', '#14B8A6', '#F43F5E'
];