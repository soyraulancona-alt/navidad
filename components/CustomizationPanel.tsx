
import React, { useState } from 'react';
import { DECORATIONS, POSES } from '../constants';
import { DecorationPosition, SelectedDecoration, PoseOption } from '../types';
import { TreePine, Gift, Lightbulb, User, Check, Sparkles } from 'lucide-react';

interface CustomizationPanelProps {
  selectedDecorations: SelectedDecoration[];
  onToggleDecoration: (id: string, position: DecorationPosition) => void;
  selectedPose: string;
  onSelectPose: (poseId: string) => void;
  disabled: boolean;
}

const CustomizationPanel: React.FC<CustomizationPanelProps> = ({ 
  selectedDecorations, 
  onToggleDecoration, 
  selectedPose, 
  onSelectPose,
  disabled 
}) => {
  const [activeTab, setActiveTab] = useState<'decor' | 'pose'>('decor');
  
  const isSelected = (id: string) => selectedDecorations.some(d => d.id === id);
  const getPosition = (id: string) => selectedDecorations.find(d => d.id === id)?.position;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Tree': return <TreePine className="w-5 h-5" />;
      case 'Gift': return <Gift className="w-5 h-5" />;
      case 'Lightbulb': return <Lightbulb className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full mb-8 animate-fade-in">
        <h3 className="text-xl font-bold text-christmas-red mb-4 text-center font-christmas text-2xl">
            Detalles de la Escena
        </h3>

        {/* Custom Tabs */}
        <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
            <button 
                onClick={() => setActiveTab('decor')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex justify-center items-center gap-2 ${activeTab === 'decor' ? 'bg-white text-christmas-red shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
                <Sparkles className="w-4 h-4" />
                Decoración
            </button>
            <button 
                onClick={() => setActiveTab('pose')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex justify-center items-center gap-2 ${activeTab === 'pose' ? 'bg-white text-christmas-red shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
                <User className="w-4 h-4" />
                Personas
            </button>
        </div>

      {activeTab === 'pose' ? (
          <div className="animate-fade-in">
             <div className="grid grid-cols-2 gap-3">
                {POSES.map(pose => (
                    <button
                        key={pose.id}
                        onClick={() => onSelectPose(pose.id)}
                        disabled={disabled}
                        className={`
                            px-4 py-4 rounded-xl text-sm transition-all border flex flex-col items-center gap-2 text-center
                            ${selectedPose === pose.id 
                                ? 'bg-red-50 text-christmas-red border-christmas-red shadow-sm font-bold' 
                                : 'bg-white text-gray-600 border-gray-200 hover:border-red-200'}
                        `}
                    >
                        {selectedPose === pose.id && <Check className="w-4 h-4 text-christmas-red mb-1" />}
                        {pose.label}
                    </button>
                ))}
            </div>
          </div>
      ) : (
        <div className="animate-fade-in space-y-3">
            {DECORATIONS.map((item) => {
                const active = isSelected(item.id);
                const currentPos = getPosition(item.id) || item.defaultPosition;

                return (
                <div 
                    key={item.id}
                    className={`
                        relative p-3 rounded-xl border-2 transition-all duration-200
                        ${active ? 'border-christmas-green bg-green-50' : 'border-gray-100 bg-white hover:border-gray-200'}
                    `}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${active ? 'bg-christmas-green text-white' : 'bg-gray-100 text-gray-400'}`}>
                                {getIcon(item.icon)}
                            </div>
                            <span className={`font-bold text-sm ${active ? 'text-christmas-green' : 'text-gray-500'}`}>
                                {item.label}
                            </span>
                        </div>
                        <button
                            onClick={() => onToggleDecoration(item.id, currentPos)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${active ? 'bg-christmas-green border-transparent text-white shadow-sm' : 'border-gray-200 text-gray-300 hover:border-christmas-green hover:text-christmas-green'}`}
                        >
                            {active ? <Check className="w-5 h-5" /> : <Sparkles className="w-4 h-4" />}
                        </button>
                    </div>

                    {active && (
                        <div className="mt-3 pt-3 border-t border-green-200/50 flex items-center gap-2 animate-fade-in">
                            <label className="text-xs text-christmas-green font-bold flex-shrink-0">Posición:</label>
                            <select 
                                value={currentPos}
                                onChange={(e) => onToggleDecoration(item.id, e.target.value as DecorationPosition)}
                                className="flex-1 text-xs p-2 rounded-lg bg-white border border-green-200 text-gray-700 focus:outline-none focus:border-christmas-green appearance-none"
                            >
                                <option value={DecorationPosition.LEFT}>Izquierda</option>
                                <option value={DecorationPosition.RIGHT}>Derecha</option>
                                <option value={DecorationPosition.BACKGROUND}>Fondo</option>
                                <option value={DecorationPosition.FOREGROUND}>Primer Plano</option>
                            </select>
                        </div>
                    )}
                </div>
                );
            })}
        </div>
      )}
    </div>
  );
};

export default CustomizationPanel;
