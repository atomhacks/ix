import Link from "next/link";
import Image from "next/image";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

import Logo from "../public/logo.png";
import GithubIcon from "../public/icons/github.png";
import InstagramIcon from "../public/icons/instagram.png";

const Footer = () => {
  return (
    <div>
      <footer className="bg-neutral-900 text-center text-white dark:bg-neutral-900">
        <div className="flex flex-row pt-6 pb-6 font-montserrat text-neutral-200">
          <div className="m-auto basis-1/4">© 2023 AtomHacks · All rights reserved.</div>
          <div className="m-auto basis-2/4">
            <Link href="/#">
              <Image
                src={Logo}
                className="h-18 md:h-50 md:w-50 m-auto w-16 opacity-40  hover:animate-pulse"
                alt="AtomHacks"
              />
            </Link>
          </div>
          <div className="m-auto basis-1/4 flex flex-row">
            <Link href="https://www.instagram.com/bxsciatomhacks/">
              <Image 
                className="h-18 md:h-50 md:w-50 md hydrated m-auto w-16 px-2 text-3xl duration-300 hover:text-gray-500 basis-1/3"
                src={InstagramIcon}
                alt="Instagram"
              />
            </Link>
            <Link href="https://github.com/atomhacks">
              <Image
                className="h-18 md:h-50 md:w-50 md hydrated m-auto w-16 px-2 text-3xl duration-300 hover:opacity-40 basis-1/3"
                src={GithubIcon}
                alt="GitHub"
              />
            </Link>
            <Link href="mailto:atomhacks@bxscience.edu">
              <EnvelopeIcon className="h-18 md:h-50 md:w-50 md hydrated m-auto w-16 px-2 text-3xl duration-300 hover:text-gray-500 basis-1/3" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
