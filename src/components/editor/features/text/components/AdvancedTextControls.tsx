import React, { useState } from 'react';
import { Settings, Eye, EyeOff, RotateCcw, Underline, Strikethrough, Minus } from 'lucide-react';

interface AdvancedTextControlsProps {
  content?: string;
  type?: string;
  styleHandler: any;
  currentClasses: string[];
  TEXT_OPTIONS: any;
  contentValidation: {
    isValid: boolean;
    error?: string;
    wordCount: number;
    charCount: number;
    readingTime: number;
  };
  handleOpacityChange: (value: number, currentClasses: string[], onStyleChange: (newStyles: string) => void) => void;
  getCurrentOpacity: (currentClasses: string[]) => number;
  resetTextStyles: (styleHandler: any) => void;
  toggleStyleOption: (optionType: "letterSpacing" | "transform" | "decoration" | "styles" | "colors" | "fontSizes" | "weights" | "alignments" | "lineHeight" | "fontFamilies" | "lists" | "textShadows", value: string, currentClasses: string[], styleHandler: any) => void;
}

export const AdvancedTextControls: React.FC<AdvancedTextControlsProps> = ({
  content,
  type,
  styleHandler,
  currentClasses,
  TEXT_OPTIONS,
  contentValidation,
  handleOpacityChange,
  getCurrentOpacity,
  resetTextStyles,
  toggleStyleOption
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Métricas de contenido */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Settings size={16} />
          Métricas de contenido
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-white p-3 rounded-lg border border-gray-200 text-center">
            <div className="text-gray-500 mb-1">Palabras</div>
            <div className="font-bold text-lg text-gray-900">{contentValidation.wordCount}</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-200 text-center">
            <div className="text-gray-500 mb-1">Caracteres</div>
            <div className="font-bold text-lg text-gray-900">{contentValidation.charCount}</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-200 text-center">
            <div className="text-gray-500 mb-1">Lectura</div>
            <div className="font-bold text-lg text-gray-900">{contentValidation.readingTime}min</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-200 text-center">
            <div className="text-gray-500 mb-1">Estado</div>
            <div className={`font-bold text-lg ${contentValidation.isValid ? 'text-green-600' : 'text-red-600'}`}>
              {contentValidation.isValid ? '✓' : '✗'}
            </div>
          </div>
        </div>
        
        {!contentValidation.isValid && contentValidation.error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-700 text-sm">
              <EyeOff size={18} />
              <div>
                <div className="font-semibold">Error de validación</div>
                <div>{contentValidation.error}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Opacidad */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Eye size={16} />
          Opacidad
        </h3>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="100"
            value={(getCurrentOpacity(currentClasses) * 100).toFixed(0)}
            onChange={(e) => handleOpacityChange(parseFloat(e.target.value), currentClasses, styleHandler)}
            className="flex-1"
          />
          <span className="text-sm font-medium text-gray-700 w-12 text-right">
            {(getCurrentOpacity(currentClasses) * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Modo avanzado */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <Settings size={16} />
            Modo experto
          </h3>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            {showAdvanced ? <EyeOff size={14} /> : <Eye size={14} />}
            {showAdvanced ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
        
        {showAdvanced && (
          <div className="space-y-4">
            {/* Decoración avanzada */}
            <div>
              <h4 className="text-xs font-medium text-gray-600 mb-2">Decoración avanzada</h4>
              <div className="grid grid-cols-2 gap-2">
                {TEXT_OPTIONS.decoration?.map((decoration: any) => {
                  const Icon = getDecorationIcon(decoration.value);
                  return (
                    <button
                      key={decoration.value}
                      onClick={() => toggleStyleOption('decoration', decoration.value, currentClasses, styleHandler)}
                      className={`p-2 rounded-lg border text-xs font-medium transition-all ${
                        currentClasses.includes(decoration.value)
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                      }`}
                      title={decoration.name}
                    >
                      <Icon size={14} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Restablecer */}
            <button
              onClick={() => resetTextStyles(styleHandler)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
            >
              <RotateCcw size={16} />
              Restablecer estilos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function
const getDecorationIcon = (decorationType: string) => {
  switch(decorationType) {
    case 'underline': return Underline;
    case 'line-through': return Strikethrough;
    case 'underline decoration-2': return Underline;
    case 'underline decoration-dotted': return Underline;
    case 'underline decoration-wavy': return Underline;
    default: return Minus;
  }
};
