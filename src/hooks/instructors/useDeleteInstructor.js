import { useState } from 'react';
import { deleteInstructor } from '@/services/instructorService';

export const useDeleteInstructor = () => {
    const onDeleteInstructor = async (userid) => {
        try {
            const response = await deleteInstructor(userid);
            return response;
        } catch (err) {
            throw response;
        }
    };

    return {
        onDeleteInstructor,
    };
};