import type { AppProps } from "next/app";
import "../styles/globals.css";

import NavBar from "../app/components/NavBar";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <div className={`${montserrat.variable} content`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
