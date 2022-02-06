import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { BiBell, BiHelpCircle, BiPlus, BiTask } from "react-icons/bi";
import { GoGraph } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { MdTimer } from "react-icons/md";

const sidebarItems = [
  { name: "Dashboard", icon: GoGraph, link: "/" },
  { name: "Projects", icon: AiOutlineFundProjectionScreen, link: "/projects" },
  { name: "My Task", icon: BiTask, link: "/my-task" },
  { name: "Settings", icon: IoSettingsOutline, link: "/settings" },
];

export default function Sidebar() {
  const { asPath: pathname } = useRouter();

  return (
    <div className="flex flex-col h-full">
      <p className="text-center text-2xl border-b border-gray-200 py-5">
        Dashboard
      </p>

      <div className="flex justify-center border-b border-gray-200 gap-6 py-4 mb-8">
        <span className="text-xl text-blue-500 bg-slate-100 p-2 rounded-lg">
          <MdTimer />
        </span>
        <span className="text-xl text-blue-500 bg-slate-100 p-2 rounded-lg">
          <BiBell />
        </span>
        <span className="text-xl text-blue-500 bg-slate-100 p-2 rounded-lg">
          <BiPlus />
        </span>
      </div>

      <div className="flex flex-col gap-6">
        {sidebarItems.map((item) => (
          <Link href={item.link} key={item.name}>
            <a
              className={`group flex items-center rounded-xl py-2 px-4 mx-6 ${
                pathname === item.link
                  ? "bg-blue-500 text-white"
                  : "hover:opacity-75"
              }`}
            >
              <item.icon
                className={`mr-4 
                ${pathname === item.link ? "text-white" : "text-blue-500"}`}
              />
              <p>{item.name}</p>
            </a>
          </Link>
        ))}
      </div>

      <div className="border-t border-gray-200 mt-auto">
        <Link href="/help">
          <a className="flex items-center justify-center bg-slate-100 rounded-xl gap-2 py-2 px-4 m-6 hover:opacity-75">
            <BiHelpCircle />
            <p>Help</p>
          </a>
        </Link>
      </div>
    </div>
  );
}
