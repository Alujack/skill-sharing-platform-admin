import { useState } from 'react';
import { becomeInstructor } from '@/services/instructorService';

export const useBecomeInstructor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleBecome = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await becomeInstructor(data);
      setSuccess(true);
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return {
    becomeInstructor: handleBecome,
    loading,
    error,
    success,
  };
};
