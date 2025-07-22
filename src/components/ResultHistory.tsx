'use client';

import React, { useState } from 'react';
import { X, History, RotateCcw, Download, Share2, Trophy, TrendingUp } from 'lucide-react';

interface SpinResult {
  id: string;
  result: string;
  timestamp: Date;
  wheelTitle: string;
  totalItems: number;
}

interface ResultHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  results: SpinResult[];
  onClearHistory: () => void;
}

export default function ResultHistory({ isOpen, onClose, results, onClearHistory }: ResultHistoryProps) {
  const [filter, setFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'wheel'>('newest');

  if (!isOpen) return null;

  // Filtrar resultados por período
  const filterResults = (results: SpinResult[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    switch (filter) {
      case 'today':
        return results.filter(r => r.timestamp >= today);
      case 'week':
        return results.filter(r => r.timestamp >= weekAgo);
      case 'month':
        return results.filter(r => r.timestamp >= monthAgo);
      default:
        return results;
    }
  };

  // Ordenar resultados
  const sortResults = (results: SpinResult[]) => {
    switch (sortBy) {
      case 'oldest':
        return [...results].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      case 'wheel':
        return [...results].sort((a, b) => a.wheelTitle.localeCompare(b.wheelTitle));
      default:
        return [...results].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }
  };

  const filteredAndSortedResults = sortResults(filterResults(results));

  // Estatísticas
  const stats = {
    total: results.length,
    today: filterResults(results.filter(r => {
      const today = new Date();
      const resultDate = new Date(r.timestamp);
      return resultDate.toDateString() === today.toDateString();
    })).length,
    mostCommon: results.length > 0 ? 
      Object.entries(
        results.reduce((acc, r) => {
          acc[r.result] = (acc[r.result] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      ).sort(([,a], [,b]) => b - a)[0] : null,
    uniqueWheels: new Set(results.map(r => r.wheelTitle)).size
  };

  const exportHistory = () => {
    const csvContent = [
      'Data,Hora,Roda,Resultado,Total de Itens',
      ...results.map(r => 
        `${r.timestamp.toLocaleDateString()},${r.timestamp.toLocaleTimeString()},${r.wheelTitle},${r.result},${r.totalItems}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `historico-roleta-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const shareHistory = () => {
    const summary = `🎯 Meu Histórico da Roda:\n\n` +
      `📊 Total de giros: ${stats.total}\n` +
      `🏆 Resultado mais comum: ${stats.mostCommon?.[0] || 'N/A'} (${stats.mostCommon?.[1] || 0}x)\n` +
      `🎪 Rodas diferentes: ${stats.uniqueWheels}\n` +
      `📅 Giros hoje: ${stats.today}\n\n` +
      `Criado com Wheel Maker 🎡`;

    if (navigator.share) {
      navigator.share({
        title: 'Meu Histórico da Roda',
        text: summary
      });
    } else {
      navigator.clipboard.writeText(summary);
      alert('Resumo copiado para a área de transferência!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <History size={24} />
            Histórico de Resultados
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-blue-700">Total de Giros</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.today}</div>
              <div className="text-sm text-green-700">Giros Hoje</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.uniqueWheels}</div>
              <div className="text-sm text-purple-700">Rodas Diferentes</div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-orange-600 truncate">
                {stats.mostCommon?.[0] || 'N/A'}
              </div>
              <div className="text-sm text-orange-700">Mais Comum ({stats.mostCommon?.[1] || 0}x)</div>
            </div>
          </div>

          {/* Controles */}
          <div className="flex flex-wrap gap-4 mb-6">
            {/* Filtros */}
            <div className="flex gap-2">
              <label className="text-sm font-medium text-gray-700 self-center">Período:</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">Todos</option>
                <option value="today">Hoje</option>
                <option value="week">Última Semana</option>
                <option value="month">Último Mês</option>
              </select>
            </div>

            {/* Ordenação */}
            <div className="flex gap-2">
              <label className="text-sm font-medium text-gray-700 self-center">Ordenar:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
              >
                <option value="newest">Mais Recente</option>
                <option value="oldest">Mais Antigo</option>
                <option value="wheel">Por Roda</option>
              </select>
            </div>

            {/* Ações */}
            <div className="flex gap-2 ml-auto">
              <button
                onClick={exportHistory}
                className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 text-sm flex items-center gap-1"
              >
                <Download size={14} />
                Exportar
              </button>
              <button
                onClick={shareHistory}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-sm flex items-center gap-1"
              >
                <Share2 size={14} />
                Compartilhar
              </button>
              <button
                onClick={onClearHistory}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-sm flex items-center gap-1"
              >
                <RotateCcw size={14} />
                Limpar
              </button>
            </div>
          </div>

          {/* Lista de Resultados */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredAndSortedResults.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <History size={48} className="mx-auto mb-4 opacity-50" />
                <p>Nenhum resultado encontrado para os filtros selecionados.</p>
              </div>
            ) : (
              filteredAndSortedResults.map((result) => (
                <div key={result.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Trophy size={16} className="text-yellow-500" />
                        <span className="font-semibold text-gray-800">{result.result}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Roda: <span className="font-medium">{result.wheelTitle}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {result.totalItems} itens • {result.timestamp.toLocaleDateString()} às {result.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">
                        {Math.round((1 / result.totalItems) * 100)}% chance
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Análise de Tendências */}
          {results.length > 5 && (
            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <TrendingUp size={16} />
                Análise de Tendências
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Resultados Mais Frequentes:</h5>
                  {Object.entries(
                    results.reduce((acc, r) => {
                      acc[r.result] = (acc[r.result] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  )
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 5)
                    .map(([result, count]) => (
                      <div key={result} className="flex justify-between text-gray-600">
                        <span className="truncate">{result}</span>
                        <span>{count}x</span>
                      </div>
                    ))}
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Rodas Mais Usadas:</h5>
                  {Object.entries(
                    results.reduce((acc, r) => {
                      acc[r.wheelTitle] = (acc[r.wheelTitle] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  )
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 5)
                    .map(([wheel, count]) => (
                      <div key={wheel} className="flex justify-between text-gray-600">
                        <span className="truncate">{wheel}</span>
                        <span>{count}x</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}