import type { LucideIcon } from 'lucide-react';
import { Heading1, Heading2, FileText, Minus } from 'lucide-react';
import { TEXT_PRESETS, TEXT_THEMES } from './constants';

export interface EnrichedPreset {
  key: string;
  name: string;
  description: string;
  icon: LucideIcon;
  classes?: string;
}

export interface EnrichedTheme {
  key: string;
  name: string;
  description: string;
  icon: LucideIcon;
  colors: string[];
}

export const enrichedTextPresets: EnrichedPreset[] = [
  { 
    key: 'heading1', 
    ...TEXT_PRESETS.heading1,
    icon: Heading1,
    description: 'Título principal'
  },
  { 
    key: 'heading2', 
    ...TEXT_PRESETS.heading2,
    icon: Heading2,
    description: 'Subtítulo'
  },
  { 
    key: 'body', 
    ...TEXT_PRESETS.body,
    icon: FileText,
    description: 'Texto normal'
  },
  { 
    key: 'caption', 
    ...TEXT_PRESETS.caption,
    icon: Minus,
    description: 'Texto pequeño'
  },
];

export const enrichedTextThemes: EnrichedTheme[] = [
  { 
    key: 'default', 
    ...TEXT_THEMES.default,
    icon: FileText,
    description: 'Estándar'
  },
  { 
    key: 'dark', 
    ...TEXT_THEMES.dark,
    icon: Minus,
    description: 'Modo oscuro'
  },
  { 
    key: 'blue', 
    ...TEXT_THEMES.blue,
    icon: Heading1,
    description: 'Azul corporativo'
  },
];
