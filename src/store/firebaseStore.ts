import create from 'zustand';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, DocumentReference } from 'firebase/firestore';
import { Game, User as DbUser } from '../types/db';
import { auth, db } from '../firebase/firebase';

type FirebaseStoreState = {
  authUser: User | null;
  dbUser: DbUser | null;
  dbUserRef: DocumentReference | null;
  isAuthLoading: boolean;
  game: Game | null;
  gameRef: DocumentReference | null;
  isGameLoading: boolean;
};

export const firebaseStore = create<FirebaseStoreState>(() => ({
  authUser: null,
  dbUser: null,
  dbUserRef: null,
  isAuthLoading: true,
  game: null,
  isGameLoading: false,
  gameRef: null,
}));

onAuthStateChanged(auth, async (user) => {
  firebaseStore.setState({ authUser: user, isAuthLoading: false });

  if (user) {
    const userRef = doc(db, 'users', user?.uid);
    firebaseStore.setState({ dbUserRef: userRef });
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
