import { create } from 'zustand';
import { getDashboardCounts } from '../services/dashboardService';


export const useDashboardStore = create((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchCounts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getDashboardCounts();
      set({ data: res.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Something went wrong',
        loading: false,
      });
    }
  },
}));
