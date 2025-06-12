import { useQuery } from '@tanstack/react-query';
import { fetchCategoriesAll } from '@/services/categoriesService';

export const useFetchAllCategories = () => {
  const {
    data: categories,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategoriesAll,
  });

  return {
    categories,
    isLoading,
    isError,
    error,
    refetch,
  };
};
