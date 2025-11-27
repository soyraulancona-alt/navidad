
import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-between items-center w-full px-2 mb-8 relative">
      {/* Connector Line */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10 rounded-full" />
      <div 
        className="absolute top-1/2 left-0 h-1 bg-christmas-red -z-10 rounded-full transition-all duration-500"
        style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
      />

      {Array.from({ length: totalSteps }).map((_, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        
        return (
          <div 
            key={index}
            className={`
                relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2
                ${isCompleted ? 'bg-christmas-red border-christmas-red text-white' : ''}
                ${isCurrent ? 'bg-white border-christmas-red text-christmas-red scale-110 shadow-md' : ''}
                ${!isCompleted && !isCurrent ? 'bg-white border-gray-200 text-gray-400' : ''}
            `}
          >
            {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
