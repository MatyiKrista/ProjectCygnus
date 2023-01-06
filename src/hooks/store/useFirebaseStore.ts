import { firebaseStore } from '../../store/firebaseStore';

export const useIsAuthLoading = () =>
  firebaseStore((state) => state.isAuthLoading);
export const useUser = () => firebaseStore((state) => state.authUser);
export const useIsAuth = () => firebaseStore((state) => !!state.authUser);
export const useUserRef = () => firebaseStore((state) => state.dbUserRef);
export const useIsGameLoading = () =>
  firebaseStore((state) => state.isGameLoading);

export const useGame = () => firebaseStore((state) => state.game);
export const useGameRef = () => firebaseStore((state) => state.gameRef);
export const useCurrentTurn = () =>
  firebaseStore((state) => state.game?.currentTurn);
export const useTurn = () =>
  firebaseStore((state) => state.game?.turns[state.game?.currentTurn ?? 0]);
