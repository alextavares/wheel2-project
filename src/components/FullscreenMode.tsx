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
        <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold">Modo Tela Cheia</h2>
              <div className="flex items-center gap-2 text-sm">
                <span>Duração:</span>
                <select
                  value={spinDuration}
                  onChange={(e) => setSpinDuration(Number(e.target.value))}
                  className="bg-white bg-opacity-20 text-white border border-white border-opacity-30 rounded px-2 py-1"
                >
                  <option value={1}>1s</option>
                  <option value={2}>2s</option>
                  <option value={3}>3s</option>
                  <option value={4}>4s</option>
                  <option value={5}>5s</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={onReset}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg"
                title="Resetar"
              >
                <RotateCcw size={20} />
              </button>
              
              <button
                onClick={() => setAutoHideControls(!autoHideControls)}
                className={`p-2 rounded-lg ${
                  autoHideControls 
                    ? 'bg-blue-500 bg-opacity-50' 
                    : 'bg-white bg-opacity-20 hover:bg-opacity-30'
                }`}
                title="Auto-ocultar controles"
              >
                <Settings size={20} />
              </button>
              
              <button
                onClick={() => setShowControls(false)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg"
                title="Ocultar controles"
              >
                <Minimize size={20} />
              </button>
              
              <button
                onClick={onClose}
                className="bg-red-500 bg-opacity-50 hover:bg-opacity-70 p-2 rounded-lg"
                title="Sair do modo tela cheia"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botão para mostrar controles quando ocultos */}
      {!showControls && (
        <button
          onClick={() => setShowControls(true)}
          className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-lg z-10"
        >
          <Maximize size={20} />
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
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-20">
          <div className="bg-white rounded-2xl p-8 md:p-12 text-center max-w-md mx-4 shadow-2xl">
            <div className="text-6xl md:text-8xl mb-4">🎉</div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Resultado:</h3>
            <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
              {typeof result === 'string' ? result : result?.label || 'Resultado'}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={onSpin}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 font-semibold"
              >
                Girar Novamente
              </button>
              <button
                onClick={onReset}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 font-semibold"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botão de Girar */}
      {!result && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={onSpin}
            disabled={isSpinning || items.length === 0}
            className={`px-8 py-4 rounded-full text-white font-bold text-xl shadow-2xl transition-all ${
              isSpinning || items.length === 0
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105'
            }`}
          >
            {isSpinning ? 'Girando...' : 'GIRAR'}
          </button>
        </div>
      )}

      {/* Informações da Roda */}
      {showControls && (
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-3 rounded-lg">
          <div className="text-sm">
            <div>Itens: {items.length}</div>
            <div>Probabilidade: {items.length > 0 ? Math.round(100 / items.length) : 0}% cada</div>
          </div>
        </div>
      )}

      {/* Instruções */}
      {items.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-6xl mb-4">🎡</div>
            <h3 className="text-2xl font-bold mb-2">Modo Tela Cheia</h3>
            <p className="text-lg opacity-80">Adicione itens à roda para começar</p>
            <button
              onClick={onClose}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Voltar ao Editor
            </button>
          </div>
        </div>
      )}
    </div>
  );
}