import React from 'react';
import { Sparkles, Zap, Palette, Settings, Minus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { TemplateSelector, ColorPalette, PresetGrid, SelectControl } from '../../../shared';

interface StyleListControlsProps {
  enrichedTemplates: Array<{
    key: string;
    name: string;
    description: string;
    icon: LucideIcon;
    items: string[];
  }>;
  enrichedPresets: Array<{
    key: string;
    name: string;
    description: string;
    icon: LucideIcon;
    classes?: string;
  }>;
  listItems: string[];
  currentClasses: string[];
  styleHandler: any;
  TEXT_OPTIONS: any;
  LIST_CONFIG: any;
  isPresetActive: (presetClasses: string) => boolean;
  applyListTemplate: (templateKey: string, styleHandler: any, onContentChange: (content: string) => void) => void;
  applyListPreset: (presetKey: string, styleHandler: any) => void;
  handleListColorChange: (value: string, currentClasses: string[], styleHandler: any) => void;
  handleListSizeChange: (value: string, currentClasses: string[], styleHandler: any) => void;
  handleListWeightChange: (value: string, currentClasses: string[], styleHandler: any) => void;
  handleListSpacingChange: (value: string, currentClasses: string[], styleHandler: any) => void;
  onContentChange: (content: string) => void;
}

export const StyleListControls: React.FC<StyleListControlsProps> = ({
  enrichedTemplates,
  enrichedPresets,
  listItems,
  currentClasses,
  styleHandler,
  TEXT_OPTIONS,
  LIST_CONFIG,
  isPresetActive,
  applyListTemplate,
  applyListPreset,
  handleListColorChange,
  handleListSizeChange,
  handleListWeightChange,
  handleListSpacingChange,
  onContentChange
}) => {
  const currentSpacing = currentClasses.find(c => Object.values(LIST_CONFIG.spacing).some((spacing: any) => spacing.value === c)) || '';

  return (
    <div className="p-6 space-y-6">
      {/* Plantillas */}
      <TemplateSelector
        templates={enrichedTemplates}
        listItems={listItems}
        onTemplateClick={(templateKey) => applyListTemplate(templateKey, styleHandler, onContentChange)}
        icon={Sparkles}
      />

      {/* Presets rápidos */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Zap size={16} />
          Estilos rápidos
        </h3>
        <PresetGrid
          presets={enrichedPresets.map(preset => ({
            ...preset,
            isActive: preset.classes ? isPresetActive(preset.classes) : false
          }))}
          onPresetClick={(presetKey) => applyListPreset(presetKey, styleHandler)}
          columns={2}
        />
      </div>

      {/* Controles visuales */}
      <div className="space-y-6">
        {/* Colores */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Palette size={16} />
            Colores de texto
          </h3>
          
          <ColorPalette
            colors={TEXT_OPTIONS.colors}
            selectedColors={currentClasses.filter(c => TEXT_OPTIONS.colors.some((color: any) => color.value === c))}
            onColorChange={(colorValue) => handleListColorChange(colorValue, currentClasses, styleHandler)}
            className="grid grid-cols-6 gap-2"
          />
        </div>
      </div>
    </div>
  );
};
