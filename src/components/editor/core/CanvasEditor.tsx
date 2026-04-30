import React, { useState } from 'react';
import { 
  MousePointer2, 
  Type, 
  Image as ImageIcon, 
  List, 
  Trash2,
  Copy,
  Download,
  Settings
} from 'lucide-react';
import { TextControls } from '../features/text/TextControls';
import { ListControls } from '../features/list/ListControls';
import { CanvasBlock } from './CanvasBlock';
import { ImageControls } from '../features/images';

export interface Block {
  id: string;
  type: 'text' | 'image' | 'list';
  content: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  styles: string;
  cssFilter?: string;
  dimensions?: {
    width: number;
    height: number;
  };
}

export default function HybridEditor() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const addBlock = (type: 'text' | 'image' | 'list') => {
    const id = crypto.randomUUID();
    
    const isList = type === 'list';
    
    const newBlock: Block = {
      id,
      type: type,
      content: isList 
        ? '<ul><li>Nuevo elemento</li></ul>' 
        : (type === 'text' ? 'Nuevo Texto' : 'https://picsum.photos/seed/' + Math.random().toString(36).substr(2, 9) + '/400/300.jpg'),
      x: 100, 
      y: 100,
      width: type === 'image' ? 400 : 300,
      height: type === 'image' ? 300 : undefined,
      styles: isList 
        ? 'text-black text-base list-disc ml-6' 
        : (type === 'text' ? 'text-black text-xl' : 'rounded-lg shadow-md'),
      dimensions: type === 'image' ? { width: 400, height: 300 } : undefined
    };

    setBlocks([...blocks, newBlock]);
    setSelectedId(id);
  };

  const updateContent = (id: string, newContent: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content: newContent } : b));
  };

  const updateBlock = (id: string, updates: Partial<Block>) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const deleteSelectedBlock = () => {
    if (selectedId) {
      setBlocks(blocks.filter(b => b.id !== selectedId));
      setSelectedId(null);
    }
  };

  const duplicateSelectedBlock = () => {
    if (selectedId) {
      const block = blocks.find(b => b.id === selectedId);
      if (block) {
        const newBlock = {
          ...block,
          id: crypto.randomUUID(),
          x: block.x + 20,
          y: block.y + 20,
        };
        setBlocks([...blocks, newBlock]);
        setSelectedId(newBlock.id);
      }
    }
  };

  const selectedBlock = blocks.find(b => b.id === selectedId);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Toolbar Izquierda - Minimalista */}
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-2 shadow-sm">
        <div className="mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">B</span>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col gap-2">
          <button 
            onClick={() => addBlock('text')}
            className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-all group"
            title="Añadir Texto"
          >
            <Type size={20} className="group-hover:scale-110 transition-transform" />
          </button>
          <button 
            onClick={() => addBlock('image')}
            className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-all group"
            title="Añadir Imagen"
          >
            <ImageIcon size={20} className="group-hover:scale-110 transition-transform" />
          </button>
          <button 
            onClick={() => addBlock('list')}
            className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-all group"
            title="Añadir Lista"
          >
            <List size={20} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Acciones rápidas */}
        <div className="flex flex-col gap-2 border-t border-gray-200 pt-2">
          {selectedId && (
            <>
              <button 
                onClick={duplicateSelectedBlock}
                className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 hover:text-green-600 transition-all group"
                title="Duplicar"
              >
                <Copy size={18} className="group-hover:scale-110 transition-transform" />
              </button>
              <button 
                onClick={deleteSelectedBlock}
                className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 hover:text-red-600 transition-all group"
                title="Eliminar"
              >
                <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Canvas Principal */}
      <div 
        className="flex-1 relative overflow-hidden"
        onClick={() => setSelectedId(null)}
      >
        {/* Barra superior del canvas */}
        <div className="absolute top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-gray-800">Editor de Blog</h1>
            <div className="text-sm text-gray-500">
              {blocks.length} {blocks.length === 1 ? 'elemento' : 'elementos'}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors" title="Configuración">
              <Settings size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors" title="Descargar">
              <Download size={18} />
            </button>
          </div>
        </div>

        {/* Área de trabajo */}
        <div className="h-full pt-14 p-8 overflow-auto">
          <div className="min-h-full bg-white rounded-xl shadow-sm border border-gray-200 relative mx-auto max-w-5xl">
            {blocks.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MousePointer2 size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    Comienza tu diseño
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Usa los botones de la izquierda para añadir elementos
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button 
                      onClick={() => addBlock('text')}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                    >
                      <Type size={16} />
                      Añadir texto
                    </button>
                    <button 
                      onClick={() => addBlock('image')}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                    >
                      <ImageIcon size={16} />
                      Añadir imagen
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative" style={{ minHeight: '800px' }}>
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
            )}
          </div>
        </div>
      </div>

      {/* Panel Derecho - Propiedades */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        {selectedBlock ? (
          <>
            {/* Header del panel */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">
                  {selectedBlock.type === 'text' ? 'Texto' : 
                   selectedBlock.type === 'image' ? 'Imagen' : 'Lista'}
                </h2>
                <button 
                  onClick={() => setSelectedId(null)}
                  className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Contenido dinámico */}
            <div className="flex-1 overflow-hidden">
              {selectedBlock.type === 'image' ? (
                <ImageControls
                  styles={selectedBlock.styles}
                  content={selectedBlock.content}
                  dimensions={selectedBlock.dimensions || { width: selectedBlock.width || 400, height: selectedBlock.height || 300 }}
                  onUpdate={(updates) => updateBlock(selectedBlock.id, updates)}
                />
              ) : selectedBlock.type === 'list' ? (
                <ListControls
                  styles={selectedBlock.styles}
                  content={selectedBlock.content}
                  onStyleChange={(newStyles) => updateBlock(selectedBlock.id, { styles: newStyles })}
                  onContentChange={(newContent) => updateContent(selectedBlock.id, newContent)}
                />
              ) : (
                <TextControls
                  type={selectedBlock.type}
                  styles={selectedBlock.styles}
                  content={selectedBlock.content}
                  onStyleChange={(newStyles) => updateBlock(selectedBlock.id, { styles: newStyles })} 
                />
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <MousePointer2 size={28} />
            </div>
            <h3 className="font-medium text-gray-600 mb-1">Sin selección</h3>
            <p className="text-sm text-gray-400 text-center">
              Selecciona un elemento para editar sus propiedades
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
