export const EDITOR_OPTIONS = {
  colors: [
    { name: 'Negro', value: 'text-black', bg: 'bg-black' },
    { name: 'Gris', value: 'text-slate-500', bg: 'bg-slate-500' },
    { name: 'Azul', value: 'text-blue-600', bg: 'bg-blue-600' },
    { name: 'Rojo', value: 'text-red-500', bg: 'bg-red-500' },
    { name: 'Verde', value: 'text-emerald-500', bg: 'bg-emerald-500' },
  ],
  fontSizes: [
    { name: 'Pequeño', value: 'text-sm' },
    { name: 'Normal', value: 'text-base' },
    { name: 'Grande', value: 'text-xl' },
    { name: 'Título', value: 'text-4xl' },
  ],
  weights: [
    { name: 'Fino', value: 'font-light' },
    { name: 'Normal', value: 'font-normal' },
    { name: 'Bold', value: 'font-bold' },
    { name: 'Black', value: 'font-black' },
  ],
  alignments: [
    { name: 'Izquierda', value: 'text-left' },
    { name: 'Centro', value: 'text-center' },
    { name: 'Derecha', value: 'text-right' },
  ],
  styles: [
    { name: 'Normal', value: 'not-italic' },
    { name: 'Itálica', value: 'italic' },
  ],

  // Extras
  decoration: [
    { name: 'Ninguno', value: 'no-underline' },
    { name: 'Subrayado', value: 'underline' },
    { name: 'Tachado', value: 'line-through' },
  ],
  transform: [
    { name: 'Abc', value: 'normal-case' },
    { name: 'ABC', value: 'uppercase' },
    { name: 'abc', value: 'lowercase' },
  ],
  lists: [
    { name: 'Ninguna', value: 'list-none' },
    { name: 'Puntos', value: 'list-disc list-inside' }, // El ml-6 es vital
    { name: 'Números', value: 'list-decimal list-inside' },
  ]
};