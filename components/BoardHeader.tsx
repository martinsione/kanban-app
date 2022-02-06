import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { v4 as uuid } from "uuid";
import { useStore } from "../context";

interface Props {
  boardIndex: number;
  boardLength: number;
  boardName: string;
}

export default function BoardHeader({
  boardIndex,
  boardLength,
  boardName,
}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { addCard } = useStore();

  useEffect(() => {
    if (showForm && textAreaRef.current) textAreaRef.current.focus();
  }, [showForm]);

  const handleShowForm = (boardIndex: number) => {
    setSelectedBoard(boardIndex);
    setShowForm(true);
  };

  const handleOnKeyDown = (e: any, boardIndex: number) => {
    if (e.code === "Escape") setShowForm(false);

    if (e.code === "Enter") {
      if (e.target.value.length === 0) return;

      addCard(
        {
          id: uuid(),
          title: e.target.value,
          priority: 0,
          chat: 0,
          attachment: 0,
          assignees: [],
        },
        boardIndex
      );
      setShowForm(false);
      e.target.value = "";
    }
  };

  return (
    <>
      {showForm && selectedBoard === boardIndex ? (
        <div>
          <textarea
            className="w-full border border-gray-200 rounded-md focus:outline-none"
            placeholder="Task info"
            ref={textAreaRef}
            onKeyDown={(e) => handleOnKeyDown(e, boardIndex)}
            onBlur={() => setShowForm(false)}
          />
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <button
            className="bg-slate-100 p-2 rounded-md hover:opacity-75"
            onClick={() => handleShowForm(boardIndex)}
          >
            <AiOutlinePlus className="text-blue-500" />
          </button>

          <span className="flex items-center gap-2">
            <p className="text-2xl">{boardName}</p>
            <p className="text-xl text-blue-500">({boardLength})</p>
          </span>
          <button className="ml-auto">
            <BsThreeDotsVertical className="text-gray-600" />
          </button>
        </div>
      )}
    </>
  );
}
