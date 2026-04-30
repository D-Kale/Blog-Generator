import { getAlignmentIcon } from '../../helpers/iconHelpers';

export const createAlignmentControl = (options: any, currentClasses: string[], onChange: Function) => ({
  label: "Alineación",
  icon: null,
  value: currentClasses.find(c => options.alignments?.some((a: any) => a.value === c)) || '',
  options: options.alignments?.map((align: any) => ({
    ...align,
    icon: getAlignmentIcon(align.value)
  })) || [],
  onChange: (value: string) => onChange('alignments', value)
});

export const createStyleControl = (options: any, currentClasses: string[], onChange: Function) => ({
  label: "Estilo",
  icon: null,
  value: currentClasses.find(c => ['italic', 'not-italic'].includes(c)) || '',
  options: [
    { value: '', name: 'Normal', icon: null },
    { value: 'italic', name: 'Cursiva', icon: null }
  ],
  onChange: (value: string) => onChange('styles', value)
});

export const createDecorationControl = (options: any, currentClasses: string[], onChange: Function) => ({
  label: "Decoración",
  icon: null,
  value: currentClasses.find(c => ['underline', 'line-through', 'no-underline'].includes(c)) || '',
  options: [
    { value: '', name: 'Ninguna', icon: null },
    { value: 'underline', name: 'Subrayado', icon: null },
    { value: 'line-through', name: 'Tachado', icon: null }
  ],
  onChange: (value: string) => onChange('decoration', value)
});

export const createFontSizeControl = (options: any, currentClasses: string[], onChange: Function) => ({
  label: "Tamaño de fuente",
  icon: null,
  value: currentClasses.find(c => options.fontSizes?.some((size: any) => size.value === c)) || '',
  options: options.fontSizes?.map((size: any) => ({
    ...size,
    icon: null
  })) || [],
  onChange: (value: string) => onChange('fontSizes', value)
});

export const createFontWeightControl = (options: any, currentClasses: string[], onChange: Function) => ({
  label: "Peso de fuente",
  icon: null,
  value: currentClasses.find(c => options.weights?.some((weight: any) => weight.value === c)) || '',
  options: options.weights?.map((weight: any) => ({
    ...weight,
    icon: null
  })) || [],
  onChange: (value: string) => onChange('weights', value)
});

export const createFontFamilyControl = (options: any, currentClasses: string[], onChange: Function) => ({
  label: "Familia de fuente",
  icon: null,
  value: currentClasses.find(c => options.fontFamilies?.some((family: any) => family.value === c)) || '',
  options: options.fontFamilies?.map((family: any) => ({
    ...family,
    icon: null
  })) || [],
  onChange: (value: string) => onChange('fontFamilies', value)
});

export const createLineHeightControl = (options: any, currentClasses: string[], onChange: Function) => ({
  label: "Altura de línea",
  icon: null,
  value: currentClasses.find(c => options.lineHeight?.some((height: any) => height.value === c)) || '',
  options: options.lineHeight?.map((height: any) => ({
    ...height,
    icon: null
  })) || [],
  onChange: (value: string) => onChange('lineHeight', value)
});

export const createLetterSpacingControl = (options: any, currentClasses: string[], onChange: Function) => ({
  label: "Espaciado entre letras",
  icon: null,
  value: currentClasses.find(c => options.letterSpacing?.some((spacing: any) => spacing.value === c)) || '',
  options: options.letterSpacing?.map((spacing: any) => ({
    ...spacing,
    icon: null
  })) || [],
  onChange: (value: string) => onChange('letterSpacing', value)
});

export const createTransformControl = (options: any, currentClasses: string[], onChange: Function) => ({
  label: "Transformación",
  icon: null,
  value: currentClasses.find(c => options.transform?.some((transform: any) => transform.value === c)) || '',
  options: options.transform?.map((transform: any) => ({
    ...transform,
    icon: null
  })) || [],
  onChange: (value: string) => onChange('transform', value)
});
