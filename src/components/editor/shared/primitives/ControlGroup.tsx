import React from 'react';

interface Option {
  name: string;
  value: string;
}

interface ReusableControlGroupProps {
  label: string;
  options: Option[];
  icon: React.ElementType;
  currentClasses: string[];
  onStyleChange: (newStyles: string) => void;
  fullWidth?: boolean;
}

export const ControlGroup = ({
  label,
  options,
  icon: Icon,
  currentClasses,
  onStyleChange,
  fullWidth = false
}: ReusableControlGroupProps) => {

  const toggleOption = (optionValue: string) => {
    const possibleClasses = options.flatMap(opt => opt.value.split(' ')).filter(Boolean);

    let newClasses = currentClasses.filter(cls => !possibleClasses.includes(cls));

    const isValueAlreadyActive = optionValue !== '' &&
      optionValue.split(' ').every(v => currentClasses.includes(v));

    if (!isValueAlreadyActive && optionValue !== '') {
      newClasses.push(...optionValue.split(' '));
    }

    onStyleChange(newClasses.join(' ').trim());
  };

  return (
    <section className={`space-y-2 ${fullWidth ? 'col-span-2' : 'col-span-1'}`}>
      <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5 px-1">
        <Icon size={12} className="text-slate-500" /> {label}
      </label>
      <div className="flex flex-wrap gap-1 bg-slate-100/50 p-1.5 rounded-xl border border-slate-200/50 shadow-inner">
        {options.map((opt) => {
          const isActive = opt.value === ''
            ? !options.some(o => o.value !== '' && currentClasses.includes(o.value))
            : opt.value.split(' ').every(v => currentClasses.includes(v));

          return (
            <button
              key={opt.name + opt.value}
              type="button"
              onClick={() => toggleOption(opt.value)}
              className={`flex-1 min-w-[32px] px-2 py-2 text-[10px] font-semibold rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-white shadow-sm text-blue-600 ring-1 ring-black/[0.05]'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              {opt.name}
            </button>
          );
        })}
      </div>
    </section>
  );
};
