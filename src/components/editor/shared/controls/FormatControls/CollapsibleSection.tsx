import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isOpen: boolean;
  onToggle: () => void;
  isLast?: boolean;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  icon: Icon,
  children,
  isOpen,
  onToggle,
  isLast = false
}) => {
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
