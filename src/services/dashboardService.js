import axios from '@/lib/axios';

export const getDashboardCounts = async () => {
  const response = await axios.get('/dashboard/counts');
  return response.data;
};
