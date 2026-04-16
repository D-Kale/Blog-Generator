/**
 * Exportaciones principales para la configuración de listas
 */

// Opciones y constantes
export * from './constants';

// Manejadores de eventos
export * from './handlers';

export * from './presets';

// Re-exportar para compatibilidad
import { LIST_TYPES, LIST_STYLES, LIST_COLORS, LIST_SIZES, LIST_WEIGHTS, LIST_ALIGNMENTS, LIST_SPACING, LIST_INDENTATION, LIST_DECORATIONS, LIST_PRESETS, LIST_TEMPLATES, LIST_UI_CONFIG } from './constants';
import { createListStyleHandler, handleListTypeChange, handleListColorChange, handleListSizeChange, handleListWeightChange, handleListAlignmentChange, handleListSpacingChange, handleListIndentationChange, handleListDecorationChange, applyListPreset, applyListTemplate, generateListHTML, extractListItems, addListItem, removeListItem, updateListItem, validateListContent } from './handlers';

export const LIST_CONFIG = {
  types: LIST_TYPES,
  styles: LIST_STYLES,
  colors: LIST_COLORS,
  sizes: LIST_SIZES,
  weights: LIST_WEIGHTS,
  alignments: LIST_ALIGNMENTS,
  spacing: LIST_SPACING,
  indentation: LIST_INDENTATION,
  decorations: LIST_DECORATIONS,
  presets: LIST_PRESETS,
  templates: LIST_TEMPLATES,
  ui: LIST_UI_CONFIG,
};

export const LIST_HANDLERS = {
  createStyleHandler: createListStyleHandler,
  handleTypeChange: handleListTypeChange,
  handleColorChange: handleListColorChange,
  handleSizeChange: handleListSizeChange,
  handleWeightChange: handleListWeightChange,
  handleAlignmentChange: handleListAlignmentChange,
  handleSpacingChange: handleListSpacingChange,
  handleIndentationChange: handleListIndentationChange,
  handleDecorationChange: handleListDecorationChange,
  applyPreset: applyListPreset,
  applyTemplate: applyListTemplate,
  generateHTML: generateListHTML,
  extractItems: extractListItems,
  addItem: addListItem,
  removeItem: removeListItem,
  updateItem: updateListItem,
  validate: validateListContent,
};
