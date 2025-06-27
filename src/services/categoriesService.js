import axios from '@/lib/axios';

export const fetchCategoriesAll = async () => {
  const res = await axios.get('/categories');
  return res.data.data;
};

export const createCategory = async (categoryData) => {
  const res = await axios.post('/categories', categoryData);
  return res.data.data;
};
export const deleteCategory = async (categoryId) => {
  const res = await axios.delete(`/categories/${categoryId}`)
  return res.data.data;
}
export const updateCategory = async (categoryId, categoryData) => {
  const res = await axios.put(`/categories/${categoryId}`, categoryData);
  return res.data.data;
}