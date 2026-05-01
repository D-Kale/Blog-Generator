import React from 'react';
import { X, HelpCircle, Type, Image as ImageIcon, List, Keyboard } from 'lucide-react';

interface Shortcut {
  keys: string[];
  description: string;
}

interface ShortcutCategory {
  title: string;
  icon?: React.ElementType;
  shortcuts: Shortcut[];
}

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  blockType?: 'text' | 'image' | 'list' | null;
}

const generalShortcuts: Shortcut[] = [
  { keys: ['Ctrl/Cmd', 'D'], description: 'Duplicar bloque' },
  { keys: ['Supr/Backspace'], description: 'Eliminar bloque' },
  { keys: ['Flechas'], description: 'Mover (1px)' },
  { keys: ['Shift', 'Flechas'], description: 'Mover (10px)' },
  { keys: ['Shift', 'Resize'], description: 'Mantener proporción' },
  { keys: ['Alt', 'Resize'], description: 'Desde centro' },
];

const textShortcuts: Shortcut[] = [
  { keys: ['Ctrl/Cmd', 'B'], description: 'Negrita' },
  { keys: ['Ctrl/Cmd', 'I'], description: 'Cursiva' },
  { keys: ['Ctrl/Cmd', 'U'], description: 'Subrayado' },
  { keys: ['Ctrl/Cmd', 'K'], description: 'Insertar enlace' },
];

const imageShortcuts: Shortcut[] = [
  { keys: ['Shift', 'Resize'], description: 'Mantener aspect ratio' },
  { keys: ['Alt', 'Resize'], description: 'Redimensionar desde centro' },
  { keys: ['R'], description: 'Rotar' },
  { keys: ['F'], description: 'Filtros' },
  { keys: ['C'], description: 'Copiar estilo' },
  { keys: ['P'], description: 'Pegar estilo' },
];

const listShortcuts: Shortcut[] = [
  { keys: ['Tab'], description: 'Sangría' },
  { keys: ['Shift', 'Tab'], description: 'Quitar sangría' },
  { keys: ['Enter'], description: 'Nuevo elemento' },
  { keys: ['Backspace'], description: 'Unir elemento' },
];

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({
  isOpen,
  onClose,
  blockType
}) => {
  if (!isOpen) return null;

  const getCategories = () => {
    const categories: ShortcutCategory[] = [
      {
        title: 'General',
        icon: HelpCircle,
        shortcuts: generalShortcuts
      }
    ];

    if (blockType === 'text') {
      categories.push({
        title: 'Texto',
        icon: Type,
        shortcuts: textShortcuts
      });
    } else if (blockType === 'image') {
      categories.push({
        title: 'Imagen',
        icon: ImageIcon,
        shortcuts: imageShortcuts
      });
    } else if (blockType === 'list') {
      categories.push({
        title: 'Lista',
        icon: List,
        shortcuts: listShortcuts
      });
    }

    return categories;
  };

  const categories = getCategories();

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Modal compacto estilo Figma */}
        <div
          className="bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Keyboard className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Atajos de Teclado
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Contenido con scroll */}
          <div className="p-4 overflow-y-auto max-h-[60vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  {/* Título de categoría */}
                  <div className="flex items-center gap-2 mb-3">
                    {category.icon && (
                      <category.icon className="w-4 h-4 text-blue-600" />
                    )}
                    <h3 className="font-medium text-gray-900">
                      {category.title}
                    </h3>
                  </div>

                  {/* Lista de atajos */}
                  <div className="space-y-2">
                    {category.shortcuts.map((shortcut, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-600">
                          {shortcut.description}
                        </span>
                        <div className="flex items-center gap-1">
                          {shortcut.keys.map((key, kIdx) => (
                            <React.Fragment key={kIdx}>
                              {kIdx > 0 && (
                                <span className="text-gray-400">+</span>
                              )}
                              <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono text-gray-700 shadow-sm">
                                {key}
                              </kbd>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              Presiona <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">Esc</kbd> para cerrar
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
