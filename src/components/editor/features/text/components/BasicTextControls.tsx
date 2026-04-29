import React from 'react';
import { Zap, Type, Bold, AlignLeft, Italic, Underline } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PresetGrid, SelectControl } from '../../../shared';

interface BasicTextControlsProps {
  enrichedPresets: Array<{
    key: string;
    name: string;
    description: string;
    icon: LucideIcon;
    classes?: string;
  }>;
  currentClasses: string[];
  styleHandler: any;
  TEXT_OPTIONS: any;
  isPresetActive: (presetClasses: string) => boolean;
  applyTextPreset: (presetKey: string, styleHandler: any) => void;
  handleFontSizeChange: (value: string, currentClasses: string[], styleHandler: any) => void;
  handleFontWeightChange: (value: string, currentClasses: string[], styleHandler: any) => void;
  handleAlignmentChange: (value: string, currentClasses: string[], styleHandler: any) => void;
  toggleStyleOption: (optionType: "letterSpacing" | "transform" | "decoration" | "styles" | "colors" | "fontSizes" | "weights" | "alignments" | "lineHeight" | "fontFamilies" | "lists" | "textShadows", value: string, currentClasses: string[], styleHandler: any) => void;
}

export const BasicTextControls: React.FC<BasicTextControlsProps> = ({
  enrichedPresets,
  currentClasses,
  styleHandler,
  TEXT_OPTIONS,
  isPresetActive,
  applyTextPreset,
  handleFontSizeChange,
  handleFontWeightChange,
  handleAlignmentChange,
  toggleStyleOption
}) => {
  return (
    <div className="p-6 space-y-6">
      {/* Presets visuales */}
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
          onPresetClick={(presetKey) => applyTextPreset(presetKey, styleHandler)}
          columns={2}
        />
      </div>
    </div>
  );
};
