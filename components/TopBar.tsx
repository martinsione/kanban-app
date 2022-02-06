import {
  FilterIcon,
  SearchIcon,
  SwitchVerticalIcon,
} from "@heroicons/react/outline";

const items = [
  { name: "Search", action: () => {}, icon: SearchIcon },
  { name: "Sort", action: () => {}, icon: SwitchVerticalIcon },
  { name: "Filter", action: () => {}, icon: FilterIcon },
];
export default function TopBar() {
  return (
    <div className="w-full h-20 flex items-center bg-white border-b border-gray-200 px-10">
      <p></p>
      <div className="ml-auto flex gap-3">
        {items.map((item) => (
          <button
            className="flex items-center bg-slate-200 rounded hover:opacity-75 gap-1 px-2 py-1"
            key={item.name}
          >
            <span className="">
              <item.icon className="h-4 text-blue-500" />
            </span>
            <p className="text-sm font-medium">{item.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
