import Image from "next/image";
import Logo from "../public/assets/logo.png";

import styles from "../styles/Home.module.css";
import Bg from "../public/atomhackspic.jpg";

import ShapeRain from "../components/effects/ShapeRain";
import About from "../app/components/about";
import Sponsors from "../app/components/sponsor";

import SignIn from "../app/components/SignInButton";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AtomHacks",
};

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
          <div className="flex min-h-screen grow items-center justify-center md:flex-col">
            {/* Left side of page */}
            <div className="my-1 mx-12 flex basis-1/2 items-end justify-end py-2 md:m-0 md:items-center md:justify-center">
              <div className={styles.logo}>
                <Image className="h-72 w-64 md:h-56 md:w-52" src={Logo} alt="AtomHacks"></Image>
              </div>
            </div>

            {/* Right side of page */}
            <div className="mx-6 flex basis-1/2 flex-col items-start justify-start font-montserrat md:mt-4 md:py-8">
              <h1 className="mb-2 text-5xl font-bold md:text-2xl">Bronx Science&apos;s 9th Annual Hackathon</h1>
              <h1 className="py-2 text-xl font-semibold">March 18th, 2023</h1>
              <p className="mb-4 break-words font-medium">
                Explore, build, innovate. Come join us for 12 full hours of creativity, excitement, and building!
              </p>
              <SignIn provider="google" callbackUrl="/dashboard">Sign in</SignIn>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-zinc-900">
        <About />
        <Sponsors />
      </div>
    </div>
  );
}
