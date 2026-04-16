/**
 * Constantes y configuraciones para controles de listas
 */

// Tipos de listas (solo clases Tailwind válidas)
export const LIST_TYPES = {
  none: { name: 'Sin lista', value: 'list-none', icon: 'list-none' },
  disc: { name: 'Discos', value: 'list-disc list-inside ml-6', icon: 'list-disc' },
  circle: { name: 'Círculos', value: 'list-circle list-inside ml-6', icon: 'list-circle' },
  decimal: { name: 'Números', value: 'list-decimal list-inside ml-6', icon: 'list-decimal' },
  square: { name: 'Cuadrados', value: 'list-square list-inside ml-6', icon: 'list-square' },
  // Nota: list-alpha y list-roman no existen en Tailwind estándar
};

// Estilos de listas
export const LIST_STYLES = {
  basic: {
    name: 'Básico',
    description: 'Estilo simple y limpio',
    classes: 'text-gray-700 text-base leading-relaxed',
  },
  compact: {
    name: 'Compacto',
    description: 'Espaciado reducido',
    classes: 'text-gray-600 text-sm leading-tight',
  },
  spacious: {
    name: 'Espaciado',
    description: 'Mayor separación',
    classes: 'text-gray-700 text-lg leading-loose',
  },
  elegant: {
    name: 'Elegante',
    description: 'Estilo sofisticado',
    classes: 'text-gray-800 text-base leading-relaxed font-light',
  },
  modern: {
    name: 'Moderno',
    description: 'Diseño contemporáneo',
    classes: 'text-gray-700 text-base leading-relaxed font-medium',
  },
};

// Colores para listas
export const LIST_COLORS = [
  { name: 'Negro', value: 'text-black', bg: 'bg-black' },
  { name: 'Gris oscuro', value: 'text-gray-900', bg: 'bg-gray-900' },
  { name: 'Gris', value: 'text-gray-700', bg: 'bg-gray-700' },
  { name: 'Gris medio', value: 'text-gray-500', bg: 'bg-gray-500' },
  { name: 'Azul', value: 'text-blue-600', bg: 'bg-blue-600' },
  { name: 'Azul claro', value: 'text-blue-400', bg: 'bg-blue-400' },
  { name: 'Verde', value: 'text-green-600', bg: 'bg-green-600' },
  { name: 'Verde claro', value: 'text-green-400', bg: 'bg-green-400' },
  { name: 'Rojo', value: 'text-red-600', bg: 'bg-red-600' },
  { name: 'Naranja', value: 'text-orange-600', bg: 'bg-orange-600' },
  { name: 'Púrpura', value: 'text-purple-600', bg: 'bg-purple-600' },
  { name: 'Rosa', value: 'text-pink-500', bg: 'bg-pink-500' },
];

// Tamaños de fuente para listas
export const LIST_SIZES = [
  { name: 'Pequeño', value: 'text-xs', size: '12px' },
  { name: 'Menor', value: 'text-sm', size: '14px' },
  { name: 'Base', value: 'text-base', size: '16px' },
  { name: 'Mediano', value: 'text-lg', size: '18px' },
  { name: 'Grande', value: 'text-xl', size: '20px' },
  { name: 'XL', value: 'text-2xl', size: '24px' },
];

// Pesos de fuente para listas
export const LIST_WEIGHTS = [
  { name: 'Light', value: 'font-light', weight: '300' },
  { name: 'Normal', value: 'font-normal', weight: '400' },
  { name: 'Medium', value: 'font-medium', weight: '500' },
  { name: 'Semibold', value: 'font-semibold', weight: '600' },
  { name: 'Bold', value: 'font-bold', weight: '700' },
];

// Alineación para listas
export const LIST_ALIGNMENTS = [
  { name: 'Izquierda', value: 'text-left', icon: 'align-left' },
  { name: 'Centro', value: 'text-center', icon: 'align-center' },
  { name: 'Derecha', value: 'text-right', icon: 'align-right' },
  { name: 'Justificado', value: 'text-justify', icon: 'align-justify' },
];

// Espaciado entre elementos
export const LIST_SPACING = {
  none: { name: 'Ninguno', value: '', description: 'Sin espaciado extra' },
  tight: { name: 'Apretado', value: 'space-y-1', description: 'Espaciado mínimo' },
  normal: { name: 'Normal', value: 'space-y-2', description: 'Espaciado estándar' },
  relaxed: { name: 'Relajado', value: 'space-y-3', description: 'Espaciado amplio' },
  loose: { name: 'Separado', value: 'space-y-4', description: 'Espaciado máximo' },
};

// Indentación (sangría)
export const LIST_INDENTATION = {
  none: { name: 'Ninguna', value: 'ml-0', description: 'Sin sangría' },
  small: { name: 'Pequeña', value: 'ml-2', description: 'Sangría pequeña' },
  medium: { name: 'Mediana', value: 'ml-4', description: 'Sangría media' },
  large: { name: 'Grande', value: 'ml-6', description: 'Sangría grande' },
  extra: { name: 'Extra', value: 'ml-8', description: 'Sangría extra' },
};

// Decoración de elementos (solo clases Tailwind válidas)
export const LIST_DECORATIONS = {
  none: { name: 'Ninguna', value: '', description: 'Sin decoración' },
  underline: { name: 'Subrayado', value: 'underline', description: 'Subrayar elementos' },
  strikethrough: { name: 'Tachado', value: 'line-through', description: 'Tachar elementos' },
  // Nota: decoration-dotted y decoration-dashed no existen en Tailwind estándar
};

// Presets de listas predefinidos
export const LIST_PRESETS = {
  simple: {
    name: 'Lista Simple',
    description: 'Lista básica con discos',
    classes: 'list-disc list-inside ml-6 text-gray-700 text-base leading-relaxed',
    icon: 'list-disc',
  },
  numbered: {
    name: 'Lista Numerada',
    description: 'Lista con números',
    classes: 'list-decimal list-inside ml-6 text-gray-700 text-base leading-relaxed',
    icon: 'list-decimal',
  },
  checklist: {
    name: 'Checklist',
    description: 'Lista de verificación',
    classes: 'list-none list-inside ml-6 text-gray-700 text-base leading-relaxed',
    icon: 'check-square',
  },
  elegant: {
    name: 'Lista Elegante',
    description: 'Estilo sofisticado',
    classes: 'list-disc list-inside ml-6 text-gray-800 text-base leading-loose font-light italic',
    icon: 'list-disc',
  },
  modern: {
    name: 'Lista Moderna',
    description: 'Diseño contemporáneo',
    classes: 'list-circle list-inside ml-6 text-gray-700 text-lg leading-relaxed font-medium',
    icon: 'list-circle',
  },
  compact: {
    name: 'Lista Compacta',
    description: 'Espacio reducido',
    classes: 'list-square list-inside ml-4 text-gray-600 text-sm leading-tight',
    icon: 'list-square',
  },
};

// Configuración de UI
export const LIST_UI_CONFIG = {
  // Grid layouts
  typeGridCols: 3,
  colorGridCols: 6,
  presetGridCols: 2,
  
  // Espaciado
  sectionSpacing: 6,
  itemSpacing: 4,
  
  // Textos
  placeholderText: 'Elemento de lista...',
  addButtonText: 'Añadir elemento',
  removeButtonText: 'Eliminar',
  
  // Animaciones
  transitionDuration: 200,
};

// Plantillas de contenido para listas
export const LIST_TEMPLATES = {
  todo: {
    name: 'Lista de Tareas',
    items: [
      'Tarea importante #1',
      'Tarea secundaria #2',
      'Tarea opcional #3',
    ],
    type: 'disc',
    style: 'modern',
  },
  shopping: {
    name: 'Lista de Compras',
    items: [
      'Artículo #1',
      'Artículo #2',
      'Artículo #3',
    ],
    type: 'decimal',
    style: 'basic',
  },
  steps: {
    name: 'Pasos a Seguir',
    items: [
      'Paso inicial',
      'Paso intermedio',
      'Paso final',
    ],
    type: 'alpha',
    style: 'elegant',
  },
  features: {
    name: 'Características',
    items: [
      'Característica principal',
      'Característica secundaria',
      'Característica adicional',
    ],
    type: 'circle',
    style: 'modern',
  },
};
