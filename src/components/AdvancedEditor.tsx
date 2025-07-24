'use client';

import React, { useState } from 'react';

interface WheelItem {
  id: string;
  text: string;
  color: string;
  weight?: number;
}

interface AdvancedEditorProps {
  items: WheelItem[];
  onItemsChange: (items: WheelItem[]) => void;
  isOpen: boolean;
  onClose: () => void;
}

// Presets de cores inspirados no SpinTheWheel.app
const COLOR_PRESETS = {
  rainbow: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'],
  sunset: ['#FF9A8B', '#A8E6CF', '#FFD93D', '#6BCF7F', '#4D96FF', '#9B59B6', '#F39C12', '#E74C3C'],
  ocean: ['#0077BE', '#00A8CC', '#0ABDE3', '#006BA6', '#0582CA', '#00B8D4', '#0288D1', '#0277BD'],
  forest: ['#27AE60', '#2ECC71', '#58D68D', '#82E0AA', '#A9DFBF', '#D5F4E6', '#16A085', '#48C9B0'],
  pastel: ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#E6BAFF', '#FFCCCB', '#D4BAFF'],
  neon: ['#FF073A', '#39FF14', '#FF6EC7', '#00FFFF', '#FFFF00', '#FF4500', '#9400D3', '#00FF00'],
  vintage: ['#D4A574', '#C4A484', '#B4A394', '#A49BA4', '#9492B4', '#8489C4', '#7480D4', '#6477E4'],
  monochrome: ['#2C3E50', '#34495E', '#5D6D7E', '#85929E', '#AEB6BF', '#D5DBDB', '#EAEDED', '#F8F9FA']
};

const WEIGHT_PRESETS = [
  { name: 'Igual para todos', weights: [] },
  { name: 'Primeiro favorito', weights: [3, 1, 1, 1, 1, 1, 1, 1] },
  { name: 'Últimos favoritos', weights: [1, 1, 1, 1, 2, 2, 3, 3] },
  { name: 'Meio favorito', weights: [1, 2, 3, 4, 4, 3, 2, 1] },
];

export default function AdvancedEditor({ items, onItemsChange, isOpen, onClose }: AdvancedEditorProps) {
  const [selectedPreset, setSelectedPreset] = useState<string>('rainbow');
  const [showWeights, setShowWeights] = useState(false);
  const [customColor, setCustomColor] = useState('#FF6B6B');

  if (!isOpen) return null;

  const applyColorPreset = (presetName: string) => {
    const colors = COLOR_PRESETS[presetName as keyof typeof COLOR_PRESETS];
    const updatedItems = items.map((item, index) => ({
      ...item,
      color: colors[index % colors.length]
    }));
    onItemsChange(updatedItems);
    setSelectedPreset(presetName);
  };

  const applyWeightPreset = (weights: number[]) => {
    const updatedItems = items.map((item, index) => ({
      ...item,
      weight: weights.length > 0 ? (weights[index % weights.length] || 1) : 1
    }));
    onItemsChange(updatedItems);
  };

  const updateItemColor = (itemId: string, color: string) => {
    const updatedItems = items.map(item =>
      item.id === itemId ? { ...item, color } : item
    );
    onItemsChange(updatedItems);
  };

  const updateItemWeight = (itemId: string, weight: number) => {
    const updatedItems = items.map(item =>
      item.id === itemId ? { ...item, weight: Math.max(1, weight) } : item
    );
    onItemsChange(updatedItems);
  };

  const randomizeColors = () => {
    const allColors = Object.values(COLOR_PRESETS).flat();
    const updatedItems = items.map(item => ({
      ...item,
      color: allColors[Math.floor(Math.random() * allColors.length)]
    }));
    onItemsChange(updatedItems);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/50 shadow-2xl">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 leading-tight">🎨 Editor Avançado</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-3xl font-bold transition-all duration-200 hover:scale-110 p-2 rounded-full hover:bg-gray-100"
            >
              ×
            </button>
          </div>

          {/* Color Presets */}
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-6 text-gray-800 leading-tight">🌈 Presets de Cores</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {Object.entries(COLOR_PRESETS).map(([name, colors]) => (
                <button
                  key={name}
                  onClick={() => applyColorPreset(name)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-200 hover:scale-105 shadow-md ${
                    selectedPreset === name
                      ? 'border-blue-500 bg-blue-50/80 backdrop-blur-sm shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 bg-white/80 backdrop-blur-sm'
                  }`}
                >
                  <div className="flex space-x-1 mb-3">
                    {colors.slice(0, 4).map((color, index) => (
                      <div
                        key={index}
                        className="w-5 h-5 rounded-lg shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold capitalize text-gray-700">{name}</span>
                </button>
              ))}
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={randomizeColors}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg font-bold"
              >
                🎲 Cores Aleatórias
              </button>
              
              <div className="flex items-center gap-3 bg-gray-100/80 backdrop-blur-sm rounded-xl p-3 border border-gray-200">
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-12 h-12 rounded-xl border-2 border-gray-300 cursor-pointer"
                />
                <span className="text-sm font-bold text-gray-700">Cor personalizada</span>
              </div>
            </div>
          </div>

          {/* Individual Item Editor */}
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-6 text-gray-800 leading-tight">✏️ Editar Itens Individuais</h3>
            <div className="space-y-4 max-h-60 overflow-y-auto">
              {items.map((item, index) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-md">
                  <span className="text-base font-bold w-8 text-gray-700">{index + 1}</span>
                  
                  <input
                    type="text"
                    value={item.text || ''}
                    onChange={(e) => {
                      const updatedItems = items.map(i =>
                        i.id === item.id ? { ...i, text: e.target.value } : i
                      );
                      onItemsChange(updatedItems);
                    }}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                  
                  <input
                    type="color"
                    value={item.color || '#FF6B6B'}
                    onChange={(e) => updateItemColor(item.id, e.target.value)}
                    className="w-14 h-12 rounded-xl border-2 border-gray-300 cursor-pointer"
                  />
                  
                  {showWeights && (
                    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl p-2 border border-gray-200">
                      <span className="text-sm font-bold text-gray-600">Peso:</span>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={item.weight || 1}
                        onChange={(e) => updateItemWeight(item.id, parseInt(e.target.value) || 1)}
                        className="w-16 px-2 py-2 border border-gray-300 rounded-lg text-center font-bold text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Weight Settings */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 leading-tight">⚖️ Configurações de Peso</h3>
              <button
                onClick={() => setShowWeights(!showWeights)}
                className={`px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-md font-bold ${
                  showWeights
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {showWeights ? 'Ocultar Pesos' : 'Mostrar Pesos'}
              </button>
            </div>
            
            {showWeights && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {WEIGHT_PRESETS.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyWeightPreset(preset.weights)}
                    className="p-4 border-2 border-gray-200 rounded-2xl hover:border-blue-300 hover:bg-blue-50/80 backdrop-blur-sm transition-all duration-200 hover:scale-105 shadow-md text-left bg-white/80"
                  >
                    <div className="font-bold text-base text-gray-800 leading-tight">{preset.name}</div>
                    <div className="text-sm text-gray-600 mt-2 font-semibold">
                      {preset.weights.length > 0 ? preset.weights.join(', ') : 'Todos iguais'}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-8 py-3 border-2 border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50/80 backdrop-blur-sm transition-all duration-200 hover:scale-105 shadow-md font-bold text-gray-700"
            >
              ❌ Cancelar
            </button>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 hover:scale-105 shadow-lg font-bold"
            >
              ✅ Aplicar Mudanças
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}