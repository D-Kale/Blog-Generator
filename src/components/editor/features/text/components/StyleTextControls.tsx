import React from 'react';
import { ThemeSelector, ColorPalette, FormatControls } from '../../shared';
import type { LucideIcon } from 'lucide-react';
import { CaseSensitive, Type as TextIcon, Type, Bold, AlignLeft, AlignCenter, AlignRight, AlignJustify, Italic, Underline, Strikethrough, Palette } from 'lucide-react';

// Helper function para iconos de alineación
const getAlignmentIcon = (value: string): LucideIcon => {
  switch (value) {
    case 'text-left': return AlignLeft;
    case 'text-center': return AlignCenter;
    case 'text-right': return AlignRight;
    case 'text-justify': return AlignJustify;
    default: return AlignLeft;
  }
};

interface StyleTextControlsProps {
  enrichedThemes: Array<{
    key: string;
    name: string;
    description: string;
    icon: LucideIcon;
    colors: string[];
  }>;
  currentClasses: string[];
  styleHandler: any;
  TEXT_OPTIONS: any;
  applyTextTheme: (themeKey: string, currentClasses: string[], styleHandler: any) => void;
  toggleStyleOption: (optionType: "letterSpacing" | "transform" | "decoration" | "styles" | "colors" | "fontSizes" | "weights" | "alignments" | "lineHeight" | "fontFamilies" | "lists" | "textShadows", value: string, currentClasses: string[], styleHandler: any) => void;
  handleFontFamilyChange: (value: string, currentClasses: string[], styleHandler: any) => void;
  handleLineHeightChange: (value: string, currentClasses: string[], styleHandler: any) => void;
  handleLetterSpacingChange: (value: string, currentClasses: string[], styleHandler: any) => void;
}

export const StyleTextControls: React.FC<StyleTextControlsProps> = ({
  enrichedThemes,
  currentClasses,
  styleHandler,
  TEXT_OPTIONS,
  applyTextTheme,
  toggleStyleOption,
  handleFontFamilyChange,
  handleLineHeightChange,
  handleLetterSpacingChange
}) => {
  return (
    <div className="p-6 space-y-6">
      {/* Temas de color */}

      {/* 
      <ThemeSelector
        themes={enrichedThemes}
        currentClasses={currentClasses}
        onThemeChange={(themeKey) => applyTextTheme(themeKey, currentClasses, styleHandler)}
      />
      */}

      {/* Paleta de colores */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Colores de Texto</h3>
        <ColorPalette
          colors={TEXT_OPTIONS.colors}
          selectedColors={currentClasses.filter(c => TEXT_OPTIONS.colors.some((color: any) => color.value === c))}
          onColorChange={(colorValue) => toggleStyleOption('colors', colorValue, currentClasses, styleHandler)}
          className="grid grid-cols-6 gap-2"
        />
      </div>

      {/* Formato y espaciado */}
      <FormatControls
        title="Estilos de texto"
        icon={Palette}
        items={[
          {
            label: "Alineación",
            icon: AlignLeft,
            value: currentClasses.find(c => TEXT_OPTIONS.alignments.some((align: any) => align.value === c)) || '',
            options: TEXT_OPTIONS.alignments.map((align: any) => ({
              ...align,
              name: align.name,
              icon: getAlignmentIcon(align.value)
            })),
            onChange: (value) => toggleStyleOption('alignments', value, currentClasses, styleHandler)
          },
          {
            label: "Estilo",
            icon: Italic,
            value: currentClasses.find(c => ['italic', 'not-italic'].includes(c)) || '',
            options: [
              { value: '', name: 'Normal', icon: Italic },
              { value: 'italic', name: 'Cursiva', icon: Italic }
            ],
            onChange: (value) => toggleStyleOption('styles', value, currentClasses, styleHandler)
          },
          {
            label: "Decoración",
            icon: Underline,
            value: currentClasses.find(c => ['underline', 'line-through', 'no-underline'].includes(c)) || '',
            options: [
              { value: '', name: 'Ninguna', icon: Underline },
              { value: 'underline', name: 'Subrayado', icon: Underline },
              { value: 'line-through', name: 'Tachado', icon: Strikethrough }
            ],
            onChange: (value) => toggleStyleOption('decoration', value, currentClasses, styleHandler)
          },
          {
            label: "Tamaño de fuente",
            icon: Type,
            value: currentClasses.find(c => TEXT_OPTIONS.fontSizes.some((size: any) => size.value === c)) || '',
            options: TEXT_OPTIONS.fontSizes.map((size: any) => ({
              ...size,
              name: size.name,
              icon: Type
            })),
            onChange: (value) => toggleStyleOption('fontSizes', value, currentClasses, styleHandler)
          },
          {
            label: "Peso de fuente",
            icon: Bold,
            value: currentClasses.find(c => TEXT_OPTIONS.weights.some((weight: any) => weight.value === c)) || '',
            options: TEXT_OPTIONS.weights.map((weight: any) => ({
              ...weight,
              name: weight.name,
              icon: Bold
            })),
            onChange: (value) => toggleStyleOption('weights', value, currentClasses, styleHandler)
          },
          {
            label: "Familia de fuente",
            icon: TextIcon,
            value: currentClasses.find(c => TEXT_OPTIONS.fontFamilies.some((family: any) => family.value === c)) || '',
            options: TEXT_OPTIONS.fontFamilies.map((family: any) => ({
              ...family,
              name: family.name,
              icon: TextIcon
            })),
            onChange: (value) => handleFontFamilyChange(value, currentClasses, styleHandler)
          },
          {
            label: "Transformación",
            icon: CaseSensitive,
            value: currentClasses.find(c => TEXT_OPTIONS.transform.some((transform: any) => transform.value === c)) || '',
            options: TEXT_OPTIONS.transform.map((transform: any) => ({
              ...transform,
              name: transform.name,
              icon: CaseSensitive
            })),
            onChange: (value) => toggleStyleOption('transform', value, currentClasses, styleHandler)
          },
          {
            label: "Altura de línea",
            icon: AlignLeft,
            value: currentClasses.find(c => TEXT_OPTIONS.lineHeight.some((height: any) => height.value === c)) || '',
            options: TEXT_OPTIONS.lineHeight.map((height: any) => ({
              ...height,
              name: height.name,
              icon: AlignLeft
            })),
            onChange: (value) => handleLineHeightChange(value, currentClasses, styleHandler)
          },
          {
            label: "Espaciado entre letras",
            icon: Type,
            value: currentClasses.find(c => TEXT_OPTIONS.letterSpacing.some((spacing: any) => spacing.value === c)) || '',
            options: TEXT_OPTIONS.letterSpacing.map((spacing: any) => ({
              ...spacing,
              name: spacing.name,
              icon: Type
            })),
            onChange: (value) => handleLetterSpacingChange(value, currentClasses, styleHandler)
          }
        ]}
        collapsible={true}
        defaultOpen={true}
      />
    </div>
  );
};
