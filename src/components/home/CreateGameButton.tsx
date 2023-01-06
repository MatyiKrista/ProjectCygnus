import { Button } from '../ui/Button';
import Dialog from '../ui/dialog/Dialog';
import { Flex } from '../ui/Flex';
import {
  useIsGameLoading,
  useUser,
  useUserRef,
} from '../../hooks/store/useFirebaseStore';
import { Game } from '../../types/db';
import { doc, DocumentReference, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { v4 as uuid } from 'uuid';
import { firebaseStore } from '../../store/firebaseStore';
import { useNavigate } from 'react-router-dom';

const CreateGameButton = () => {
  const navigate = useNavigate();
  const isGameLoading = useIsGameLoading();
  const user = useUser();
  const userRef = useUserRef();
  const createGame = async () => {
    if (!user || !userRef) return;
    const { uid } = user;

    firebaseStore.setState({ isGameLoading: true });

    const game: Game = {
      players: [uid],
      turns: [],
      currentTurn: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: uid,
      updatedBy: uid,
    };

    try {
      const gameRef: DocumentReference = doc(db, 'games', uuid());
      await setDoc(gameRef, game);
      await setDoc(userRef, { currentGame: gameRef }, { merge: true });

      firebaseStore.setState({ isGameLoading: false, game, gameRef });
      navigate(`/${gameRef.id}`);
    } catch {
      firebaseStore.setState({ isGameLoading: false });
    }
  };

  return (
    <Dialog
      trigger={<Button expanded>Create Game</Button>}
      title='Create new game'
    >
      <Flex $padding={4}>
        {isGameLoading ? (
          'loading'
        ) : (
          <Button onClick={createGame}>Create</Button>
        )}
      </Flex>
    </Dialog>
  );
};

export default CreateGameButton;
