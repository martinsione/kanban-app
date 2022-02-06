import { Popover } from "@headlessui/react";
import Image from "next/dist/client/image";
import { Draggable } from "react-beautiful-dnd";
import { AiOutlinePaperClip, AiOutlinePlus } from "react-icons/ai";
import { BsChatLeft, BsThreeDotsVertical } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { useStore } from "../context";
import { Card as CardProps } from "../types";

interface Props {
  data: CardProps;
  index: number;
}

function MenuPopover({ id, boardId }: { id: string; boardId: number }) {
  const { removeCard } = useStore();

  const items = [
    { name: "Delete", action: () => removeCard(id, boardId), icon: FaTrash },
    // { name: "Share", action: "", icon: ShareIcon },
  ];

  return (
    <Popover className="relative">
      <Popover.Button className="outline-none">
        <BsThreeDotsVertical />
      </Popover.Button>

      <Popover.Panel className="absolute z-50 mt-3 w-36 transform -translate-x-1/2">
        <div className="relative grid gap-2 w-36 bg-white border border-gray-200 rounded-lg p-2">
          {items.map((item) => (
            <button key={item.name} onClick={item.action}>
              <a className="flex rounded text-gray-600 hover:bg-gray-100 p-2">
                <item.icon className="w-4 mr-2" />
                <p>{item.name}</p>
              </a>
            </button>
          ))}
        </div>
      </Popover.Panel>
    </Popover>
  );
}

export default function Card({ data, index }: Props) {
  const priority = [
    { text: "Low Priority", className: "from-blue-600 to-blue-400" },
    { text: "Medium Priority", className: "from-green-600 to-green-400" },
    { text: "High Priority", className: "from-red-600 to-red-400" },
  ];

  return (
    <Draggable index={index} draggableId={data.id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex flex-col border rounded select-none gap-3 p-3"
        >
          <div className="flex justify-between">
            <label
              className={`bg-gradient-to-r px-2 py-1 rounded text-white text-sm w-fit 
            ${priority[data.priority].className} `}
            >
              {priority[data.priority].text}
            </label>
            <MenuPopover id={data.id} boardId={index} />
          </div>

          <p className="text-gray-700">{data.title}</p>

          <div className="flex justify-between">
            <div>
              <ul className="inline-flex">
                {data.assignees.map((assignee, i) => (
                  <li
                    key={i}
                    className="w-[36px] h-[36px] relative rounded-full overflow-hidden border-2 border-white -mr-3"
                  >
                    <Image
                      src={assignee.avatar}
                      alt=""
                      layout="fill"
                      objectFit="cover"
                    />
                  </li>
                ))}
                <li>
                  <button className="w-[36px] h-[36px] flex justify-center items-center border border-dashed rounded-full border-gray-500">
                    <AiOutlinePlus className="w-5 h-5 text-gray-500" />
                  </button>
                </li>
              </ul>
            </div>
            <div className="flex space-x-2 items-center">
              <span className="flex space-x-1 items-center">
                <BsChatLeft className="w-4 h-4 text-gray-500" />
                <span>{data.chat}</span>
              </span>
              <span className="flex space-x-1 items-center">
                <AiOutlinePaperClip className="w-4 h-4 text-gray-500" />
                <span>{data.attachment}</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
