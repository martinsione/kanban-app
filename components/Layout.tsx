import Sidebar from "./Sidebar";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-72">
        <Sidebar />
      </div>
      <div className="w-full bg-gray-200">{children}</div>
    </div>
  );
}
