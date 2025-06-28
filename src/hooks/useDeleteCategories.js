import { useState } from 'react';
import { deleteCategory } from '@/services/categoriesService';

export const useDeleteCategory = () => {
    const onDeleteCategory = async (categoryId) => {
        try {
            const response = await deleteCategory(categoryId);
            return response;
        } catch (err) {
            throw response;
        }
    };

    return {
        onDeleteCategory,
    };
};