import React, { useState, useMemo } from 'react';
import { 
  Image as ImageIcon,
  Upload,
  Link2,
  Palette,
  Move,
  RotateCw,
  Crop,
  Sparkles,
  Sliders,
  X,
  Check
} from 'lucide-react';
import { 
  IMAGE_CONTROLS, 
  CSS_FILTERS, 
  IMAGE_SIZES,
  UI_CONFIG,
  handleUrlChange,
  handleFileUpload,
  handleSizeChange,
  handleCssFilter,
  createStyleHandler,
  getImageDisplayUrl,
  handleImageError
} from '../config/imageControls';
import { TabsContainer, SelectControl } from '.';
import type { Block } from '../core/CanvasEditor';

interface ImageControlsProps {
  styles: string;
  content: string;
  dimensions?: { width: number; height: number };
  onUpdate: (updates: Partial<Block>) => void;
}

export const ImageControls: React.FC<ImageControlsProps> = ({ 
  styles, 
  content, 
  dimensions = { width: 300, height: 200 },
  onUpdate 
}) => {
  const [imageUrl, setImageUrl] = useState(content);
  const [isUrlValid, setIsUrlValid] = useState(true);
  const [activeTab, setActiveTab] = useState<'source' | 'style' | 'adjust'>('source');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const currentClasses = useMemo(() => styles.split(' ').filter(Boolean), [styles]);
  const styleHandler = useMemo(() => createStyleHandler(onUpdate), [onUpdate]);

  // Extraer el valor de rotación actual
  const currentRotation = useMemo(() => {
    const rotationClass = currentClasses.find(cls => cls.startsWith('rotate') || cls.startsWith('-rotate'));
    return rotationClass || '';
  }, [currentClasses]);

  // Extraer el valor de opacidad actual
  const currentOpacityClass = useMemo(() => {
    const opacityClass = currentClasses.find(cls => cls.startsWith('opacity-'));
    return opacityClass || '';
  }, [currentClasses]);

  // Manejar cambio de URL
  const handleUrlInputChange = (newUrl: string) => {
    setImageUrl(newUrl);
    handleUrlChange(newUrl, onUpdate, setIsUrlValid);
  };

  // Manejar subida de archivo
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(event, onUpdate, setIsUrlValid, setImageUrl);
  };

  // Aplicar filtro CSS
  const applyFilter = (filterName: string) => {
    handleCssFilter(filterName, CSS_FILTERS, currentClasses, onUpdate);
  };

  // Cambiar tamaño
  const changeSize = (sizeName: string) => {
    handleSizeChange(sizeName, IMAGE_SIZES, onUpdate);
  };

  // URL para mostrar (con fallback)
  const displayUrl = useMemo(() => 
    getImageDisplayUrl(imageUrl, isUrlValid, dimensions),
    [imageUrl, isUrlValid, dimensions]
  );

  const tabs = [
    { id: 'source', label: 'Origen', icon: ImageIcon },
    { id: 'style', label: 'Estilo', icon: Palette },
    { id: 'adjust', label: 'Ajustar', icon: Sliders },
  ];

  const quickFilters = [
    { name: 'Ninguno', value: 'none', class: '' },
    { name: 'Vintage', value: 'vintage', class: 'sepia(0.5)' },
    { name: 'B&N', value: 'blackWhite', class: 'grayscale(1)' },
    { name: 'Cálido', value: 'warm', class: 'sepia(0.2)' },
    { name: 'Frío', value: 'cold', class: 'hue-rotate(180deg)' },
  ];

  const quickSizes = [
    { name: 'Mini', value: 'thumbnail', size: '150×150' },
    { name: 'Pequeño', value: 'small', size: '300×200' },
    { name: 'Mediano', value: 'medium', size: '600×400' },
    { name: 'Grande', value: 'large', size: '1200×800' },
  ];

  return (
    <TabsContainer
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(tabId) => setActiveTab(tabId as any)}
    >
        {/* Tab: Origen */}
        {activeTab === 'source' && (
          <div className="p-6 space-y-6">
            {/* Preview principal */}
            <div className="relative group">
              <div 
                className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 transition-all hover:border-blue-400"
              >
                <img
                  src={displayUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => handleImageError(e, dimensions)}
                />
              </div>
              
              {/* Indicador de estado */}
              <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                isUrlValid 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
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
                    isUrlValid 
                      ? 'border-gray-300' 
                      : 'border-red-300'
                  }`}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab: Estilo */}
        {activeTab === 'style' && (
          <div className="p-6 space-y-6">
            {/* Filtros rápidos */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Sparkles size={16} />
                Filtros rápidos
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {quickFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => applyFilter(filter.value)}
                    className="relative p-3 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-all group"
                    style={{ filter: filter.class }}
                  >
                    <div className="w-full h-12 bg-gray-200 rounded" />
                    <div className="text-xs font-medium text-gray-700 mt-2">
                      {filter.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Ajustes básicos */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Palette size={16} />
                Ajustes básicos
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <SelectControl
                  label="Redondeado"
                  value={currentClasses.find(c => c.startsWith('rounded')) || ''}
                  options={IMAGE_CONTROLS.rounded}
                  onChange={(value) => styleHandler(currentClasses.filter(c => !c.startsWith('rounded')).concat(value).join(' '))}
                />
                
                <SelectControl
                  label="Sombra"
                  value={currentClasses.find(c => c.startsWith('shadow')) || ''}
                  options={IMAGE_CONTROLS.shadows}
                  onChange={(value) => styleHandler(currentClasses.filter(c => !c.startsWith('shadow')).concat(value).join(' '))}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab: Ajustar */}
        {activeTab === 'adjust' && (
          <div className="p-6 space-y-6">
            {/* Tamaños predefinidos */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Crop size={16} />
                Tamaño rápido
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {quickSizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => changeSize(size.value)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      dimensions.width === parseInt(size.size.split('×')[0]) && 
                      dimensions.height === parseInt(size.size.split('×')[1])
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-sm">{size.name}</div>
                    <div className="text-xs text-gray-500">{size.size}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Transformaciones */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Move size={16} />
                Transformaciones
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <SelectControl
                  label="Rotación"
                  icon={RotateCw}
                  value={currentRotation}
                  options={[{ value: '', name: 'Sin rotación' }, ...IMAGE_CONTROLS.rotate]}
                  onChange={(value) => styleHandler(currentClasses.filter(c => !c.startsWith('rotate') && !c.startsWith('-rotate')).concat(value).join(' '))}
                />
                
                <SelectControl
                  label="Opacidad"
                  value={currentOpacityClass}
                  options={[{ value: '', name: 'Sin opacidad' }, ...IMAGE_CONTROLS.opacity]}
                  onChange={(value) => styleHandler(currentClasses.filter(c => !c.startsWith('opacity')).concat(value).join(' '))}
                />
              </div>
            </div>
          </div>
        )}
    </TabsContainer>
  );
};
