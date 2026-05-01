import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ButtonGroupItem {
  label: string;
  icon?: LucideIcon;
  value: string;
  options: Array<{ value: string; name: string; label?: string; icon?: LucideIcon }>;
  onChange: (value: string) => void;
  previewIcon?: (value: string) => LucideIcon;
}

interface ButtonGroupProps {
  item: ButtonGroupItem;
  currentValue: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ item, currentValue }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const getIcon = item.previewIcon || (() => item.icon);

  const shouldCollapse = item.options.length > 6;
  const visibleOptions = shouldCollapse && !isExpanded
    ? item.options.slice(0, 6)
    : item.options;
  const hasMoreOptions = shouldCollapse && item.options.length > 6;

  return (
    <div className={`space-y-3 ${isCollapsed ? 'opacity-60' : ''}`}>
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-2 pb-2 border-b border-gray-200 hover:bg-gray-50 -mx-2 px-2 py-1 rounded transition-colors cursor-pointer"
        >
          {item.icon && <item.icon size={16} className="text-gray-600" />}
          <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
            {item.label}
          </h4>
          <ChevronRight
            size={14}
            className={`text-gray-400 transition-transform ${
              isCollapsed ? 'rotate-90' : ''
            }`}
          />
        </button>

        {hasMoreOptions && !isCollapsed && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                <ChevronUp size={12} />
                Mostrar menos
              </>
            ) : (
              <>
                <ChevronDown size={12} />
                Ver {item.options.length - 6} más
              </>
            )}
          </button>
        )}
      </div>

      {!isCollapsed && (
        <div className="flex flex-wrap gap-2">
          {visibleOptions.map((option) => {
            const Icon = option.icon || getIcon(option.value);
            const isActive = currentValue === option.value ||
              (option.value === '' && !currentValue) ||
              (option.value !== '' && currentValue?.includes(option.value));

            return (
              <button
                key={option.value}
                onClick={() => item.onChange(option.value)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
                title={option.name}
              >
                {Icon && <Icon size={14} />}
                <span>{option.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
