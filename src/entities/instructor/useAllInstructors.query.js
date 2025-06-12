// Example: useApprovedInstructors.query.js
import { useQuery } from '@tanstack/react-query';
import { fetchAllInstructors } from '@/services/instructorService'
export const useAllInstructorsQuery = () => {
    const {
        data: instructors,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ['allInstructors'],
        queryFn: fetchAllInstructors,
    });

    return { instructors, isLoading, isError, error, refetch };
};
