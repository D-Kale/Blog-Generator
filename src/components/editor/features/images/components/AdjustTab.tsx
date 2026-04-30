import React from 'react';
import { Crop, Move } from 'lucide-react';
import { SelectControl } from '../../../shared/primitives';

interface SizeOption {
  name: string;
  value: string;
  size: string;
}

interface AdjustTabProps {
  dimensions: { width: number; height: number };
  currentRotation: string;
  currentOpacityClass: string;
  onSizeChange: (sizeName: string) => void;
  onRotationChange: (value: string) => void;
  onOpacityChange: (value: string) => void;
  rotationOptions: any[];
  opacityOptions: any[];
}

export const AdjustTab: React.FC<AdjustTabProps> = ({
  dimensions,
  currentRotation,
  currentOpacityClass,
  onSizeChange,
  onRotationChange,
  onOpacityChange,
  rotationOptions,
  opacityOptions
}) => {
  const quickSizes: SizeOption[] = [
    { name: 'Mini', value: 'thumbnail', size: '150×150' },
    { name: 'Pequeño', value: 'small', size: '300×200' },
    { name: 'Mediano', value: 'medium', size: '600×400' },
    { name: 'Grande', value: 'large', size: '1200×800' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Crop size={16} />
          Tamaño rápido
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {quickSizes.map((size) => (
            <button
              key={size.value}
              onClick={() => onSizeChange(size.value)}
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

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Move size={16} />
          Transformaciones
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <SelectControl
            label="Rotación"
            icon={Move}
            value={currentRotation}
            options={[{ value: '', name: 'Sin rotación' }, ...rotationOptions]}
            onChange={onRotationChange}
          />

          <SelectControl
            label="Opacidad"
            value={currentOpacityClass}
            options={[{ value: '', name: 'Sin opacidad' }, ...opacityOptions]}
            onChange={onOpacityChange}
          />
        </div>
      </div>
    </div>
  );
};
