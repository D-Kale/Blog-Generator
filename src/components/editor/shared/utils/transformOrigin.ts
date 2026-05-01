/**
 * Manejo de Transform Origin (punto de pivote para rotación y escala)
 * Similar a Canva - rota sobre el centro por defecto, o sobre el punto que se arrastra
 */

export type TransformOrigin = 
  | 'center'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left';

/**
 * Convierte una posición de handle a transform-origin
 */
export const handlePositionToTransformOrigin = (
  handlePosition: string,
  isCorner: boolean
): TransformOrigin => {
  if (!isCorner) {
    // Handles cardinales
    switch (handlePosition) {
      case 'top': return 'top';
      case 'right': return 'right';
      case 'bottom': return 'bottom';
      case 'left': return 'left';
      default: return 'center';
    }
  } else {
    // Esquinas - retorna el mismo valor
    return handlePosition as TransformOrigin;
  }
};

/**
 * Obtiene el transform-origin como string CSS
 */
export const getTransformOriginCSS = (origin: TransformOrigin): string => {
  const originMap: Record<TransformOrigin, string> = {
    'center': 'center center',
    'top-left': '0% 0%',
    'top-right': '100% 0%',
    'bottom-left': '0% 100%',
    'bottom-right': '100% 100%',
    'top': 'center 0%',
    'right': '100% center',
    'bottom': 'center 100%',
    'left': '0% center'
  };

  return originMap[origin] || originMap.center;
};

/**
 * Determina el transform-origin basado en la dirección del resize
 * Si se está redimensionando desde una esquina, rota sobre esa esquina
 * Si se está redimensionando desde un lado, rota sobre ese lado
 */
export const getDynamicTransformOrigin = (
  resizeDirection: string | null,
  isResizing: boolean
): string => {
  if (!isResizing || !resizeDirection) {
    return 'center center';
  }

  const direction = resizeDirection.toLowerCase();
  
  // Mapeo de direcciones a transform-origin
  if (direction.includes('top') && direction.includes('left')) return '0% 0%';
  if (direction.includes('top') && direction.includes('right')) return '100% 0%';
  if (direction.includes('bottom') && direction.includes('left')) return '0% 100%';
  if (direction.includes('bottom') && direction.includes('right')) return '100% 100%';
  
  if (direction === 'top' || direction === 'n') return 'center 0%';
  if (direction === 'right' || direction === 'e') return '100% center';
  if (direction === 'bottom' || direction === 's') return 'center 100%';
  if (direction === 'left' || direction === 'w') return '0% center';

  return 'center center';
};
