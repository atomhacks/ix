import Link from "next/link";

const NavBar = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-16 border-b border-black md:z-50 bg-neutral-900">
      <div className="flex items-center justify-between mx-4 my-2 font-bold text-white md:text-xs">
        <div className="text-4xl font-morro md:text-sm md:none">
          {" "}
          <Link className="text-white " href="/">
            ATOM HACKS
          </Link>
        </div>
        <div className="flex font-montserrat text-1xl">
          <Link className="px-4 duration-300 md:px-2 hover:text-gray-500" href="/#about">
            ABOUT
          </Link>

          <Link className="px-4 duration-300 md:px-2 hover:text-gray-500" href="/#sponsors">
            SPONSORS
          </Link>

          <Link className="px-4 duration-300 md:px-2 hover:text-gray-500" href="/gallery">
            GALLERY
          </Link>

          <Link
            className="px-4 duration-300 hover:text-gray-500 md:px-2"
            href="https://docs.google.com/spreadsheets/d/1DuaOdHg2O0FsFfphVt9jJyLTk4p3CocCB2yYLZs9JzQ/edit?usp=sharing"
          >
            SCHEDULE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
