import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { getPreviewIcon } from '../../../helpers/iconHelpers';
import { ButtonGroup } from './ButtonGroup';
import { CollapsibleSection } from './CollapsibleSection';

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

const groupItems = (items: FormatControlItem[]) => {
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

export const FormatControls: React.FC<FormatControlsProps> = ({
  title,
  icon: Icon = Settings,
  items,
  collapsible = false,
  defaultOpen = true
}) => {
  const [openSection, setOpenSection] = useState<string | null>(
    defaultOpen ? 'Alineación y Estilo' : null
  );

  const getAutoPreviewIcon = (item: FormatControlItem) => {
    if (item.previewIcon) return item.previewIcon;
    return getPreviewIcon(item.label);
  };

  const grouped = groupItems(items);
  const groupNames = Object.keys(grouped).filter(name => grouped[name].length > 0);

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
            {grouped[groupName].map((item, itemIndex) => {
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
