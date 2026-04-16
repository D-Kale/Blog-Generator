/**
 * Manejadores de operaciones para imágenes
 */
import type { Block } from '../../CanvasEditor';
import { validateImageUrl, validateImageFile, fileToBase64, generatePlaceholderUrl } from './validators';

export interface ImageUpdateHandler {
  (updates: Partial<Block>): void;
}

/**
 * Maneja el cambio de URL de imagen
 */
export function handleUrlChange(
  newUrl: string,
  onUpdate: ImageUpdateHandler,
  setValidationState: (isValid: boolean) => void
): void {
  const validation = validateImageUrl(newUrl);
  setValidationState(validation.isValid);
  
  if (validation.isValid) {
    onUpdate({ content: newUrl });
  }
}

/**
 * Maneja la subida de archivos de imagen
 */
export async function handleFileUpload(
  event: React.ChangeEvent<HTMLInputElement>,
  onUpdate: ImageUpdateHandler,
  setValidationState: (isValid: boolean) => void,
  setImageUrl: (url: string) => void
): Promise<void> {
  const file = event.target.files?.[0];
  if (!file) return;

  const validation = validateImageFile(file);
  if (!validation.isValid) {
    alert(validation.error);
    return;
  }

  try {
    const base64Url = await fileToBase64(file);
    setImageUrl(base64Url);
    setValidationState(true);
    onUpdate({ content: base64Url });
  } catch (error) {
    alert('Error al procesar la imagen. Intente nuevamente.');
    console.error('Error processing image:', error);
  }
}

/**
 * Maneja el cambio de tamaño predefinido
 */
export function handleSizeChange(
  sizeName: string,
  sizes: Record<string, { width: number; height: number }>,
  onUpdate: ImageUpdateHandler
): void {
  const size = sizes[sizeName];
  if (size) {
    onUpdate({
      dimensions: { width: size.width, height: size.height },
      width: size.width,
      height: size.height,
    });
  }
}

/**
 * Maneja la aplicación de filtros CSS personalizados
 */
export function handleCssFilter(
  filterName: string,
  cssFilters: Record<string, string>,
  currentClasses: string[],
  onUpdate: ImageUpdateHandler
): void {
  const filterValue = cssFilters[filterName];
  
  // Remover clases de filtro existentes
  const newClasses = currentClasses.filter(cls => 
    !cls.startsWith('filter-') && 
    !cls.includes('grayscale') && 
    !cls.includes('sepia') && 
    !cls.includes('blur') && 
    !cls.includes('brightness') && 
    !cls.includes('contrast') && 
    !cls.includes('saturate') && 
    !cls.includes('hue-rotate') && 
    !cls.includes('invert')
  );
  
  if (filterValue) {
    newClasses.push('filter-custom');
    onUpdate({ 
      styles: newClasses.join(' '),
      cssFilter: filterValue
    });
  } else {
    onUpdate({ 
      styles: newClasses.join(' '),
      cssFilter: undefined
    });
  }
}

/**
 * Maneja el cambio de estilos genérico
 */
export function createStyleHandler(onUpdate: ImageUpdateHandler) {
  return (newStyles: string) => {
    onUpdate({ styles: newStyles });
  };
}

/**
 * Genera la URL de imagen a mostrar (con fallback)
 */
export function getImageDisplayUrl(
  imageUrl: string,
  isUrlValid: boolean,
  dimensions: { width: number; height: number }
): string {
  if (!isUrlValid || !imageUrl) {
    return generatePlaceholderUrl(dimensions.width, dimensions.height);
  }
  return imageUrl;
}

/**
 * Maneja el error de carga de imagen
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement>,
  dimensions: { width: number; height: number }
): void {
  const errorUrl = generatePlaceholderUrl(dimensions.width, dimensions.height, 'Error al cargar imagen');
  event.currentTarget.src = errorUrl;
}
