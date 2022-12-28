import create from 'zustand';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase/firebase';

type FirebaseStoreState = {
  user: User | null;
};

export const firebaseStore = create<FirebaseStoreState>(() => ({
  user: null,
}));
onAuthStateChanged(auth, (user) => {
  firebaseStore.setState({ user });
});
