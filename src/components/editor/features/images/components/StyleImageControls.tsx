import React, { useMemo } from 'react';
import { Sparkles, Palette } from 'lucide-react';
import { CSS_FILTERS, IMAGE_CONTROLS } from '../../../config/imageControls';
import { SelectControl } from '../../../shared';
import type { Block } from '../../../core/CanvasEditor';

interface StyleImageControlsProps {
  styles: string;
  onUpdate: (updates: Partial<Block>) => void;
}

export const StyleImageControls: React.FC<StyleImageControlsProps> = ({ 
  styles, 
  onUpdate 
}) => {
  const currentClasses = useMemo(() => styles.split(' ').filter(Boolean), [styles]);

  // Aplicar filtro CSS
  const applyFilter = (filterName: string) => {
    const filterClass = (CSS_FILTERS as Record<string, string>)[filterName];
    const filteredClasses = currentClasses.filter(
      (c) =>
        !c.includes('filter') &&
        !c.includes('sepia') &&
        !c.includes('grayscale') &&
        !c.includes('hue-rotate')
    );

    if (filterName === 'none' || filterClass === undefined) {
      onUpdate({ styles: filteredClasses.join(' ') });
      return;
    }

    onUpdate({ styles: filteredClasses.concat(filterClass).join(' ') });
  };

  const quickFilters = [
    { name: 'Ninguno', value: 'none', class: '' },
    { name: 'Vintage', value: 'vintage', class: 'sepia(0.5)' },
    { name: 'B&N', value: 'blackWhite', class: 'grayscale(1)' },
    { name: 'Cálido', value: 'warm', class: 'sepia(0.2)' },
    { name: 'Frío', value: 'cold', class: 'hue-rotate(180deg)' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Filtros rápidos */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Sparkles size={16} />
          Filtros rápidos
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {quickFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => applyFilter(filter.value)}
              className="relative p-3 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-all group"
              style={{ filter: filter.class }}
            >
              <div className="w-full h-12 bg-gray-200 rounded" />
              <div className="text-xs font-medium text-gray-700 mt-2">
                {filter.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Ajustes básicos */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Palette size={16} />
          Ajustes básicos
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <SelectControl
            label="Redondeado"
            value={currentClasses.find(c => c.startsWith('rounded')) || ''}
            options={IMAGE_CONTROLS.rounded}
            onChange={(value) => onUpdate({ 
              styles: currentClasses.filter(c => !c.startsWith('rounded')).concat(value).join(' ') 
            })}
          />

          <SelectControl
            label="Sombra"
            value={currentClasses.find(c => c.startsWith('shadow')) || ''}
            options={IMAGE_CONTROLS.shadows}
            onChange={(value) => onUpdate({ 
              styles: currentClasses.filter(c => !c.startsWith('shadow')).concat(value).join(' ') 
            })}
          />
        </div>
      </div>
    </div>
  );
};