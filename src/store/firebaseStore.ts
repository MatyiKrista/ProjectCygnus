import create from 'zustand';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User as DbUser } from '../types/db';
import { auth, db } from '../firebase/firebase';

type FirebaseStoreState = {
  authUser: User | null;
  dbUser: DbUser | null;
  authLoading: boolean;
};

export const firebaseStore = create<FirebaseStoreState>(() => ({
  authUser: null,
  dbUser: null,
  authLoading: true,
}));

onAuthStateChanged(auth, async (user) => {
  firebaseStore.setState({ authUser: user, authLoading: false });

  if (user) {
    const userRef = doc(db, 'users', user?.uid);
    const userSnap = await getDoc(userRef);
    const data = userSnap.data() as DbUser | null;

    const dbUser: DbUser = {
      createdAt: data?.createdAt ?? new Date(),
      email: user.email!,
      name: data?.name ?? user.displayName,
      photoUrl: data?.photoUrl ?? user.photoURL,
      updatedAt: new Date(),
      friends: data?.friends ?? [],
    };

    await setDoc(userRef, dbUser);
  }
});
