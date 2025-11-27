
import React from 'react';
import { X, ZoomIn } from 'lucide-react';

interface ImageModalProps {
  imageUrl: string | null;
  isOpen: boolean;
  onClose: () => void;
  altText: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, isOpen, onClose, altText }) => {
  if (!isOpen || !imageUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 p-2 rounded-full"
      >
        <X className="w-8 h-8" />
      </button>
      
      <div 
        className="relative max-w-full max-h-full overflow-hidden rounded-lg shadow-2xl" 
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
      >
        <img 
            src={imageUrl} 
            alt={altText} 
            className="max-w-full max-h-[85vh] object-contain"
        />
      </div>
    </div>
  );
};

export default ImageModal;
