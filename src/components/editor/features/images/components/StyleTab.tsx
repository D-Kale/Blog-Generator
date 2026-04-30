import React from 'react';
import { Sparkles, Palette } from 'lucide-react';
import { SelectControl } from '../../../shared/primitives';

interface QuickFilter {
  name: string;
  value: string;
  class: string;
}

interface StyleTabProps {
  currentClasses: string[];
  onFilterApply: (filterName: string) => void;
  onRoundnessChange: (value: string) => void;
  onShadowChange: (value: string) => void;
  roundOptions: any[];
  shadowOptions: any[];
}

export const StyleTab: React.FC<StyleTabProps> = ({
  currentClasses,
  onFilterApply,
  onRoundnessChange,
  onShadowChange,
  roundOptions,
  shadowOptions
}) => {
  const quickFilters: QuickFilter[] = [
    { name: 'Ninguno', value: 'none', class: '' },
    { name: 'Vintage', value: 'vintage', class: 'sepia(0.5)' },
    { name: 'B&N', value: 'blackWhite', class: 'grayscale(1)' },
    { name: 'Cálido', value: 'warm', class: 'sepia(0.2)' },
    { name: 'Frío', value: 'cold', class: 'hue-rotate(180deg)' },
  ];

  const getRoundness = () => {
    return currentClasses.find(c => c.startsWith('rounded')) || '';
  };

  const getShadow = () => {
    return currentClasses.find(c => c.startsWith('shadow')) || '';
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Sparkles size={16} />
          Filtros rápidos
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {quickFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onFilterApply(filter.value)}
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

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Palette size={16} />
          Ajustes básicos
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <SelectControl
            label="Redondeado"
            value={getRoundness()}
            options={roundOptions}
            onChange={onRoundnessChange}
          />

          <SelectControl
            label="Sombra"
            value={getShadow()}
            options={shadowOptions}
            onChange={onShadowChange}
          />
        </div>
      </div>
    </div>
  );
};
