import create from 'zustand';
import { UIType } from '../types/ui';
import { ReactNode } from 'react';
import { UUID } from '../types/game';
import { v4 as uuid } from 'uuid';

type ToastType = {
  id: string;
  type: UIType;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  closable?: boolean;
};

type ToastStoreState = {
  toasts: ToastType[];
  addToast: (toast: Omit<Partial<ToastType>, 'id'>) => ToastType;
  removeToast: (id: UUID) => void;
};

export const toastStore = create<ToastStoreState>((set) => ({
  toasts: [],
  addToast: (toastPartial) => {
    const id = uuid();
    const type = toastPartial.type ?? 'light';
    const closable = toastPartial.closable ?? true;
    const title = toastPartial.title ?? 'Info';
    const toast = {
      id,
      type,
      closable,
      title,
      ...toastPartial,
    };
    set((state) => ({ toasts: [...state.toasts, toast] }));
    return toast;
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
