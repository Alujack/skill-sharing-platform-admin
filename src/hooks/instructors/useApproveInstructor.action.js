import { useState } from 'react';
import { approveInstructor } from '@/services/instructorService';

export const useApproveInstructor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleApprove = async (id) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await approveInstructor(id);
      setSuccess(true);
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return {
    approveInstructor: handleApprove,
    loading,
    error,
    success,
  };
};
