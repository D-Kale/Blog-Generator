/**
 * Hook personalizado para manejar el redimensionamiento de bloques
 * Separa la lógica de resize del componente CanvasBlock
 */

import { useRef, useCallback, useEffect } from 'react';
import type { ResizeState } from './resizeLogic';
import { calculateResize } from './resizeLogic';
import { validateBounds } from './canvasBounds';
import { applySnapping } from './snapping';

interface UseBlockResizeOptions {
  isImage: boolean;
  canvasBounds?: { width: number; height: number };
  applySnapping?: boolean;
}

interface UseBlockResizeReturn {
  isResizing: boolean;
  startResize: (e: React.MouseEvent, direction: string, width: number, height: number, x: number, y: number) => void;
}

/**
 * Hook para manejar resize de bloques
 * - Separa la lógica del componente visual
 * - Maneja eventos globales de mouse
 * - Valida bounds automáticamente
 * - Soporta keyboard shortcuts (Shift para aspect ratio)
 */
export const useBlockResize = (
  onUpdate: (updates: { width: number; height: number; x: number; y: number; dimensions: { width: number; height: number } }) => void,
  options: UseBlockResizeOptions
): UseBlockResizeReturn => {
  const resizeStateRef = useRef<ResizeState | null>(null);
  const { isImage, canvasBounds = { width: 1200, height: 800 }, applySnapping: enableSnapping = false } = options;

  // Iniciar resize
  const startResize = useCallback((
    e: React.MouseEvent,
    direction: string,
    width: number,
    height: number,
    x: number,
    y: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    resizeStateRef.current = {
      isResizing: true,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: width,
      startHeight: height,
      startBlockX: x,
      startBlockY: y,
      direction: direction as any
    };

    // Prevenir selección de texto
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'default';
  }, [onUpdate, isImage]);



  // Efecto para eventos globales de resize
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizeStateRef.current || !resizeStateRef.current.isResizing) return;

      // Verificar keyboard shortcuts
      const maintainRatio = e.shiftKey || isImage;

      const result = calculateResize(
        resizeStateRef.current,
        e.clientX,
        e.clientY,
        20, // minWidth
        20, // minHeight
        maintainRatio
      );

      // Aplicar snapping si está habilitado
      let finalX = result.x;
      let finalY = result.y;

      if (enableSnapping) {
        const snapResult = applySnapping(
          result.x,
          result.y,
          result.width,
          result.height,
          [], // otherBlocks
          canvasBounds
        );
        finalX = snapResult.x;
        finalY = snapResult.y;
      } else {
        // Validar bounds normalmente
        const validatedPosition = validateBounds(
          {
            x: result.x,
            y: result.y,
            width: result.width,
            height: result.height
          },
          canvasBounds
        );
        finalX = validatedPosition.x;
        finalY = validatedPosition.y;
      }

      onUpdate({
        width: result.width,
        height: result.height,
        dimensions: {
          width: result.width,
          height: result.height
        },
        x: finalX,
        y: finalY
      });
    };

    const handleMouseUp = () => {
      if (resizeStateRef.current?.isResizing) {
        resizeStateRef.current = null;
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isImage, onUpdate, canvasBounds, enableSnapping]);

  return {
    isResizing: resizeStateRef.current?.isResizing || false,
    startResize
  };
};
