import React, { useState } from 'react';
import { WheelTemplate } from '@/data/templates';

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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-xl">📊</span>
        Estatísticas da Roda
      </h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{items.length}</div>
          <div className="text-sm text-blue-800">Itens</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{totalSpins}</div>
          <div className="text-sm text-green-800">Giros</div>
        </div>
      </div>
      
      {lastResult && (
        <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="text-sm text-yellow-800 mb-1">Último Resultado:</div>
          <div className="font-bold text-yellow-900">{lastResult}</div>
        </div>
      )}
      
      {items.length > 0 && (
        <div className="mt-4">
          <div className="text-sm text-gray-600 mb-2">Probabilidade por item:</div>
          <div className="text-xs text-gray-500">
            {(100 / items.length).toFixed(1)}% cada
          </div>
        </div>
      )}
    </div>
  );
};

interface SavedWheelsProps {
  onLoadWheel: (items: any[]) => void;
}

export const SavedWheels: React.FC<SavedWheelsProps> = ({ onLoadWheel }) => {
  const [savedWheels, setSavedWheels] = useState<Array<{
    id: string;
    name: string;
    items: any[];
    createdAt: string;
  }>>([]);

  const saveCurrentWheel = (items: any[], name: string) => {
    const newWheel = {
      id: Date.now().toString(),
      name: name || `Roda ${savedWheels.length + 1}`,
      items: [...items],
      createdAt: new Date().toLocaleDateString('pt-BR')
    };
    
    setSavedWheels(prev => [newWheel, ...prev]);
  };

  const deleteWheel = (id: string) => {
    setSavedWheels(prev => prev.filter(wheel => wheel.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-xl">💾</span>
        Rodas Salvas
      </h3>
      
      {savedWheels.length === 0 ? (
        <div className="text-center py-6 text-gray-400">
          <div className="text-4xl mb-2">📁</div>
          <p className="text-sm">Nenhuma roda salva ainda</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {savedWheels.map((wheel) => (
            <div
              key={wheel.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className="flex-1">
                <div className="font-medium text-gray-800">{wheel.name}</div>
                <div className="text-xs text-gray-500">
                  {wheel.items.length} itens • {wheel.createdAt}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onLoadWheel(wheel.items)}
                  className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Carregar
                </button>
                <button
                  onClick={() => deleteWheel(wheel.id)}
                  className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
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
  items: any[];
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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-xl">🔗</span>
        Compartilhar Roda
      </h3>
      
      {!isSharing ? (
        <button
          onClick={generateShareUrl}
          disabled={items.length === 0}
          className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
            items.length === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          Gerar Link de Compartilhamento
        </button>
      ) : (
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-lg border">
            <div className="text-xs text-gray-600 mb-1">Link para compartilhar:</div>
            <div className="text-sm text-gray-800 break-all font-mono">
              {shareUrl}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={copyToClipboard}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              📋 Copiar Link
            </button>
            <button
              onClick={() => setIsSharing(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};