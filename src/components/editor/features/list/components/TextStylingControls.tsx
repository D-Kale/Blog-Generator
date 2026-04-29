import React from 'react';
import { Type, Bold, RotateCcw, AlignLeft, AlignCenter, AlignRight, AlignJustify, Italic, Underline, Strikethrough } from 'lucide-react';
import { FormatControls } from '../../../shared';
import type { LucideIcon } from 'lucide-react';

// Helper functions para iconos
const getAlignmentIcon = (value: string): LucideIcon => {
  switch (value) {
    case 'text-left': return AlignLeft;
    case 'text-center': return AlignCenter;
    case 'text-right': return AlignRight;
    case 'text-justify': return AlignJustify;
    default: return AlignLeft;
  }
};

interface TextStylingControlsProps {
  currentClasses: string[];
  styleHandler: any;
  TEXT_OPTIONS: any;
}

export const TextStylingControls: React.FC<TextStylingControlsProps> = ({
  currentClasses,
  styleHandler,
  TEXT_OPTIONS
}) => {
  // Helper function para manejar cambios de estilo
  const handleStyleChange = (category: string, value: string) => {
    const categoryOptions = TEXT_OPTIONS[category]?.map((opt: any) => opt.value) || [];
    let newClasses = currentClasses.filter(cls => !categoryOptions.includes(cls));

    if (value && value !== '') {
      newClasses.push(value);
    }

    styleHandler(newClasses.join(' ').trim());
  };

  return (
    <div className="p-6 space-y-6">
      {/* Todos los controles en un solo componente colapsable */}
      <FormatControls
        title="Estilos de lista"
        icon={Type}
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
            onChange: (value) => handleStyleChange('alignments', value)
          },
          {
            label: "Estilo",
            icon: Italic,
            value: currentClasses.find(c => ['italic', 'not-italic'].includes(c)) || '',
            options: [
              { value: '', name: 'Normal', icon: Italic },
              { value: 'italic', name: 'Cursiva', icon: Italic }
            ],
            onChange: (value) => {
              const styleClasses = ['italic', 'not-italic'];
              let newClasses = currentClasses.filter(cls => !styleClasses.includes(cls));
              if (value) newClasses.push(value);
              styleHandler(newClasses.join(' ').trim());
            }
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
            onChange: (value) => {
              const decorationClasses = ['underline', 'line-through', 'no-underline'];
              let newClasses = currentClasses.filter(cls => !decorationClasses.includes(cls));
              if (value) newClasses.push(value);
              styleHandler(newClasses.join(' ').trim());
            }
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
            onChange: (value) => handleStyleChange('fontSizes', value)
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
            onChange: (value) => handleStyleChange('weights', value)
          },
          {
            label: "Familia de fuente",
            icon: Type,
            value: currentClasses.find(c => TEXT_OPTIONS.fontFamilies.some((family: any) => family.value === c)) || '',
            options: TEXT_OPTIONS.fontFamilies.map((family: any) => ({
              ...family,
              name: family.name,
              icon: Type
            })),
            onChange: (value) => handleStyleChange('fontFamilies', value)
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
            onChange: (value) => handleStyleChange('lineHeight', value)
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
            onChange: (value) => handleStyleChange('letterSpacing', value)
          }
        ]}
        collapsible={true}
        defaultOpen={true}
      />

      {/* Botón de restablecer */}
      <button
        onClick={() => {
          styleHandler('text-black text-base font-normal not-italic no-underline normal-case tracking-normal leading-none list-none');
        }}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
      >
        <RotateCcw size={16} />
        Restablecer estilos de texto
      </button>
    </div>
  );
};
