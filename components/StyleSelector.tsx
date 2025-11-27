
import React from 'react';
import { STYLES } from '../constants';
import { ChristmasStyle } from '../types';
import { Home, Snowflake, Smile, Wand2, Check } from 'lucide-react';

interface StyleSelectorProps {
  selectedStyle: ChristmasStyle;
  onSelect: (style: ChristmasStyle) => void;
  disabled: boolean;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onSelect, disabled }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Home className="w-6 h-6" />;
      case 'Snowflake': return <Snowflake className="w-6 h-6" />;
      case 'Smile': return <Smile className="w-6 h-6" />;
      case 'Wand2': return <Wand2 className="w-6 h-6" />;
      default: return <Home className="w-6 h-6" />;
    }
  };

  return (
    <div className="w-full mb-8 animate-fade-in">
      <h3 className="text-xl font-bold text-christmas-red mb-6 text-center font-christmas text-2xl">
        Elige tu estilo mágico
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onSelect(style.id)}
            disabled={disabled}
            className={`
              relative p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center text-center gap-3
              ${selectedStyle === style.id 
                ? 'border-christmas-red bg-red-50 shadow-md transform scale-[1.02]' 
                : 'border-gray-100 bg-white hover:border-red-100 hover:shadow-sm'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className={`p-3 rounded-full ${selectedStyle === style.id ? 'bg-christmas-red text-white' : 'bg-gray-100 text-gray-500'}`}>
              {getIcon(style.icon)}
            </div>
            <div>
              <h4 className={`font-bold text-base ${selectedStyle === style.id ? 'text-christmas-red' : 'text-gray-700'}`}>{style.title}</h4>
              <p className="text-xs text-gray-400 mt-1">{style.description}</p>
            </div>
            {selectedStyle === style.id && (
                <div className="absolute top-2 right-2 text-christmas-red">
                    <Check className="w-5 h-5" />
                </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
