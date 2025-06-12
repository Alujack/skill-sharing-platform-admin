import axiosInstance from '../lib/axios';

export const register = async (email, password) => {
  const res = await axiosInstance.post('/auth/register', { email, password , role:'User'});
  return res.data;
};

export const login = async (email, password) => {
  const res = await axiosInstance.post('/auth/login', { email, password });
  return res.data;
};

export const logout = async ()=> {
  await axiosInstance.post('auth/logout');
};

export const getCurrentUser = async () => {
  const res = await axiosInstance.get('/auth/me');
  return res.data;
};
