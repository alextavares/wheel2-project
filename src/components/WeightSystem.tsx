'use client';

import { useState, useEffect } from 'react';

interface WeightedItem {
  id: string;
  label: string;
  color: string;
  weight: number;
  probability: number;
  expectedFrequency: string;
}

interface WeightSystemProps {
  items: Array<{ id: string; label: string; color: string; weight?: number }>;
  onItemsUpdate: (items: WeightedItem[]) => void;
  onClose: () => void;
}

const WeightSystem: React.FC<WeightSystemProps> = ({
  isOpen,
  onClose,
  items,
  onItemsChange
}) => {
  const [localItems, setLocalItems] = useState(
    items.map(item => ({ ...item, weight: item.weight || 1 }))
  );

  const handleWeightChange = (id: string, weight: number) => {
    const updatedItems = localItems.map(item =>
      item.id === id ? { ...item, weight: Math.max(0.1, weight) } : item
    );
    setLocalItems(updatedItems);
  };

  const handleSave = () => {
    onItemsChange(localItems);
    onClose();
  };

  const handleReset = () => {
    const resetItems = localItems.map(item => ({ ...item, weight: 1 }));
    setLocalItems(resetItems);
  };

  const getTotalWeight = () => {
    return localItems.reduce((sum, item) => sum + (item.weight || 1), 0);
  };

  const getPercentage = (weight: number) => {
    const total = getTotalWeight();
    return total > 0 ? ((weight / total) * 100).toFixed(1) : '0.0';
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
                ⚖️ Sistema de Pesos
              </h2>
              <p className="text-purple-100 mt-1">
                Ajuste as probabilidades de cada item ser selecionado
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
          {/* Info Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Como funciona?</h3>
                <p className="text-blue-700 text-sm">
                  Quanto maior o peso, maior a chance do item ser selecionado. 
                  Um item com peso 2 tem o dobro de chance de um item com peso 1.
                </p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm opacity-90">Total de Itens</div>
              <div className="text-2xl font-bold">{localItems.length}</div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-xl">
              <div className="text-2xl mb-2">⚖️</div>
              <div className="text-sm opacity-90">Peso Total</div>
              <div className="text-2xl font-bold">{getTotalWeight().toFixed(1)}</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-sm opacity-90">Peso Médio</div>
              <div className="text-2xl font-bold">
                {localItems.length > 0 ? (getTotalWeight() / localItems.length).toFixed(1) : '0.0'}
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Configurar Pesos dos Itens
            </h3>
            
            {localItems.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <div className="text-4xl mb-2">🎯</div>
                <p className="font-medium">Nenhum item para configurar</p>
                <p className="text-sm">Adicione alguns itens à roda primeiro!</p>
              </div>
            ) : (
              localItems.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    {/* Item Info */}
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-bold">
                        {index + 1}
                      </div>
                      <div
                        className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-semibold text-gray-800">{item.label}</span>
                    </div>

                    {/* Weight Controls */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Probabilidade</div>
                        <div className="font-bold text-lg text-purple-600">
                          {getPercentage(item.weight || 1)}%
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleWeightChange(item.id, (item.weight || 1) - 0.5)}
                          className="w-8 h-8 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-bold"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.weight || 1}
                          onChange={(e) => handleWeightChange(item.id, parseFloat(e.target.value) || 0.1)}
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center font-semibold"
                          min="0.1"
                          step="0.1"
                        />
                        <button
                          onClick={() => handleWeightChange(item.id, (item.weight || 1) + 0.5)}
                          className="w-8 h-8 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Weight Bar */}
                  <div className="mt-3">
                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-full transition-all duration-300"
                        style={{ 
                          width: `${Math.min(100, (item.weight || 1) * 20)}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
            >
              🔄 Resetar Pesos
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-colors font-medium"
            >
              💾 Salvar Pesos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightSystem;