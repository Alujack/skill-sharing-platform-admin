import axios from '@/lib/axios';

export const fetchCategoriesAll = async () => {
  const res = await axios.get('/categories');
  return res.data.data;
};

export const createCategory = async (categoryData) => {  // Add parameter
  const res = await axios.post('/categories', categoryData);  // Send data in request
  return res.data.data;
};