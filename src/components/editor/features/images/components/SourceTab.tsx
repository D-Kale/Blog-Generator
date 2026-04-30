import React from 'react';
import { Upload, Link2, Check, X } from 'lucide-react';

interface SourceTabProps {
  imageUrl: string;
  isUrlValid: boolean;
  displayUrl: string;
  dimensions: { width: number; height: number };
  onUrlChange: (url: string) => void;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export const SourceTab: React.FC<SourceTabProps> = ({
  imageUrl,
  isUrlValid,
  displayUrl,
  dimensions,
  onUrlChange,
  onFileSelect,
  fileInputRef
}) => {
  const handleImageError = (e: React.ReactEventHandler<HTMLImageElement>) => {
    e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${dimensions.width}' height='${dimensions.height}'%3E%3Crect fill='%e2%80%9d%3C/rect%3E%3C/svg%3E`;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="relative group">
        <div
          className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 transition-all hover:border-blue-400"
        >
          <img
            src={displayUrl}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        </div>

        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
          isUrlValid
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        }`}>
          {isUrlValid ? <Check size={12} /> : <X size={12} />}
          {isUrlValid ? 'Válida' : 'Inválida'}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFileSelect}
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

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">o</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Link2 size={16} className="inline mr-2" />
            URL de imagen
          </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isUrlValid
                ? 'border-gray-300'
                : 'border-red-300'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
