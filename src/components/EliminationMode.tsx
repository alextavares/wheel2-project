import React, { useState } from 'react';

interface EliminationModeProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{ id: string; label: string; color: string }>;
  onItemsChange: (items: Array<{ id: string; label: string; color: string }>) => void;
}

const EliminationMode: React.FC<EliminationModeProps> = ({
  isOpen,
  onClose,
  items,
  onItemsChange
}) => {
  const [eliminatedItems, setEliminatedItems] = useState<string[]>([]);
  const [currentResult, setCurrentResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [eliminationHistory, setEliminationHistory] = useState<Array<{
    round: number;
    eliminated: string;
    remaining: number;
    timestamp: Date;
  }>>([]);

  const activeItems = items.filter(item => !eliminatedItems.includes(item.id));

  const handleSpin = () => {
    if (activeItems.length === 0) return;
    
    setIsSpinning(true);
    setCurrentResult(null);

    // Simular animação de giro
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * activeItems.length);
      const selectedItem = activeItems[randomIndex];
      
      setCurrentResult(selectedItem.label);
      
      // Eliminar o item selecionado
      const newEliminatedItems = [...eliminatedItems, selectedItem.id];
      setEliminatedItems(newEliminatedItems);
      
      // Adicionar ao histórico
      const newHistoryEntry = {
        round: eliminationHistory.length + 1,
        eliminated: selectedItem.label,
        remaining: activeItems.length - 1,
        timestamp: new Date()
      };
      setEliminationHistory([...eliminationHistory, newHistoryEntry]);
      
      setIsSpinning(false);
    }, 2000);
  };

  const handleReset = () => {
    setEliminatedItems([]);
    setCurrentResult(null);
    setEliminationHistory([]);
  };

  const handleRestoreItem = (itemId: string) => {
    setEliminatedItems(eliminatedItems.filter(id => id !== itemId));
    // Remover do histórico também
    const item = items.find(i => i.id === itemId);
    if (item) {
      setEliminationHistory(eliminationHistory.filter(h => h.eliminated !== item.label));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                🎯 Modo Eliminação
              </h2>
              <p className="text-red-100 mt-1">
                Gire para eliminar itens um por um até sobrar apenas um vencedor!
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
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Game Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl">
                  <div className="text-2xl mb-2">✅</div>
                  <div className="text-sm opacity-90">Itens Restantes</div>
                  <div className="text-2xl font-bold">{activeItems.length}</div>
                </div>
                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-xl">
                  <div className="text-2xl mb-2">❌</div>
                  <div className="text-sm opacity-90">Eliminados</div>
                  <div className="text-2xl font-bold">{eliminatedItems.length}</div>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-xl">
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="text-sm opacity-90">Rodadas</div>
                  <div className="text-2xl font-bold">{eliminationHistory.length}</div>
                </div>
              </div>

              {/* Game Status */}
              {activeItems.length === 0 ? (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-8 rounded-2xl text-center">
                  <div className="text-6xl mb-4">🏆</div>
                  <h3 className="text-2xl font-bold mb-2">Jogo Finalizado!</h3>
                  <p className="text-lg opacity-90">Todos os itens foram eliminados</p>
                </div>
              ) : activeItems.length === 1 ? (
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-8 rounded-2xl text-center">
                  <div className="text-6xl mb-4">👑</div>
                  <h3 className="text-2xl font-bold mb-2">Temos um Vencedor!</h3>
                  <p className="text-3xl font-bold">{activeItems[0].label}</p>
                </div>
              ) : (
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center">
                  {isSpinning ? (
                    <div className="space-y-4">
                      <div className="text-6xl animate-spin">🎯</div>
                      <h3 className="text-2xl font-bold text-gray-800">Girando...</h3>
                      <p className="text-gray-600">Eliminando um item...</p>
                    </div>
                  ) : currentResult ? (
                    <div className="space-y-4">
                      <div className="text-6xl">❌</div>
                      <h3 className="text-2xl font-bold text-red-600">Item Eliminado!</h3>
                      <p className="text-3xl font-bold text-gray-800">
                        {typeof currentResult === 'string' ? currentResult : currentResult?.label || 'Item'}
                      </p>
                      <button
                        onClick={() => setCurrentResult(null)}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Continuar
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-6xl">🎯</div>
                      <h3 className="text-2xl font-bold text-gray-800">Pronto para Eliminar</h3>
                      <p className="text-gray-600">{activeItems.length} itens restantes</p>
                      <button
                        onClick={handleSpin}
                        disabled={activeItems.length === 0}
                        className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:from-red-600 hover:to-orange-600 transition-colors font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        🎯 Girar para Eliminar
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Active Items */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  ✅ Itens Restantes ({activeItems.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {activeItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium text-gray-800 text-sm">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Controls */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Controles</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleReset}
                    className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                  >
                    🔄 Reiniciar Jogo
                  </button>
                </div>
              </div>

              {/* Eliminated Items */}
              {eliminatedItems.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    ❌ Itens Eliminados ({eliminatedItems.length})
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {items.filter(item => eliminatedItems.includes(item.id)).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full opacity-50"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="font-medium text-gray-600 text-sm line-through">
                            {item.label}
                          </span>
                        </div>
                        <button
                          onClick={() => handleRestoreItem(item.id)}
                          className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                          title="Restaurar item"
                        >
                          ↩️
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* History */}
              {eliminationHistory.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Histórico</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {eliminationHistory.slice().reverse().map((entry, index) => (
                      <div
                        key={index}
                        className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">Rodada {entry.round}</span>
                          <span className="text-xs text-gray-500">
                            {entry.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          <span className="text-red-600 font-medium">{entry.eliminated}</span> eliminado
                        </div>
                        <div className="text-xs text-gray-500">
                          {entry.remaining} itens restantes
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
          <div className="text-sm text-gray-600">
            💡 Dica: Use o modo eliminação para torneios e competições!
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EliminationMode;