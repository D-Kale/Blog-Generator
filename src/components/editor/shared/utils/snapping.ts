/**
 * Sistema de guías de alineación (Snapping)
 * Similar a Canva/Figma - los bloques se alinean automáticamente cerca de bordes
 */

export interface SnapGuide {
  type: 'left' | 'right' | 'top' | 'bottom' | 'center-x' | 'center-y';
  position: number;
  distance: number;
}

export interface SnapResult {
  x: number;
  y: number;
  snapped: boolean;
  guides: SnapGuide[];
}

/**
 * Umbral de snapping en px (cuán cerca debe estar para activar snap)
 */
const SNAP_THRESHOLD = 5;

/**
 * Busca guías de alineación en otros bloques
 */
export const findSnapGuides = (
  blockX: number,
  blockY: number,
  width: number,
  height: number,
  otherBlocks: Array<{ x: number; y: number; width?: number; height?: number }>,
  canvasBounds: { width: number; height: number }
): SnapGuide[] => {
  const guides: SnapGuide[] = [];
  const blockRight = blockX + width;
  const blockBottom = blockY + height;
  const blockCenterX = blockX + width / 2;
  const blockCenterY = blockY + height / 2;

  // Bordes del canvas
  guides.push({ type: 'left', position: 0, distance: Math.abs(blockX) });
  guides.push({ type: 'right', position: canvasBounds.width, distance: Math.abs(blockRight - canvasBounds.width) });
  guides.push({ type: 'top', position: 0, distance: Math.abs(blockY) });
  guides.push({ type: 'bottom', position: canvasBounds.height, distance: Math.abs(blockBottom - canvasBounds.height) });

  // Bordes de otros bloques
  otherBlocks.forEach(other => {
    const otherRight = other.x + (other.width || 0);
    const otherBottom = other.y + (other.height || 0);
    const otherCenterX = other.x + (other.width || 0) / 2;
    const otherCenterY = other.y + (other.height || 0) / 2;

    // Izquierda
    guides.push({ type: 'left', position: other.x, distance: Math.abs(blockX - other.x) });
    // Derecha
    guides.push({ type: 'right', position: otherRight, distance: Math.abs(blockRight - otherRight) });
    // Arriba
    guides.push({ type: 'top', position: other.y, distance: Math.abs(blockY - other.y) });
    // Abajo
    guides.push({ type: 'bottom', position: otherBottom, distance: Math.abs(blockBottom - otherBottom) });
    // Centro X
    guides.push({ type: 'center-x', position: otherCenterX, distance: Math.abs(blockCenterX - otherCenterX) });
    // Centro Y
    guides.push({ type: 'center-y', position: otherCenterY, distance: Math.abs(blockCenterY - otherCenterY) });
  });

  return guides;
};

/**
 * Aplica snapping a la posición del bloque
 * Retorna la posición ajustada y las guías activas
 */
export const applySnapping = (
  x: number,
  y: number,
  width: number,
  height: number,
  otherBlocks: Array<{ x: number; y: number; width?: number; height?: number }>,
  canvasBounds: { width: number; height: number }
): SnapResult => {
  const guides = findSnapGuides(x, y, width, height, otherBlocks, canvasBounds);
  const activeGuides: SnapGuide[] = [];
  let newX = x;
  let newY = y;

  // Filtrar guías activas (dentro del threshold)
  const activeGuidesAll = guides.filter(guide => guide.distance <= SNAP_THRESHOLD);

  // Ordenar por distancia (más cercano primero)
  activeGuidesAll.sort((a, b) => a.distance - b.distance);

  // Aplicar snapping horizontal
  const horizontalGuides = activeGuidesAll.filter(g => 
    g.type === 'left' || g.type === 'right' || g.type === 'center-x'
  );

  if (horizontalGuides.length > 0) {
    const bestGuide = horizontalGuides[0];
    if (bestGuide.type === 'left') {
      newX = bestGuide.position;
    } else if (bestGuide.type === 'right') {
      newX = bestGuide.position - width;
    } else if (bestGuide.type === 'center-x') {
      newX = bestGuide.position - width / 2;
    }
    activeGuides.push(bestGuide);
  }

  // Aplicar snapping vertical
  const verticalGuides = activeGuidesAll.filter(g => 
    g.type === 'top' || g.type === 'bottom' || g.type === 'center-y'
  );

  if (verticalGuides.length > 0) {
    const bestGuide = verticalGuides[0];
    if (bestGuide.type === 'top') {
      newY = bestGuide.position;
    } else if (bestGuide.type === 'bottom') {
      newY = bestGuide.position - height;
    } else if (bestGuide.type === 'center-y') {
      newY = bestGuide.position - height / 2;
    }
    activeGuides.push(bestGuide);
  }

  return {
    x: newX,
    y: newY,
    snapped: activeGuides.length > 0,
    guides: activeGuides
  };
};
