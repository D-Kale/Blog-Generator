import React, { useState, useMemo } from 'react';
import type { LucideIcon } from 'lucide-react';
import { TabsContainer } from './TabsContainer';

interface TabConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  component: React.ComponentType<any>;
  props: Record<string, any>;
}

interface TabbedEditorProps {
  tabs: TabConfig[];
  styles: string;
  onStyleChange: (s: string) => void;
  defaultTab?: string;
  createStyleHandler: (styles: string, onStyleChange: (s: string) => void) => any;
}

export const TabbedEditor: React.FC<TabbedEditorProps> = ({
  tabs, styles, onStyleChange, defaultTab = tabs[0].id, createStyleHandler
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const styleHandler = useMemo(() =>
    createStyleHandler(styles, onStyleChange),
    [styles, onStyleChange]
  );

  const currentClasses = useMemo(() =>
    styles.split(' ').filter(Boolean),
    [styles]
  );

  const isPresetActive = (presetClasses: string) => {
    const presetArray = presetClasses.split(' ').filter(Boolean);
    return presetArray.every(cls => currentClasses.includes(cls));
  };

  return (
    <TabsContainer tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
      {tabs.map(tab =>
        activeTab === tab.id && (
          <tab.component
            key={tab.id}
            {...tab.props}
            currentClasses={currentClasses}
            styleHandler={styleHandler}
            isPresetActive={isPresetActive}
          />
        )
      )}
    </TabsContainer>
  );
};
