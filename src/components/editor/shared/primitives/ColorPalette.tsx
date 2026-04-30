import React from 'react';

interface ColorOption {
  value: string;
  name: string;
  bg: string;
}

interface ColorPaletteProps {
  colors: ColorOption[];
  selectedColors: string[];
  onColorChange: (colorValue: string) => void;
  className?: string;
  showReset?: boolean;
  onReset?: () => void;
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({
  colors,
  selectedColors,
  onColorChange,
  className = "flex flex-wrap gap-2",
  showReset = false,
  onReset
}) => {
  return (
    <div className="space-y-4">
      <div className={className}>
        {colors.map(color => (
          <button
            key={color.value}
            onClick={() => onColorChange(color.value)}
            className={`relative h-8 w-8 rounded-full transition-all border-2 flex-shrink-0 ${color.bg} ${
              selectedColors.includes(color.value)
                ? 'border-blue-500 scale-110 shadow-md ring-2 ring-blue-100'
                : 'border-transparent hover:border-gray-300 hover:scale-105'
            }`}
            title={color.name}
          >
            {selectedColors.includes(color.value) && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
            )}
          </button>
        ))}
      </div>

      {showReset && selectedColors.length > 0 && onReset && (
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors border border-gray-200"
        >
          Restablecer color
        </button>
      )}
    </div>
  );
};
