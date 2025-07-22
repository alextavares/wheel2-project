'use client';

import { useState, useRef, useEffect } from 'react';

interface WheelItem {
  id: string;
  label: string;
  color: string;
}

interface GeminiWheelProps {
  items: WheelItem[];
  size?: number;
  onSpin?: (result: WheelItem) => void;
}

export default function GeminiWheel({ items, size = 400, onSpin }: GeminiWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentAngle, setCurrentAngle] = useState(0);

  const segments = items.length > 0 ? items : [
    { id: '1', color: '#FFC107', label: 'Prize 1' },
    { id: '2', color: '#FF9800', label: 'Prize 2' },
    { id: '3', color: '#FF5722', label: 'Prize 3' },
    { id: '4', color: '#F44336', label: 'Prize 4' },
    { id: '5', color: '#E91E63', label: 'Prize 5' },
    { id: '6', color: '#9C27B0', label: 'Prize 6' },
  ];

  const numSegments = segments.length;
  const anglePerSegment = (2 * Math.PI) / numSegments;
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2 - 10;

  const drawWheel = (angle: number = currentAngle) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;

    for (let i = 0; i < numSegments; i++) {
      const segmentAngle = angle + i * anglePerSegment;
      ctx.fillStyle = segments[i].color;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, segmentAngle, segmentAngle + anglePerSegment);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.fillStyle = 'white';
      ctx.translate(centerX, centerY);
      ctx.rotate(segmentAngle + anglePerSegment / 2);
      ctx.textAlign = 'right';
      ctx.font = 'bold 16px sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 2;
      ctx.fillText(segments[i].label, radius - 20, 5);
      ctx.restore();
    }

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 4;
    ctx.stroke();
  };

  const easeOut = (t: number, b: number, c: number, d: number) => {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  };

  const spin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    
    const spinAngleStart = Math.random() * 10 + 10;
    const spinTimeTotal = Math.random() * 3000 + 4000;
    let spinTime = 0;
    let angle = currentAngle;

    const rotateWheel = () => {
      spinTime += 30;
      
      if (spinTime >= spinTimeTotal) {
        // Calculate winner
        const degrees = angle * 180 / Math.PI + 90;
        const arcd = anglePerSegment * 180 / Math.PI;
        const index = Math.floor((360 - degrees % 360) / arcd) % numSegments;
        
        setIsSpinning(false);
        onSpin?.(segments[index]);
        return;
      }

      const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
      angle += (spinAngle * Math.PI) / 180;
      
      drawWheel(angle);
      requestAnimationFrame(rotateWheel);
    };

    rotateWheel();
    setCurrentAngle(angle);
  };

  useEffect(() => {
    drawWheel();
  }, [segments]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[30px] border-l-transparent border-r-transparent border-b-red-600" />
        </div>
        
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="rounded-full shadow-2xl cursor-pointer"
          onClick={spin}
        />
        
        {/* Center button */}
        <button
          onClick={spin}
          disabled={isSpinning}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-20 h-20 rounded-full border-4 border-white shadow-lg transition-all duration-200 font-bold text-white text-sm ${
            isSpinning
              ? 'bg-gray-500 cursor-not-allowed scale-95'
              : 'bg-gradient-to-br from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 active:scale-95 hover:shadow-xl'
          }`}
        >
          {isSpinning ? 'SPINNING...' : 'SPIN'}
        </button>
      </div>
    </div>
  );
}