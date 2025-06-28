"use client";
import { useState } from 'react';
import { useFetchAllCategories } from '@/entities/category/useFetchAllcategories.query';
import { useCreateCategory } from '@/hooks/useCreateCategories';
import { X, Plus, Loader2 } from 'lucide-react';

const CreateCategoryModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const { createNewCategory, isLoading, error, isSuccess, reset } = useCreateCategory();
  const { refetch } = useFetchAllCategories();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) return;

    try {
      await createNewCategory({ name }); 
      refetch();
      setName('');
      onClose();
      reset();
    } catch (err) {
      // Error is already handled by the hook
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in-0">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 w-full max-w-md transform transition-all duration-300 animate-in fade-in-0 zoom-in-95">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Plus className="h-5 w-5 text-blue-600" />
              Create New Category
            </h3>
            <button 
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded-full transition-colors"
              disabled={isLoading}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="e.g. Electronics, Clothing"
                autoFocus
                disabled={isLoading}
              />
              {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 px-1">
                  {error}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors flex items-center justify-center min-w-32 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoading || !name.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Create
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryModal;