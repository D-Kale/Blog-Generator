/**
 * Hooks y utilidades para keyboard shortcuts (estilo Canva)
 */

import { useEffect, useCallback, useRef } from 'react';

export interface KeyboardState {
  shiftPressed: boolean;
  altPressed: boolean;
  ctrlPressed: boolean;
}

/**
 * Hook para manejar keyboard shortcuts globales
 * Retorna el estado actual de las teclas presionadas
 */
export const useKeyboardShortcuts = () => {
  const keyboardState = useRef<KeyboardState>({
    shiftPressed: false,
    altPressed: false,
    ctrlPressed: false
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keyboardState.current.shiftPressed = e.shiftKey;
      keyboardState.current.altPressed = e.altKey;
      keyboardState.current.ctrlPressed = e.ctrlKey || e.metaKey;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keyboardState.current.shiftPressed = e.shiftKey;
      keyboardState.current.altPressed = e.altKey;
      keyboardState.current.ctrlPressed = e.ctrlKey || e.metaKey;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keyboardState;
};

/**
 * Hook para shortcuts específicos de bloque seleccionado
 */
export const useBlockShortcuts = (
  selectedBlockId: string | null,
  onDuplicate: () => void,
  onDelete: () => void,
  onMove?: (dx: number, dy: number) => void
) => {
  useEffect(() => {
    if (!selectedBlockId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevenir acciones si no hay bloque seleccionado
      if (!selectedBlockId) return;

      // Duplicar: Ctrl/Cmd + D
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        onDuplicate();
        return;
      }

      // Eliminar: Supr o Backspace
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        onDelete();
        return;
      }

      // Mover con flechas
      if (onMove) {
        const step = e.shiftKey ? 10 : 1; // Shift = movimiento grande

        switch (e.key) {
          case 'ArrowUp':
            e.preventDefault();
            onMove(0, -step);
            break;
          case 'ArrowDown':
            e.preventDefault();
            onMove(0, step);
            break;
          case 'ArrowLeft':
            e.preventDefault();
            onMove(-step, 0);
            break;
          case 'ArrowRight':
            e.preventDefault();
            onMove(step, 0);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedBlockId, onDuplicate, onDelete, onMove]);
};

/**
 * Verifica si se debe mantener el aspect ratio
 * (Shift presionado durante resize)
 */
export const shouldMaintainAspectRatio = (keyboardState: KeyboardState): boolean => {
  return keyboardState.shiftPressed;
};

/**
 * Verifica si se debe redimensionar desde el centro
 * (Alt presionado durante resize)
 */
export const shouldResizeFromCenter = (keyboardState: KeyboardState): boolean => {
  return keyboardState.altPressed;
};
