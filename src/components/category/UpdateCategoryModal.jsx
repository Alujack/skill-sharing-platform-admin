"use client";
import { useEffect, useState } from 'react';
import { useFetchAllCategories } from '@/entities/category/useFetchAllcategories.query';
import { useUpdateCategory } from '@/hooks/useUpdateCategories';

const UpdateCategoryModal = ({ isOpen, onClose, category }) => {
  const [name, setName] = useState('');
  const { upCategory, isLoading, error, isSuccess, reset } = useUpdateCategory();
  const { refetch } = useFetchAllCategories();

  useEffect(() => {
    if (isOpen && category?.name) {
      setName(category.name);
    }
  }, [isOpen, category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await upCategory({ id: category.id, name });
      refetch();
      setName('');
      onClose();
      reset();
    } catch (err) {
      // Optional: handle error display
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Update Category</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Category Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category name"
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                reset();
              }}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategoryModal;
