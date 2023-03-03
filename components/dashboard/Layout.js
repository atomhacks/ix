// import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen text-white bg-neutral-800 font-montserrat">
      {/* <Sidebar /> */}
      <div className="pt-4 pl-4 ml-56">{children}</div>
    </div>
  );
}
