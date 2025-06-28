import { useState } from 'react';
import { updateInstructor } from '@/services/instructorService';

export const useUpdateInstructor = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const updateExistingInstructor = async (id, instructorData) => {
        setIsLoading(true);
        setError(null);
        setIsSuccess(false);

        try {
            const response = await updateInstructor(id, instructorData);
            console.log("log in hooks == ", response)
            setIsSuccess(true);
            return response;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update instructor');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        updateExistingInstructor,
        isLoading,
        error,
        isSuccess,
        reset: () => {
            setError(null);
            setIsSuccess(false);
        }
    };
};