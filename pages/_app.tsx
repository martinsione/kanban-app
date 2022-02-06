import type { AppProps } from "next/app";
import { ContextProvider } from "../context";
import data from "../data/db.json";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider initialValue={data}>
      <Component {...pageProps} />
    </ContextProvider>
  );
}
