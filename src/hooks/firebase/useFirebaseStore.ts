import { firebaseStore } from '../../store/firebaseStore';

export const useIsAuthLoading = () =>
  firebaseStore((state) => state.authLoading);
export const useUser = () => firebaseStore((state) => state.user);
export const useIsAuth = () => firebaseStore((state) => !!state.user);
