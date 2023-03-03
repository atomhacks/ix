import Link from "next/link";

const NavBar = () => {
  return (
    <div className="fixed top-0 left-0 z-10 items-center w-full h-16 border-b border-black bg-neutral-900">
      <div className="flex items-center justify-center m-auto font-bold text-white md:text-xs">
        <Link className="p-3 mr-auto text-4xl text-white font-morro justify-self-start md:none" href="/">
          ATOM HACKS IX
        </Link>
        <ul className="flex font-montserrat">
          <li>
            <Link className="p-4 duration-300 hover:text-gray-500" href="#about">
              ABOUT
            </Link>
          </li>
          <li>
            <Link className="p-4 duration-300 hover:text-gray-500" href="#sponsors">
              SPONSORS
            </Link>
          </li>
          <li>
            <Link className="p-4 duration-300 hover:text-gray-500" href="/gallery">
              GALLERY
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
