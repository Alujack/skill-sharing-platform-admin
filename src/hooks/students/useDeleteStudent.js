import { useState } from 'react';
import { deleteStudent } from '@/services/studentService';

export const useDeleteStudent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await deleteStudent(id);
      setSuccess(true);
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteStudent: handleDelete,
    loading,
    error,
    success,
  };
};
