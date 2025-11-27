
import React from 'react';
import { TEXT_STYLES } from '../constants';
import { TextConfiguration } from '../types';
import { Type, Check } from 'lucide-react';

interface TextEditorProps {
  config: TextConfiguration;
  onChange: (config: TextConfiguration) => void;
  disabled: boolean;
}

const TextEditor: React.FC<TextEditorProps> = ({ config, onChange, disabled }) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...config, content: e.target.value });
  };

  const handleStyleChange = (styleId: string) => {
    onChange({ ...config, styleId });
  };

  return (
    <div className="w-full mb-8 animate-fade-in">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-christmas-red mb-2">
            <Type className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">
            Añade un Título
        </h3>
        <p className="text-sm text-gray-500">
            (Opcional) Escribe un mensaje para tu postal
        </p>
      </div>

      <div className="space-y-6">
        {/* Input Field */}
        <div className="relative">
            <input
                type="text"
                value={config.content}
                onChange={handleTextChange}
                disabled={disabled}
                placeholder="Ej: Familia Pérez 2024"
                maxLength={30}
                className="w-full text-center text-xl font-bold py-4 px-4 border-b-2 border-gray-200 focus:border-christmas-red focus:outline-none bg-transparent placeholder-gray-300 transition-colors"
            />
            <div className="absolute right-0 bottom-4 text-xs text-gray-400 pointer-events-none">
                {config.content.length}/30
            </div>
        </div>

        {/* Style Selection */}
        {config.content.length > 0 && (
            <div className="animate-fade-in">
                <label className="block text-sm font-bold text-gray-600 mb-3">Estilo del Texto:</label>
                <div className="grid grid-cols-2 gap-3">
                    {TEXT_STYLES.map(style => {
                        const isSelected = config.styleId === style.id;
                        return (
                            <button
                                key={style.id}
                                onClick={() => handleStyleChange(style.id)}
                                disabled={disabled}
                                className={`
                                    relative p-3 rounded-xl border-2 transition-all text-left
                                    ${isSelected ? 'border-christmas-red bg-red-50' : 'border-gray-100 bg-white hover:border-red-100'}
                                `}
                            >
                                <div className={`text-lg mb-1 ${style.previewClass}`}>
                                    Abc
                                </div>
                                <div className="text-xs text-gray-500 font-medium">
                                    {style.label}
                                </div>
                                {isSelected && (
                                    <div className="absolute top-2 right-2 text-christmas-red">
                                        <Check className="w-4 h-4" />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default TextEditor;
