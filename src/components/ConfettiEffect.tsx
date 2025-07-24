'use client';

import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  size: number;
  shape: 'circle' | 'square' | 'triangle' | 'star' | 'heart' | 'diamond';
  opacity: number;
  life: number;
  maxLife: number;
  bounce: number;
  trail: Array<{x: number, y: number, opacity: number}>;
}

interface ConfettiEffectProps {
  isActive: boolean;
  duration?: number;
  intensity?: number;
  style?: 'celebration' | 'fireworks' | 'cascade' | 'explosion' | 'rainbow';
  winnerText?: string;
}

export default function ConfettiEffect({ 
  isActive, 
  duration = 3000, 
  intensity = 100,
  style = 'celebration',
  winnerText
}: ConfettiEffectProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showWinnerText, setShowWinnerText] = useState(false);

  const colors = {
    celebration: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'],
    fireworks: ['#FF0000', '#FF4500', '#FFD700', '#ADFF2F', '#00CED1', '#FF1493', '#9370DB', '#FFA500'],
    cascade: ['#87CEEB', '#98FB98', '#F0E68C', '#DDA0DD', '#F5DEB3', '#FFB6C1', '#AFEEEE', '#D3D3D3'],
    explosion: ['#FF4500', '#FF6347', '#FF8C00', '#FFA500', '#FFD700', '#FFFF00', '#ADFF2F', '#32CD32'],
    rainbow: ['#FF0000', '#FF8000', '#FFFF00', '#80FF00', '#00FF00', '#00FF80', '#00FFFF', '#0080FF', '#0000FF', '#8000FF', '#FF00FF', '#FF0080']
  };

  const shapes: ('circle' | 'square' | 'triangle' | 'star' | 'heart' | 'diamond')[] = 
    ['circle', 'square', 'triangle', 'star', 'heart', 'diamond'];

  useEffect(() => {
    if (isActive && !isAnimating) {
      setIsAnimating(true);
      createConfetti();
      
      // Mostrar texto do vencedor após um pequeno delay
      if (winnerText) {
        setTimeout(() => setShowWinnerText(true), 500);
      }
      
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setShowWinnerText(false);
        setConfetti([]);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isActive, duration, winnerText]);

  const createConfetti = () => {
    const pieces: ConfettiPiece[] = [];
    const currentColors = colors[style];
    
    for (let i = 0; i < intensity; i++) {
      const piece = createConfettiPiece(i, currentColors);
      pieces.push(piece);
    }
    
    setConfetti(pieces);
    animateConfetti(pieces);
  };

  const createConfettiPiece = (id: number, colorPalette: string[]): ConfettiPiece => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    let x, y, vx, vy;
    
    switch (style) {
      case 'fireworks':
        // Explosão do centro
        x = centerX + (Math.random() - 0.5) * 100;
        y = centerY + (Math.random() - 0.5) * 100;
        vx = (Math.random() - 0.5) * 20;
        vy = (Math.random() - 0.5) * 20;
        break;
      case 'cascade':
        // Cascata do topo
        x = Math.random() * window.innerWidth;
        y = -50;
        vx = (Math.random() - 0.5) * 4;
        vy = Math.random() * 2 + 1;
        break;
      case 'explosion':
        // Explosão radial
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 15 + 5;
        x = centerX;
        y = centerY;
        vx = Math.cos(angle) * speed;
        vy = Math.sin(angle) * speed;
        break;
      default:
        // Celebration padrão
        x = Math.random() * window.innerWidth;
        y = -10;
        vx = (Math.random() - 0.5) * 10;
        vy = Math.random() * 3 + 2;
    }

    return {
      id,
      x,
      y,
      vx,
      vy,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 15,
      color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
      size: Math.random() * 12 + 6,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      opacity: 1,
      life: 0,
      maxLife: duration / 16,
      bounce: Math.random() * 0.8 + 0.2,
      trail: []
    };
  };

  const animateConfetti = (pieces: ConfettiPiece[]) => {
    const animate = () => {
      setConfetti(prevConfetti => 
        prevConfetti.map(piece => {
          // Atualizar trail
          const newTrail = [...piece.trail, { x: piece.x, y: piece.y, opacity: piece.opacity }];
          if (newTrail.length > 5) newTrail.shift();

          // Física avançada
          let newVx = piece.vx;
          let newVy = piece.vy + 0.15; // gravidade
          let newX = piece.x + newVx;
          let newY = piece.y + newVy;

          // Bounce nas bordas
          if (newX <= 0 || newX >= window.innerWidth) {
            newVx = -newVx * piece.bounce;
            newX = Math.max(0, Math.min(window.innerWidth, newX));
          }
          if (newY >= window.innerHeight) {
            newVy = -Math.abs(newVy) * piece.bounce;
            newY = window.innerHeight;
          }

          // Fade out baseado na vida
          const lifeRatio = piece.life / piece.maxLife;
          const newOpacity = Math.max(0, 1 - lifeRatio);

          return {
            ...piece,
            x: newX,
            y: newY,
            vx: newVx * 0.99, // resistência do ar
            vy: newVy,
            rotation: piece.rotation + piece.rotationSpeed,
            opacity: newOpacity,
            life: piece.life + 1,
            trail: newTrail.map((t, i) => ({
              ...t,
              opacity: t.opacity * (i / newTrail.length) * 0.5
            }))
          };
        }).filter(piece => piece.life < piece.maxLife && piece.opacity > 0.01)
      );
    };

    const interval = setInterval(animate, 16);
    setTimeout(() => clearInterval(interval), duration);
  };

  const renderShape = (piece: ConfettiPiece) => {
    const baseStyle = {
      position: 'absolute' as const,
      left: piece.x - piece.size / 2,
      top: piece.y - piece.size / 2,
      transform: `rotate(${piece.rotation}deg)`,
      pointerEvents: 'none' as const,
      opacity: piece.opacity,
    };

    const renderTrail = () => (
      piece.trail.map((trailPoint, index) => (
        <div
          key={`trail-${piece.id}-${index}`}
          style={{
            position: 'absolute',
            left: trailPoint.x - 2,
            top: trailPoint.y - 2,
            width: 4,
            height: 4,
            backgroundColor: piece.color,
            borderRadius: '50%',
            opacity: trailPoint.opacity,
            pointerEvents: 'none',
          }}
        />
      ))
    );

    const shapeElement = (() => {
      switch (piece.shape) {
        case 'circle':
          return (
            <div
              style={{
                ...baseStyle,
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
                borderRadius: '50%',
                boxShadow: `0 0 ${piece.size}px ${piece.color}40`,
              }}
            />
          );
        case 'square':
          return (
            <div
              style={{
                ...baseStyle,
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
                boxShadow: `0 0 ${piece.size}px ${piece.color}40`,
              }}
            />
          );
        case 'triangle':
          return (
            <div
              style={{
                ...baseStyle,
                width: 0,
                height: 0,
                backgroundColor: 'transparent',
                borderLeft: `${piece.size / 2}px solid transparent`,
                borderRight: `${piece.size / 2}px solid transparent`,
                borderBottom: `${piece.size}px solid ${piece.color}`,
                filter: `drop-shadow(0 0 ${piece.size / 2}px ${piece.color}40)`,
              }}
            />
          );
        case 'star':
          return (
            <div
              style={{
                ...baseStyle,
                width: piece.size,
                height: piece.size,
                color: piece.color,
                filter: `drop-shadow(0 0 ${piece.size / 2}px ${piece.color}40)`,
              }}
            >
              ⭐
            </div>
          );
        case 'heart':
          return (
            <div
              style={{
                ...baseStyle,
                width: piece.size,
                height: piece.size,
                color: piece.color,
                fontSize: piece.size,
                filter: `drop-shadow(0 0 ${piece.size / 2}px ${piece.color}40)`,
              }}
            >
              ❤️
            </div>
          );
        case 'diamond':
          return (
            <div
              style={{
                ...baseStyle,
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
                transform: `${baseStyle.transform} rotate(45deg)`,
                filter: `drop-shadow(0 0 ${piece.size / 2}px ${piece.color}40)`,
              }}
            />
          );
        default:
          return null;
      }
    })();

    return (
      <React.Fragment key={piece.id}>
        {renderTrail()}
        {shapeElement}
      </React.Fragment>
    );
  };

  if (!isAnimating) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Confetti */}
      {confetti.map(renderShape)}
      
      {/* Winner Text Animation */}
      {showWinnerText && winnerText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center animate-bounce">
            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 drop-shadow-2xl animate-pulse">
              🎉 {winnerText} 🎉
            </div>
            <div className="text-2xl font-bold text-white mt-4 drop-shadow-lg">
              PARABÉNS!
            </div>
          </div>
        </div>
      )}
      
      {/* Overlay Effect */}
      <div 
        className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/10 animate-pulse"
        style={{
          background: `radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)`
        }}
      />
    </div>
  );
}