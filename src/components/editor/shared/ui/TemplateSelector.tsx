import React from 'react';
import { List } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface TemplateOption {
  key: string;
  name: string;
  description: string;
  icon: LucideIcon;
  items: string[];
}

interface TemplateSelectorProps {
  templates: TemplateOption[];
  listItems: string[];
  onTemplateClick: (templateKey: string) => void;
  title?: string;
  icon?: LucideIcon;
  columns?: 1 | 2;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  listItems,
  onTemplateClick,
  title = "Plantillas predefinidas",
  icon: Icon = List,
  columns = 2
}) => {
  const gridClass = columns === 1
    ? "grid grid-cols-1 gap-3"
    : "grid grid-cols-1 sm:grid-cols-2 gap-3";

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <Icon size={16} />
        {title}
      </h3>
      <div className={gridClass}>
        {templates.map((template) => {
          const TemplateIcon = template.icon;
          const isApplied = listItems.length >= template.items.length &&
            template.items.every((item, index) => listItems[index]?.includes(item.substring(0, 5)));

          return (
            <button
              key={template.key}
              onClick={() => onTemplateClick(template.key)}
              className={`relative p-3 rounded-lg border transition-all text-left group overflow-hidden ${
                isApplied
                  ? 'border-green-500 bg-green-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm'
              }`}
            >
              {isApplied && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full" />
              )}

              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                  isApplied
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                }`}>
                  <TemplateIcon size={16} />
                </div>
                <div className="flex-1 min-w-0 overflow-hidden">
                  <div className="text-sm font-medium mb-1 text-gray-900 truncate">
                    {template.name}
                  </div>
                  <div className="text-xs text-gray-500 line-clamp-2">
                    {template.description}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <List size={12} />
                      <span>{template.items.length} elementos</span>
                    </div>
                    <div className="px-2 py-1 bg-gray-100 rounded-full">
                      {isApplied ? 'Aplicado' : 'Disponible'}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
