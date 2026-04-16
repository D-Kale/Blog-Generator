/**
 * Exportaciones principales para la configuración de imágenes
 */

// Opciones y constantes
export * from './constants';

// Validadores y utilidades
export * from './validators';

// Manejadores de eventos
export * from './handlers';
export { createStyleHandler } from './handlers';

// Re-exportar las opciones originales para compatibilidad
import { IMAGE_CONTROL_OPTIONS, CSS_FILTERS, IMAGE_SIZES } from './constants';

export const IMAGE_CONTROLS = IMAGE_CONTROL_OPTIONS;
export { CSS_FILTERS, IMAGE_SIZES };
