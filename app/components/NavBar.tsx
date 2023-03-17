import Link from "next/link";

const NavBar = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-16 border-b border-black bg-neutral-900 md:z-50">
      <div className="flex items-center justify-between mx-4 my-2 font-bold text-white md:text-xs">
        <div className="font-morro text-4xl md:py-2.5 md:text-sm">
          {" "}
          <Link className="text-white " href="/">
            ATOM HACKS
          </Link>
        </div>
        <div className="flex font-montserrat">
          <Link className="block px-4 duration-300 hover:text-gray-500 md:px-2" href="/about">
            ABOUT
          </Link>

          <Link className="block px-4 duration-300 hover:text-gray-500 md:px-2" href="/sponsors">
            SPONSORS
          </Link>

          <Link className="px-4 duration-300 hover:text-gray-500 md:px-2" href="/gallery">
            GALLERY
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
