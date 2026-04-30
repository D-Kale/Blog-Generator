import React, { useMemo } from 'react';
import { Move, RotateCw } from 'lucide-react';
import { IMAGE_CONTROLS, IMAGE_SIZES } from '../../../config/imageControls';
import { SelectControl } from '../../../shared';
import type { Block } from '../../../core/CanvasEditor';

interface AdvancedImageControlsProps {
  styles: string;
  dimensions?: { width: number; height: number };
  onUpdate: (updates: Partial<Block>) => void;
}

export const AdvancedImageControls: React.FC<AdvancedImageControlsProps> = ({ 
  styles, 
  dimensions = { width: 300, height: 200 },
  onUpdate 
}) => {
  const currentClasses = useMemo(() => styles.split(' ').filter(Boolean), [styles]);

  // Extraer el valor de rotación actual
  const currentRotation = useMemo(() => {
    const rotationClass = currentClasses.find(cls => cls.startsWith('rotate') || cls.startsWith('-rotate'));
    return rotationClass || '';
  }, [currentClasses]);

  // Extraer el valor de opacidad actual
  const currentOpacityClass = useMemo(() => {
    const opacityClass = currentClasses.find(cls => cls.startsWith('opacity-'));
    return opacityClass || '';
  }, [currentClasses]);

  // Cambiar tamaño
  const changeSize = (sizeName: keyof typeof IMAGE_SIZES) => {
    const size = IMAGE_SIZES[sizeName];
    if (!size) return;

    const { width, height } = size;
    onUpdate({ 
      dimensions: { width, height },
      width,
      height
    });
  };

  const quickSizes: Array<{ name: string; value: keyof typeof IMAGE_SIZES; size: string }> = [
    { name: 'Mini', value: 'thumbnail', size: '150×150' },
    { name: 'Pequeño', value: 'small', size: '300×200' },
    { name: 'Mediano', value: 'medium', size: '600×400' },
    { name: 'Grande', value: 'large', size: '1200×800' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Tamaños predefinidos */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Move size={16} />
          Tamaño rápido
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {quickSizes.map((size) => (
            <button
              key={size.value}
              onClick={() => changeSize(size.value)}
              className={`p-3 rounded-lg border-2 transition-all ${
                dimensions.width === parseInt(size.size.split('×')[0]) &&
                dimensions.height === parseInt(size.size.split('×')[1])
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium text-sm">{size.name}</div>
              <div className="text-xs text-gray-500">{size.size}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Transformaciones */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <RotateCw size={16} />
          Transformaciones
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <SelectControl
            label="Rotación"
            value={currentRotation}
            options={[{ value: '', name: 'Sin rotación' }, ...IMAGE_CONTROLS.rotate]}
            onChange={(value) => onUpdate({ 
              styles: currentClasses.filter(c => !c.startsWith('rotate') && !c.startsWith('-rotate')).concat(value).join(' ') 
            })}
          />

          <SelectControl
            label="Opacidad"
            value={currentOpacityClass}
            options={[{ value: '', name: 'Sin opacidad' }, ...IMAGE_CONTROLS.opacity]}
            onChange={(value) => onUpdate({ 
              styles: currentClasses.filter(c => !c.startsWith('opacity')).concat(value).join(' ') 
            })}
          />
        </div>
      </div>
    </div>
  );
};