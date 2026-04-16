/**
 * Utilidades de validación para imágenes
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  type?: 'url' | 'file' | 'size' | 'format';
}

// Patrones de URL válidos para imágenes
export const URL_PATTERNS = {
  // URLs estándar con extensiones de imagen
  standard: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i,
  // Picsum Photos
  picsum: /^https?:\/\/picsum\.photos\/.+/i,
  // Unsplash
  unsplash: /^https?:\/\/images\.unsplash\.com\/.+/i,
  // Base64
  base64: /^data:image\/.+/i,
  // Otros servicios de imágenes
  cloudinary: /^https?:\/\/res\.cloudinary\.com\/.+/i,
  imgur: /^https?:\/\/i\.imgur\.com\/.+/i,
  // Dominios CDN comunes
  cdn: /^https?:\/\/(?:cdn\.|static\.|assets\.)?.+\.(jpg|jpeg|png|gif|webp|svg)/i,
};

/**
 * Valida si una URL de imagen es válida
 */
export function validateImageUrl(url: string): ValidationResult {
  if (!url || !url.trim()) {
    return { isValid: false, error: 'La URL está vacía', type: 'url' };
  }

  const trimmedUrl = url.trim();

  // Verificar si coincide con algún patrón válido
  const isValidPattern = Object.values(URL_PATTERNS).some(pattern => 
    pattern.test(trimmedUrl)
  );

  if (!isValidPattern) {
    return { 
      isValid: false, 
      error: 'Formato de URL no válido. Use URLs de imágenes (jpg, png, webp, etc.)', 
      type: 'url' 
    };
  }

  return { isValid: true };
}

/**
 * Valida un archivo de imagen
 */
export function validateImageFile(file: File): ValidationResult {
  // Validar tipo de archivo
  if (!file.type.startsWith('image/')) {
    return { 
      isValid: false, 
      error: 'El archivo no es una imagen válida', 
      type: 'format' 
    };
  }

  // Validar tamaño (máximo 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return { 
      isValid: false, 
      error: 'El archivo es demasiado grande. Máximo 10MB', 
      type: 'size' 
    };
  }

  // Validar tamaño mínimo (1KB)
  if (file.size < 1024) {
    return { 
      isValid: false, 
      error: 'El archivo es demasiado pequeño', 
      type: 'size' 
    };
  }

  return { isValid: true };
}

/**
 * Convierte un archivo a Base64
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        resolve(result);
      } else {
        reject(new Error('Error al convertir el archivo a Base64'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error al leer el archivo'));
    };
    
    reader.readAsDataURL(file);
  });
}

/**
 * Genera una URL de placeholder SVG
 */
export function generatePlaceholderUrl(width: number, height: number, text?: string): string {
  const defaultText = text || 'Imagen no disponible';
  const encodedText = encodeURIComponent(defaultText);
  
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-family='Arial, sans-serif' font-size='14'%3E${encodedText}%3C/text%3E%3C/svg%3E`;
}

/**
 * Genera una URL de error para imágenes que no cargan
 */
export function generateErrorUrl(width: number, height: number): string {
  return generatePlaceholderUrl(width, height, 'Error al cargar imagen');
}

/**
 * Extrae el dominio de una URL
 */
export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return 'desconocido';
  }
}

/**
 * Determina el tipo de fuente de imagen
 */
export function getImageSourceType(url: string): 'url' | 'base64' | 'placeholder' | 'unknown' {
  if (!url) return 'unknown';
  
  if (url.startsWith('data:image/')) return 'base64';
  if (url.startsWith('data:image/svg+xml')) return 'placeholder';
  if (URL_PATTERNS.standard.test(url) || 
      URL_PATTERNS.picsum.test(url) || 
      URL_PATTERNS.unsplash.test(url)) return 'url';
  
  return 'unknown';
}
