/**
 * Configuración principal para controles de imagen
 * Archivo de compatibilidad que reexporta todo desde la nueva estructura modular
 */

// Reexportar todo desde la estructura modular de images/
export * from './images';

// Mantener compatibilidad con código existente
import { IMAGE_CONTROL_OPTIONS, CSS_FILTERS, IMAGE_SIZES } from './images/constants';

export const IMAGE_CONTROLS = IMAGE_CONTROL_OPTIONS;
export { CSS_FILTERS, IMAGE_SIZES };
