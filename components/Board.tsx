import { useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useStore } from "../context";
import { Board as BoardProps } from "../types";
import BoardHeader from "./BoardHeader";
import Card from "./Card";

export default function Board() {
  const [ready, setReady] = useState(false);
  const { board: boardData } = useStore();

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

  return (
    <>
      {ready && (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="grid grid-cols-4 gap-5 p-10 my-5">
            {boardData.map((board: BoardProps, boardIndex: number) => (
              <Droppable key={board.name} droppableId={boardIndex.toString()}>
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <div
                      className={`flex flex-col gap-4 bg-white shadow-sm rounded-md p-5
                      ${snapshot.isDraggingOver && "bg-gray-100"}`}
                    >
                      <BoardHeader
                        boardIndex={boardIndex}
                        boardLength={board.cards.length}
                        boardName={board.name}
                      />
                      <div
                        className="flex flex-col gap-4 overflow-x-hidden overflow-y-auto"
                        style={{ maxHeight: "calc(100vh - 280px)" }}
                      >
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
