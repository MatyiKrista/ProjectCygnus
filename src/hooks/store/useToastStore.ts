import { toastStore } from '../../store/toastStore';

export const useToasts = () => toastStore((state) => state.toasts);
export const useAddToast = () => toastStore((state) => state.addToast);
export const useRemoveToast = () => toastStore((state) => state.removeToast);
