'use client';

import { useState, useEffect } from 'react';
import { BarChart3, Trophy, Target, Clock, TrendingUp } from 'lucide-react';

interface SpinResult {
  id: string;
  result: string;
  timestamp: Date;
  wheelItems: string[];
}

interface WheelStatsProps {
  isOpen: boolean;
  onClose: () => void;
  currentResult?: string;
  wheelItems: string[];
}

export default function WheelStats({ isOpen, onClose, currentResult, wheelItems }: WheelStatsProps) {
  const [spinHistory, setSpinHistory] = useState<SpinResult[]>([]);
  const [totalSpins, setTotalSpins] = useState(0);

  useEffect(() => {
    // Carregar histórico do localStorage
    const savedHistory = localStorage.getItem('wheelSpinHistory');
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory).map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp)
      }));
      setSpinHistory(parsed);
      setTotalSpins(parsed.length);
    }
  }, []);

  useEffect(() => {
    if (currentResult && wheelItems.length > 0) {
      const newResult: SpinResult = {
        id: Date.now().toString(),
        result: currentResult,
        timestamp: new Date(),
        wheelItems: [...wheelItems]
      };

      const updatedHistory = [newResult, ...spinHistory].slice(0, 50); // Manter apenas os últimos 50
      setSpinHistory(updatedHistory);
      setTotalSpins(updatedHistory.length);

      // Salvar no localStorage
      localStorage.setItem('wheelSpinHistory', JSON.stringify(updatedHistory));
    }
  }, [currentResult, wheelItems]);

  const getResultFrequency = () => {
    const frequency: { [key: string]: number } = {};
    spinHistory.forEach(spin => {
      frequency[spin.result] = (frequency[spin.result] || 0) + 1;
    });
    return frequency;
  };

  const getMostFrequentResult = () => {
    const frequency = getResultFrequency();
    return Object.entries(frequency).reduce((a, b) => frequency[a[0]] > frequency[b[0]] ? a : b, ['', 0]);
  };

  const getSpinsToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return spinHistory.filter(spin => spin.timestamp >= today).length;
  };

  const clearHistory = () => {
    setSpinHistory([]);
    setTotalSpins(0);
    localStorage.removeItem('wheelSpinHistory');
  };

  if (!isOpen) return null;

  const frequency = getResultFrequency();
  const mostFrequent = getMostFrequentResult();
  const spinsToday = getSpinsToday();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 size={28} />
              <h2 className="text-2xl font-bold">Estatísticas da Roda</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Target className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total de Giros</p>
                  <p className="text-2xl font-bold text-blue-800">{totalSpins}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Clock className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-green-600 text-sm font-medium">Hoje</p>
                  <p className="text-2xl font-bold text-green-800">{spinsToday}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Trophy className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-purple-600 text-sm font-medium">Mais Frequente</p>
                  <p className="text-lg font-bold text-purple-800 truncate">{mostFrequent[0] || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500 rounded-lg">
                  <TrendingUp className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-orange-600 text-sm font-medium">Frequência</p>
                  <p className="text-2xl font-bold text-orange-800">{mostFrequent[1] || 0}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Gráfico de Frequência */}
          {Object.keys(frequency).length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Frequência dos Resultados</h3>
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="space-y-3">
                  {Object.entries(frequency)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 10)
                    .map(([result, count]) => {
                      const percentage = (count / totalSpins) * 100;
                      return (
                        <div key={result} className="flex items-center gap-3">
                          <div className="w-24 text-sm font-medium text-gray-700 truncate">
                            {result}
                          </div>
                          <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                              {count} ({percentage.toFixed(1)}%)
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {/* Histórico Recente */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Histórico Recente</h3>
              {spinHistory.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                >
                  Limpar Histórico
                </button>
              )}
            </div>
            
            {spinHistory.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Target size={48} className="mx-auto mb-4 opacity-50" />
                <p>Nenhum giro registrado ainda</p>
                <p className="text-sm">Gire a roda para ver suas estatísticas!</p>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-4 max-h-64 overflow-y-auto">
                <div className="space-y-2">
                  {spinHistory.slice(0, 20).map((spin, index) => (
                    <div
                      key={spin.id}
                      className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{spin.result}</p>
                          <p className="text-xs text-gray-500">
                            {spin.timestamp.toLocaleString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {spin.wheelItems.length} itens
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}