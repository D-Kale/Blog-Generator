import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface SelectOption {
  value: string;
  name: string;
  label?: string;
}

interface SelectControlProps {
  label: string;
  icon?: LucideIcon;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export const SelectControl: React.FC<SelectControlProps> = ({
  label,
  icon: Icon,
  value,
  options,
  onChange,
  className = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
  placeholder = "Seleccionar..."
}) => {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-2 flex items-center gap-1">
        {Icon && <Icon size={12} />}
        {label}
      </label>
      <select
        className={className}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.name} {option.label && `(${option.label})`}
          </option>
        ))}
      </select>
    </div>
  );
};
