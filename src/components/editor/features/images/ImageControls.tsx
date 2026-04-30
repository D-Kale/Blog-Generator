import React, { useState } from 'react';
import { Image as ImageIcon, Palette, Sliders } from 'lucide-react';
import { TabsContainer } from '../../shared';
import { BasicImageControls } from './components/BasicImageControls';
import { StyleImageControls } from './components/StyleImageControls';
import { AdvancedImageControls } from './components/AdvancedImageControls';
import type { Block } from '../../core/CanvasEditor';

interface ImageControlsProps {
  styles: string;
  content: string;
  dimensions?: { width: number; height: number };
  onUpdate: (updates: Partial<Block>) => void;
}

export const ImageControls: React.FC<ImageControlsProps> = ({
  styles,
  content,
  dimensions,
  onUpdate
}) => {
  const [activeTab, setActiveTab] = useState<'source' | 'style' | 'adjust'>('source');

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
        <BasicImageControls
          content={content}
          dimensions={dimensions}
          onUpdate={onUpdate}
        />
      )}

      {activeTab === 'style' && (
        <StyleImageControls
          styles={styles}
          onUpdate={onUpdate}
        />
      )}

      {activeTab === 'adjust' && (
        <AdvancedImageControls
          styles={styles}
          dimensions={dimensions}
          onUpdate={onUpdate}
        />
      )}
    </TabsContainer>
  );
};