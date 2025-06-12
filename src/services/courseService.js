import axios from '@/lib/axios';

export const getCourses = async (search = '', filters = {}) => {
  console.log('Fetching courses with search:', search, 'and filters:', filters);
  const params = new URLSearchParams();
  
  if (search) params.append('search', search);
  if (filters.categoryId) params.append('categoryId', filters.categoryId);
  if (filters.isApproved !== undefined) params.append('isApproved', filters.isApproved);
  if (filters.instructorId) params.append('instructorId', filters.instructorId);

  const queryString = params.toString();
  const response = await axios.get(`/courses${queryString ? `?${queryString}` : ''}`);
  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await axios.delete(`/courses/${id}`);
  return response.data;
};
