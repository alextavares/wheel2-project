import React, { useState } from 'react';

interface AnalyticsProps {
  isOpen: boolean;
  onClose: () => void;
  spinHistory: Array<{
    id: string;
    result: string;
    timestamp: Date;
    duration: number;
  }>;
  items: Array<{ id: string; label: string; color: string }>;
}

const Analytics: React.FC<AnalyticsProps> = ({
  isOpen,
  onClose,
  spinHistory,
  items
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month' | 'all'>('today');
  const [selectedView, setSelectedView] = useState<'overview' | 'detailed' | 'trends'>('overview');

  // Calcular estatísticas
  const totalSpins = spinHistory.length;
  const uniqueResults = new Set(spinHistory.map(spin => spin.result)).size;
  const averageDuration = spinHistory.length > 0 
    ? spinHistory.reduce((sum, spin) => sum + spin.duration, 0) / spinHistory.length 
    : 0;

  // Estatísticas por item
  const itemStats = items.map(item => {
    const itemSpins = spinHistory.filter(spin => spin.result === item.label);
    const percentage = totalSpins > 0 ? (itemSpins.length / totalSpins) * 100 : 0;
    return {
      ...item,
      count: itemSpins.length,
      percentage,
      lastSpin: itemSpins.length > 0 ? itemSpins[itemSpins.length - 1].timestamp : null
    };
  }).sort((a, b) => b.count - a.count);

  // Dados para gráficos
  const getSpinsByPeriod = () => {
    const now = new Date();
    const periods = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const daySpins = spinHistory.filter(spin => {
        const spinDate = new Date(spin.timestamp);
        return spinDate.toDateString() === date.toDateString();
      }).length;
      
      periods.push({
        date: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
        spins: daySpins
      });
    }
    
    return periods;
  };

  const weeklyData = getSpinsByPeriod();
  const maxSpins = Math.max(...weeklyData.map(d => d.spins), 1);

  // Horários mais ativos
  const getHourlyActivity = () => {
    const hourly = Array(24).fill(0);
    spinHistory.forEach(spin => {
      const hour = new Date(spin.timestamp).getHours();
      hourly[hour]++;
    });
    return hourly.map((count, hour) => ({
      hour: `${hour.toString().padStart(2, '0')}:00`,
      count,
      percentage: totalSpins > 0 ? (count / totalSpins) * 100 : 0
    }));
  };

  const hourlyActivity = getHourlyActivity();
  const peakHour = hourlyActivity.reduce((max, current) => 
    current.count > max.count ? current : max, hourlyActivity[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                📊 Analytics Avançado
              </h2>
              <p className="text-blue-100 mt-1">
                Análise detalhada do desempenho da sua roda
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

        {/* Navigation */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {[
                { key: 'overview', label: '📈 Visão Geral', icon: '📈' },
                { key: 'detailed', label: '🔍 Detalhado', icon: '🔍' },
                { key: 'trends', label: '📊 Tendências', icon: '📊' }
              ].map((view) => (
                <button
                  key={view.key}
                  onClick={() => setSelectedView(view.key as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedView === view.key
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {view.label}
                </button>
              ))}
            </div>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="today">Hoje</option>
              <option value="week">Esta Semana</option>
              <option value="month">Este Mês</option>
              <option value="all">Todo Período</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {selectedView === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="text-2xl font-bold">{totalSpins}</div>
                  <div className="text-blue-100">Total de Giros</div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                  <div className="text-3xl mb-2">🎲</div>
                  <div className="text-2xl font-bold">{uniqueResults}</div>
                  <div className="text-green-100">Resultados Únicos</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                  <div className="text-3xl mb-2">⏱️</div>
                  <div className="text-2xl font-bold">{averageDuration.toFixed(1)}s</div>
                  <div className="text-purple-100">Duração Média</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                  <div className="text-3xl mb-2">🔥</div>
                  <div className="text-2xl font-bold">{peakHour.hour}</div>
                  <div className="text-orange-100">Horário de Pico</div>
                </div>
              </div>

              {/* Weekly Activity Chart */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">📅 Atividade Semanal</h3>
                <div className="flex items-end justify-between h-32 gap-2">
                  {weeklyData.map((day, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all duration-500 hover:from-blue-600 hover:to-blue-500"
                        style={{ height: `${(day.spins / maxSpins) * 100}%` }}
                        title={`${day.spins} giros`}
                      />
                      <div className="text-xs text-gray-600 mt-2 font-medium">{day.date}</div>
                      <div className="text-xs text-gray-500">{day.spins}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Results */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">🏆 Resultados Mais Frequentes</h3>
                <div className="space-y-3">
                  {itemStats.slice(0, 5).map((item, index) => (
                    <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-sm font-bold">
                        {index + 1}
                      </div>
                      <div
                        className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{item.label}</div>
                        <div className="text-sm text-gray-600">{item.count} giros ({item.percentage.toFixed(1)}%)</div>
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedView === 'detailed' && (
            <div className="space-y-6">
              {/* All Items Statistics */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">📋 Estatísticas Detalhadas por Item</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Item</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Giros</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Frequência</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Último Giro</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemStats.map((item, index) => (
                        <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="font-medium">{item.label}</span>
                            </div>
                          </td>
                          <td className="text-center py-3 px-4 font-bold">{item.count}</td>
                          <td className="text-center py-3 px-4">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                              {item.percentage.toFixed(1)}%
                            </span>
                          </td>
                          <td className="text-center py-3 px-4 text-sm text-gray-600">
                            {item.lastSpin ? new Date(item.lastSpin).toLocaleDateString('pt-BR') : 'Nunca'}
                          </td>
                          <td className="text-center py-3 px-4">
                            {item.count === 0 ? (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Inativo</span>
                            ) : item.percentage > 20 ? (
                              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">🔥 Quente</span>
                            ) : item.percentage > 10 ? (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">📊 Normal</span>
                            ) : (
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">❄️ Frio</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">🕒 Atividade Recente</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {spinHistory.slice(-10).reverse().map((spin, index) => (
                    <div key={spin.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl">🎯</div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{spin.result}</div>
                        <div className="text-sm text-gray-600">
                          {new Date(spin.timestamp).toLocaleString('pt-BR')} • {spin.duration.toFixed(1)}s
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">#{spinHistory.length - index}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedView === 'trends' && (
            <div className="space-y-6">
              {/* Hourly Activity */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">🕐 Atividade por Horário</h3>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                  {hourlyActivity.map((hour, index) => (
                    <div key={index} className="text-center">
                      <div
                        className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded mb-1 transition-all duration-300 hover:from-purple-600 hover:to-purple-500"
                        style={{ height: `${Math.max(hour.percentage * 2, 4)}px` }}
                        title={`${hour.hour}: ${hour.count} giros`}
                      />
                      <div className="text-xs text-gray-600">{hour.hour.split(':')[0]}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center text-sm text-gray-600">
                  Horário de maior atividade: <span className="font-bold text-purple-600">{peakHour.hour}</span> com {peakHour.count} giros
                </div>
              </div>

              {/* Performance Insights */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">💡 Insights</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-800 mb-1">📈 Tendência de Uso</div>
                      <div className="text-sm text-blue-700">
                        {totalSpins > 0 ? 'Roda ativa com uso regular' : 'Roda ainda não foi utilizada'}
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-800 mb-1">⚖️ Distribuição</div>
                      <div className="text-sm text-green-700">
                        {uniqueResults === items.length ? 'Todos os itens já foram sorteados' : `${uniqueResults}/${items.length} itens sorteados`}
                      </div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="font-semibold text-purple-800 mb-1">⏱️ Performance</div>
                      <div className="text-sm text-purple-700">
                        Duração média de {averageDuration.toFixed(1)}s por giro
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">🎯 Recomendações</h3>
                  <div className="space-y-4">
                    {totalSpins === 0 && (
                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <div className="font-semibold text-yellow-800 mb-1">🚀 Comece a usar!</div>
                        <div className="text-sm text-yellow-700">
                          Faça seu primeiro giro para começar a coletar dados
                        </div>
                      </div>
                    )}
                    {itemStats.some(item => item.count === 0) && (
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <div className="font-semibold text-orange-800 mb-1">⚠️ Itens não sorteados</div>
                        <div className="text-sm text-orange-700">
                          Alguns itens ainda não foram sorteados
                        </div>
                      </div>
                    )}
                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <div className="font-semibold text-indigo-800 mb-1">📊 Continue girando!</div>
                      <div className="text-sm text-indigo-700">
                        Mais dados = análises mais precisas
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
          <div className="text-sm text-gray-600">
            📊 Dados atualizados em tempo real • {totalSpins} giros analisados
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors font-medium"
          >
            ✨ Fechar Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;