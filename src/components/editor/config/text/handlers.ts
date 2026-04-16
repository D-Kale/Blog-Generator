/**
 * Manejadores de operaciones para texto
 */
import type { Block } from '../../CanvasEditor';
import { TEXT_CONTROL_OPTIONS, TEXT_PRESETS, TEXT_THEMES } from './constants';

export interface TextUpdateHandler {
  (updates: Partial<Block>): void;
}

/**
 * Maneja el cambio de estilos de texto
 */
export function createTextStyleHandler(styles: string, onStyleChange: (newStyles: string) => void) {
  return (newStyles: string) => {
    onStyleChange(newStyles);
  };
}

/**
 * Maneja el cambio de opacidad con slider
 */
export function handleOpacityChange(
  value: number,
  currentClasses: string[],
  onStyleChange: (newStyles: string) => void
): void {
  const cleanClasses = currentClasses.filter(cls => !cls.startsWith('opacity-'));
  const newOpacityClass = value < 100 ? `opacity-${value}` : '';
  const newStyles = [...cleanClasses, newOpacityClass].join(' ').trim();
  onStyleChange(newStyles);
}

/**
 * Obtiene el valor actual de opacidad
 */
export function getCurrentOpacity(currentClasses: string[]): number {
  const opacityClass = currentClasses.find(cls => cls.startsWith('opacity-'));
  if (!opacityClass) return 100;
  return parseInt(opacityClass.replace('opacity-', '')) || 100;
}

/**
 * Maneja el toggle de opciones de estilo
 */
export function toggleStyleOption(
  category: keyof typeof TEXT_CONTROL_OPTIONS,
  value: string,
  currentClasses: string[],
  onStyleChange: (newStyles: string) => void
): void {
  const possibleClasses = TEXT_CONTROL_OPTIONS[category]?.flatMap((opt: any) => 
    opt.value.split(' ').filter(Boolean)
  ) || [];
  
  let newClasses = currentClasses.filter(cls => !possibleClasses.includes(cls));

  const isValueAlreadyActive = value !== '' && 
    value.split(' ').every(v => currentClasses.includes(v));

  if (!isValueAlreadyActive && value !== '') {
    newClasses.push(...value.split(' '));
  }

  onStyleChange(newClasses.join(' ').trim());
}

/**
 * Aplica un preset de estilo predefinido
 */
export function applyTextPreset(
  presetName: string,
  onStyleChange: (newStyles: string) => void
): void {
  const preset = TEXT_PRESETS[presetName as keyof typeof TEXT_PRESETS];
  if (preset) {
    onStyleChange(preset.classes);
  }
}

/**
 * Aplica un tema de colores
 */
export function applyTextTheme(
  themeName: string,
  currentClasses: string[],
  onStyleChange: (newStyles: string) => void
): void {
  const theme = TEXT_THEMES[themeName as keyof typeof TEXT_THEMES];
  if (!theme) return;

  // Remover clases de color existentes
  const colorClasses = TEXT_CONTROL_OPTIONS.colors.map(c => c.value);
  const newClasses = currentClasses.filter(cls => !colorClasses.includes(cls));

  // Aplicar colores del tema
  const themeColors = theme.colors;
  newClasses.push(...themeColors);

  onStyleChange(newClasses.join(' ').trim());
}

/**
 * Maneja cambios en el tamaño de fuente con select
 */
export function handleFontSizeChange(
  sizeValue: string,
  currentClasses: string[],
  onStyleChange: (newStyles: string) => void
): void {
  const sizeClasses = TEXT_CONTROL_OPTIONS.fontSizes.map(s => s.value);
  const newClasses = currentClasses.filter(cls => !sizeClasses.includes(cls));
  
  if (sizeValue) {
    newClasses.push(sizeValue);
  }

  onStyleChange(newClasses.join(' ').trim());
}

/**
 * Maneja cambios en el peso de fuente con select
 */
export function handleFontWeightChange(
  weightValue: string,
  currentClasses: string[],
  onStyleChange: (newStyles: string) => void
): void {
  const weightClasses = TEXT_CONTROL_OPTIONS.weights.map(w => w.value);
  const newClasses = currentClasses.filter(cls => !weightClasses.includes(cls));
  
  if (weightValue) {
    newClasses.push(weightValue);
  }

  onStyleChange(newClasses.join(' ').trim());
}

/**
 * Maneja cambios en la familia de fuente
 */
export function handleFontFamilyChange(
  familyValue: string,
  currentClasses: string[],
  onStyleChange: (newStyles: string) => void
): void {
  const familyClasses = TEXT_CONTROL_OPTIONS.fontFamilies.map(f => f.value);
  const newClasses = currentClasses.filter(cls => !familyClasses.includes(cls));
  
  if (familyValue) {
    newClasses.push(familyValue);
  }

  onStyleChange(newClasses.join(' ').trim());
}

/**
 * Maneja cambios en la alineación
 */
export function handleAlignmentChange(
  alignmentValue: string,
  currentClasses: string[],
  onStyleChange: (newStyles: string) => void
): void {
  const alignmentClasses = TEXT_CONTROL_OPTIONS.alignments.map(a => a.value);
  const newClasses = currentClasses.filter(cls => !alignmentClasses.includes(cls));
  
  if (alignmentValue) {
    newClasses.push(alignmentValue);
  }

  onStyleChange(newClasses.join(' ').trim());
}

/**
 * Maneja cambios en la altura de línea
 */
export function handleLineHeightChange(
  lineHeightValue: string,
  currentClasses: string[],
  onStyleChange: (newStyles: string) => void
): void {
  const lineHeightClasses = TEXT_CONTROL_OPTIONS.lineHeight.map(l => l.value);
  const newClasses = currentClasses.filter(cls => !lineHeightClasses.includes(cls));
  
  if (lineHeightValue) {
    newClasses.push(lineHeightValue);
  }

  onStyleChange(newClasses.join(' ').trim());
}

/**
 * Maneja cambios en el espaciado entre letras
 */
export function handleLetterSpacingChange(
  spacingValue: string,
  currentClasses: string[],
  onStyleChange: (newStyles: string) => void
): void {
  const spacingClasses = TEXT_CONTROL_OPTIONS.letterSpacing.map(s => s.value);
  const newClasses = currentClasses.filter(cls => !spacingClasses.includes(cls));
  
  if (spacingValue) {
    newClasses.push(spacingValue);
  }

  onStyleChange(newClasses.join(' ').trim());
}

/**
 * Restablece todos los estilos a los valores por defecto
 */
export function resetTextStyles(onStyleChange: (newStyles: string) => void): void {
  onStyleChange('text-black text-base font-normal not-italic no-underline normal-case tracking-normal leading-none list-none');
}

/**
 * Genera un preview del texto con los estilos actuales
 */
export function generateTextPreview(
  content: string,
  styles: string,
  type: 'text' | 'list' = 'text'
): string {
  const previewContent = content || 'Tu texto aquí';
  
  if (type === 'list') {
    // Para listas, aseguramos que tenga formato de lista
    if (!previewContent.includes('<ul>') && !previewContent.includes('<ol>')) {
      return `<ul><li>${previewContent}</li></ul>`;
    }
    return previewContent;
  }
  
  return previewContent;
}

/**
 * Valida si una clase CSS es válida para texto
 */
export function isValidTextClass(className: string): boolean {
  const allValidClasses = Object.values(TEXT_CONTROL_OPTIONS).flat()
    .map((opt: any) => opt.value.split(' '))
    .flat();
  
  return allValidClasses.includes(className) || 
         className.startsWith('opacity-') ||
         className.startsWith('text-') ||
         className.startsWith('font-') ||
         className.startsWith('leading-') ||
         className.startsWith('tracking-') ||
         className.startsWith('list-');
}
