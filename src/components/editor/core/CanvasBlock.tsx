import { motion } from 'framer-motion';
import { useRef, useEffect, useCallback, useState } from 'react';
import type { Block } from './CanvasEditor';
import { useBlockResize } from '../shared/utils';
import { ResizeHandle, HANDLE_POSITIONS } from '../shared/utils';

interface CanvasBlockProps {
  block: Block;
  isSelected: boolean;
  onSelect: () => void;
  onContentChange: (content: string) => void;
  onUpdate: (update: Partial<Block>) => void;
  onDelete?: () => void;
}

export const CanvasBlock = ({ block, isSelected, onSelect, onContentChange, onUpdate, onDelete }: CanvasBlockProps) => {
  const isImage = block.type === 'image';
  const isList = block.type === 'list';
  const contentRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  // Dimensiones actuales (usando solo el estado del padre)
  const width = block.dimensions?.width || block.width || 300;
  const height = block.dimensions?.height || block.height || 200;
  const aspectRatio = width > 0 && height > 0 ? width / height : 1;
  const canvasBounds = { width: 1200, height: 800 };

  // Hook de resize - SOLO para imágenes
  const { startResize, isResizing } = useBlockResize(
    (updates) => {
      onUpdate({
        ...updates,
        styles: block.styles,
        content: block.content
      });
    },
    { isImage, canvasBounds, applySnapping: false }
  );

  // Separar estilos de transformación de estilos visuales
  const separateStyles = (styles: string) => {
    const allClasses = styles.split(' ').filter(Boolean);
    const transformClasses = allClasses.filter(cls =>
      cls.startsWith('rotate') ||
      cls.startsWith('-rotate') ||
      cls.startsWith('scale') ||
      cls.startsWith('-scale')
    );
    const visualClasses = allClasses.filter(cls =>
      !cls.startsWith('rotate') &&
      !cls.startsWith('-rotate') &&
      !cls.startsWith('scale') &&
      !cls.startsWith('-scale')
    );
    return { transformClasses, visualClasses };
  };

  const { transformClasses, visualClasses } = separateStyles(block.styles);

  // Calcular la proporción de la imagen al cargarla
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (naturalHeight > 0 && naturalWidth > 0) {
      const newAspectRatio = naturalWidth / naturalHeight;
      if (Math.abs(newAspectRatio - aspectRatio) > 0.01) {
        onUpdate({
          dimensions: {
            width: width,
            height: width / newAspectRatio
          }
        });
      }
    }
  };

  // Manejar inicio de resize (solo para imágenes)
  const handleResizeStart = useCallback((e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    startResize(e, direction as any, width, height, block.x, block.y);
  }, [startResize, width, height, block.x, block.y]);

  // Renderizado de handles - SOLO para imágenes
  const renderResizeHandles = () => {
    if (!isSelected || !isImage) return null;

    const positions = HANDLE_POSITIONS.IMAGE_ALL;

    return (
      <>
        {positions.map((position) => (
          <ResizeHandle
            key={position}
            position={position}
            direction={position as any}
            isImage={true}
            onMouseDown={handleResizeStart}
          />
        ))}
      </>
    );
  };

  const currentHeight = isImage ? width / aspectRatio : 'auto';

  // Manejar foco en el contenido editable (solo texto y listas)
  const handleFocus = () => {
    if (!isImage) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    if (!isImage) {
      setIsEditing(false);
      // Guardar contenido al perder el foco
      if (contentRef.current) {
        const currentContent = contentRef.current.innerHTML;
        if (currentContent !== block.content) {
          onContentChange(currentContent);
        }
      }
    }
  };

  // Manejar input - ACTUALIZA SOLO EL PADRE, NO EL ESTADO LOCAL
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (!isImage) {
      const newContent = e.currentTarget.innerHTML;
      // Solo actualizar si cambió
      if (newContent !== block.content) {
        onContentChange(newContent);
      }
      // Verificar si está vacío
      const text = e.currentTarget.innerText.trim();
      setIsEmpty(text === '');
    }
  };

  // Manejar tecla Supr/Del en texto/listas - SOLO elimina si está vacío
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isImage && (e.key === 'Delete' || e.key === 'Backspace')) {
      // Obtener el contenido actual
      const currentText = (e.target as HTMLDivElement).innerText.trim();
      
      // Solo permitir eliminar si está completamente vacío
      if (currentText === '') {
        // Prevenir comportamiento por defecto y permitir eliminación
        e.preventDefault();
        if (onDelete) {
          onDelete();
        }
        return;
      }
      
      // Si tiene contenido, NO prevenir el comportamiento por defecto
      // El usuario puede borrar caracteres normalmente
      // NO propagar al padre para que no elimine el bloque
      e.stopPropagation();
    }
  };

  // Prevenir que el evento de keydown se propague al padre
  const handleContentKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleKeyDown(e);
  };

  // Verificar si está vacío al montar y cuando cambia block.content
  useEffect(() => {
    if (!isImage && contentRef.current) {
      const text = contentRef.current.innerText.trim();
      setIsEmpty(text === '');
    }
  }, [block.content, isImage]);

  // Texto/Listas: sin resize, con edición de contenido
  if (!isImage) {
    return (
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0}
        onDragEnd={(_, info) => {
          const newX = block.x + info.offset.x;
          const newY = block.y + info.offset.y;
          
          const validatedPosition = {
            x: Math.max(0, Math.min(newX, canvasBounds.width - width)),
            y: Math.max(0, Math.min(newY, canvasBounds.height - 200))
          };
          
          onUpdate({ x: validatedPosition.x, y: validatedPosition.y });
        }}
        initial={false}
        animate={{
          x: block.x,
          y: block.y,
          width: width,
          height: 'auto',
          zIndex: isSelected ? 50 : 1
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        className={`absolute group cursor-move p-2 ${
          isSelected ? 'ring-2 ring-blue-400 shadow-md' : 'hover:ring-1 hover:ring-slate-300'
        }`}
      >
        <div
          ref={contentRef}
          contentEditable
          suppressContentEditableWarning
          onFocus={handleFocus}
          onBlur={handleBlur}
          onInput={handleInput}
          onKeyDown={handleContentKeyDown}
          className={`outline-none w-full h-full min-h-[1em] [&>ul]:list-inherit [&>ol]:list-inherit ${block.styles}`}
        />
        
        {/* Indicador visual si está vacío */}
        {isEmpty && isSelected && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded shadow">
              {isList ? 'Vacío - Presiona Supr para eliminar' : 'Vacío - Presiona Supr para eliminar'}
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  // Imagen: con resize, sin edición de contenido
  return (
    <>
      <motion.div
        drag={!isResizing}
        dragMomentum={false}
        dragElastic={0}
        onDragEnd={(_, info) => {
          if (!isResizing) {
            const newX = block.x + info.offset.x;
            const newY = block.y + info.offset.y;
            
            const validatedPosition = {
              x: Math.max(0, Math.min(newX, canvasBounds.width - width)),
              y: Math.max(0, Math.min(newY, canvasBounds.height - (width / aspectRatio)))
            };
            
            onUpdate({ x: validatedPosition.x, y: validatedPosition.y });
          }
        }}
        initial={false}
        animate={{
          x: block.x,
          y: block.y,
          width: width,
          height: width / aspectRatio,
          zIndex: isSelected ? 50 : 1
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        className={`absolute group cursor-move ${
          isSelected ? 'ring-2 ring-blue-400 shadow-md' : 'hover:ring-1 hover:ring-slate-300'
        } ${transformClasses.join(' ')}`}
      >
        <img
          src={block.content}
          alt="Canvas element"
          onLoad={handleImageLoad}
          className={`w-full h-full object-cover pointer-events-none select-none ${visualClasses.join(' ')}`}
          style={{
            filter: block.cssFilter || undefined,
          }}
        />
      </motion.div>

      {/* Handles de redimensionamiento (solo imágenes) */}
      {isSelected && (
        <div
          className="absolute pointer-events-none"
          style={{
            x: block.x,
            y: block.y,
            width: width,
            height: width / aspectRatio,
            zIndex: 60
          }}
        >
          <div className="relative w-full h-full pointer-events-auto">
            {renderResizeHandles()}
          </div>
        </div>
      )}
    </>
  );
};
