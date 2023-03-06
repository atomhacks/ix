import "../styles/globals.css";

import NavBar from "../components/NavBar";
import { SessionProvider } from "next-auth/react";
import { ParallaxProvider } from "react-scroll-parallax";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <NavBar />
        <div className="content">
          <ParallaxProvider>
                <Component {...pageProps} />
          </ParallaxProvider>
        </div>
      </SessionProvider>
    </>
  );
}

export default MyApp;
