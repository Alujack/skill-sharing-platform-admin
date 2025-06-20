import { useMutation } from 'react-query';
import axios from 'axios';

export const useCreateCategoryMutation = () => {
  return useMutation((newCategory) => 
    axios.post('/api/categories', newCategory).then(res => res.data)
  );
};