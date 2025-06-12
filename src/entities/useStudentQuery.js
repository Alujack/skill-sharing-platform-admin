import { useQuery } from '@tanstack/react-query';
import { fetchStudents } from '@/services/studentService';

export const useStudentsQuery = () => {
  const {
    data: students,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents,
  });

  return {
    students,
    isLoading,
    isError,
    error,
    refetch,
  };
};
