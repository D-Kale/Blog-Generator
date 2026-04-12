import React, { useState } from 'react';
import { MousePointer2, Type, Image as ImageIcon, List } from 'lucide-react';
import { TextControls } from './components/TextControls'; // Asegúrate de que las rutas sean correctas
import { CanvasBlock } from './ui/CanvasBlock';
import { ImageControls } from './components/ImageControls';

export interface Block {
  id: string;
  type: 'text' | 'image' | 'list';
  content: string;
  x: number;
  y: number;
  width?: number;
  styles: string;
}

export default function HybridEditor() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const addBlock = (type: 'text' | 'image' | 'list') => {
    const id = crypto.randomUUID();
    
    // Si es lista, creamos un bloque de texto con estructura HTML de lista
    const isList = type === 'list';
    
    const newBlock: Block = {
      id,
      type: type,
      content: isList 
        ? '<ul><li>Nuevo elemento</li></ul>' 
        : (type === 'text' ? 'Nuevo Texto' : 'https://via.placeholder.com/150'),
      x: 100, 
      y: 100,
      width: 300,
      // Importante: ml-6 y list-disc para que se vea desde el segundo 1
      styles: isList 
        ? 'text-black text-base list-disc ml-6' 
        : (type === 'text' ? 'text-black text-xl' : 'w-32 h-32 object-cover rounded-lg')
    };

    setBlocks([...blocks, newBlock]);
    setSelectedId(id);
  };

  const updateStyle = (id: string, newClasses: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, styles: newClasses } : b));
  };

  const updateContent = (id: string, newContent: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content: newContent } : b));
  };

  const updateBlock = (id: string, updates: Partial<Block>) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const selectedBlock = blocks.find(b => b.id === selectedId);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      
      {/* 1. TOOLBAR IZQUIERDA (Para añadir cosas) */}
      <div className="w-20 bg-white border-r flex flex-col items-center py-8 gap-6 shadow-sm">
        <button 
          onClick={() => addBlock('text')}
          className="p-4 hover:bg-slate-100 rounded-2xl transition-all text-slate-600 hover:text-blue-600"
          title="Añadir Texto"
        >
          <Type size={24} />
        </button>
        <button 
          onClick={() => addBlock('image')}
          className="p-4 hover:bg-slate-100 rounded-2xl transition-all text-slate-600 hover:text-blue-600"
          title="Añadir Imagen"
        >
          <ImageIcon size={24} />
        </button>
        <button 
          onClick={() => addBlock('list')}
          className="p-4 hover:bg-slate-100 rounded-2xl transition-all text-slate-600 hover:text-blue-600"
          title="Añadir Lista"
        >
          <List size={24} />
        </button>
      </div>

      {/* 2. LIENZO CENTRAL (Donde ocurre la magia) */}
      <div 
        className="flex-1 p-12 relative overflow-auto"
        onClick={() => setSelectedId(null)} // Deseleccionar al hacer clic fuera
      >
        <div className="w-full min-h-screen bg-white shadow-2xl rounded-sm relative mx-auto max-w-4xl border border-slate-200">
          {blocks.map((block) => (
            <CanvasBlock
              key={block.id}
              block={block}
              isSelected={selectedId === block.id}
              onSelect={() => setSelectedId(block.id)}
              onUpdate={(updates) => updateBlock(block.id, updates)}
              onContentChange={(content) => updateContent(block.id, content)}
            />
          ))}
        </div>
      </div>

      {/* 3. SIDEBAR DERECHA (Propiedades) */}
      <div className="w-80 border-l bg-white p-6 shadow-xl z-10 flex flex-col">
        <h2 className="text-lg font-bold border-b pb-4 mb-6">Editor de Diseño</h2>
        
        {selectedBlock && selectedBlock.type !== 'image' ? (
          <TextControls
            type={selectedBlock.type}
            styles={selectedBlock.styles} 
            onStyleChange={(newStyles) => updateStyle(selectedBlock.id, newStyles)} 
          />
        ) : selectedBlock && selectedBlock.type === 'image' ? (
          <ImageControls
            styles={selectedBlock.styles}
            onStyleChange={(newStyles) => updateStyle(selectedBlock.id, newStyles)}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-300">
            <div className="bg-slate-50 p-6 rounded-full mb-4">
              <MousePointer2 size={40}/>
            </div>
            <p className="text-center text-sm px-4">
              Selecciona un elemento en el lienzo para editar sus propiedades.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}