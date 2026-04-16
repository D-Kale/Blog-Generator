/**
 * Centralización de helpers del editor
 * Exporta todas las funciones utilitarias para evitar duplicación
 */

// Icon helpers
export {
  getAlignmentIcon,
  getDecorationIcon,
  getStyleIcon,
  getSizeIcon,
  getWeightIcon,
  getTransformIcon,
  getPreviewIcon
} from './iconHelpers';

// Style helpers
export {
  handleStyleChange,
  handleArrayStyleChange,
  isStyleActive,
  getActiveStyle,
  resetAllStyles
} from './styleHelpers';
