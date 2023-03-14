import "../styles/globals.css";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { SessionProvider } from "next-auth/react";
import { Montserrat } from "next/font/google";
import type { AppProps } from "next/app";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <NavBar />
        <div className={`${montserrat.variable} content`}>
          <Component {...pageProps} />
        </div>
        <Footer />
      </SessionProvider>
    </>
  );
}

export default MyApp;