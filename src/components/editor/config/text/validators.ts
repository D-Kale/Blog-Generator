/**
 * Utilidades de validación para texto
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  type?: 'length' | 'content' | 'format';
}

/**
 * Valida el contenido de texto
 */
export function validateTextContent(content: string, type: 'text' | 'list' = 'text'): ValidationResult {
  if (!content || content.trim().length === 0) {
    return { 
      isValid: false, 
      error: 'El texto no puede estar vacío', 
      type: 'content' 
    };
  }

  // Validar longitud máxima
  const maxLength = type === 'text' ? 10000 : 5000;
  if (content.length > maxLength) {
    return { 
      isValid: false, 
      error: `El texto es demasiado largo. Máximo ${maxLength} caracteres`, 
      type: 'length' 
    };
  }

  // Validar contenido HTML para listas
  if (type === 'list') {
    const hasValidListStructure = /<(ul|ol)[^>]*>.*<\/\1>/i.test(content);
    if (!hasValidListStructure) {
      return { 
        isValid: false, 
        error: 'La lista debe tener una estructura HTML válida (ul/ol)', 
        type: 'format' 
      };
    }

    // Validar que tenga elementos de lista
    const hasListItems = /<li[^>]*>.*<\/li>/i.test(content);
    if (!hasListItems) {
      return { 
        isValid: false, 
        error: 'La lista debe contener elementos (li)', 
        type: 'format' 
      };
    }
  }

  return { isValid: true };
}

/**
 * Valida clases CSS de texto
 */
export function validateTextClasses(classes: string): ValidationResult {
  if (!classes || classes.trim().length === 0) {
    return { isValid: true }; // Vacío es válido
  }

  const classArray = classes.trim().split(/\s+/);
  const invalidClasses = classArray.filter(cls => !isValidTextClass(cls));

  if (invalidClasses.length > 0) {
    return { 
      isValid: false, 
      error: `Clases inválidas: ${invalidClasses.join(', ')}`, 
      type: 'format' 
    };
  }

  return { isValid: true };
}

/**
 * Verifica si una clase CSS es válida para texto
 */
function isValidTextClass(className: string): boolean {
  // Patrones de clases válidas para texto
  const validPatterns = [
    /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/,
    /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/,
    /^font-(sans|serif|mono)$/,
    /^text-(black|white|gray|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(\-\d{1,3})?$/,
    /^text-(slate|zinc|neutral|stone|gray|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(\-\d{1,3})?$/,
    /^font-(light|normal|medium|semibold|bold)$/,
    /^(not-)?italic$/,
    /^(no-)?underline$/,
    /^underline decoration-(1|2|4|8)$/,
    /^underline decoration-(solid|dashed|dotted|double|wavy)$/,
    /^(normal-case|uppercase|lowercase|capitalize)$/,
    /^(text-(left|center|right|justify))$/,
    /^tracking-(tighter|tight|normal|wide|wider|widest)$/,
    /^leading-(none|tight|snug|normal|relaxed|loose)$/,
    /^opacity-\d{1,3}$/,
    /^list-(none|disc|circle|decimal|alpha|roman)$/,
    /^list-(inside|outside)$/,
    /^drop-shadow(-sm|-md|-lg|-xl|-2xl)?$/,
    /^line-(through|underline)$/,
    /^decoration-(slice|clone)$/,
  ];

  return validPatterns.some(pattern => pattern.test(className));
}

/**
 * Limpia y sanitiza clases CSS
 */
export function sanitizeTextClasses(classes: string): string {
  if (!classes) return '';
  
  return classes
    .trim()
    .split(/\s+/)
    .filter(cls => isValidTextClass(cls))
    .join(' ');
}

/**
 * Extrae palabras clave del contenido para sugerencias
 */
export function extractKeywords(content: string): string[] {
  if (!content) return [];
  
  // Remover HTML y caracteres especiales
  const cleanContent = content
    .replace(/<[^>]*>/g, '')
    .replace(/[^\w\s\u00C0-\u017F]/g, ' ')
    .toLowerCase();
  
  // Dividir en palabras y filtrar palabras comunes
  const stopWords = ['el', 'la', 'los', 'las', 'de', 'en', 'y', 'o', 'un', 'una', 'con', 'por', 'para', 'que', 'como', 'the', 'a', 'an', 'and', 'or', 'of', 'in', 'to', 'for', 'with', 'on', 'at', 'by', 'from'];
  
  return cleanContent
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.includes(word))
    .slice(0, 10);
}

/**
 * Sugiere mejoras para el texto
 */
export function suggestTextImprovements(content: string, type: 'text' | 'list' = 'text'): string[] {
  const suggestions: string[] = [];
  
  if (!content) return suggestions;
  
  const wordCount = content.split(/\s+/).length;
  
  // Sugerencias basadas en longitud
  if (wordCount < 3) {
    suggestions.push('Considera añadir más contenido para mejor legibilidad');
  } else if (wordCount > 500) {
    suggestions.push('El texto es muy largo. Considera dividirlo en párrafos');
  }
  
  // Sugerencias para listas
  if (type === 'list') {
    const listItems = (content.match(/<li[^>]*>.*?<\/li>/gi) || []).length;
    if (listItems > 10) {
      suggestions.push('Las listas muy largas pueden ser difíciles de leer. Considera agrupar elementos');
    }
    if (listItems < 2) {
      suggestions.push('Las listas deben tener al menos 2 elementos');
    }
  }
  
  // Sugerencias de formato
  if (!content.includes('.') && !content.includes('!') && !content.includes('?')) {
    suggestions.push('Considera añadir puntuación para mejor legibilidad');
  }
  
  return suggestions;
}

/**
 * Calcula métricas de legibilidad mejoradas
 */
export function calculateReadabilityMetrics(content: string): {
  wordCount: number;
  charCount: number;
  sentenceCount: number;
  avgWordsPerSentence: number;
  readingTime: number; // en minutos
  listItems: number;
  paragraphs: number;
} {
  if (!content || content.trim() === '') {
    return {
      wordCount: 0,
      charCount: 0,
      sentenceCount: 0,
      avgWordsPerSentence: 0,
      readingTime: 0,
      listItems: 0,
      paragraphs: 0,
    };
  }
  
  // Limpiar HTML pero mantener estructura para análisis
  let cleanContent = content
    .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remover scripts
    .replace(/<style[^>]*>.*?<\/style>/gi, '')   // Remover estilos
    .replace(/<[^>]+>/g, ' ')                     // Reemplazar tags por espacios
    .replace(/&nbsp;/g, ' ')                     // Reemplazar espacios HTML
    .replace(/&[a-zA-Z0-9#]+;/g, ' ')            // Reemplazar entidades HTML
    .replace(/\s+/g, ' ')                        // Normalizar espacios
    .trim();
  
  // Contar palabras (maneja múltiples idiomas)
  const words = cleanContent.match(/\b[\w\u00C0-\u017F]+\b/g) || [];
  const wordCount = words.length;
  
  // Contar caracteres (sin espacios)
  const charCount = cleanContent.replace(/\s/g, '').length;
  
  // Contar oraciones (terminadas en . ! ? con lookahead para asegurar final)
  const sentences = cleanContent.match(/[.!?]+(?=\s|$)/g) || [];
  const sentenceCount = sentences.length || 1; // Mínimo 1 si hay contenido
  
  // Contar listas del HTML original
  const listItems = (content.match(/<li[^>]*>/gi) || []).length;
  
  // Contar párrafos
  const paragraphs = (content.match(/<p[^>]*>/gi) || []).length || 1;
  
  // Promedio de palabras por oración
  const avgWordsPerSentence = sentenceCount > 0 ? Math.round((wordCount / sentenceCount) * 10) / 10 : 0;
  
  // Tiempo de lectura (promedio 200-250 palabras por minuto, ajustado por complejidad)
  const wordsPerMinute = 220;
  const readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  
  return {
    wordCount,
    charCount,
    sentenceCount,
    avgWordsPerSentence,
    readingTime,
    listItems,
    paragraphs,
  };
}
