import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import type { Block } from '../CanvasEditor';

interface CanvasBlockProps {
  block: Block;
  isSelected: boolean;
  onSelect: () => void;
  onContentChange: (content: string) => void;
}
    

export const CanvasBlock = ({ block, isSelected, onSelect, onContentChange, onUpdate }: CanvasBlockProps & {onUpdate: (update: Partial<Block>) => void;}) => {
  const [width, setWidth] = useState(block.width || 200);
  
  // Especificamos que la referencia es a un elemento DIV
  const contentRef = useRef<HTMLDivElement>(null);

  // Sincronización controlada: 
  // Solo actualizamos el HTML interno si el contenido cambia EXTERNAMENTE 
  // (por ejemplo, desde Go o un botón de "Limpiar") y el usuario NO está escribiendo.
  useEffect(() => {
    if (contentRef.current && document.activeElement !== contentRef.current) {
      contentRef.current.innerHTML = block.content;
    }
  }, [block.content]);

  return (
    <motion.div
      drag
      dragMomentum={false}
      // Usamos animate para que los cambios de posición y ancho sean suaves
      onDragEnd={(_, info) => {
        onUpdate({ x: block.x + info.offset.x, y: block.y + info.offset.y });
      }}
      initial={false}
      animate={{ x: block.x, y: block.y, width: block.width || 200, zIndex: isSelected ? 50 : 1 }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      className={`absolute group p-2 cursor-move ${
        isSelected ? 'ring-1 ring-blue-400 shadow-md' : ''
      } ${block.styles}`}
    >
    <div 
        ref={contentRef}
        contentEditable 
        suppressContentEditableWarning
        onInput={(e) => onContentChange(e.currentTarget.innerHTML)}
        className={`outline-none w-full h-full min-h-[1em] [&>ul]:list-inherit [&>ol]:list-inherit ${block.styles}`}
    />
      {/* Manejador de tamaño (Resizer) */}
      {isSelected && (
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-1 cursor-ew-resize bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
          drag="x"
          dragConstraints={{ left: 50 }}
          onDrag={(_, info) => setWidth((prev) => prev + info.delta.x)}
          onDragEnd={(_, info) => {
             onUpdate({ width: (block.width || 200) + info.offset.x });
          }}
        />
      )}
    </motion.div>
  );
};