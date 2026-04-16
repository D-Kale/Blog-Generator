import React, { useState } from 'react';
import { Settings, ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { 
  getAlignmentIcon, 
  getDecorationIcon, 
  getStyleIcon, 
  getSizeIcon, 
  getWeightIcon, 
  getPreviewIcon 
} from '../../helpers';

export interface FormatControlItem {
  label: string;
  icon?: LucideIcon;
  value: string;
  options: Array<{ value: string; name: string; label?: string; icon?: LucideIcon }>;
  onChange: (value: string) => void;
  previewIcon?: (value: string) => LucideIcon;
}

interface FormatControlsProps {
  title: string;
  icon?: LucideIcon;
  items: FormatControlItem[];
  collapsible?: boolean;
  defaultOpen?: boolean;
}

// Componente para renderizar botones con vista previa
const ButtonGroup: React.FC<{
  item: FormatControlItem;
  currentValue: string;
}> = ({ item, currentValue }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const getIcon = item.previewIcon || (() => item.icon);
  
  // Determinar si debe ser colapsable (más de 6 opciones)
  const shouldCollapse = item.options.length > 6;
  const visibleOptions = shouldCollapse && !isExpanded 
    ? item.options.slice(0, 6) 
    : item.options;
  const hasMoreOptions = shouldCollapse && item.options.length > 6;

  return (
    <div className={`space-y-3 ${isCollapsed ? 'opacity-60' : ''}`}>
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-2 pb-2 border-b border-gray-200 hover:bg-gray-50 -mx-2 px-2 py-1 rounded transition-colors cursor-pointer"
        >
          {item.icon && <item.icon size={16} className="text-gray-600" />}
          <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
            {item.label}
          </h4>
          <ChevronRight 
            size={14} 
            className={`text-gray-400 transition-transform ${
              isCollapsed ? 'rotate-90' : ''
            }`}
          />
        </button>

        {hasMoreOptions && !isCollapsed && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                <ChevronUp size={12} />
                Mostrar menos
              </>
            ) : (
              <>
                <ChevronDown size={12} />
                Ver {item.options.length - 6} más
              </>
            )}
          </button>
        )}
      </div>
      
      {!isCollapsed && (
        <div className="flex flex-wrap gap-2">
          {visibleOptions.map((option) => {
            const Icon = option.icon || getIcon(option.value);
            const isActive = currentValue === option.value || 
              (option.value === '' && !currentValue) ||
              (option.value !== '' && currentValue?.includes(option.value));
            
            return (
              <button
                key={option.value}
                onClick={() => item.onChange(option.value)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
                title={option.name}
              >
                {Icon && <Icon size={14} />}
                <span>{option.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Componente de sección colapsable con comportamiento acordeón
const CollapsibleSection: React.FC<{
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isOpen: boolean;
  onToggle: () => void;
  isLast?: boolean;
}> = ({ title, icon: Icon, children, isOpen, onToggle, isLast = false }) => {
  return (
    <div className={`border border-gray-200 rounded-lg overflow-hidden ${isLast ? '' : 'mb-3'}`}>
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-4 transition-all ${
          isOpen 
            ? 'bg-blue-50 border-b border-blue-200' 
            : 'bg-gray-50 hover:bg-gray-100'
        }`}
      >
        <span className="flex items-center gap-3 text-base font-semibold text-gray-800">
          {Icon && <Icon size={20} className={isOpen ? 'text-blue-600' : 'text-gray-600'} />}
          <span className={isOpen ? 'text-blue-700' : 'text-gray-800'}>{title}</span>
        </span>
        {isOpen ? (
          <ChevronDown size={20} className="text-blue-600" />
        ) : (
          <ChevronRight size={20} className="text-gray-400" />
        )}
      </button>
      
      {isOpen && (
        <div className="p-5 space-y-4 bg-white border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  );
};

export const FormatControls: React.FC<FormatControlsProps> = ({
  title,
  icon: Icon = Settings,
  items,
  collapsible = false,
  defaultOpen = true
}) => {
  // Estado para manejar qué sección está abierta (acordeón)
  const [openSection, setOpenSection] = useState<string | null>(
    defaultOpen ? 'Alineación y Estilo' : null
  );

  // Auto-asignar iconos de vista previa
  const getAutoPreviewIcon = (item: FormatControlItem) => {
    if (item.previewIcon) return item.previewIcon;
    return getPreviewIcon(item.label);
  };

  // Agrupar items por categorías lógicas
  const groupItems = () => {
    const groups: { [key: string]: FormatControlItem[] } = {
      'Alineación y Estilo': [],
      'Tipografía': [],
      'Formato Avanzado': [],
      'Espaciado': []
    };

    items.forEach(item => {
      const label = item.label.toLowerCase();
      
      if (label.includes('alineación') || label.includes('estilo') || label.includes('decoración')) {
        groups['Alineación y Estilo'].push(item);
      } else if (label.includes('tamaño') || label.includes('peso') || label.includes('familia')) {
        groups['Tipografía'].push(item);
      } else if (label.includes('altura') || label.includes('espaciado')) {
        groups['Espaciado'].push(item);
      } else {
        groups['Formato Avanzado'].push(item);
      }
    });

    return groups;
  };

  const groups = groupItems();
  const groupNames = Object.keys(groups).filter(name => groups[name].length > 0);
  
  // Manejar toggle de sección (acordeón)
  const handleSectionToggle = (sectionName: string) => {
    setOpenSection(openSection === sectionName ? null : sectionName);
  };

  const content = (
    <div>
      {groupNames.map((groupName, index) => {
        const isOpen = openSection === groupName;
        const isLast = index === groupNames.length - 1;
        
        return (
          <CollapsibleSection
            key={groupName}
            title={groupName}
            isOpen={isOpen}
            onToggle={() => handleSectionToggle(groupName)}
            isLast={isLast}
          >
            {groups[groupName].map((item, itemIndex) => {
              const enhancedItem = {
                ...item,
                previewIcon: getAutoPreviewIcon(item)
              };
              
              return <ButtonGroup key={itemIndex} item={enhancedItem} currentValue={item.value} />;
            })}
          </CollapsibleSection>
        );
      })}
    </div>
  );

  if (collapsible) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
          <Icon size={20} />
          {title}
        </h3>
        {content}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
        <Icon size={20} />
        {title}
      </h3>
      {content}
    </div>
  );
};
