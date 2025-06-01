import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="description" content="Join us in celebrating 40 years of life and 15 years of love. A special celebration in Lagos, Nigeria." />
        <meta property="og:title" content="40 & 15 Years Celebration" />
        <meta property="og:description" content="Join us in celebrating 40 years of life and 15 years of love. A special celebration in Lagos, Nigeria." />
        <meta property="og:type" content="website" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
