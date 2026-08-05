import React, { useState, useRef, useEffect } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import type { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageCropperModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  aspect?: number;
  onCropComplete: (croppedBlob: Blob) => void;
}

const ImageCropperModal: React.FC<ImageCropperModalProps> = ({ isOpen, onClose, imageUrl, aspect, onCropComplete }) => {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCrop(undefined);
      setCompletedCrop(undefined);
    }
  }, [isOpen]);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    if (aspect) {
      const initialCrop = centerCrop(
        makeAspectCrop({ unit: '%', width: 90 }, aspect, width, height),
        width,
        height
      );
      setCrop(initialCrop);
    }
  };

  const handleSave = () => {
    if (!completedCrop || !imgRef.current) return;
    
    const canvas = document.createElement('canvas');
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );
    
    canvas.toBlob((blob) => {
      if (blob) {
        onCropComplete(blob);
      }
    }, 'image/jpeg', 0.95);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-secondary-bg p-6 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-primary-text/10"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Crop Image</h3>
              <button onClick={onClose} className="text-primary-text/60 hover:text-white">✕</button>
            </div>
            
            <div className="flex-grow overflow-auto flex items-center justify-center bg-black/50 rounded-lg p-4">
              {imageUrl && (
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={aspect}
                >
                  <img
                    ref={imgRef}
                    alt="Crop preview"
                    src={imageUrl}
                    onLoad={onImageLoad}
                    className="max-h-[60vh] w-auto object-contain"
                  />
                </ReactCrop>
              )}
            </div>
            
            <div className="mt-6 flex justify-end space-x-4">
              <button onClick={onClose} className="px-6 py-2 rounded-lg border border-primary-text/20 hover:bg-primary-text/10">
                Cancel
              </button>
              <button onClick={handleSave} className="px-6 py-2 rounded-lg bg-primary-gold text-black font-semibold hover:bg-white">
                Apply Crop
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ImageCropperModal;
