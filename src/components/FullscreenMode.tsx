'use client';

import React, { useState } from 'react';
import { X, Maximize, Minimize, Settings, Volume2, History, RotateCcw } from 'lucide-react';

interface FullscreenModeProps {
  isOpen: boolean;
  onClose: () => void;
  items: string[];
  onSpin: () => void;
  result: string | null;
  isSpinning: boolean;
  onReset: () => void;
}

export default function FullscreenMode({ 
  isOpen, 
  onClose, 
  items, 
  onSpin, 
  result, 
  isSpinning,
  onReset 
}: FullscreenModeProps) {
  const [showControls, setShowControls] = useState(true);
  const [spinDuration, setSpinDuration] = useState(3);
  const [autoHideControls, setAutoHideControls] = useState(true);

  if (!isOpen) return null;

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
  ];

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Controles Superiores */}
      {showControls && (
        <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-60 backdrop-blur-sm text-white p-6 z-10 border-b border-white border-opacity-20">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <h2 className="text-2xl font-bold leading-tight tracking-wide">🎡 Modo Tela Cheia</h2>
              <div className="flex items-center gap-3 text-base font-semibold">
                <span className="text-gray-200">⏱️ Duração:</span>
                <select
                  value={spinDuration}
                  onChange={(e) => setSpinDuration(Number(e.target.value))}
                  className="bg-white bg-opacity-20 backdrop-blur-sm text-white border-2 border-white border-opacity-30 rounded-xl px-3 py-2 font-bold text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                >
                  <option value={1} className="text-gray-800">1s</option>
                  <option value={2} className="text-gray-800">2s</option>
                  <option value={3} className="text-gray-800">3s</option>
                  <option value={4} className="text-gray-800">4s</option>
                  <option value={5} className="text-gray-800">5s</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={onReset}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 p-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
                title="🔄 Resetar"
              >
                <RotateCcw size={22} />
              </button>
              
              <button
                onClick={() => setAutoHideControls(!autoHideControls)}
                className={`p-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg ${
                  autoHideControls 
                    ? 'bg-blue-500 bg-opacity-60 backdrop-blur-sm' 
                    : 'bg-white bg-opacity-20 hover:bg-opacity-30'
                }`}
                title="⚙️ Auto-ocultar controles"
              >
                <Settings size={22} />
              </button>
              
              <button
                onClick={() => setShowControls(false)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 p-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
                title="🔽 Ocultar controles"
              >
                <Minimize size={22} />
              </button>
              
              <button
                onClick={onClose}
                className="bg-red-500 bg-opacity-60 hover:bg-opacity-80 p-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg backdrop-blur-sm"
                title="❌ Sair do modo tela cheia"
              >
                <X size={22} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botão para mostrar controles quando ocultos */}
      {!showControls && (
        <button
          onClick={() => setShowControls(true)}
          className="absolute top-6 right-6 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-xl z-10 transition-all duration-200 hover:scale-105 shadow-lg backdrop-blur-sm"
          title="🔼 Mostrar controles"
        >
          <Maximize size={22} />
        </button>
      )}

      {/* Área Principal da Roda */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="relative">
          {/* Roda */}
          <div 
            className={`w-96 h-96 md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] rounded-full border-8 border-white shadow-2xl ${
              isSpinning ? 'animate-spin' : ''
            }`}
            style={{
              background: items.length > 0 ? `conic-gradient(${items.map((_, index) => 
                `${colors[index % colors.length]} ${(index * 360) / items.length}deg ${((index + 1) * 360) / items.length}deg`
              ).join(', ')})` : '#gray',
              animationDuration: isSpinning ? `${spinDuration}s` : '0s'
            }}
          >
            {/* Itens da Roda */}
            {items.map((item, index) => {
              const angle = (index * 360) / items.length;
              const midAngle = angle + (360 / items.length) / 2;
              const radius = 200; // Ajustar baseado no tamanho da roda
              
              return (
                <div
                  key={index}
                  className="absolute text-white font-bold text-sm md:text-base lg:text-lg"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${midAngle}deg) translateY(-${radius * 0.6}px) rotate(-${midAngle}deg)`,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                    maxWidth: '120px',
                    textAlign: 'center',
                    lineHeight: '1.2'
                  }}
                >
                  {item.length > 15 ? item.substring(0, 15) + '...' : item}
                </div>
              );
            })}
            
            {/* Centro da Roda */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 rounded-full"></div>
            </div>
          </div>
          
          {/* Ponteiro */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
            <div className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-white shadow-lg"></div>
          </div>
        </div>
      </div>

      {/* Resultado */}
      {result && (
        <div className="absolute inset-0 bg-black bg-opacity-85 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="bg-white rounded-3xl p-10 md:p-14 text-center max-w-lg mx-6 shadow-2xl border-4 border-gray-100">
            <div className="text-7xl md:text-9xl mb-6 animate-bounce">🎉</div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">🏆 Resultado:</h3>
            <p className="text-4xl md:text-5xl font-bold text-blue-600 mb-8 leading-tight break-words">
              {typeof result === 'string' ? result : result?.label || 'Resultado'}
            </p>
            <div className="flex gap-5 justify-center">
              <button
                onClick={onSpin}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
              >
                🎲 Girar Novamente
              </button>
              <button
                onClick={onReset}
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
              >
                ❌ Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botão de Girar */}
      {!result && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <button
            onClick={onSpin}
            disabled={isSpinning || items.length === 0}
            className={`px-10 py-5 rounded-full text-white font-bold text-2xl shadow-2xl transition-all duration-300 ${
              isSpinning || items.length === 0
                ? 'bg-gray-500 cursor-not-allowed opacity-60'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-110 hover:shadow-3xl'
            }`}
          >
            {isSpinning ? '🌀 Girando...' : '🎯 GIRAR'}
          </button>
        </div>
      )}

      {/* Informações da Roda */}
      {showControls && (
        <div className="absolute bottom-6 left-6 bg-black bg-opacity-60 backdrop-blur-sm text-white p-4 rounded-2xl border border-white border-opacity-20 shadow-lg">
          <div className="text-base font-semibold space-y-1">
            <div className="flex items-center gap-2">
              <span>📊 Itens:</span>
              <span className="text-blue-300 font-bold">{items.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🎲 Probabilidade:</span>
              <span className="text-green-300 font-bold">{items.length > 0 ? Math.round(100 / items.length) : 0}% cada</span>
            </div>
          </div>
        </div>
      )}

      {/* Instruções */}
      {items.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center p-8">
            <div className="text-8xl mb-6 animate-pulse">🎡</div>
            <h3 className="text-4xl font-bold mb-4 leading-tight">🎯 Modo Tela Cheia</h3>
            <p className="text-xl opacity-90 mb-8 font-semibold">Adicione itens à roda para começar</p>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
            >
              📝 Voltar ao Editor
            </button>
          </div>
        </div>
      )}
    </div>
  );
}