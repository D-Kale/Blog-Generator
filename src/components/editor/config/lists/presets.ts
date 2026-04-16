import type { LucideIcon } from 'lucide-react';
import { List, Hash, Sparkles, Zap, Plus, CheckSquare } from 'lucide-react';
import { LIST_PRESETS, LIST_TEMPLATES } from '../lists/constants';

export interface EnrichedListPreset {
  key: string;
  name: string;
  description: string;
  icon: LucideIcon;
  classes?: string;
}

export interface EnrichedListTemplate {
  key: string;
  name: string;
  description: string;
  icon: LucideIcon;
  items: string[];
}

export const enrichedListPresets: EnrichedListPreset[] = [
  { 
    key: 'simple', 
    ...LIST_PRESETS.simple,
    icon: List,
    description: 'Lista básica con discos'
  },
  { 
    key: 'numbered', 
    ...LIST_PRESETS.numbered,
    icon: Hash,
    description: 'Lista con números'
  },
  { 
    key: 'elegant', 
    ...LIST_PRESETS.elegant,
    icon: Sparkles,
    description: 'Estilo sofisticado'
  },
  { 
    key: 'modern', 
    ...LIST_PRESETS.modern,
    icon: Zap,
    description: 'Diseño contemporáneo'
  },
];

export const enrichedListTemplates: EnrichedListTemplate[] = [
  { 
    key: 'todo', 
    ...LIST_TEMPLATES.todo,
    icon: CheckSquare,
    description: 'Lista de tareas'
  },
  { 
    key: 'shopping', 
    ...LIST_TEMPLATES.shopping,
    icon: Plus,
    description: 'Lista de compras'
  },
  { 
    key: 'steps', 
    ...LIST_TEMPLATES.steps,
    icon: Hash,
    description: 'Pasos a seguir'
  },
  { 
    key: 'features', 
    ...LIST_TEMPLATES.features,
    icon: Sparkles,
    description: 'Características'
  },
];
