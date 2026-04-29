import React from 'react';
import { FormatControls } from '../../shared';
import { 
  createAlignmentControl,
  createStyleControl,
  createDecorationControl,
  createFontSizeControl,
  createFontWeightControl,
  createFontFamilyControl,
  createLineHeightControl,
  createLetterSpacingControl,
  createTransformControl
} from '../../shared/controls/controlFactory';
import { Type } from 'lucide-react';

interface StyleControlsProps {
  currentClasses: string[];
  options: any;
  onStyleChange: (category: string, value: string) => void;
  showTransform?: boolean;
}

export const StyleControls: React.FC<StyleControlsProps> = ({
  currentClasses,
  options,
  onStyleChange,
  showTransform = true
}) => {
  // Create all control items
  const controls = [
    createAlignmentControl(options, currentClasses, onStyleChange),
    createStyleControl(options, currentClasses, onStyleChange),
    createDecorationControl(options, currentClasses, onStyleChange),
    createFontSizeControl(options, currentClasses, onStyleChange),
    createFontWeightControl(options, currentClasses, onStyleChange),
    createFontFamilyControl(options, currentClasses, onStyleChange),
    createLineHeightControl(options, currentClasses, onStyleChange),
    createLetterSpacingControl(options, currentClasses, onStyleChange),
    ...(showTransform ? [createTransformControl(options, currentClasses, onStyleChange)] : [])
  ];

  const normalizedControls = controls.map((control) => ({
    ...control,
    icon: control.icon ?? undefined
  }));

  return (
    <FormatControls
      title="Estilos"
      icon={Type}
      items={normalizedControls}
      collapsible={true}
      defaultOpen={true}
    />
  );
};