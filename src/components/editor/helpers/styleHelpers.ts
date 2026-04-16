/**
 * Helper functions para manejo de estilos de texto
 * Centraliza funciones comunes para evitar duplicación
 */

/**
 * Maneja cambios de estilo genéricos
 * @param category - Categoría del estilo (fontSizes, weights, etc.)
 * @param value - Nuevo valor a aplicar
 * @param currentClasses - Clases CSS actuales
 * @param styleHandler - Función para aplicar los cambios
 * @param TEXT_OPTIONS - Opciones de texto disponibles
 */
export const handleStyleChange = (
  category: string,
  value: string,
  currentClasses: string[],
  styleHandler: (styles: string) => void,
  TEXT_OPTIONS: any
) => {
  const categoryOptions = TEXT_OPTIONS[category]?.map((opt: any) => opt.value) || [];
  let newClasses = currentClasses.filter(cls => !categoryOptions.includes(cls));

  if (value && value !== '') {
    newClasses.push(value);
  }

  styleHandler(newClasses.join(' ').trim());
};

/**
 * Maneja cambios de estilo con arrays predefinidos
 * @param styleClasses - Array de clases de estilo
 * @param value - Nuevo valor a aplicar
 * @param currentClasses - Clases CSS actuales
 * @param styleHandler - Función para aplicar los cambios
 */
export const handleArrayStyleChange = (
  styleClasses: string[],
  value: string,
  currentClasses: string[],
  styleHandler: (styles: string) => void
) => {
  let newClasses = currentClasses.filter(cls => !styleClasses.includes(cls));
  if (value) newClasses.push(value);
  styleHandler(newClasses.join(' ').trim());
};

/**
 * Verifica si una clase está activa
 * @param value - Valor a verificar
 * @param currentClasses - Clases CSS actuales
 * @returns true si la clase está activa
 */
export const isStyleActive = (value: string, currentClasses: string[]): boolean => {
  return currentClasses.includes(value);
};

/**
 * Obtiene el valor activo de una categoría
 * @param category - Categoría del estilo
 * @param currentClasses - Clases CSS actuales
 * @param TEXT_OPTIONS - Opciones de texto disponibles
 * @returns Valor activo o string vacío
 */
export const getActiveStyle = (
  category: string,
  currentClasses: string[],
  TEXT_OPTIONS: any
): string => {
  return currentClasses.find(c => 
    TEXT_OPTIONS[category]?.some((option: any) => option.value === c)
  ) || '';
};

/**
 * Resetea todos los estilos a valores por defecto
 * @param styleHandler - Función para aplicar los cambios
 */
export const resetAllStyles = (styleHandler: (styles: string) => void) => {
  styleHandler('text-black text-base font-normal not-italic no-underline normal-case tracking-normal leading-none list-none');
};
