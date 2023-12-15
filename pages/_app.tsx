import type { AppProps } from "next/app";
import Head from "next/head";
import "../css/globals.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Oscar Lundberg • Creative coder</title>
                <meta name="theme-color" content="#050505" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
