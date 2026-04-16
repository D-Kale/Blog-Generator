import React, { useState, useMemo } from 'react';
import { Edit, FileText, Palette, RotateCcw, Settings, X } from 'lucide-react';
import { TabsContainer } from './shared';
import { BasicListControls, StyleListControls, TextStylingControls } from './list';
import { 
  LIST_CONFIG,
  createListStyleHandler,
  handleListTypeChange,
  handleListColorChange,
  handleListSizeChange,
  handleListWeightChange,
  handleListAlignmentChange,
  handleListSpacingChange,
  handleListIndentationChange,
  handleListDecorationChange,
  applyListPreset,
  applyListTemplate,
  generateListHTML,
  extractListItems,
  addListItem,
  removeListItem,
  updateListItem,
  validateListContent
} from '../config/lists';
import { enrichedListPresets, enrichedListTemplates } from '../config/lists/presets';
import { 
  TEXT_OPTIONS,
  toggleStyleOption,
  handleFontSizeChange,
  handleFontWeightChange,
  handleAlignmentChange,
  handleLineHeightChange,
  handleLetterSpacingChange,
  handleOpacityChange,
  getCurrentOpacity,
  resetTextStyles
} from '../config/text';
import type { Block } from '../CanvasEditor';

interface ListControlsProps {
  styles: string;
  content: string;
  onStyleChange: (s: string) => void;
  onContentChange: (s: string) => void;
}

export const ListControlsRefactored: React.FC<ListControlsProps> = ({ 
  styles, 
  content, 
  onStyleChange, 
  onContentChange 
}) => {
  const [activeTab, setActiveTab] = useState('editar');
  
  const styleHandler = useMemo(() => 
    createListStyleHandler(styles, onStyleChange), 
    [styles, onStyleChange]
  );

  const currentClasses = useMemo(() => 
    styles.split(' ').filter(Boolean), 
    [styles]
  );

  const listItems = useMemo(() => 
    extractListItems(content), 
    [content]
  );

  // Función para verificar si un preset está activo
  const isPresetActive = (presetClasses: string) => {
    const presetClassArray = presetClasses.split(' ').filter(Boolean);
    return presetClassArray.every(cls => currentClasses.includes(cls));
  };

  // Validación de contenido
  const contentValidation = useMemo(() => 
    validateListContent(content), 
    [content]
  );

  const tabs = [
    { id: 'editar', label: 'Editar', icon: Edit },
    { id: 'plantillas', label: 'Plantillas', icon: FileText },
    { id: 'estilos', label: 'Estilos', icon: Palette },
  ];

  return (
    <TabsContainer
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(tabId) => setActiveTab(tabId as any)}
    >
      {/* Tab: Editar */}
      {activeTab === 'editar' && (
        <BasicListControls
          listItems={listItems}
          onContentChange={onContentChange}
        />
      )}

      {/* Tab: Plantillas */}
      {activeTab === 'plantillas' && (
        <StyleListControls
          enrichedTemplates={enrichedListTemplates}
          enrichedPresets={enrichedListPresets}
          listItems={listItems}
          currentClasses={currentClasses}
          styleHandler={styleHandler}
          TEXT_OPTIONS={LIST_CONFIG}
          LIST_CONFIG={LIST_CONFIG}
          isPresetActive={isPresetActive}
          applyListTemplate={applyListTemplate}
          applyListPreset={applyListPreset}
          handleListColorChange={handleListColorChange}
          handleListSizeChange={handleListSizeChange}
          handleListWeightChange={handleListWeightChange}
          handleListSpacingChange={handleListSpacingChange}
          onContentChange={onContentChange}
        />
      )}

      {/* Tab: Estilos */}
      {activeTab === 'estilos' && (
        <TextStylingControls
          currentClasses={currentClasses}
          styleHandler={styleHandler}
          TEXT_OPTIONS={TEXT_OPTIONS}
        />
      )}
    </TabsContainer>
  );
};

// Alias for backward compatibility
export const ListControls = ListControlsRefactored;
