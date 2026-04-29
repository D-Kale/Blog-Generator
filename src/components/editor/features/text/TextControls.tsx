import React, { useState, useMemo } from 'react';
import { Type, Palette, Settings } from 'lucide-react';
import { TabsContainer } from '../../shared';
import { BasicTextControls, StyleTextControls, AdvancedTextControls } from './components';
import { 
  TEXT_OPTIONS, 
  TEXT_UI_CONFIG,
  createTextStyleHandler,
  handleOpacityChange,
  getCurrentOpacity,
  toggleStyleOption,
  applyTextPreset,
  applyTextTheme,
  handleFontSizeChange,
  handleFontWeightChange,
  handleFontFamilyChange,
  handleAlignmentChange,
  handleLineHeightChange,
  handleLetterSpacingChange,
  resetTextStyles,
  validateTextContent,
  calculateReadabilityMetrics
} from '../../config/text';
import { enrichedTextPresets, enrichedTextThemes } from '../../config/text/presets';

interface TextControlsProps {
  styles: string;
  onStyleChange: (s: string) => void;
  type?: string;
  content?: string;
}

export const TextControlsRefactored: React.FC<TextControlsProps> = ({ 
  styles, 
  onStyleChange, 
  type, 
  content 
}) => {
  const [activeTab, setActiveTab] = useState('basic');
  
  const styleHandler = useMemo(() => 
    createTextStyleHandler(styles, onStyleChange), 
    [styles, onStyleChange]
  );

  const currentClasses = useMemo(() => 
    styles.split(' ').filter(Boolean), 
    [styles]
  );

  // Validación de contenido
  const contentValidation = useMemo(() => {
    const validation = validateTextContent(content || '', type as 'text' | 'list');
    return {
      isValid: validation.isValid,
      error: validation.error,
      wordCount: 0,
      charCount: (content || '').length,
      readingTime: Math.ceil((content || '').length / 200)
    };
  }, [content, type]);

  // Función para verificar si un preset está activo
  const isPresetActive = (presetClasses: string) => {
    const presetClassArray = presetClasses.split(' ').filter(Boolean);
    return presetClassArray.every(cls => currentClasses.includes(cls));
  };

  const tabs = [
    { id: 'basic', label: 'Básico', icon: Type },
    { id: 'style', label: 'Estilo', icon: Palette },
    { id: 'advanced', label: 'Avanzado', icon: Settings },
  ];

  return (
    <TabsContainer
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(tabId) => setActiveTab(tabId as any)}
    >
      {/* Tab: Básico */}
      {activeTab === 'basic' && (
        <BasicTextControls
          enrichedPresets={enrichedTextPresets}
          currentClasses={currentClasses}
          styleHandler={styleHandler}
          TEXT_OPTIONS={TEXT_OPTIONS}
          isPresetActive={isPresetActive}
          applyTextPreset={applyTextPreset}
          handleFontSizeChange={handleFontSizeChange}
          handleFontWeightChange={handleFontWeightChange}
          handleAlignmentChange={handleAlignmentChange}
          toggleStyleOption={toggleStyleOption}
        />
      )}

      {/* Tab: Estilo */}
      {activeTab === 'style' && (
        <StyleTextControls
          enrichedThemes={enrichedTextThemes}
          currentClasses={currentClasses}
          styleHandler={styleHandler}
          TEXT_OPTIONS={TEXT_OPTIONS}
          applyTextTheme={applyTextTheme}
          toggleStyleOption={toggleStyleOption}
          handleFontFamilyChange={handleFontFamilyChange}
          handleLineHeightChange={handleLineHeightChange}
          handleLetterSpacingChange={handleLetterSpacingChange}
        />
      )}

      {/* Tab: Avanzado */}
      {activeTab === 'advanced' && (
        <AdvancedTextControls
          content={content}
          type={type}
          styleHandler={styleHandler}
          currentClasses={currentClasses}
          TEXT_OPTIONS={TEXT_OPTIONS}
          contentValidation={contentValidation}
          handleOpacityChange={handleOpacityChange}
          getCurrentOpacity={getCurrentOpacity}
          resetTextStyles={resetTextStyles}
          toggleStyleOption={toggleStyleOption}
        />
      )}
    </TabsContainer>
  );
};

// Alias for backward compatibility
export const TextControls = TextControlsRefactored;
