import { Game } from '../../types/db';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export const useGame = (id?: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    try {
      const gameRef = doc(db, 'games', id);

      const unsubscribe = onSnapshot(
        gameRef,
        (snap) => {
          setIsLoading(true);
          const data = snap.data() as Game | undefined;
          if (data) {
            setGame(data);
            setIsLoading(false);
          }
        },
        () => setIsLoading(false)
      );

      return () => unsubscribe();
    } catch {
      setIsLoading(false);
    }
  }, [id]);

  return [game, isLoading] as const;
};
