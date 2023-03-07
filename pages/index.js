import { motion, useMotionValue, useTransform, animate } from "framer-motion";
//import Link from "next/link.js";
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { ordinal_suffix_of } from "../lib/ordinal.js";
import Image from "next/image";
import Logo from "../public/assets/logo.png";
import ShapeRain from "../components/effects/ShapeRain.js";
import { Parallax } from "react-scroll-parallax";
import styles from "../styles/Home.module.css";
import Bg from "../public/atomhackspic.jpg";
import About from "../components/landing/about.js";
import Sponsors from "../components/landing/sponsor.js";

export default function Index() {
  const { data: session } = useSession();
  const years = useMotionValue(1);
  const yearsRender = useTransform(years, (latest) => ordinal_suffix_of(Math.round(latest)));

  useEffect(() => {
    const animation = animate(years, 9, { duration: 2 });

    return animation.stop;
  }, [years]);

  return (
    <div className="text-white">
      <div className="absolute top-0 left-0 !w-full !h-full md:opacity-100 md:min-h-screen bg-black opacity-[.82] border-b-8 border-green-500" />
      <div className="flex items-center justify-center">
        {" "}
        <div className="top-0 left-0 overflow-hidden !w-full !h-full absolute ">
          <Image
            layout="responsive"
            src={Bg}
            alt="atomhacks 2019"
            priority
            quality={40}
            objectFit="cover"
            objectPosition={"center"}
            className="absolute -z-10 md:relative"
          />
        </div>
        <div className="z-40 text-white opacity-100 md:z-40">
          <ShapeRain count={10} />
          <Parallax y={[20, -20]}>
            <div className="flex grow items-center md:flex-col justify-center min-h-screen">
              {/* Left side of page */}
              <div className="flex items-end justify-end py-2 my-1 mx-12 md:m-0 md:items-center md:justify-center basis-1/2">
                <div className={styles.logo}>
                  <Image className="w-64 h-72 md:w-52 md:h-56" src={Logo} alt="AtomHacks"></Image>
                </div>
              </div>

              {/* Right side of page */}
              <div className="flex flex-col items-start justify-start mx-6 md:py-8 md:mt-4 basis-1/2 font-montserrat">
                <h1 className="mb-2 text-5xl font-thin md:text-2xl">
                  Bronx Science&apos;s <motion.b className="text-green-500">{yearsRender}</motion.b>
                  <br />
                  Annual Hackathon
                </h1>
                <h1 className="py-2 text-xl font-semibold">March 18th, 2023</h1>
                <p className="mb-4 font-medium break-words">
                  Explore, build, innovate. Come join us for 12 full hours of creativity, excitement, and building!
                </p>
                <button
                  className="relative font-bold border-green-500 border-2 rounded-lg bg-transparent py-2.5 px-5 uppercase transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-green-500 before:transition-transform before:duration-300 before:content-[''] before:hover:scale-x-100"
                  onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                >
                  {session ? "Sign In" : "Sign Up"}
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
