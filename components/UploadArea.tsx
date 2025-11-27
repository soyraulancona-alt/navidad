
import React, { useRef, useState } from 'react';
import { Upload, X, ZoomIn } from 'lucide-react';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE_MB } from '../constants';

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
  onClear: () => void;
  selectedFile: File | null;
  previewUrl: string | null;
  disabled: boolean;
  onImageClick: () => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onFileSelect, onClear, selectedFile, previewUrl, disabled, onImageClick }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateAndSetFile = (file: File) => {
    setError(null);
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError("Solo JPG o PNG.");
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`Max ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }
    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  if (selectedFile && previewUrl) {
    return (
      <div className="w-full mb-8 relative group animate-fade-in">
        <h3 className="text-xl font-bold text-christmas-red mb-4 text-center font-christmas text-2xl">
            ¡Foto lista!
        </h3>
        <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video bg-gray-100 group">
            <img 
                src={previewUrl} 
                alt="Original" 
                className="w-full h-full object-cover"
                onClick={onImageClick}
            />
            {/* Overlay for Click hint */}
            <div 
                onClick={onImageClick}
                className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors cursor-pointer flex items-center justify-center"
            >
                <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 drop-shadow-lg w-10 h-10" />
            </div>

            <button 
                onClick={onClear}
                disabled={disabled}
                className="absolute top-2 right-2 bg-white/90 text-red-500 p-1.5 rounded-full hover:bg-white transition-colors shadow-sm z-10"
            >
                <X className="w-5 h-5" />
            </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">Toca la imagen para verla en grande</p>
      </div>
    );
  }

  return (
    <div className="w-full mb-8 animate-fade-in">
       <h3 className="text-xl font-bold text-christmas-red mb-4 text-center font-christmas text-2xl">
        Tu Foto Familiar
      </h3>
      <div 
        className={`
            relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-3xl transition-all duration-300
            ${dragActive ? 'border-christmas-red bg-red-50' : 'border-gray-300 bg-gray-50'}
            ${disabled ? 'opacity-50 pointer-events-none' : 'cursor-pointer hover:bg-gray-100'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={ALLOWED_FILE_TYPES.join(',')}
          onChange={handleChange}
          disabled={disabled}
        />
        
        <div className="flex flex-col items-center p-4 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 text-christmas-red shadow-md">
                <Upload className="w-8 h-8" />
            </div>
            <p className="mb-2 text-lg font-bold text-gray-700">
                Sube tu foto
            </p>
            <p className="text-sm text-gray-500 max-w-[200px]">
                Arrastra aquí o toca para seleccionar de tu galería
            </p>
            {error && (
                <p className="mt-4 text-red-500 font-bold bg-white/80 px-3 py-1 rounded-full text-xs shadow-sm">
                    {error}
                </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default UploadArea;
