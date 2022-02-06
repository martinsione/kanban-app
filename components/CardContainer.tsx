import { useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { AiOutlinePlus } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { v4 as uuid } from "uuid";
import { Board } from "../types";
import Card from "./Card";

export default function CardContainer({ data }: { data: Board[] }) {
  const [ready, setReady] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);
  const [boardData, setBoardData] = useState(data);

  useEffect(() => {
    if (typeof window) setReady(true);
  }, []);

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const items = boardData;

    if (source.droppableId === destination.droppableId) {
      const reorderedItem = items[Number(source.droppableId)].cards.splice(
        source.index,
        1
      ); // remove the item from the source
      items[Number(destination.droppableId)].cards.splice(
        destination.index,
        0,
        ...reorderedItem
      ); // add the item to the destination
    } else {
      const dragItem = items[Number(source.droppableId)].cards[source.index];
      items[Number(source.droppableId)].cards.splice(source.index, 1);
      items[Number(destination.droppableId)].cards.splice(
        destination.index,
        0,
        dragItem
      );
    }
  };

  const handleTextAreaKeyPress = (e: any) => {
    e.code === "Escape" && setShowForm(false);

    if (e.code === "Enter") {
      const value = e.target.value;
      if (value.length === 0) {
        setShowForm(false);
      } else {
        const boardId = e.target.attributes["data-id"].value;
        const item = {
          id: uuid(),
          title: value,
          priority: 0,
          chat: 0,
          attachment: 0,
          assignees: [],
        };
        let newBoardData = boardData;
        newBoardData[boardId].cards.push(item);
        setBoardData(newBoardData);
        setShowForm(false);
        e.target.value = "";
      }
    }
  };

  const handleShowForm = (boardIndex: number) => {
    setSelectedBoard(boardIndex);
    setShowForm(true);
  };

  return (
    <>
      {ready && (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="grid grid-cols-4 gap-5 p-10 my-5">
            {boardData.map((board, boardIndex) => (
              <Droppable key={board.name} droppableId={boardIndex.toString()}>
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <div
                      className={`flex flex-col gap-4 bg-white shadow-sm rounded-md p-5
                      ${snapshot.isDraggingOver && "bg-gray-100"}`}
                    >
                      {showForm && selectedBoard === boardIndex ? (
                        <div className="p-3">
                          <textarea
                            className="focus:outline-none border-gray-300 rounded w-full focus:ring-purple-400"
                            placeholder="Task info"
                            data-id={boardIndex}
                            onKeyDown={handleTextAreaKeyPress}
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
                            <p className="text-2xl">{board.name}</p>
                            <p className="text-xl text-blue-500">
                              ({board.cards.length})
                            </p>
                          </span>
                          <button className="ml-auto">
                            <BsThreeDotsVertical className="text-gray-600" />
                          </button>
                        </div>
                      )}

                      <div className="flex flex-col gap-4">
                        {board?.cards.map((item, i) => (
                          <Card key={item.id} data={item} index={i} />
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      )}
    </>
  );
}
