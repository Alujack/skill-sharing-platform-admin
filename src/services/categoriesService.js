import axios from '@/lib/axios';
export const fetchCategoriesAll = async () => {
    const res = await axios.get('/categories');
    return res.data.data;
};