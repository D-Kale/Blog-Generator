import React from 'react';
import { Image as ImageIcon, Upload, Link2, X, Check } from 'lucide-react';
import type { Block } from '../../../core/CanvasEditor';

interface BasicImageControlsProps {
  content: string;
  dimensions?: { width: number; height: number };
  onUpdate: (updates: Partial<Block>) => void;
}

export const BasicImageControls: React.FC<BasicImageControlsProps> = ({ 
  content, 
  dimensions = { width: 300, height: 200 },
  onUpdate 
}) => {
  const [imageUrl, setImageUrl] = React.useState(content);
  const [isUrlValid, setIsUrlValid] = React.useState(true);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Manejar cambio de URL
  const handleUrlInputChange = (newUrl: string) => {
    setImageUrl(newUrl);
    
    if (newUrl.trim() === '') {
      onUpdate({ content: '' });
      setIsUrlValid(true);
      return;
    }

    const isValid = newUrl.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)$/i) !== null;
    setIsUrlValid(isValid);
    
    if (isValid) {
      onUpdate({ content: newUrl });
    }
  };

  // Manejar subida de archivo
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setIsUrlValid(true);
        onUpdate({ content: result });
        setImageUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // URL para mostrar (con fallback)
  const displayUrl = React.useMemo(() => {
    if (imageUrl && isUrlValid) return imageUrl;
    if (dimensions) return `https://picsum.photos/seed/${Math.random().toString(36).substr(2, 9)}/${dimensions.width}/${dimensions.height}.jpg`;
    return 'https://picsum.photos/seed/default/400/300.jpg';
  }, [imageUrl, isUrlValid, dimensions]);

  return (
    <div className="p-6 space-y-6">
      {/* Preview principal */}
      <div className="relative group">
        <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 transition-all hover:border-blue-400">
          <img
            src={displayUrl}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              if (dimensions) {
                const fallback = `https://picsum.photos/seed/error/${dimensions.width}/${dimensions.height}.jpg`;
                (e.target as HTMLImageElement).src = fallback;
              }
            }}
          />
        </div>

        {/* Indicador de estado */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
          isUrlValid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {isUrlValid ? <Check size={12} /> : <X size={12} />}
          {isUrlValid ? 'Válida' : 'Inválida'}
        </div>
      </div>

      {/* Opciones de fuente */}
      <div className="space-y-4">
        {/* Botón de subida */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <Upload size={18} />
            Subir imagen
          </button>
        </div>

        {/* Separador */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">o</span>
          </div>
        </div>

        {/* Input de URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Link2 size={16} className="inline mr-2" />
            URL de imagen
          </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => handleUrlInputChange(e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isUrlValid ? 'border-gray-300' : 'border-red-300'
            }`}
          />
        </div>
      </div>
    </div>
  );
};