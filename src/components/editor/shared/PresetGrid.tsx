import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface PresetOption {
  key: string;
  name: string;
  description: string;
  icon: LucideIcon;
  classes?: string;
  isActive?: boolean;
}

interface PresetGridProps {
  presets: PresetOption[];
  onPresetClick: (presetKey: string) => void;
  columns?: 1 | 2;
  className?: string;
  showActiveIndicator?: boolean;
}

export const PresetGrid: React.FC<PresetGridProps> = ({
  presets,
  onPresetClick,
  columns = 2,
  className = "",
  showActiveIndicator = true
}) => {
  const gridClass = columns === 1 
    ? "grid grid-cols-1 gap-4" 
    : "grid grid-cols-1 sm:grid-cols-2 gap-4";

  return (
    <div className={`${gridClass} ${className}`}>
      {presets.map((preset) => {
        const Icon = preset.icon;
        const isActive = preset.isActive || false;
        
        return (
          <button
            key={preset.key}
            onClick={() => onPresetClick(preset.key)}
            className={`relative p-4 rounded-lg border-2 transition-all text-left group overflow-hidden ${
              isActive
                ? 'border-blue-500 bg-blue-50 shadow-sm'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            {/* Indicador de estado */}
            {showActiveIndicator && isActive && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full z-10" />
            )}
            
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg flex-shrink-0 ${
                isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}>
                <Icon size={16} />
              </div>
              <div className="flex-1 min-w-0 overflow-hidden">
                <div className={`text-sm font-medium mb-1 text-gray-900 truncate ${
                  preset.classes ? preset.classes : ''
                }`}>
                  {preset.name}
                </div>
                <div className="text-xs text-gray-500 line-clamp-2">
                  {preset.description}
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
