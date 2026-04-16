import { 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify, 
  Italic, 
  Underline, 
  Strikethrough, 
  Type, 
  Bold,
  CaseSensitive
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Helper functions para obtener iconos según el valor de estilo
 * Centraliza toda la lógica de iconos para evitar duplicación
 */

/**
 * Obtiene el icono de alineación según el valor
 * @param value - Valor de alineación (text-left, text-center, text-right, text-justify)
 * @returns Icono de Lucide correspondiente
 */
export const getAlignmentIcon = (value: string): LucideIcon => {
  switch (value) {
    case 'text-left': return AlignLeft;
    case 'text-center': return AlignCenter;
    case 'text-right': return AlignRight;
    case 'text-justify': return AlignJustify;
    default: return AlignLeft;
  }
};

/**
 * Obtiene el icono de decoración según el valor
 * @param value - Valor de decoración (italic, underline, line-through)
 * @returns Icono de Lucide correspondiente
 */
export const getDecorationIcon = (value: string): LucideIcon => {
  switch (value) {
    case 'italic': return Italic;
    case 'underline': return Underline;
    case 'line-through': return Strikethrough;
    default: return Italic;
  }
};

/**
 * Obtiene el icono de estilo según el valor
 * @param value - Valor de estilo (italic, not-italic)
 * @returns Icono de Lucide correspondiente
 */
export const getStyleIcon = (value: string): LucideIcon => {
  switch (value) {
    case 'italic': return Italic;
    case 'not-italic': return Italic;
    default: return Italic;
  }
};

/**
 * Obtiene el icono para tamaño de fuente
 * @param value - Valor de tamaño (no usado actualmente, pero disponible para futuras extensiones)
 * @returns Icono de Lucide Type
 */
export const getSizeIcon = (value: string): LucideIcon => {
  return Type;
};

/**
 * Obtiene el icono para peso de fuente
 * @param value - Valor de peso (no usado actualmente, pero disponible para futuras extensiones)
 * @returns Icono de Lucide Bold
 */
export const getWeightIcon = (value: string): LucideIcon => {
  return Bold;
};

/**
 * Obtiene el icono para transformación de texto
 * @param value - Valor de transformación (uppercase, lowercase, capitalize)
 * @returns Icono de Lucide CaseSensitive
 */
export const getTransformIcon = (value: string): LucideIcon => {
  return CaseSensitive;
};

/**
 * Función genérica para obtener iconos de vista previa basados en el label
 * @param label - Etiqueta del control
 * @returns Función que retorna el icono correspondiente
 */
export const getPreviewIcon = (label: string) => {
  const lowerLabel = label.toLowerCase();
  
  if (lowerLabel.includes('alineación')) return getAlignmentIcon;
  if (lowerLabel.includes('decoración')) return getDecorationIcon;
  if (lowerLabel.includes('estilo')) return getStyleIcon;
  if (lowerLabel.includes('tamaño')) return getSizeIcon;
  if (lowerLabel.includes('peso')) return getWeightIcon;
  if (lowerLabel.includes('transform')) return getTransformIcon;
  
  return undefined;
};
