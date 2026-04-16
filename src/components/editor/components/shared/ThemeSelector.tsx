import React from 'react';
import { Palette } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ThemeOption {
  key: string;
  name: string;
  description: string;
  icon: LucideIcon;
  colors: string[];
}

interface ThemeSelectorProps {
  themes: ThemeOption[];
  currentClasses: string[];
  onThemeChange: (themeKey: string) => void;
  title?: string;
  icon?: LucideIcon;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  themes,
  currentClasses,
  onThemeChange,
  title = "Temas de color",
  icon: Icon = Palette
}) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <Icon size={16} />
        {title}
      </h3>
      <div className="space-y-2">
        {themes.map((theme) => {
          const ThemeIcon = theme.icon;
          const isActive = theme.colors.some(color => currentClasses.includes(color));
          
          return (
            <button
              key={theme.key}
              onClick={() => onThemeChange(theme.key)}
              className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
                isActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`p-2 rounded-lg ${
                isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}>
                <ThemeIcon size={16} />
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium">{theme.name}</div>
                <div className="text-xs text-gray-500">{theme.description}</div>
              </div>
              <div className="flex gap-1">
                {theme.colors.slice(0, 3).map((color, index) => (
                  <div 
                    key={index}
                    className={`w-3 h-3 rounded-full ${color.replace('text-', 'bg-')}`}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
