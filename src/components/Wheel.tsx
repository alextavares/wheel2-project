'use client';

import { useState, useRef, useEffect } from 'react';
import ConfettiEffect from './ConfettiEffect';
import { ShareSystem } from './ShareSystem';
import { AdvancedSettings } from './AdvancedSettings';

interface WheelItem {
  id: string;
  label: string;
  color: string;
  weight?: number;
}

interface WheelProps {
  items: WheelItem[];
  size?: number;
  onSpin?: (result: WheelItem) => void;
}

export default function Wheel({ items, size = 500, onSpin }: WheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [lastResult, setLastResult] = useState<WheelItem | null>(null);
  const [spinCount, setSpinCount] = useState(0);
  const [showShareSystem, setShowShareSystem] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [advancedSettings, setAdvancedSettings] = useState({
    animation: {
      duration: 4000,
      easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
      minRotations: 4,
      maxRotations: 6
    },
    sound: {
      enabled: true,
      volume: 0.5,
      spinSound: true,
      winSound: true
    },
    visual: {
      showShadows: true,
      showGradients: true,
      showBorders: true,
      showGlow: true
    },
    behavior: {
      vibration: true,
      autoStop: true,
      preventDoubleClick: true
    }
  });
  
  const wheelRef = useRef<HTMLDivElement>(null);

  // Criar sons usando Web Audio API
  useEffect(() => {
    // Som de giro usando Web Audio API
    const createSpinSound = () => {
      if (typeof window !== 'undefined' && 'AudioContext' in window) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        const playSpinSound = () => {
          if (!advancedSettings.sound.enabled || !advancedSettings.sound.spinSound) return;
          
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5);
          
          gainNode.gain.setValueAtTime(0.1 * advancedSettings.sound.volume, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.5);
        };

        return playSpinSound;
      }
      return () => {};
    };

    const spinSoundFunction = createSpinSound();
    (window as any).playSpinSound = spinSoundFunction;
  }, [advancedSettings.sound]);

  const spin = () => {
    if (isSpinning || items.length === 0) return;

    setIsSpinning(true);
    setShowConfetti(false);
    setSpinCount(prev => prev + 1);
    
    // Tocar som de giro
    if ((window as any).playSpinSound) {
      (window as any).playSpinSound();
    }

    // Adicionar efeito de vibração no mobile
    if (advancedSettings.behavior.vibration && 'vibrate' in navigator) {
      navigator.vibrate([50, 30, 50]);
    }
    
    // Rotação aleatória baseada nas configurações
    const minRotations = advancedSettings.animation.minRotations * 360;
    const maxRotations = advancedSettings.animation.maxRotations * 360;
    const randomRotation = Math.floor(Math.random() * (maxRotations - minRotations)) + minRotations;
    const finalRotation = rotation + randomRotation;
    
    setRotation(finalRotation);

    // Calcular resultado após animação
    setTimeout(() => {
      const normalizedRotation = finalRotation % 360;
      const segmentSize = 360 / items.length;
      const resultIndex = Math.floor((360 - normalizedRotation) / segmentSize) % items.length;
      const result = items[resultIndex];
      
      setIsSpinning(false);
      setLastResult(result);
      setShowConfetti(true);
      
      // Som de vitória
      if (advancedSettings.sound.enabled && advancedSettings.sound.winSound && typeof window !== 'undefined' && 'AudioContext' in window) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const playWinSound = () => {
          // Sequência de notas para som de vitória
          const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
          notes.forEach((freq, index) => {
            setTimeout(() => {
              const oscillator = audioContext.createOscillator();
              const gainNode = audioContext.createGain();
              
              oscillator.connect(gainNode);
              gainNode.connect(audioContext.destination);
              
              oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
              gainNode.gain.setValueAtTime(0.1 * advancedSettings.sound.volume, audioContext.currentTime);
              gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
              
              oscillator.start(audioContext.currentTime);
              oscillator.stop(audioContext.currentTime + 0.3);
            }, index * 150);
          });
        };
        playWinSound();
      }

      // Vibração de vitória
      if (advancedSettings.behavior.vibration && 'vibrate' in navigator) {
        navigator.vibrate([100, 50, 100, 50, 200]);
      }
      
      onSpin?.(result);
    }, advancedSettings.animation.duration);
  };

  const segmentSize = 360 / items.length;

  return (
    <>
      <ConfettiEffect 
        isActive={showConfetti} 
        duration={5000} 
        intensity={200} 
        style="celebration"
        winnerText={lastResult?.label || ""}
      />
      
      <div className="flex flex-col items-center gap-6">
        {/* Contador de giros e resultado */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-bold shadow-lg">
              Giros: {spinCount}
            </div>
            {lastResult && lastResult.label && (
              <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-bold shadow-lg animate-pulse">
                Último: {lastResult.label}
              </div>
            )}
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setShowShareSystem(true)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            Compartilhar
          </button>
          
          <button
            onClick={() => setShowAdvancedSettings(true)}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Configurações
          </button>
        </div>

        <div className="relative" style={{ width: size, height: size }}>
          {/* Anel externo decorativo */}
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-2 ${advancedSettings.visual.showShadows ? 'shadow-2xl' : ''}`}>
            <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-gray-900 p-1">
              
              {/* Ponteiro Principal */}
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 z-20">
                <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[40px] border-l-transparent border-r-transparent border-t-red-600 shadow-lg" />
              </div>
              
              {/* Roda Principal com efeitos avançados */}
              <div
                ref={wheelRef}
                className={`relative w-full h-full rounded-full ${advancedSettings.visual.showBorders ? 'border-4 border-gray-700' : ''} cursor-pointer overflow-hidden transition-all duration-300 ${
                  isSpinning ? 'scale-105' : 'hover:scale-102'
                }`}
                style={{
                  transform: `rotate(${rotation}deg) ${isSpinning ? 'scale(1.02)' : ''}`,
                  transition: isSpinning ? `transform ${advancedSettings.animation.duration}ms ${advancedSettings.animation.easing}` : 'transform 0.3s ease',
                  background: advancedSettings.visual.showGradients ? 'linear-gradient(145deg, #ffffff, #f8f9fa)' : '#ffffff',
                  boxShadow: advancedSettings.visual.showShadows ? (
                    isSpinning 
                      ? (advancedSettings.visual.showGlow ? '0 0 50px rgba(59, 130, 246, 0.5), inset 0 0 30px rgba(255, 255, 255, 0.1)' : '0 20px 40px rgba(0,0,0,0.3)')
                      : '0 20px 40px rgba(0,0,0,0.3), inset 0 2px 10px rgba(255, 255, 255, 0.1)'
                  ) : 'none',
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
                        background: advancedSettings.visual.showGradients 
                          ? `linear-gradient(135deg, ${item.color}, ${item.color}dd, ${item.color}bb)`
                          : item.color,
                      }}
                    >
                      {/* Texto do segmento */}
                      {(() => {
                        // Calcular posição usando coordenadas polares - 75% DO RAIO
                        const textAngle = angle + segmentSize / 2;
                        const textRadius = size * 0.75; // 75% do raio da roda (próximo à periferia)
                        const textX = parseFloat((50 + (textRadius / size) * 50 * Math.cos((textAngle - 90) * Math.PI / 180)).toFixed(2));
                        const textY = parseFloat((50 + (textRadius / size) * 50 * Math.sin((textAngle - 90) * Math.PI / 180)).toFixed(2));
                        
                        return (
                          <div
                            className="absolute text-white font-bold text-center pointer-events-none"
                            style={{
                              left: `${textX}%`,
                              top: `${textY}%`,
                              transform: `translate(-50%, -50%) rotate(${textAngle}deg)`,
                              fontSize: `${Math.max(11, Math.min(16, size / 22))}px`,
                              textShadow: '3px 3px 6px rgba(0,0,0,0.9), 2px 2px 4px rgba(0,0,0,0.7), 0 0 8px rgba(0,0,0,0.6)',
                              maxWidth: `${parseFloat((size / 4).toFixed(2))}px`,
                              wordWrap: 'break-word',
                              zIndex: 22,
                              lineHeight: '1.1',
                              fontWeight: '800',
                              color: '#ffffff',
                              WebkitTextStroke: '1.2px rgba(0,0,0,0.8)',
                              textAlign: 'center',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {item.label}
                          </div>
                        );
                      })()}
                    </div>
                  );
                })}

                {/* Centro da roda */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-inner"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botão de giro */}
        <button
          onClick={spin}
          disabled={isSpinning || items.length === 0}
          className={`px-8 py-4 text-xl font-bold rounded-full transition-all duration-300 transform ${
            isSpinning || items.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
          } text-white`}
        >
          {isSpinning ? 'Girando...' : 'GIRAR!'}
        </button>

        {items.length === 0 && (
          <p className="text-gray-500 text-center">
            Adicione itens à roda para começar a girar!
          </p>
        )}
      </div>

      {/* Modais */}
      {showShareSystem && (
        <ShareSystem
          items={items}
          wheelTitle="Minha Roda"
          onClose={() => setShowShareSystem(false)}
        />
      )}

      {showAdvancedSettings && (
        <AdvancedSettings
          currentSettings={advancedSettings}
          onSave={(settings) => setAdvancedSettings(settings)}
          onClose={() => setShowAdvancedSettings(false)}
        />
      )}
    </>
  );
}