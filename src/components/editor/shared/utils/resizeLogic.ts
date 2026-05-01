/**
 * Lógica de redimensionamiento omnidireccional (estilo Figma/Canva)
 * - Sin inercia - movimiento directo
 * - Handlers que siguen al mouse
 * - Resize intuitivo: hacia adentro = achica, hacia afuera = agranda
 */

export interface ResizeState {
  isResizing: boolean;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
  startBlockX: number;
  startBlockY: number;
  direction: ResizeDirection;
}

export type ResizeDirection = 
  | 'n'  // Norte (arriba)
  | 'ne' // Noreste
  | 'e'  // Este (derecha)
  | 'se' // Sureste
  | 's'  // Sur (abajo)
  | 'sw' // Suroeste
  | 'w'  // Oeste (izquierda)
  | 'nw'; // Noroeste

export interface ResizeResult {
  width: number;
  height: number;
  x: number;
  y: number;
}

/**
 * Calcula el nuevo tamaño y posición basado en el movimiento del mouse
 * @param currentState - Estado inicial del resize
 * @param currentX - Posición X actual del mouse
 * @param currentY - Posición Y actual del mouse
 * @param minWidth - Ancho mínimo permitido (20px - estilo Canva)
 * @param minHeight - Alto mínimo permitido (20px - estilo Canva)
 * @param maintainAspectRatio - Si true, mantiene proporción (imágenes)
 */
export const calculateResize = (
  currentState: ResizeState,
  currentX: number,
  currentY: number,
  minWidth: number = 20,
  minHeight: number = 20,
  maintainAspectRatio: boolean = false
): ResizeResult => {
  const { 
    startX, 
    startY, 
    startWidth, 
    startHeight, 
    startBlockX, 
    startBlockY,
    direction 
  } = currentState;

  const deltaX = currentX - startX;
  const deltaY = currentY - startY;

  let newWidth = startWidth;
  let newHeight = startHeight;
  let newX = startBlockX;
  let newY = startBlockY;

  // Resize horizontal
  if (direction.includes('e')) {
    // Lado derecho - agranda/achica desde la derecha
    newWidth = Math.max(minWidth, startWidth + deltaX);
  } else if (direction.includes('w')) {
    // Lado izquierdo - el borde derecho se mantiene fijo
    newWidth = Math.max(minWidth, startWidth - deltaX);
    newX = startBlockX + (startWidth - newWidth);
  }

  // Resize vertical
  if (direction.includes('s')) {
    // Lado inferior - agranda/achica desde abajo
    newHeight = Math.max(minHeight, startHeight + deltaY);
    // Actualizar Y solo si es dirección sur (esquina inferior)
    if (direction.includes('e') || direction.includes('w')) {
      // Esquinas inferiores mantienen Y fijo
    }
  } else if (direction.includes('n')) {
    // Lado superior - el borde inferior se mantiene fijo
    newHeight = Math.max(minHeight, startHeight - deltaY);
    newY = startBlockY + (startHeight - newHeight);
  }

  // Mantener aspect ratio si es necesario (imágenes)
  if (maintainAspectRatio && startWidth > 0 && startHeight > 0) {
    const aspectRatio = startWidth / startHeight;
    
    if (direction.includes('e') || direction.includes('w')) {
      newHeight = newWidth / aspectRatio;
    } else if (direction.includes('s') || direction.includes('n')) {
      newWidth = newHeight * aspectRatio;
    }
  }

  return {
    width: newWidth,
    height: newHeight,
    x: newX,
    y: newY
  };
};

/**
 * Obtiene el cursor CSS apropiado para cada dirección
 */
export const getCursorForDirection = (direction: ResizeDirection): string => {
  const cursorMap: Record<ResizeDirection, string> = {
    'n': 'n-resize',
    'ne': 'ne-resize',
    'e': 'e-resize',
    'se': 'se-resize',
    's': 's-resize',
    'sw': 'sw-resize',
    'w': 'w-resize',
    'nw': 'nw-resize'
  };
  return cursorMap[direction];
};

/**
 * Determina la dirección del resize basado en la posición del handle
 */
export const getResizeDirectionFromHandle = (handlePosition: string): ResizeDirection => {
  const map: Record<string, ResizeDirection> = {
    'top': 'n',
    'top-right': 'ne',
    'right': 'e',
    'bottom-right': 'se',
    'bottom': 's',
    'bottom-left': 'sw',
    'left': 'w',
    'top-left': 'nw'
  };
  return map[handlePosition] || 'e';
};
