/**
 * Constantes y configuraciones para controles de texto
 */

// Opciones de control organizadas por categoría
export const TEXT_CONTROL_OPTIONS = {
  // Colores de texto
  colors: [
    { name: 'Negro', value: 'text-black', bg: 'bg-black' },
    { name: 'Gris oscuro', value: 'text-gray-900', bg: 'bg-gray-900' },
    { name: 'Gris', value: 'text-gray-700', bg: 'bg-gray-700' },
    { name: 'Gris medio', value: 'text-gray-500', bg: 'bg-gray-500' },
    { name: 'Gris claro', value: 'text-gray-400', bg: 'bg-gray-400' },
    { name: 'Blanco', value: 'text-white', bg: 'bg-white border-2 border-gray-300' },
    { name: 'Azul', value: 'text-blue-600', bg: 'bg-blue-600' },
    { name: 'Azul claro', value: 'text-blue-400', bg: 'bg-blue-400' },
    { name: 'Rojo', value: 'text-red-600', bg: 'bg-red-600' },
    { name: 'Rojo claro', value: 'text-red-400', bg: 'bg-red-400' },
    { name: 'Verde', value: 'text-green-600', bg: 'bg-green-600' },
    { name: 'Verde claro', value: 'text-green-400', bg: 'bg-green-400' },
    { name: 'Amarillo', value: 'text-yellow-600', bg: 'bg-yellow-600' },
    { name: 'Naranja', value: 'text-orange-600', bg: 'bg-orange-600' },
    { name: 'Púrpura', value: 'text-purple-600', bg: 'bg-purple-600' },
  ],

  // Tamaños de fuente
  fontSizes: [
    { name: 'Tiny', value: 'text-xs', size: '12px' },
    { name: 'Pequeño', value: 'text-sm', size: '14px' },
    { name: 'Base', value: 'text-base', size: '16px' },
    { name: 'Mediano', value: 'text-lg', size: '18px' },
    { name: 'Grande', value: 'text-xl', size: '20px' },
    { name: 'XL', value: 'text-2xl', size: '24px' },
    { name: '2XL', value: 'text-3xl', size: '30px' },
    { name: '3XL', value: 'text-4xl', size: '36px' },
    { name: '4XL', value: 'text-5xl', size: '48px' },
    { name: '5XL', value: 'text-6xl', size: '60px' },
    { name: '6XL', value: 'text-7xl', size: '72px' },
    { name: '7XL', value: 'text-8xl', size: '96px' },
    { name: '9XL', value: 'text-9xl', size: '128px' },
  ],

  // Pesos de fuente
  weights: [
    { name: 'Thin', value: 'font-thin', weight: '100' },
    { name: 'Extra Light', value: 'font-extralight', weight: '200' },
    { name: 'Light', value: 'font-light', weight: '300' },
    { name: 'Normal', value: 'font-normal', weight: '400' },
    { name: 'Medium', value: 'font-medium', weight: '500' },
    { name: 'Semibold', value: 'font-semibold', weight: '600' },
    { name: 'Bold', value: 'font-bold', weight: '700' },
    { name: 'Extra Bold', value: 'font-extrabold', weight: '800' },
    { name: 'Black', value: 'font-black', weight: '900' },
  ],

  // Alineación de texto
  alignments: [
    { name: 'Izquierda', value: 'text-left', icon: 'align-left' },
    { name: 'Centro', value: 'text-center', icon: 'align-center' },
    { name: 'Derecha', value: 'text-right', icon: 'align-right' },
    { name: 'Justificado', value: 'text-justify', icon: 'align-justify' },
  ],

  // Estilos de texto
  styles: [
    { name: 'Normal', value: 'not-italic', icon: 'text-normal' },
    { name: 'Itálica', value: 'italic', icon: 'text-italic' },
  ],

  // Decoración de texto
  decoration: [
    { name: 'Sin decorar', value: 'no-underline', icon: 'text-none' },
    { name: 'Subrayado', value: 'underline', icon: 'text-underline' },
    { name: 'Tachado', value: 'line-through', icon: 'text-strikethrough' },
    { name: 'Subrayado grueso', value: 'underline decoration-2', icon: 'text-underline-thick' },
    { name: 'Subrayado punteado', value: 'underline decoration-dotted', icon: 'text-underline-dotted' },
    { name: 'Subrayado ondulado', value: 'underline decoration-wavy', icon: 'text-underline-wavy' },
  ],

  // Transformación de texto
  transform: [
    { name: 'Normal', value: 'normal-case' },
    { name: 'Mayúsculas', value: 'uppercase' },
    { name: 'Minúsculas', value: 'lowercase' },
    { name: 'Capitalizar', value: 'capitalize' },
  ],

  // Espaciado entre letras
  letterSpacing: [
    { name: 'Tighter', value: 'tracking-tighter' },
    { name: 'Tight', value: 'tracking-tight' },
    { name: 'Normal', value: 'tracking-normal' },
    { name: 'Wide', value: 'tracking-wide' },
    { name: 'Wider', value: 'tracking-wider' },
    { name: 'Widest', value: 'tracking-widest' },
  ],

  // Altura de línea
  lineHeight: [
    { name: 'Ninguno', value: 'leading-none' },
    { name: 'Tight', value: 'leading-tight' },
    { name: 'Snug', value: 'leading-snug' },
    { name: 'Normal', value: 'leading-normal' },
    { name: 'Relaxed', value: 'leading-relaxed' },
    { name: 'Loose', value: 'leading-loose' },
  ],

  // Tipografías (requiere configuración adicional)
  fontFamilies: [
    { name: 'Sans', value: 'font-sans' },
    { name: 'Serif', value: 'font-serif' },
    { name: 'Mono', value: 'font-mono' },
  ],

  // Listas
  lists: [
    { name: 'Ninguna', value: 'list-none' },
    { name: 'Disc', value: 'list-disc list-inside ml-6' },
    { name: 'Circle', value: 'list-circle list-inside ml-6' },
    { name: 'Decimal', value: 'list-decimal list-inside ml-6' },
    { name: 'Alpha', value: 'list-alpha list-inside ml-6' },
    { name: 'Roman', value: 'list-roman list-inside ml-6' },
  ],

  // Sombras de texto
  textShadows: [
    { name: 'Ninguna', value: '' },
    { name: 'Suave', value: 'drop-shadow-sm' },
    { name: 'Normal', value: 'drop-shadow' },
    { name: 'Mediana', value: 'drop-shadow-md' },
    { name: 'Grande', value: 'drop-shadow-lg' },
    { name: 'Extra grande', value: 'drop-shadow-xl' },
    { name: '2XL', value: 'drop-shadow-2xl' },
  ],
};

// Estilos predefinidos para texto
export const TEXT_PRESETS = {
  heading1: {
    name: 'Título 1',
    classes: 'text-4xl font-bold text-gray-900 tracking-tight leading-tight',
  },
  heading2: {
    name: 'Título 2',
    classes: 'text-3xl font-semibold text-gray-800 tracking-tight leading-tight',
  },
  heading3: {
    name: 'Título 3',
    classes: 'text-2xl font-semibold text-gray-800 leading-snug',
  },
  body: {
    name: 'Cuerpo',
    classes: 'text-base text-gray-700 leading-relaxed',
  },
  caption: {
    name: 'Leyenda',
    classes: 'text-sm text-gray-500 leading-normal',
  },
  quote: {
    name: 'Cita',
    classes: 'text-lg italic text-gray-600 border-l-4 border-gray-300 pl-4',
  },
  code: {
    name: 'Código',
    classes: 'font-mono text-sm bg-gray-100 px-2 py-1 rounded text-gray-800',
  },
  highlight: {
    name: 'Resaltado',
    classes: 'text-lg font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded',
  },
  button: {
    name: 'Botón',
    classes: 'font-semibold text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors',
  },
  link: {
    name: 'Enlace',
    classes: 'text-blue-600 hover:text-blue-800 underline transition-colors',
  },
};

// Configuración de UI
export const TEXT_UI_CONFIG = {
  // Tamaños de preview
  previewHeight: 80,
  previewMaxWidth: 200,
  
  // Configuración de opacidad - valores específicos permitidos
  opacityValues: [
    { value: 0, label: '0%' },
    { value: 10, label: '10%' },
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: '100%' },
  ],
  
  // Espaciado
  colorGridCols: 6,
  presetGridCols: 2,
  
  // Textos
  placeholderText: 'Tu texto aquí...',
  advancedModeLabel: 'Modo avanzado',
  resetButtonLabel: 'Restablecer',
};

// Colores temáticos predefinidos
export const TEXT_THEMES = {
  default: {
    name: 'Por defecto',
    colors: ['text-black', 'text-gray-600', 'text-gray-400'],
  },
  dark: {
    name: 'Oscuro',
    colors: ['text-white', 'text-gray-300', 'text-gray-500'],
  },
  blue: {
    name: 'Azul',
    colors: ['text-blue-600', 'text-blue-400', 'text-blue-200'],
  },
  warm: {
    name: 'Cálido',
    colors: ['text-orange-600', 'text-orange-400', 'text-yellow-500'],
  },
  nature: {
    name: 'Naturaleza',
    colors: ['text-green-600', 'text-green-400', 'text-emerald-500'],
  },
  purple: {
    name: 'Púrpura',
    colors: ['text-purple-600', 'text-purple-400', 'text-pink-500'],
  },
};
