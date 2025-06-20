import { useState } from 'react';
import { createCategory } from '@/services/categoriesService';

export const useCreateCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const createNewCategory = async (categoryData) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await createCategory(categoryData);
      setIsSuccess(true);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create category');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createNewCategory,
    isLoading,
    error,
    isSuccess,
    reset: () => {
      setError(null);
      setIsSuccess(false);
    }
  };
};