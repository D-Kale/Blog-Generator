/**
 * Manejadores de operaciones para listas
 */
import type { Block } from '../../CanvasEditor';
import { LIST_TYPES, LIST_STYLES, LIST_COLORS, LIST_SIZES, LIST_WEIGHTS, LIST_ALIGNMENTS, LIST_SPACING, LIST_INDENTATION, LIST_DECORATIONS, LIST_PRESETS, LIST_TEMPLATES } from './constants';

export interface ListUpdateHandler {
  (updates: Partial<Block>): void;
}

/**
 * Maneja el cambio de estilos de lista
 */
export function createListStyleHandler(styles: string, onStyleChange: (newStyles: string) => void) {
  return (newStyles: string) => {
    onStyleChange(newStyles);
  };
}

/**
 * Maneja el cambio de tipo de lista
 */
export function handleListTypeChange(
  typeValue: string,
  currentClasses: string[],
  onStyleChange: (newStyles: string) => void
): void {
  // Remover clases de tipo de lista existentes
  const listTypeClasses = Object.values(LIST_TYPES).map(type => type.value);
  const newClasses = currentClasses.filter(cls => !listTypeClasses.some(listType => cls.includes(listType.split(' ')[0])));
  
  // Aplicar nuevo tipo
  if (typeValue && typeValue !== 'none') {
    newClasses.push(...typeValue.split(' '));
  }

  onStyleChange(newClasses.join(' ').trim());
}

/**
 * Maneja el cambio de preset de lista
 */
export function applyListPreset(
  presetName: string,
  onStyleChange: (newStyles: string) => void
): void {
  const preset = LIST_PRESETS[presetName as keyof typeof LIST_PRESETS];
  if (preset) {
    onStyleChange(preset.classes);
  }
}

/**
 * Maneja el cambio de color de lista
 */
export function handleListColorChange(
  colorValue: string,
  currentClasses: string[],
  onStyleChange: (newStyles: string) => void
): void {
  // Remover clases de color existentes
  const colorClasses = LIST_COLORS.map(c => c.value);
  const newClasses = currentClasses.filter(cls => !colorClasses.includes(cls));
  
  // Aplicar nuevo color
  if (colorValue) {
    newClasses.push(colorValue);
  }

  onStyleChange(newClasses.join(' ').trim());
}

/**
 * Maneja el cambio de tamaño de fuente
 */
export function handleListSizeChange(
  sizeValue: string,
  currentClasses: string[],
  onStyleChange: (newStyles: string) => void
): void {
  // Remover clases de tamaño existentes
  const sizeClasses = LIST_SIZES.map(s => s.value);
  const newClasses = currentClasses.filter(cls => !sizeClasses.includes(cls));
  
  // Aplicar nuevo tamaño
  if (sizeValue) {
    newClasses.push(sizeValue);
  }

  onStyleChange(newClasses.join(' ').trim());
}

/**
 * Maneja el cambio de peso de fuente
 */
export function handleListWeightChange(
  weightValue: string,
  currentClasses: string[],
  onStyleChange: (newStyles: string) => void
): void {
  // Remover clases de peso existentes
  const weightClasses = LIST_WEIGHTS.map(w => w.value);
  const newClasses = currentClasses.filter(cls => !weightClasses.includes(cls));
  
  // Aplicar nuevo peso
  if (weightValue) {
    newClasses.push(weightValue);
  }

  onStyleChange(newClasses.join(' ').trim());
}

/**
 * Maneja el cambio de alineación
 */
export function handleListAlignmentChange(
  alignmentValue: string,
  currentClasses: string[],
  onStyleChange: (newStyles: string) => void
): void {
  // Remover clases de alineación existentes
  const alignmentClasses = LIST_ALIGNMENTS.map(a => a.value);
  const newClasses = currentClasses.filter(cls => !alignmentClasses.includes(cls));
  
  // Aplicar nueva alineación
  if (alignmentValue) {
    newClasses.push(alignmentValue);
  }

  onStyleChange(newClasses.join(' ').trim());
}

/**
 * Maneja el cambio de espaciado
 */
export function handleListSpacingChange(
  spacingValue: string,
  currentClasses: string[],
  onStyleChange: (newStyles: string) => void
): void {
  // Remover clases de espaciado existentes
  const spacingClasses = Object.values(LIST_SPACING).map(s => s.value).filter(Boolean);
  const newClasses = currentClasses.filter(cls => !spacingClasses.includes(cls));
  
  // Aplicar nuevo espaciado
  if (spacingValue) {
    newClasses.push(spacingValue);
  }

  onStyleChange(newClasses.join(' ').trim());
}

/**
 * Maneja el cambio de indentación
 */
export function handleListIndentationChange(
  indentValue: string,
  currentClasses: string[],
  onStyleChange: (newStyles: string) => void
): void {
  // Remover clases de indentación existentes
  const indentClasses = Object.values(LIST_INDENTATION).map(i => i.value).filter(Boolean);
  const newClasses = currentClasses.filter(cls => !indentClasses.includes(cls));
  
  // Aplicar nueva indentación
  if (indentValue) {
    newClasses.push(indentValue);
  }

  onStyleChange(newClasses.join(' ').trim());
}

/**
 * Maneja el cambio de decoración
 */
export function handleListDecorationChange(
  decorationValue: string,
  currentClasses: string[],
  onStyleChange: (newStyles: string) => void
): void {
  // Remover clases de decoración existentes
  const decorationClasses = Object.values(LIST_DECORATIONS).map(d => d.value).filter(Boolean);
  const newClasses = currentClasses.filter(cls => !decorationClasses.includes(cls));
  
  // Aplicar nueva decoración
  if (decorationValue) {
    newClasses.push(decorationValue);
  }

  onStyleChange(newClasses.join(' ').trim());
}

/**
 * Genera contenido HTML para una lista
 */
export function generateListHTML(
  items: string[],
  listType: string = 'disc'
): string {
  const isOrdered = listType.includes('decimal') || listType.includes('alpha') || listType.includes('roman');
  const tag = isOrdered ? 'ol' : 'ul';
  
  const listItems = items.map(item => `<li>${item}</li>`).join('');
  
  return `<${tag}>${listItems}</${tag}>`;
}

/**
 * Extrae elementos de lista del contenido HTML
 */
export function extractListItems(content: string): string[] {
  // Crear un DOM temporal para parsear el HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  
  const listItems = Array.from(tempDiv.querySelectorAll('li')).map(li => li.textContent || '');
  
  return listItems.filter(item => item.trim() !== '');
}

/**
 * Añade un elemento a la lista
 */
export function addListItem(content: string, newItem: string): string {
  const items = extractListItems(content);
  items.push(newItem);
  
  // Determinar el tipo de lista actual
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  const listElement = tempDiv.querySelector('ul, ol');
  const listType = listElement?.tagName.toLowerCase() === 'ol' ? 'decimal' : 'disc';
  
  return generateListHTML(items, listType);
}

/**
 * Elimina un elemento de la lista
 */
export function removeListItem(content: string, index: number): string {
  const items = extractListItems(content);
  items.splice(index, 1);
  
  // Determinar el tipo de lista actual
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  const listElement = tempDiv.querySelector('ul, ol');
  const listType = listElement?.tagName.toLowerCase() === 'ol' ? 'decimal' : 'disc';
  
  return generateListHTML(items, listType);
}

/**
 * Actualiza un elemento de la lista
 */
export function updateListItem(content: string, index: number, newItem: string): string {
  const items = extractListItems(content);
  items[index] = newItem;
  
  // Determinar el tipo de lista actual
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  const listElement = tempDiv.querySelector('ul, ol');
  const listType = listElement?.tagName.toLowerCase() === 'ol' ? 'decimal' : 'disc';
  
  return generateListHTML(items, listType);
}

/**
 * Valida el contenido de una lista
 */
export function validateListContent(content: string): {
  isValid: boolean;
  error?: string;
  itemCount: number;
} {
  const items = extractListItems(content);
  
  if (items.length === 0) {
    return { isValid: false, error: 'La lista debe tener al menos un elemento', itemCount: 0 };
  }
  
  // Verificar estructura HTML básica
  const hasValidStructure = /<(ul|ol)[^>]*>.*<\/\1>/i.test(content);
  if (!hasValidStructure) {
    return { isValid: false, error: 'Estructura de lista inválida', itemCount: items.length };
  }
  
  return { isValid: true, itemCount: items.length };
}

/**
 * Aplica una plantilla de lista
 */
export function applyListTemplate(
  templateName: string,
  onStyleChange: (newStyles: string) => void,
  onContentChange: (newContent: string) => void
): void {
  const template = LIST_TEMPLATES[templateName as keyof typeof LIST_TEMPLATES];
  if (!template) return;
  
  // Aplicar estilo del preset
  const preset = LIST_PRESETS[template.style as keyof typeof LIST_PRESETS];
  if (preset) {
    onStyleChange(preset.classes);
  }
  
  // Generar contenido
  const newContent = generateListHTML(template.items, template.type);
  onContentChange(newContent);
}
