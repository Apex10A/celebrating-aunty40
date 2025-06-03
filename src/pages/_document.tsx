import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="description" content="Join us in celebrating Funmbi's 40th Birthday and 15 Years of Marriage with Tope. A special double celebration in Lagos, Nigeria." />
        <meta property="og:title" content="Funmbi & Tope's Double Celebration" />
        <meta property="og:description" content="Join us in celebrating Funmbi's 40th Birthday and 15 Years of Marriage with Tope. A special double celebration in Lagos, Nigeria." />
        <meta property="og:type" content="website" />
        <script src="https://checkout.flutterwave.com/v3.js" async />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
