/**
 * Constantes y configuraciones para controles de imagen
 */

// Opciones de controles organizadas por categoría
export const IMAGE_CONTROL_OPTIONS = {
  // Ajuste de objeto (object-fit)
  objectFit: [
    { name: 'Cubrir', value: 'object-cover' },
    { name: 'Contener', value: 'object-contain' },
    { name: 'Rellenar', value: 'object-fill' },
    { name: 'Escala abajo', value: 'object-scale-down' },
    { name: 'Ninguno', value: 'object-none' },
  ],

  // Redondeado de bordes
  rounded: [
    { name: 'Ninguno', value: '' },
    { name: 'Pequeño', value: 'rounded-sm' },
    { name: 'Normal', value: 'rounded' },
    { name: 'Mediano', value: 'rounded-md' },
    { name: 'Grande', value: 'rounded-lg' },
    { name: 'Extra grande', value: 'rounded-xl' },
    { name: '2XL', value: 'rounded-2xl' },
    { name: '3XL', value: 'rounded-3xl' },
    { name: 'Completo', value: 'rounded-full' },
  ],

  // Sombras
  shadows: [
    { name: 'Ninguna', value: '' },
    { name: 'Suave', value: 'shadow-sm' },
    { name: 'Normal', value: 'shadow' },
    { name: 'Mediana', value: 'shadow-md' },
    { name: 'Grande', value: 'shadow-lg' },
    { name: 'Extra grande', value: 'shadow-xl' },
    { name: '2XL', value: 'shadow-2xl' },
    { name: 'Interna', value: 'shadow-inner' },
  ],

  // Filtros básicos de Tailwind
  filters: [
    { name: 'Ninguno', value: '' },
    { name: 'Grises', value: 'grayscale' },
    { name: 'Sepia', value: 'sepia' },
    { name: 'Desenfoque', value: 'blur-sm' },
    { name: 'Brillo', value: 'brightness-110' },
    { name: 'Contraste', value: 'contrast-125' },
    { name: 'Saturación', value: 'saturate-150' },
    { name: 'Hue', value: 'hue-rotate-90' },
    { name: 'Invertir', value: 'invert' },
  ],

  // Opacidad
  opacity: [
    { name: '100%', value: '' },
    { name: '90%', value: 'opacity-90' },
    { name: '75%', value: 'opacity-75' },
    { name: '50%', value: 'opacity-50' },
    { name: '25%', value: 'opacity-25' },
    { name: '10%', value: 'opacity-10' },
  ],

  // Escala
  scale: [
    { name: '100%', value: '' },
    { name: '110%', value: 'scale-110' },
    { name: '125%', value: 'scale-125' },
    { name: '150%', value: 'scale-150' },
    { name: '75%', value: 'scale-75' },
    { name: '50%', value: 'scale-50' },
  ],

  // Rotación
  rotate: [
    { name: '0°', value: '' },
    { name: '45°', value: 'rotate-45' },
    { name: '90°', value: 'rotate-90' },
    { name: '180°', value: 'rotate-180' },
    { name: '-45°', value: '-rotate-45' },
    { name: '-90°', value: '-rotate-90' },
  ],

  // Grosor de borde
  border: [
    { name: 'Ninguno', value: '' },
    { name: 'Fino', value: 'border' },
    { name: 'Mediano', value: 'border-2' },
    { name: 'Grande', value: 'border-4' },
    { name: 'Extra grande', value: 'border-8' },
  ],

  // Colores de borde
  borderColors: [
    { name: 'Transparente', value: 'border-transparent' },
    { name: 'Negro', value: 'border-black' },
    { name: 'Blanco', value: 'border-white' },
    { name: 'Gris', value: 'border-gray-300' },
    { name: 'Azul', value: 'border-blue-500' },
    { name: 'Rojo', value: 'border-red-500' },
    { name: 'Verde', value: 'border-green-500' },
    { name: 'Amarillo', value: 'border-yellow-500' },
  ],
};

// Filtros CSS personalizados para efectos profesionales
export const CSS_FILTERS = {
  none: '',
  vintage: 'sepia(0.5) contrast(1.2) brightness(0.9)',
  cold: 'hue-rotate(180deg) saturate(0.7)',
  warm: 'hue-rotate(30deg) saturate(1.2) brightness(1.1)',
  dramatic: 'contrast(1.4) brightness(0.9) saturate(1.3)',
  blackWhite: 'grayscale(1) contrast(1.2)',
  blur: 'blur(2px)',
  sharp: 'contrast(1.3) brightness(1.05)',
  faded: 'opacity(0.7) brightness(1.1)',
};

// Tamaños predefinidos para imágenes
export const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 200 },
  medium: { width: 600, height: 400 },
  large: { width: 1200, height: 800 },
  hero: { width: 1920, height: 1080 },
  square: { width: 500, height: 500 },
  portrait: { width: 400, height: 600 },
  landscape: { width: 800, height: 400 },
};

// Configuración de archivos
export const FILE_CONFIG = {
  maxSize: 10 * 1024 * 1024, // 10MB
  minSize: 1024, // 1KB
  allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
};

// Mensajes de error y validación
export const VALIDATION_MESSAGES = {
  emptyUrl: 'La URL está vacía',
  invalidUrl: 'Formato de URL no válido. Use URLs de imágenes (jpg, png, webp, etc.)',
  invalidFile: 'El archivo no es una imagen válida',
  fileTooLarge: 'El archivo es demasiado grande. Máximo 10MB',
  fileTooSmall: 'El archivo es demasiado pequeño',
  processingError: 'Error al procesar la imagen. Intente nuevamente.',
};

// Configuración de UI
export const UI_CONFIG = {
  previewHeight: 128, // Altura del preview en píxeles
  maxFileSizeDisplay: '10MB',
  supportedFormats: 'JPG, PNG, GIF, WebP, SVG',
  placeholderText: 'https://ejemplo.com/imagen.jpg',
  uploadButtonText: 'Subir Imagen',
  advancedControlsLabel: 'Controles Avanzados',
};
