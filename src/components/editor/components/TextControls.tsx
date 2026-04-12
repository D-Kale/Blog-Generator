import React, { useMemo } from 'react';
import { 
  ChevronDown, ChevronUp, Type, AlignLeft, Bold, Palette, 
  Italic, Ghost, List, CaseSensitive, Underline 
} from 'lucide-react';
import { EDITOR_OPTIONS } from '../../editor-config';

type EditorCategory = keyof typeof EDITOR_OPTIONS;

interface ControlGroupProps {
  label: string;
  category: EditorCategory;
  icon: React.ElementType;
  fullWidth?: boolean;
}

export const TextControls = ({ styles, onStyleChange, type }: { styles: string, onStyleChange: (s: string) => void, type?: string }) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const currentClasses = useMemo(() => styles.split(' ').filter(Boolean), [styles]);

  const currentOpacityValue = useMemo(() => {
    const opacityClass = currentClasses.find(cls => cls.startsWith('opacity-'));
    if (!opacityClass) return "100";
    return opacityClass.replace('opacity-', '');
  }, [currentClasses]);

  const updateOpacity = (value: string) => {
    const cleanClasses = currentClasses.filter(cls => !cls.startsWith('opacity-'));
    const numericValue = parseFloat(value) * 100; // 0.1 -> 10, 0.5 -> 50
    
    const newOpacityClass = numericValue < 100 ? `opacity-${numericValue}` : '';
    onStyleChange([...cleanClasses, newOpacityClass].join(' ').trim());
  };

  const toggleOption = (category: EditorCategory, value: string) => {
    const possibleClasses = EDITOR_OPTIONS[category].flatMap((opt: any) => opt.value.split(' '));
    
    let newClasses = currentClasses.filter(cls => !possibleClasses.includes(cls));

    const isValueAlreadyActive = value.split(' ').every(v => currentClasses.includes(v));

    if (!isValueAlreadyActive && value !== '') {
      newClasses.push(...value.split(' '));
    }

    onStyleChange(newClasses.join(' ').trim());
  };

  // 3. Componente ControlGroup con Tipado Estricto
  const ControlGroup = ({ label, category, icon: Icon, fullWidth = false }: ControlGroupProps) => (
    <section className={`space-y-2 ${fullWidth ? 'col-span-2' : 'col-span-1'}`}>
      <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5 px-1">
        <Icon size={12} className="text-slate-500" /> {label}
      </label>
      <div className="flex flex-wrap gap-1 bg-slate-100/50 p-1.5 rounded-xl border border-slate-200/50 shadow-inner">
        {EDITOR_OPTIONS[category].map((opt: any) => {
          const isActive = opt.value.split(' ').every((v: string) => currentClasses.includes(v));
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggleOption(category, opt.value)}
              className={`flex-1 min-w-32px px-2 py-2 text-[10px] font-semibold rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-white shadow-sm text-blue-600 ring-1 ring-black/0.05' 
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

  return (
    <div className="flex flex-col gap-6 p-2 h-full overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        <ControlGroup label="Tamaño" category="fontSizes" icon={Type} fullWidth />
        <ControlGroup label="Peso" category="weights" icon={Bold} />
        <ControlGroup label="Estilo" category="styles" icon={Italic} />
        {
          type !== 'list' && (
            <ControlGroup label="Alineación" category="alignments" icon={AlignLeft} />
          )
        }
        <ControlGroup label="Formato" category="transform" icon={CaseSensitive} />
        <ControlGroup label="Decoración" category="decoration" icon={Underline} />
        {
          type === 'list' && (
            <ControlGroup label="Listas" category="lists" icon={List} fullWidth />
          )
        }
      </div>

      <div className="h-px bg-slate-100 my-2" />

      {/* Opacidad Corregida: Slider de 0.1 a 1.0 */}
      <section className="space-y-3 px-1">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5">
            <Ghost size={12} /> Transparencia
          </label>
          <span className="text-[10px] font-mono font-bold text-blue-600">
            {currentOpacityValue}%
          </span>
        </div>
        <input 
          type="range" min="0.1" max="1" step="0.1"
          value={parseInt(currentOpacityValue) / 100}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          onChange={(e) => updateOpacity(e.target.value)}
        />
      </section>

      {/* Colores */}
      <section className="space-y-3 px-1">
        <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5">
          <Palette size={12} /> Color
        </label>
        <div className="grid grid-cols-6 gap-3">
          {EDITOR_OPTIONS.colors.map(color => (
            <button
              key={color.value}
              type="button"
              onClick={() => toggleOption('colors', color.value)}
              className={`h-8 w-8 rounded-full transition-all border-2 ${color.bg} ${
                currentClasses.includes(color.value) ? 'border-blue-500 scale-110 shadow-md ring-2 ring-blue-100' : 'border-transparent'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Modo Experto */}
      <section className="mt-auto pt-4 border-t border-slate-100">
        <button 
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center justify-between w-full px-3 py-2 text-[9px] font-black text-slate-400 hover:text-slate-600 bg-slate-50 rounded-xl"
        >
          DEBUG: TAILWIND CLASSES
          {showAdvanced ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
        </button>
        {showAdvanced && (
          <textarea 
            className="mt-3 w-full p-4 bg-slate-900 text-blue-400 text-[10px] font-mono rounded-2xl h-32 outline-none border border-slate-800 resize-none"
            value={styles}
            onChange={(e) => onStyleChange(e.target.value)}
            spellCheck={false}
          />
        )}
      </section>
    </div>
  );
};