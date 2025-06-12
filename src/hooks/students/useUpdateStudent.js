import { useState } from 'react';
import { updateStudent } from '@/services/studentService';

export const useUpdateStudent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const update = async (id, data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await updateStudent({id:id,data:data});
      setSuccess(true);
    } catch (err) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error, success };
};
