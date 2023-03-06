"use client";

import Link from "next/link";

const NavBar = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-16 border-b border-black md:z-50 bg-neutral-900">
      <div className="flex justify-between items-center font-bold text-white px-4 py-2 md:text-xs">
        <div className="font-morro text-4xl md:text-[14px] md:none">
          {" "}
          <Link className=" text-white" href="/">
            ATOM HACKS
          </Link>
        </div>
        <div className="flex font-montserrat">
          <Link className="px-4 md:px-2 duration-300 hover:text-gray-500 block" href="/#about">
            ABOUT
          </Link>

          <Link className="px-4 md:px-2 duration-300 hover:text-gray-500" href="/#sponsors">
            SPONSORS
          </Link>

          <Link className="px-4 md:px-2 duration-300 hover:text-gray-500" href="/gallery">
            GALLERY
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
