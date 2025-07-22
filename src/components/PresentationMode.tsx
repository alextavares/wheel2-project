'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { WheelItem } from '@/types/wheel';

interface PresentationModeProps {
  items: WheelItem[];
  onSpin?: (result: WheelItem) => void;
  wheelTitle?: string;
  isActive: boolean;
  onClose: () => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  items,
  onSpin,
  wheelTitle = "Roda de Decisões",
  isActive,
  onClose
}) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastResult, setLastResult] = useState<WheelItem | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);

  // Tamanho da roda para modo apresentação
  const wheelSize = Math.min(window?.innerWidth * 0.6, window?.innerHeight * 0.6, 600);

  // Fechar com ESC
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!isSpinning) {
          spin();
        }
      }
    };

    if (isActive) {
      document.addEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [isActive, isSpinning, onClose]);

  // Ocultar instruções após alguns segundos
  useEffect(() => {
    if (showInstructions) {
      const timer = setTimeout(() => {
        setShowInstructions(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showInstructions]);

  const spin = useCallback(() => {
    if (isSpinning || items.length === 0) return;

    setIsSpinning(true);
    setShowResult(false);
    setShowConfetti(false);
    setSpinCount(prev => prev + 1);

    // Vibração no mobile
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 50]);
    }

    // Rotação dramática para apresentação
    const randomRotation = Math.floor(Math.random() * 1080) + 2160; // 6-9 voltas
    const finalRotation = rotation + randomRotation;
    
    setRotation(finalRotation);

    // Som de giro
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const playSpinSound = () => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 3);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 3);
      };
      playSpinSound();
    }

    // Calcular resultado após animação
    setTimeout(() => {
      const normalizedRotation = finalRotation % 360;
      const segmentSize = 360 / items.length;
      const resultIndex = Math.floor((360 - normalizedRotation) / segmentSize) % items.length;
      const result = items[resultIndex];
      
      setIsSpinning(false);
      setLastResult(result);
      setShowResult(true);
      setShowConfetti(true);
      
      // Som de vitória
      if (typeof window !== 'undefined' && 'AudioContext' in window) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const playWinSound = () => {
          const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
          notes.forEach((freq, index) => {
            setTimeout(() => {
              const oscillator = audioContext.createOscillator();
              const gainNode = audioContext.createGain();
              
              oscillator.connect(gainNode);
              gainNode.connect(audioContext.destination);
              
              oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
              gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
              gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
              
              oscillator.start(audioContext.currentTime);
              oscillator.stop(audioContext.currentTime + 0.4);
            }, index * 200);
          });
        };
        playWinSound();
      }

      // Vibração de vitória
      if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200, 100, 300]);
      }
      
      onSpin?.(result);

      // Ocultar resultado após 8 segundos
      setTimeout(() => {
        setShowResult(false);
        setShowConfetti(false);
      }, 8000);
    }, 5000); // 5 segundos de suspense
  }, [isSpinning, items, rotation, onSpin]);

  if (!isActive) return null;

  const segmentSize = 360 / items.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: items[Math.floor(Math.random() * items.length)]?.color || '#3B82F6'
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Instruções */}
      {showInstructions && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50 bg-black bg-opacity-70 text-white px-6 py-3 rounded-lg animate-pulse">
          <div className="text-center">
            <div className="text-lg font-bold mb-1">Modo Apresentação</div>
            <div className="text-sm opacity-80">
              Pressione ESPAÇO ou ENTER para girar • ESC para sair
            </div>
          </div>
        </div>
      )}

      {/* Botão de Fechar */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-all shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Título da Roda */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50">
        <h1 className="text-4xl font-bold text-white text-center drop-shadow-lg">
          {wheelTitle}
        </h1>
        <div className="text-center text-white opacity-80 mt-2">
          Giro #{spinCount + 1}
        </div>
      </div>

      {/* Contador de Giros */}
      <div className="absolute top-6 left-6 z-50 bg-blue-500 text-white px-4 py-2 rounded-lg">
        <div className="text-sm opacity-80">Giros Realizados</div>
        <div className="text-2xl font-bold">{spinCount}</div>
      </div>

      {/* Roda Principal */}
      <div className="relative flex flex-col items-center">
        <div className="relative" style={{ width: wheelSize, height: wheelSize }}>
          {/* Anel externo decorativo */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-3 shadow-2xl">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-gray-900 p-2">
              
              {/* Ponteiro Principal */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20">
                <div className="w-0 h-0 border-l-[30px] border-r-[30px] border-t-[60px] border-l-transparent border-r-transparent border-t-red-600 shadow-lg" />
              </div>
              
              {/* Roda Principal */}
              <div
                className={`relative w-full h-full rounded-full border-4 border-gray-700 shadow-2xl cursor-pointer overflow-hidden transition-all duration-300 ${
                  isSpinning ? 'scale-105' : 'hover:scale-102'
                }`}
                style={{
                  transform: `rotate(${rotation}deg) ${isSpinning ? 'scale(1.02)' : ''}`,
                  transition: isSpinning ? 'transform 5s cubic-bezier(0.23, 1, 0.32, 1)' : 'transform 0.3s ease',
                  background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                  boxShadow: isSpinning 
                    ? '0 0 80px rgba(59, 130, 246, 0.8), inset 0 0 50px rgba(255, 255, 255, 0.2)' 
                    : '0 30px 60px rgba(0,0,0,0.4), inset 0 4px 20px rgba(255, 255, 255, 0.2)',
                }}
                onClick={spin}
              >
                {/* Segmentos da roda */}
                {items.map((item, index) => {
                  const angle = index * segmentSize;
                  const nextAngle = (index + 1) * segmentSize;
                  
                  return (
                    <div
                      key={item.id}
                      className="absolute w-full h-full"
                      style={{
                        clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((angle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((nextAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((nextAngle - 90) * Math.PI / 180)}%)`,
                        background: `linear-gradient(135deg, ${item.color}, ${item.color}dd, ${item.color}bb)`,
                      }}
                    >
                      {/* Texto do segmento */}
                      <div
                        className="absolute text-white font-bold drop-shadow-lg"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `translate(-50%, -50%) rotate(${angle + segmentSize / 2}deg) translateY(-${wheelSize * 0.32}px)`,
                          transformOrigin: 'center',
                          textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.6)',
                          fontSize: `${Math.max(18, wheelSize / 20)}px`,
                          fontWeight: '800',
                          letterSpacing: '1px',
                        }}
                      >
                        {item.label}
                      </div>
                    </div>
                  );
                })}
                
                {/* Centro da roda com botão */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <button
                    onClick={spin}
                    disabled={isSpinning}
                    className={`rounded-full border-6 border-white shadow-lg transition-all duration-300 font-bold text-white relative overflow-hidden ${
                      isSpinning
                        ? 'bg-gray-500 cursor-not-allowed scale-95'
                        : 'bg-gradient-to-br from-blue-500 via-purple-500 to-blue-700 hover:from-blue-600 hover:via-purple-600 hover:to-blue-800 active:scale-95 hover:shadow-xl hover:scale-110'
                    }`}
                    style={{
                      width: `${wheelSize * 0.2}px`,
                      height: `${wheelSize * 0.2}px`,
                      fontSize: `${wheelSize * 0.03}px`,
                      boxShadow: isSpinning 
                        ? '0 12px 30px rgba(0,0,0,0.4), inset 0 4px 8px rgba(255,255,255,0.3), 0 0 50px rgba(59, 130, 246, 0.6)' 
                        : '0 12px 30px rgba(0,0,0,0.4), inset 0 4px 8px rgba(255,255,255,0.3)',
                    }}
                  >
                    {isSpinning ? (
                      <div className="animate-spin relative z-10">
                        <svg className="mx-auto" width={wheelSize * 0.1} height={wheelSize * 0.1} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                    ) : (
                      <span className="relative z-10 tracking-wider">GIRAR</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resultado */}
        {showResult && lastResult && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl border-4 border-white">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">🎉 RESULTADO 🎉</div>
                <div className="text-4xl font-black">{lastResult.label}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Instruções de Teclado (rodapé) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 text-white text-center opacity-70">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">ESPAÇO</kbd>
            <span>Girar</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">ENTER</kbd>
            <span>Girar</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">ESC</kbd>
            <span>Sair</span>
          </div>
        </div>
      </div>
    </div>
  );
};