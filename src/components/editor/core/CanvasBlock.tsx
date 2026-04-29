import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import type { Block } from '../CanvasEditor';

interface CanvasBlockProps {
  block: Block;
  isSelected: boolean;
  onSelect: () => void;
  onContentChange: (content: string) => void;
  onUpdate: (update: Partial<Block>) => void;
}
    
export const CanvasBlock = ({ block, isSelected, onSelect, onContentChange, onUpdate }: CanvasBlockProps) => {
  const isImage = block.type === 'image';
  // Usar dimensions si existe, sino width/height
  const initialWidth = block.dimensions?.width || block.width || 300;
  const initialHeight = block.dimensions?.height || block.height || 200;
  const [width, setWidth] = useState(initialWidth);
  const [aspectRatio, setAspectRatio] = useState(initialWidth / initialHeight);
  const contentRef = useRef<HTMLDivElement>(null);

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

  // Sincronizar ancho externo
  useEffect(() => {
    setWidth(block.dimensions?.width || block.width || 200);
  }, [block.width, block.dimensions?.width]);

  // Sincronizar contenido (solo para texto)
  useEffect(() => {
    if (block.type !== 'image' && contentRef.current && document.activeElement !== contentRef.current) {
      contentRef.current.innerHTML = block.content;
    }
  }, [block.content, block.type]);

  // Calcular la proporción de la imagen al cargarla
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (naturalHeight > 0) {
      setAspectRatio(naturalWidth / naturalHeight);
    }
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragEnd={(_, info) => {
        onUpdate({ x: block.x + info.offset.x, y: block.y + info.offset.y });
      }}
      initial={false}
      // Si es imagen, el height escala proporcionalmente. Si es texto, es 'auto' para que crezca hacia abajo.
      animate={{ 
        x: block.x, 
        y: block.y, 
        width: width, 
        height: isImage ? width / aspectRatio : 'auto',
        zIndex: isSelected ? 50 : 1 
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      // Quitamos padding si es imagen para que el borde se pegue exactamente a la foto
      className={`absolute group cursor-move ${isImage ? '' : 'p-2'} ${
        isSelected ? 'ring-2 ring-blue-400 shadow-md' : 'hover:ring-1 hover:ring-slate-300'
      } ${isImage ? transformClasses.join(' ') : ''}`} // Aplicar transformaciones al contenedor si es imagen
    >
      
      {/* RENDERIZADO CONDICIONAL: IMAGEN vs TEXTO */}
      {isImage ? (
        <img 
          src={block.content} 
          alt="Canvas element"
          onLoad={handleImageLoad}
          // pointer-events-none evita que el navegador intente hacer el drag nativo de la imagen
          className={`w-full h-full object-cover pointer-events-none select-none ${visualClasses.join(' ')}`}
          style={{
            filter: block.cssFilter || undefined,
          }}
        />
      ) : (
        <div 
          ref={contentRef}
          contentEditable 
          suppressContentEditableWarning
          onInput={(e) => onContentChange(e.currentTarget.innerHTML)}
          // Los estilos van al div interno solo si es texto
          className={`outline-none w-full h-full min-h-[1em] [&>ul]:list-inherit [&>ol]:list-inherit ${block.styles}`}
        />
      )}

      {/* RENDERIZADO CONDICIONAL DEL RESIZER */}
      {isSelected && isImage && (
        <motion.div
          className="absolute -right-2 -bottom-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white cursor-nwse-resize shadow-md"
          drag="x" // Arrastramos en X, la altura se calcula por el aspectRatio
          dragMomentum={false}
          onDrag={(_, info) => setWidth((prev) => Math.max(50, prev + info.delta.x))}
          onDragEnd={(_, info) => {
            const newWidth = Math.max(50, width + info.offset.x);
            const newHeight = newWidth / aspectRatio;
            onUpdate({ 
              dimensions: { width: newWidth, height: newHeight },
              width: newWidth,
              height: newHeight
            });
          }}
        />
      )}

      {isSelected && !isImage && (
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-1.5 cursor-ew-resize bg-blue-500/50 hover:bg-blue-500 transition-colors"
          drag="x"
          dragMomentum={false}
          onDrag={(_, info) => setWidth((prev) => Math.max(50, prev + info.delta.x))}
          onDragEnd={(_, info) => onUpdate({ width: Math.max(50, width + info.offset.x) })}
        />
      )}
    </motion.div>
  );
};