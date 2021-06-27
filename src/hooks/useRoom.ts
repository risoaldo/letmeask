import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";


type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHiglited: boolean;
  likes: Record<string, {
    author: string;
  }>
}>


type Questions = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHiglited: boolean;
  likeCount: number;
  likeId: string | undefined;
}

export function useRoom(roomId: string, newQuestion: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestion = Object.entries(firebaseQuestions ?? {}).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHiglited: value.isHiglited,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.author === user?.id)?.[0],
        }
      });
      setTitle(databaseRoom.tittle);
      setQuestions(parsedQuestion);
    })

    return () => {
      roomRef.off('value')
    }
  }, [roomId, newQuestion, user?.id])

  return { questions, title }
}