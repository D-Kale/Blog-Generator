import React, { useState } from 'react';
import { List, Edit, Plus, Trash2, Check, X } from 'lucide-react';

interface BasicListControlsProps {
  listItems: string[];
  onContentChange: (content: string) => void;
}

export const BasicListControls: React.FC<BasicListControlsProps> = ({
  listItems,
  onContentChange
}) => {
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const startEditingItem = (index: number) => {
    setEditingItem(index);
    setEditText(listItems[index]);
  };

  const saveEdit = () => {
    if (editingItem !== null && editText.trim()) {
      const newItems = [...listItems];
      newItems[editingItem] = editText.trim();
      onContentChange(newItems.map(item => `<li>${item}</li>`).join('\n'));
      setEditingItem(null);
      setEditText('');
    }
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setEditText('');
  };

  const addNewItem = () => {
    const newItems = [...listItems, 'Nuevo elemento'];
    onContentChange(newItems.map(item => `<li>${item}</li>`).join('\n'));
  };

  const removeItem = (index: number) => {
    const newItems = listItems.filter((_, i) => i !== index);
    onContentChange(newItems.map(item => `<li>${item}</li>`).join('\n'));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Gestión de elementos */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <List size={16} />
            Elementos de lista 
            <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full font-medium">
              {listItems.length}
            </span>
          </h3>
          <button
            onClick={addNewItem}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Plus size={16} />
            Agregar elemento
          </button>
        </div>

        <div className="space-y-2">
          {listItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-all group/item">
              {editingItem === index ? (
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={saveEdit}
                    className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-colors"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4 p-4 w-full">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full text-base font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-900 truncate">{item}</div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                    <button
                      onClick={() => startEditingItem(index)}
                      className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => removeItem(index)}
                      className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
