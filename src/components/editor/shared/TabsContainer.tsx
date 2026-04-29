import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface TabConfig {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface TabsContainerProps {
  tabs: TabConfig[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  children: React.ReactNode;
}

export const TabsContainer: React.FC<TabsContainerProps> = ({
  tabs,
  activeTab,
  onTabChange,
  children
}) => {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header con pestañas */}
      <div className="border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenido dinámico */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};
