import axios from '@/lib/axios';

export const fetchStudents = async () => {
  const res = await axios.get('/student');
  return res.data;
};

export const fetchStudent = async (id) => {
  const res = await axios.get(`/student/${id}`);
  return res.data;
};

export const createStudent = async (data) => {
  const res = await axios.post('/student', data);
  return res.data;
};

export const updateStudent = async ({ id, data }) => {
  const res = await axios.put(`/student/${id}`, data);
  return res.data;
};

export const deleteStudent = async (id) => {
  const res = await axios.delete(`/student/${id}`);
  return res.data;
};
