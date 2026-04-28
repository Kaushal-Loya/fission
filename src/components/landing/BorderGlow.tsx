import React, { useRef, useState } from 'react';

interface BorderGlowProps {
  children: React.ReactNode;
  glowColor?: string; // Expects "r, g, b"
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  animated?: boolean;
  colors?: string[];
  className?: string;
}

const BorderGlow: React.FC<BorderGlowProps> = ({
  children,
  glowColor = "34, 197, 94",
  backgroundColor = "#0B0F14",
  borderRadius = 12,
  glowRadius = 350, // Increased radius
  glowIntensity = 1,
  animated = false,
  colors = ['#22c55e', '#16a34a', '#4ade80'],
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setMousePos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setOpacity(glowIntensity);
  };

  const handleMouseEnter = () => setOpacity(glowIntensity);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative p-[2px] group overflow-hidden ${className}`}
      style={{ 
        borderRadius: `${borderRadius}px`,
        backgroundColor: "rgba(255,255,255,0.08)", // More visible base border
      }}
    >
      {/* 1. Animated Conic Gradient (Behind everything) */}
      {animated && (
        <div 
          className="absolute inset-[-200%] z-0 opacity-40"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, ${colors.join(', ')})`,
            animation: 'spin 4s linear infinite',
          }}
        />
      )}

      {/* 2. Primary Border Glow (Behind content, visible in the p-[2px] gap) */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 ease-out"
        style={{
          opacity,
          background: `radial-gradient(${glowRadius}px circle at ${position.x}px ${position.y}px, rgba(${glowColor}, 1), transparent 70%)`,
        }}
      />

      {/* 3. Content Mask (Slightly transparent to let some glow through) */}
      <div 
        className="relative z-10 w-full h-full"
        style={{ 
          borderRadius: `${borderRadius - 1.5}px`,
          backgroundColor: backgroundColor,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02), transparent)` 
        }}
      >
        {children}
        
        {/* 4. Subtle Inner Glow (On top of content) */}
        <div 
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-500 ease-out"
          style={{
            opacity: opacity * 0.15, // Very subtle on top
            background: `radial-gradient(${glowRadius}px circle at ${position.x}px ${position.y}px, rgba(${glowColor}, 0.4), transparent 80%)`,
          }}
        />
      </div>
    </div>
  );
};

export default BorderGlow;
