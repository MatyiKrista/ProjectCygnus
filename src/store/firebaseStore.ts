import create from 'zustand';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase/firebase';

type FirebaseStoreState = {
  user: User | null;
  authLoading: boolean;
};

export const firebaseStore = create<FirebaseStoreState>(() => ({
  user: null,
  authLoading: true,
}));

onAuthStateChanged(auth, (user) => {
  firebaseStore.setState({ user, authLoading: false });
});
