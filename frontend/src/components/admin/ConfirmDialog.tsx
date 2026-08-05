import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel"
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-secondary-bg p-6 rounded-2xl w-full max-w-sm border border-primary-text/10 shadow-2xl"
          >
            <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
            <p className="text-primary-text/70 mb-6">{message}</p>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={onCancel}
                className="px-4 py-2 rounded-lg border border-primary-text/20 hover:bg-primary-text/10 transition-colors"
              >
                {cancelText}
              </button>
              <button 
                onClick={onConfirm}
                className="px-4 py-2 rounded-lg bg-red-500/20 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition-colors"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;
