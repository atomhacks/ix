import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-neutral-800 font-montserrat text-white">
      {/* <Sidebar /> */}
      <div className="ml-56 pt-4 pl-4">{children}</div>
    </div>
  );
}
