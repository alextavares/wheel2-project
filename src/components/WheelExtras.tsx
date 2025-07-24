import React, { useState } from 'react';

interface WheelStatsProps {
  items: Array<{
    id: string;
    label: string;
    color: string;
    weight?: number;
  }>;
  lastResult?: string;
  totalSpins?: number;
}

export const WheelStats: React.FC<WheelStatsProps> = ({ 
  items, 
  lastResult, 
  totalSpins = 0 
}) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3 leading-tight">
        <span className="text-2xl">📊</span>
        Estatísticas da Roda
      </h3>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="text-center p-4 bg-blue-50/80 backdrop-blur-sm rounded-xl border border-blue-100">
          <div className="text-3xl font-black text-blue-600 mb-1">{items.length}</div>
          <div className="text-sm text-blue-800 font-semibold">Itens</div>
        </div>
        <div className="text-center p-4 bg-green-50/80 backdrop-blur-sm rounded-xl border border-green-100">
          <div className="text-3xl font-black text-green-600 mb-1">{totalSpins}</div>
          <div className="text-sm text-green-800 font-semibold">Giros</div>
        </div>
      </div>
      
      {lastResult && (
        <div className="p-4 bg-yellow-50/80 backdrop-blur-sm rounded-xl border border-yellow-200 mb-4">
          <div className="text-sm text-yellow-800 mb-2 font-semibold">Último Resultado:</div>
          <div className="font-bold text-lg text-yellow-900 leading-tight">{lastResult}</div>
        </div>
      )}
      
      {items.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200">
          <div className="text-sm text-gray-700 mb-2 font-semibold">Probabilidade por item:</div>
          <div className="text-lg font-bold text-gray-800">
            {(100 / items.length).toFixed(1)}% cada
          </div>
        </div>
      )}
    </div>
  );
};

interface SavedWheelsProps {
  onLoadWheel: (items: Array<{ id: string; label: string; color: string }>) => void;
}

export const SavedWheels: React.FC<SavedWheelsProps> = ({ onLoadWheel }) => {
  const [savedWheels, setSavedWheels] = useState<Array<{
    id: string;
    name: string;
    items: Array<{ id: string; label: string; color: string }>;
    createdAt: string;
  }>>([]);

  const deleteWheel = (id: string) => {
    setSavedWheels(prev => prev.filter(wheel => wheel.id !== id));
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3 leading-tight">
        <span className="text-2xl">💾</span>
        Rodas Salvas
      </h3>
      
      {savedWheels.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <div className="text-6xl mb-4">📁</div>
          <p className="text-lg font-semibold leading-relaxed">Nenhuma roda salva ainda</p>
          <p className="text-sm mt-2 font-medium opacity-75">Suas rodas personalizadas aparecerão aqui</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {savedWheels.map((wheel) => (
            <div
              key={wheel.id}
              className="flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl hover:bg-gray-100/80 transition-all duration-200 group border border-gray-200 hover:shadow-lg"
            >
              <div className="flex-1">
                <div className="font-bold text-gray-800 text-lg leading-tight">{wheel.name}</div>
                <div className="text-sm text-gray-600 font-medium mt-1">
                  {wheel.items.length} itens • {wheel.createdAt}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => onLoadWheel(wheel.items)}
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Carregar
                </button>
                <button
                  onClick={() => deleteWheel(wheel.id)}
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface ShareWheelProps {
  items: Array<{ id: string; label: string; color: string }>;
}

export const ShareWheel: React.FC<ShareWheelProps> = ({ items }) => {
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  const generateShareUrl = () => {
    const wheelData = {
      items: items.map(item => ({ label: item.label, color: item.color }))
    };
    const encodedData = btoa(JSON.stringify(wheelData));
    const url = `${window.location.origin}?wheel=${encodedData}`;
    setShareUrl(url);
    setIsSharing(true);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copiado para a área de transferência!');
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3 leading-tight">
        <span className="text-2xl">🔗</span>
        Compartilhar Roda
      </h3>
      
      {!isSharing ? (
        <button
          onClick={generateShareUrl}
          disabled={items.length === 0}
          className={`w-full px-6 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 ${
            items.length === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600 backdrop-blur-sm border border-white/20'
          }`}
        >
          <span className="flex items-center justify-center gap-3">
            <span className="text-xl">🚀</span>
            Gerar Link de Compartilhamento
          </span>
        </button>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200">
            <div className="text-sm text-gray-700 mb-3 font-semibold">Link para compartilhar:</div>
            <div className="text-sm text-gray-800 break-all font-mono bg-white/80 p-3 rounded-lg border leading-relaxed">
              {shareUrl}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={copyToClipboard}
              className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 text-sm font-bold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              <span className="flex items-center justify-center gap-2">
                <span>📋</span>
                Copiar Link
              </span>
            </button>
            <button
              onClick={() => setIsSharing(false)}
              className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-200 text-sm font-bold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};