import { firebaseStore } from '../../store/firebaseStore';

export const useUser = () => firebaseStore((state) => state.user);
export const useIsAuth = () => firebaseStore((state) => !!state.user);
