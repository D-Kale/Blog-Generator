import React, { useState, useMemo, useRef } from 'react';
import { ImageIcon, Palette, Sliders } from 'lucide-react';
import { TabsContainer } from '../../shared/ui';
import { SelectControl } from '../../shared/primitives';
import type { Block } from '../../core/CanvasEditor';
import {
  IMAGE_CONTROLS,
  CSS_FILTERS,
  IMAGE_SIZES,
  handleUrlChange,
  handleFileUpload,
  handleSizeChange,
  handleCssFilter,
  createStyleHandler,
  getImageDisplayUrl,
  handleImageError
} from '../../config/imageControls';
import { SourceTab } from './components/SourceTab';
import { StyleTab } from './components/StyleTab';
import { AdjustTab } from './components/AdjustTab';

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentClasses = useMemo(() => styles.split(' ').filter(Boolean), [styles]);
  const styleHandler = useMemo(() => createStyleHandler(onUpdate), [onUpdate]);

  const currentRotation = useMemo(() => {
    const rotationClass = currentClasses.find(cls => cls.startsWith('rotate') || cls.startsWith('-rotate'));
    return rotationClass || '';
  }, [currentClasses]);

  const currentOpacityClass = useMemo(() => {
    const opacityClass = currentClasses.find(cls => cls.startsWith('opacity-'));
    return opacityClass || '';
  }, [currentClasses]);

  const handleUrlInputChange = (newUrl: string) => {
    setImageUrl(newUrl);
    handleUrlChange(newUrl, onUpdate, setIsUrlValid);
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(event, onUpdate, setIsUrlValid, setImageUrl);
  };

  const applyFilter = (filterName: string) => {
    handleCssFilter(filterName, CSS_FILTERS, currentClasses, onUpdate);
  };

  const changeSize = (sizeName: string) => {
    handleSizeChange(sizeName, IMAGE_SIZES, onUpdate);
  };

  const displayUrl = useMemo(() =>
    getImageDisplayUrl(imageUrl, isUrlValid, dimensions),
    [imageUrl, isUrlValid, dimensions]
  );

  const handleRoundnessChange = (value: string) => {
    styleHandler(currentClasses.filter(c => !c.startsWith('rounded')).concat(value).join(' '));
  };

  const handleShadowChange = (value: string) => {
    styleHandler(currentClasses.filter(c => !c.startsWith('shadow')).concat(value).join(' '));
  };

  const handleRotationChange = (value: string) => {
    styleHandler(currentClasses.filter(c => !c.startsWith('rotate') && !c.startsWith('-rotate')).concat(value).join(' '));
  };

  const handleOpacityChange = (value: string) => {
    styleHandler(currentClasses.filter(c => !c.startsWith('opacity')).concat(value).join(' '));
  };

  const tabs = [
    { id: 'source', label: 'Origen', icon: ImageIcon },
    { id: 'style', label: 'Estilo', icon: Palette },
    { id: 'adjust', label: 'Ajustar', icon: Sliders },
  ];

  return (
    <TabsContainer
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(tabId) => setActiveTab(tabId as any)}
    >
      {activeTab === 'source' && (
        <SourceTab
          imageUrl={imageUrl}
          isUrlValid={isUrlValid}
          displayUrl={displayUrl}
          dimensions={dimensions}
          onUrlChange={handleUrlInputChange}
          onFileSelect={handleFileInputChange}
          fileInputRef={fileInputRef}
        />
      )}

      {activeTab === 'style' && (
        <StyleTab
          currentClasses={currentClasses}
          onFilterApply={applyFilter}
          onRoundnessChange={handleRoundnessChange}
          onShadowChange={handleShadowChange}
          roundOptions={IMAGE_CONTROLS.rounded}
          shadowOptions={IMAGE_CONTROLS.shadows}
        />
      )}

      {activeTab === 'adjust' && (
        <AdjustTab
          dimensions={dimensions}
          currentRotation={currentRotation}
          currentOpacityClass={currentOpacityClass}
          onSizeChange={changeSize}
          onRotationChange={handleRotationChange}
          onOpacityChange={handleOpacityChange}
          rotationOptions={IMAGE_CONTROLS.rotate}
          opacityOptions={IMAGE_CONTROLS.opacity}
        />
      )}
    </TabsContainer>
  );
};
