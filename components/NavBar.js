import Link from "next/link";

const NavBar = () => {
  return (
    <div className="fixed top-0 left-0 z-50 items-center w-full h-16 border-b border-black md:z-50 bg-neutral-900">
      <div className="flex items-center justify-center m-auto mx-4 font-bold text-white md:text-xs">
        <Link
          className="p-3 mr-auto 2xs:text-[10px] md:text-[14px] text-4xl text-white font-morro justify-self-start md:none"
          href="/"
        >
          ATOM HACKS
        </Link>
        <ul className="flex font-montserrat">
          <li>
            <Link className="p-4 duration-300 md:p-2 hover:text-gray-500" href="/#about">
              ABOUT
            </Link>
          </li>
          <li>
            <Link className="p-4 duration-300 md:p-2 hover:text-gray-500" href="/#sponsors">
              SPONSORS
            </Link>
          </li>
          <li>
            <Link className="p-4 duration-300 md:p-2 hover:text-gray-500" href="/gallery">
              GALLERY
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
