import { useState } from 'react';
import { deleteCategory } from '@/services/categoriesService';

export const useDeleteCategory = () => {
    const ondeleteCategory = async (categoryId) => {
        try {
            const response = await deleteCategory(categoryId);
            return response;
        } catch (err) {
            throw err;
        }
    };

    return {
        ondeleteCategory,
    };
};
