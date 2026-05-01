import React from 'react';
import { getCursorForDirection } from './resizeLogic';
import type { ResizeDirection } from './resizeLogic';

interface ResizeHandleProps {
  position: string;
  direction: ResizeDirection;
  isImage: boolean;
  onMouseDown: (e: React.MouseEvent, direction: ResizeDirection) => void;
}

/**
 * Componente de handle de redimensionamiento individual
 * - Diseño mejorado estilo Canva
 * - Sin inercia - movimiento directo
 * - Cursor dinámico según dirección
 * - Visible y accesible
 */
export const ResizeHandle: React.FC<ResizeHandleProps> = ({ 
  position, 
  direction, 
  isImage,
  onMouseDown 
}) => {
  const isCorner = position.includes('-');
  
  // Tamaño más grande para mejor accesibilidad
  const sizeClasses = isImage 
    ? "w-4 h-4 sm:w-5 sm:h-5" 
    : "w-3 h-3 sm:w-4 sm:h-4";
  
  // Forma redondeada para esquinas, cuadrada para lados
  const shapeClasses = isCorner
    ? "rounded-full"
    : "rounded-sm";

  // Color base con gradiente sutil
  const colorClasses = "bg-gradient-to-br from-blue-400 to-blue-600";
  
  // Borde blanco para contraste
  const borderClasses = "border-2 border-white shadow-md";
  
  // Efectos hover y focus
  const hoverClasses = "hover:scale-150 hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-700 hover:border-blue-300";
  const transitionClasses = "transition-all duration-150 ease-out";
  
  // Posicionamiento - centrado en el borde
  const positionClasses: Record<string, string> = {
    // Cardenales
    'top': 'left-1/2 -translate-x-1/2 -top-1.5',
    'right': 'top-1/2 -translate-y-1/2 -right-1.5',
    'bottom': 'left-1/2 -translate-x-1/2 -bottom-1.5',
    'left': 'top-1/2 -translate-y-1/2 -left-1.5',
    // Esquinas
    'top-right': '-right-1 -top-1',
    'bottom-right': '-right-1 -bottom-1',
    'bottom-left': '-left-1 -bottom-1',
    'top-left': '-left-1 -top-1'
  };

  const handlePosition = positionClasses[position];
  const cursor = getCursorForDirection(direction);

  if (!handlePosition) return null;

  return (
    <div
      className={`absolute ${sizeClasses} ${shapeClasses} ${colorClasses} ${borderClasses} ${hoverClasses} ${transitionClasses} pointer-events-auto z-50`}
      style={{ 
        cursor,
        ...positionClasses[position as keyof typeof positionClasses].split(' ').reduce((acc, cls) => {
          if (cls.includes('-right')) acc.right = cls.includes('-') ? undefined : '50%';
          if (cls.includes('-left')) acc.left = cls.includes('-') ? undefined : '50%';
          if (cls.includes('-top')) acc.top = cls.includes('-') ? undefined : '50%';
          if (cls.includes('-bottom')) acc.bottom = cls.includes('-') ? undefined : '50%';
          return acc;
        }, {} as React.CSSProperties)
      }}
      onMouseDown={(e) => onMouseDown(e, direction)}
      title={`Redimensionar ${position}`}
    >
      {/* Punto interior para mejor visibilidad */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1 h-1 bg-white/50 rounded-full" />
      </div>
    </div>
  );
};

/**
 * Lista de todas las posiciones posibles de handles
 */
export const HANDLE_POSITIONS = {
  TEXT: ['left', 'right'] as const,
  IMAGE_CORNERS: ['top-left', 'top-right', 'bottom-right', 'bottom-left'] as const,
  IMAGE_ALL: [
    'top', 'top-right', 'right', 'bottom-right', 
    'bottom', 'bottom-left', 'left', 'top-left'
  ] as const
} as const;
