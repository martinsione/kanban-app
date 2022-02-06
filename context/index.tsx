import { createContext, useContext, useState } from "react";
import { Board, Card } from "../types";

interface Props {
  children: React.ReactNode;
  initialValue: Board[];
}

const Context = createContext<any>(null);

export const useStore = () => useContext(Context);

export const ContextProvider = ({ children, initialValue = [] }: Props) => {
  const [board, setBoard] = useState<Board[]>(initialValue);

  const addCard = (card: Card, boardIndex: number) => {
    const newBoard = [...board];
    newBoard[boardIndex].cards.push({ ...card });
    setBoard(newBoard);
  };

  const removeCard = (cardId: string, boardIndex: number) => {
    const newBoard = [...board];
    newBoard[boardIndex].cards = newBoard[boardIndex].cards.filter(
      (card: Card) => card.id !== cardId
    );
    setBoard(newBoard);
  };

  const store = {
    board,
    addCard,
    removeCard,
  };

  return <Context.Provider value={store}>{children}</Context.Provider>;
};
