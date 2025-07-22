'use client';

import { useState, useRef } from 'react';

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

export default function Grok4Wheel({ items, size = 350, onSpin }: WheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spin = () => {
    if (isSpinning || items.length === 0) return;

    setIsSpinning(true);
    
    // Rotação aleatória entre 1080° e 1800° (3-5 voltas)
    const randomRotation = Math.floor(Math.random() * 720) + 1080;
    const finalRotation = rotation + randomRotation;
    
    setRotation(finalRotation);

    // Calcular resultado após animação
    setTimeout(() => {
      const normalizedRotation = finalRotation % 360;
      const segmentSize = 360 / items.length;
      const resultIndex = Math.floor((360 - normalizedRotation) / segmentSize) % items.length;
      
      setIsSpinning(false);
      onSpin?.(items[resultIndex]);
    }, 3500);
  };

  const segmentSize = 360 / items.length;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Ponteiro Principal */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20">
          <div className="relative">
            {/* Sombra do ponteiro */}
            <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[40px] border-l-transparent border-r-transparent border-b-black/20 absolute top-1 left-0" />
            {/* Ponteiro principal */}
            <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[40px] border-l-transparent border-r-transparent border-b-red-600" />
            {/* Highlight do ponteiro */}
            <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[24px] border-l-transparent border-r-transparent border-b-red-400 absolute top-2 left-2" />
          </div>
        </div>
        
        {/* Roda Principal */}
        <div
          ref={wheelRef}
          className="relative w-full h-full rounded-full border-8 border-gray-900 shadow-2xl cursor-pointer overflow-hidden"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 3.5s cubic-bezier(0.23, 1, 0.32, 1)' : 'none',
            background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
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
                  background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
                }}
              >
                {/* Borda interna do segmento */}
                <div
                  className="absolute w-full h-full border-r border-white/30"
                  style={{
                    clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((angle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((nextAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((nextAngle - 90) * Math.PI / 180)}%)`,
                  }}
                />
                
                {/* Texto do segmento */}
                <div
                  className="absolute text-white font-bold text-sm drop-shadow-lg"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${angle + segmentSize / 2}deg) translateY(-${size * 0.28}px)`,
                    transformOrigin: 'center',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
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
              className={`w-20 h-20 rounded-full border-4 border-white shadow-lg transition-all duration-200 font-bold text-white text-xs ${
                isSpinning
                  ? 'bg-gray-500 cursor-not-allowed scale-95'
                  : 'bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 active:scale-95 hover:shadow-xl'
              }`}
              style={{
                boxShadow: '0 8px 20px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)',
              }}
            >
              {isSpinning ? (
                <div className="animate-spin">
                  <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
              ) : (
                'SPIN'
              )}
            </button>
          </div>
        </div>
        
        {/* Sombra externa da roda */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent to-black/20 pointer-events-none" />
      </div>
    </div>
  );
}