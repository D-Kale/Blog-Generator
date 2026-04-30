# Documentación de Helpers del Editor

Este documento describe todas las funciones helper centralizadas en el proyecto para evitar duplicación y mantener consistencia.

## 📁 Estructura de Archivos

```
src/components/editor/helpers/
├── index.ts          # Exportaciones centralizadas
├── iconHelpers.ts     # Funciones para obtener iconos
└── styleHelpers.ts    # Funciones para manejo de estilos
```

## 🎨 Icon Helpers (`iconHelpers.ts`)

### `getAlignmentIcon(value: string): LucideIcon`
**Propósito**: Obtiene el icono de alineación según el valor
**Uso**: Para controles de alineación de texto
**Valores soportados**:
- `text-left` → AlignLeft
- `text-center` → AlignCenter  
- `text-right` → AlignRight
- `text-justify` → AlignJustify
- `default` → AlignLeft

### `getDecorationIcon(value: string): LucideIcon`
**Propósito**: Obtiene el icono de decoración según el valor
**Uso**: Para controles de decoración de texto (subrayado, tachado, etc.)
**Valores soportados**:
- `italic` → Italic
- `underline` → Underline
- `line-through` → Strikethrough
- `default` → Italic

### `getStyleIcon(value: string): LucideIcon`
**Propósito**: Obtiene el icono de estilo según el valor
**Uso**: Para controles de estilo de texto (cursiva, normal)
**Valores soportados**:
- `italic` → Italic
- `not-italic` → Italic
- `default` → Italic

### `getSizeIcon(value: string): LucideIcon`
**Propósito**: Obtiene el icono para tamaño de fuente
**Uso**: Para controles de tamaño de texto
**Retorna**: Type (siempre)

### `getWeightIcon(value: string): LucideIcon`
**Propósito**: Obtiene el icono para peso de fuente
**Uso**: Para controles de peso de texto
**Retorna**: Bold (siempre)

### `getTransformIcon(value: string): LucideIcon`
**Propósito**: Obtiene el icono para transformación de texto
**Uso**: Para controles de transformación (mayúsculas, minúsculas)
**Retorna**: CaseSensitive (siempre)

### `getPreviewIcon(label: string): Function`
**Propósito**: Función genérica que retorna el icono de vista previa según el label
**Uso**: Para auto-detectar qué icono usar basado en el nombre del control
**Labels soportados**:
- `alineación` → getAlignmentIcon
- `decoración` → getDecorationIcon
- `estilo` → getStyleIcon
- `tamaño` → getSizeIcon
- `peso` → getWeightIcon
- `transform` → getTransformIcon

## 🎯 Style Helpers (`styleHelpers.ts`)

### `handleStyleChange(category, value, currentClasses, styleHandler, TEXT_OPTIONS)`
**Propósito**: Maneja cambios de estilo genéricos
**Parámetros**:
- `category`: Categoría del estilo (fontSizes, weights, etc.)
- `value`: Nuevo valor a aplicar
- `currentClasses`: Clases CSS actuales
- `styleHandler`: Función para aplicar los cambios
- `TEXT_OPTIONS`: Opciones de texto disponibles

**Comportamiento**: Elimina clases antiguas de la categoría y añade la nueva

### `handleArrayStyleChange(styleClasses, value, currentClasses, styleHandler)`
**Propósito**: Maneja cambios de estilo con arrays predefinidos
**Parámetros**:
- `styleClasses`: Array de clases de estilo
- `value`: Nuevo valor a aplicar
- `currentClasses`: Clases CSS actuales
- `styleHandler`: Función para aplicar los cambios

**Comportamiento**: Filtra clases del array y añade la nueva si existe

### `isStyleActive(value, currentClasses): boolean`
**Propósito**: Verifica si una clase está activa
**Retorna**: `true` si la clase está en currentClasses

### `getActiveStyle(category, currentClasses, TEXT_OPTIONS): string`
**Propósito**: Obtiene el valor activo de una categoría
**Retorna**: Valor activo o string vacío si no hay ninguno

### `resetAllStyles(styleHandler)`
**Propósito**: Resetea todos los estilos a valores por defecto
**Comportamiento**: Aplica estilos base de Tailwind

## 🔄 Migración desde Archivos Antiguos

### Archivos que necesitan actualización:
1. `FormatControls.tsx` - Usar iconHelpers
2. `StyleTextControls.tsx` - Usar iconHelpers y styleHelpers
3. `TextStylingControls.tsx` - Usar iconHelpers y styleHelpers
4. `AdvancedTextControls.tsx` - Usar iconHelpers

### Ejemplo de migración:
```typescript
// ANTES (duplicado en múltiples archivos)
const getAlignmentIcon = (value: string): LucideIcon => {
  switch (value) {
    case 'text-left': return AlignLeft;
    // ...
  }
};

// DESPUÉS (importado desde helpers)
import { getAlignmentIcon } from '../helpers';
```

## 📋 Uso Recomendado

### Para iconos:
```typescript
import { getAlignmentIcon, getPreviewIcon } from '../helpers';

// Uso directo
const icon = getAlignmentIcon('text-left');

// Uso con auto-detección
const previewIcon = getPreviewIcon('Alineación');
```

### Para estilos:
```typescript
import { handleStyleChange, getActiveStyle } from '../helpers';

// Manejar cambios
handleStyleChange('fontSizes', newSize, currentClasses, styleHandler, TEXT_OPTIONS);

// Obtener valor activo
const activeSize = getActiveStyle('fontSizes', currentClasses, TEXT_OPTIONS);
```

## 🚀 Beneficios

1. **Centralización**: Toda la lógica en un solo lugar
2. **Consistencia**: Mismo comportamiento en toda la app
3. **Mantenimiento**: Cambios en un solo archivo
4. **Reutilización**: Importar donde se necesite
5. **Testeabilidad**: Funciones puras fáciles de probar
6. **Documentación**: Referencia centralizada para IA y desarrolladores

## 🔮 Extensiones Futuras

1. **Iconos temáticos**: Soporte para diferentes sets de iconos
2. **Validación**: Validación de valores en helpers
3. **Caching**: Cache de iconos para mejor rendimiento
4. **Tipado fuerte**: Tipos más específicos para valores
5. **Animaciones**: Helpers para transiciones de estilo
