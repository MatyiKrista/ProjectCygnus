import { firebaseStore } from '../../store/firebaseStore';

export const useIsAuthLoading = () =>
  firebaseStore((state) => state.authLoading);
export const useUser = () => firebaseStore((state) => state.authUser);
export const useIsAuth = () => firebaseStore((state) => !!state.authUser);
