//import Link from "next/link.js";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Logo from "../public/assets/logo.png";
import ShapeRain from "../components/effects/ShapeRain.js";
import { Parallax } from "react-scroll-parallax";
import styles from "../styles/Home.module.css";
import Bg from "../public/atomhackspic.jpg";
import About from "../components/index/about.js";
import Sponsors from "../components/index/sponsor.js";

export default function Index() {
  return (
    <div className="text-white">
      <div className="absolute top-0 left-0 !h-full !w-full border-b-8 border-green-500 bg-black opacity-[.82] md:min-h-screen md:opacity-100" />
      <div className="flex items-center justify-center">
        {" "}
        <div className="absolute top-0 left-0 !h-full !w-full overflow-hidden ">
          <Image src={Bg} alt="atomhacks 2019" priority quality={40} className="absolute -z-10 md:relative" />
        </div>
        <div className="z-40 text-white opacity-100 md:z-40">
          <ShapeRain count={10} />
          <Parallax y={[20, -20]}>
            <div className="flex min-h-screen grow items-center justify-center md:flex-col">
              {/* Left side of page */}
              <div className="my-1 mx-12 flex basis-1/2 items-end justify-end py-2 md:m-0 md:items-center md:justify-center">
                <div className={styles.logo}>
                  <Image className="h-72 w-64 md:h-56 md:w-52" src={Logo} alt="AtomHacks"></Image>
                </div>
              </div>

              {/* Right side of page */}
              <div className="mx-6 flex basis-1/2 flex-col items-start justify-start font-montserrat md:mt-4 md:py-8">
                <h1 className="mb-2 text-5xl font-thin md:text-2xl">Bronx Science&apos;s 9th Annual Hackathon</h1>
                <h1 className="py-2 text-xl font-semibold">March 18th, 2023</h1>
                <p className="mb-4 break-words font-medium">
                  Explore, build, innovate. Come join us for 12 full hours of creativity, excitement, and building!
                </p>
                <button
                  className="relative rounded-lg border-2 border-green-500 bg-transparent py-2.5 px-5 font-bold uppercase transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-green-500 before:transition-transform before:duration-300 before:content-[''] before:hover:scale-x-100"
                  onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                >
                  Sign In
                </button>
              </div>
            </div>
          </Parallax>
        </div>
      </div>
      <div className=" bg-zinc-900">
        <About />
        <Sponsors />
      </div>
    </div>
  );
}
