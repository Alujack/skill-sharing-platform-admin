import { useState } from 'react';
import { updateCategory as updateCategoryService } from '@/services/categoriesService';

export const useUpdateCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const upCategory = async (categoryData) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await updateCategoryService(categoryData.id, categoryData);
      setIsSuccess(true);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update category');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    upCategory,
    isLoading,
    error,
    isSuccess,
    reset: () => {
      setError(null);
      setIsSuccess(false);
    }
  };
};
