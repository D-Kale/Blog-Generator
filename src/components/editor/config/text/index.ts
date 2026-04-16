/**
 * Exportaciones principales para la configuración de texto
 */

// Opciones y constantes
export * from './constants';

// Validadores y utilidades
export * from './validators';

// Manejadores de eventos
export * from './handlers';

// Presets enriquecidos
export * from './presets';

// Re-exportar las opciones originales para compatibilidad
import { TEXT_CONTROL_OPTIONS, TEXT_PRESETS, TEXT_THEMES } from './constants';

export const TEXT_OPTIONS = TEXT_CONTROL_OPTIONS;
export { TEXT_PRESETS, TEXT_THEMES };
