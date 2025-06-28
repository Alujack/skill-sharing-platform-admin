"use client";
import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const SuccessModal = ({ isOpen, message, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-md w-full 
                  transform transition-all duration-300 ease-out animate-in fade-in-0 zoom-in-95"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="p-3 rounded-full bg-emerald-50 dark:bg-emerald-900/30">
            <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
            {message}
          </h3>
          <button
            onClick={onClose}
            className="mt-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 
                      text-gray-800 dark:text-gray-200 text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;