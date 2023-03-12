import "../styles/globals.css";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <NavBar />
        <div className="content">
          <Component {...pageProps} />
        </div>
        <Footer />
      </SessionProvider>
    </>
  );
}

export default MyApp;
