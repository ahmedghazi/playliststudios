import Footer from "./components/Footer";
import Header from "./components/Header";
import { PageContextProvider } from "./context/PageContext";
import "./styles/tailwind.css";
import "./styles/index.scss";
import { useEffect } from "react";
import Cursor from "./components/ui/Cursor";
// import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
// const config = require("./config/website");
import website from "./config/website";

export const metadata = {
  metadataBase: new URL(website.url),
  title: {
    template: `%s | ${website.title}`,
  },
  description: website.description,
  openGraph: {
    images: website.image,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='canonical' href={website.url} />
        <link
          rel='manifest'
          href='https://www.playliststudios.com/site.webmanifest'
        />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#da532c' />
      </head>
      <body>
        <div id='page'>
          <PageContextProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </PageContextProvider>
          <Analytics />
        </div>

        <Cursor color='var(--color-theme)' size={30} />
      </body>
    </html>
  );
}
