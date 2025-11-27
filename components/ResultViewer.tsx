
import React from 'react';
import { Download, RefreshCw, ZoomIn } from 'lucide-react';

interface ResultViewerProps {
  originalUrl: string;
  resultUrl: string;
  onDownload: () => void;
  onReset: () => void;
  onImageClick: () => void;
}

const ResultViewer: React.FC<ResultViewerProps> = ({ resultUrl, onDownload, onReset, onImageClick }) => {
  return (
    <div className="w-full animate-fade-in text-center pb-8">
        <div className="mb-6">
            <div className="inline-block bg-christmas-lightGreen text-christmas-green px-4 py-1 rounded-full text-sm font-bold mb-4 animate-bounce-slight">
                ¡Misión Cumplida!
            </div>
            <h2 className="font-christmas text-4xl text-christmas-red mb-2">¡Felices Fiestas!</h2>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white mb-8 bg-white rotate-1 hover:rotate-0 transition-all duration-500 group">
            <img 
                src={resultUrl} 
                alt="Resultado Navideño" 
                className="w-full h-auto object-cover cursor-pointer"
                onClick={onImageClick}
            />
            
            {/* Overlay for Click hint */}
            <div 
                onClick={onImageClick}
                className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors cursor-pointer flex items-center justify-center z-10"
            >
                <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 drop-shadow-lg w-12 h-12" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent flex justify-end z-20 pointer-events-none">
                <button 
                    onClick={(e) => { e.stopPropagation(); onDownload(); }}
                    className="bg-white text-christmas-red font-bold p-3 rounded-full shadow-lg hover:scale-110 transition-transform pointer-events-auto"
                >
                    <Download className="w-6 h-6" />
                </button>
            </div>
        </div>

        <button 
            onClick={onReset}
            className="w-full bg-gray-100 text-gray-600 font-bold py-4 px-8 rounded-xl shadow-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
        >
            <RefreshCw className="w-5 h-5" />
            Crear otra escena
        </button>
    </div>
  );
};

export default ResultViewer;
