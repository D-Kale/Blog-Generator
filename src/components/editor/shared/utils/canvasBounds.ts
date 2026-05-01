/**
 * Utilidades para manejo de límites del canvas (Bounds Checking)
 * Previene que los bloques se salgan del área visible
 */

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CanvasBounds {
  width: number;
  height: number;
}

/**
 * Valida y ajusta las coordenadas para que el bloque no se salga del canvas
 * @param block - Posición y tamaño actual del bloque
 * @param bounds - Límites del canvas (ancho y alto máximo)
 * @returns Coordenadas ajustadas dentro de los límites
 */
export const validateBounds = (
  block: { x: number; y: number; width?: number; height?: number },
  bounds: CanvasBounds
): { x: number; y: number } => {
  const blockWidth = block.width || 0;
  const blockHeight = block.height || 0;

  // Calcular límites máximos
  const maxX = bounds.width - blockWidth;
  const maxY = bounds.height - blockHeight;

  // Ajustar X
  let newX = block.x;
  if (block.x < 0) {
    newX = 0;
  } else if (block.x > maxX) {
    newX = Math.max(0, maxX);
  }

  // Ajustar Y
  let newY = block.y;
  if (block.y < 0) {
    newY = 0;
  } else if (block.y > maxY) {
    newY = Math.max(0, maxY);
  }

  return { x: newX, y: newY };
};

/**
 * Verifica si un punto está dentro de los límites del canvas
 */
export const isPointInBounds = (
  x: number,
  y: number,
  bounds: CanvasBounds
): boolean => {
  return x >= 0 && x <= bounds.width && y >= 0 && y <= bounds.height;
};

/**
 * Calcula la "fuerza" de atracción hacia los bordes (snap to edges)
 * Retorna la distancia al borde más cercano
 */
export const getSnapToEdge = (
  x: number,
  y: number,
  width: number,
  height: number,
  bounds: CanvasBounds,
  threshold: number = 10
): { x: number; y: number; snapped: boolean } => {
  const snapThreshold = threshold;
  let newX = x;
  let newY = y;
  let snapped = false;

  // Borde izquierdo
  if (x > 0 && x < snapThreshold) {
    newX = 0;
    snapped = true;
  }

  // Borde derecho
  const rightEdge = x + width;
  if (rightEdge < bounds.width + snapThreshold && rightEdge > bounds.width - snapThreshold) {
    newX = bounds.width - width;
    snapped = true;
  }

  // Borde superior
  if (y > 0 && y < snapThreshold) {
    newY = 0;
    snapped = true;
  }

  // Borde inferior
  const bottomEdge = y + height;
  if (bottomEdge < bounds.height + snapThreshold && bottomEdge > bounds.height - snapThreshold) {
    newY = bounds.height - height;
    snapped = true;
  }

  return { x: newX, y: newY, snapped };
};
